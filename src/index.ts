import http from 'http'

import fetch from 'node-fetch'
import { parse } from 'node-html-parser'

import { marketNameToPage } from './market'

const hostname = '0.0.0.0'
const port = 3000
const COINMARKETCAP_ENDPOINT = 'https://coinmarketcap.com/currencies'
const FTX_ENDPOINT = 'https://ftx.com/api/markets'

interface Market {
    name: string
    price: number
}

const markets: { [key: string]: Market } = {}

function log(msg: string) {
    console.log(`[${new Date().toISOString()}] ${msg}`)
}

async function fetchCoinMarketCapPrice(name: string): Promise<number> {
    if (!(name in marketNameToPage)) {
        throw new Error(`${name} not found in CoinMarketCap`)
    }
    log(`[CoinMarketCap] fetching price of ${name}`)
    const url = `${COINMARKETCAP_ENDPOINT}/${marketNameToPage[name]}`
    const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
    const root = parse(await resp.text())
    const priceStr = root.querySelector('div.priceValue ').text
    const price = parseFloat(priceStr.substr(1).replace(',', ''))
    log(`[CoinMarketCap] price: ${price}`)
    return price
}

async function fetchFtxPrice(name: string): Promise<number> {
    name = name.toUpperCase()
    log(`[FTX] fetching price of ${name}`)
    const url = `${FTX_ENDPOINT}/${name}/USD`
    const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
    const result = (await resp.json()).result
    if (!result) {
        throw new Error(`${name} not found in FTX`)
    }
    const price = result.last || result.ask || result.bid
    log(`[FTX] price: ${price}`)
    return price
}

async function updateMarkets() {
    for (const name in markets) {
        try {
            markets[name].price = await fetchFtxPrice(name)
        } catch (err: any) {
            await fetchCoinMarketCapPrice(name)
                .then(price => (markets[name].price = price))
                .catch(err => log(`fetchCoinMarketCapPriceError: ${err.toString()}`))
        }
    }
}

function initMarkets() {
    for (const name in marketNameToPage) {
        markets[name] = { name, price: 0 }
    }
}

function setupServer() {
    const server = http.createServer((req, res) => {
        const marketName = req.url?.substr(1)?.toUpperCase()
        if (marketName === 'FAVICON.ICO') {
            return
        }
        if (!marketName) {
            res.statusCode = 400
            res.end('no market name')
            return
        }
        function responsePrice(price: number) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            log(`response ${marketName} price: ${price}`)
            res.end(`<root>${price}</root>`)
        }
        if (marketName in markets) {
            responsePrice(markets[marketName].price)
            return
        }
        fetchFtxPrice(marketName)
            .then(price => {
                markets[marketName] = { name: marketName, price }
                log(`market added: ${marketName}, price: ${price}`)
                responsePrice(price)
            })
            .catch(err => {
                res.statusCode = 404
                res.end('market not found in FTX')
                log(`err: ${err.toString()}`)
            })
    })
    server.listen(port, hostname, () => {
        log(`Server running at http://${hostname}:${port}/`)
    })
}

const sleep = (sec: number) => new Promise(res => setTimeout(res, sec * 1000))
async function main() {
    initMarkets()
    setupServer()
    while (true) {
        try {
            await updateMarkets()
        } catch (err: any) {
            log(`err: ${err.toString()}`)
        }
        await sleep(5)
    }
}

if (require.main === module) {
    main()
}
