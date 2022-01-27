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
    const resp = await fetch(url, { method: 'GET' })
    const root = parse(await resp.text())
    const priceStr = root.querySelector('div.priceValue ').text
    const price = parseFloat(priceStr.substr(1).replace(',', ''))
    log(`price: ${price}`)
    return price
}

async function fetchFtxPrice(name: string): Promise<number> {
    log(`[FTX] fetching price of ${name}`)
    const url = `${FTX_ENDPOINT}/${name}/USD`
    const resp = await fetch(url, { method: 'GET' })
    const price = (await resp.json()).result.last
    log(`[FTX] price: ${price}`)
    return price
}

async function updateMarkets() {
    for (const name in marketNameToPage) {
        if (!(name in markets)) {
            markets[name] = { name, price: 0 }
        }
        try {
            markets[name].price = await fetchFtxPrice(name)
        } catch (error) {
            markets[name].price = await fetchPrice(name)
        }
    }
}

function setupServer() {
    const server = http.createServer((req, res) => {
        const marketName = req.url?.substr(1)
        if (!marketName) {
            res.statusCode = 400
            res.end('no market name')
            return
        }
        log(`request market ${marketName}`)
        if (!(marketName in markets)) {
            res.statusCode = 404
            res.end('market not found')
            return
        }
        const price = markets[marketName].price
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        log(`price: ${price}`)
        res.end(`<root>${price}</root>`)
    })
    server.listen(port, hostname, () => {
        log(`Server running at http://${hostname}:${port}/`)
    })
}

const sleep = (sec: number) => new Promise(res => setTimeout(res, sec * 1000))
async function main() {
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
