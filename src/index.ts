import http from 'http'

import fetch from 'node-fetch'
import { parse } from 'node-html-parser'

import { marketNameToPage } from './market'

const hostname = '0.0.0.0'
const port = 3000
const COINMARKETCAP_ENDPOINT = 'https://coinmarketcap.com/currencies'
const FTX_ENDPOINT = 'https://ftx.com/api/markets'
const BINANCE_ENDPOINT = 'https://api.binance.com'

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
    const price = parseFloat(priceStr.substring(1).replace(',', ''))
    log(`[CoinMarketCap] ${name} price: ${price}`)
    return price
}

async function fetchFtxPrice(name: string): Promise<number> {
    name = name.toUpperCase()
    log(`[FTX] fetching price of ${name}`)
    const url = `${FTX_ENDPOINT}/${name}/USD`
    const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
    const result = (await resp.json()).result
    const price = result.last || result.ask || result.bid
    if (!price) {
        throw new Error(`${name} not found in FTX`)
    }
    log(`[FTX] ${name} price: ${price}`)
    return price
}

async function fetchBinancePrice(name: string): Promise<number> {
    name = name.toUpperCase()
    const url = `${BINANCE_ENDPOINT}/api/v3/ticker/price?symbol=${name}USDT`
    let price: number | undefined = undefined
    try {
        const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
        const result = await resp.json()
        if (!result.price) {
            throw new Error(result.msg)
        }
        price = result.price
    } catch (err: any) {
        log(`[Binance] failed to get ${name} price in USDT market: ${err}`)
        // try BUSD
        url.replace('USDT', 'BUSD')
        const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
        const result = await resp.json()
        price = result.price
    }
    if (!price) {
        throw new Error(`${name} not found in Binance`)
    }
    log(`[Binance] ${name} price: ${price}`)
    return price
}

async function updateMarkets() {
    for (const name in markets) {
        try {
            markets[name].price = await fetchBinancePrice(name)
        } catch (err: any) {
            try {
                markets[name].price = await fetchCoinMarketCapPrice(name)
            } catch (error) {
                log(`fetchCoinMarketCapPriceError: ${err.toString()}`)
            }
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
        function respondPrice(price: number) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            log(`response ${marketName} price: ${price}`)
            res.end(`<root>${price}</root>`)
        }
        if (marketName in markets) {
            respondPrice(markets[marketName].price)
            return
        }
        fetchFtxPrice(marketName)
            .then(price => {
                markets[marketName] = { name: marketName, price }
                log(`market added: ${marketName}, price: ${price}`)
                respondPrice(price)
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
