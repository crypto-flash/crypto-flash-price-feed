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

async function fetchPrice(name: string): Promise<number> {
    log(`fetching price of ${name}`)
    const url = `${COINMARKETCAP_ENDPOINT}/${marketNameToPage[name]}`
    const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
    const root = parse(await resp.text())
    const priceStr = root.querySelector('div.priceValue ').text
    const price = parseFloat(priceStr.substr(1).replace(',', ''))
    log(`price: ${price}`)
    return price
}

async function fetchFtxPrice(name: string): Promise<number> {
    name = name.toUpperCase()
    log(`[FTX] fetching price of ${name}`)
    const url = `${FTX_ENDPOINT}/${name}/USD`
    const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
    const price = (await resp.json()).result?.last
    log(`[FTX] price: ${price}`)
    return price
}

async function updateMarkets() {
    for (const name in markets) {
        try {
            markets[name].price = await fetchFtxPrice(name)
        } catch (error) {
            markets[name].price = await fetchPrice(name)
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
        if (!marketName) {
            res.statusCode = 400
            res.end('no market name')
            return
        }
        if (marketName in markets) {
            const price = markets[marketName].price
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            log(`price: ${price}`)
            res.end(`<root>${price}</root>`)
            return
        }
        fetchFtxPrice(marketName)
            .then(price => {
                markets[marketName] = { name: marketName, price }
            })
            .catch(err => {
                res.statusCode = 404
                res.end('market not found')
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
