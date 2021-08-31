import http from 'http'

import fetch from 'node-fetch'
import { parse } from 'node-html-parser'

const hostname = '0.0.0.0'
const port = 3000
const COINMARKETCAP_ENDPOINT = 'https://coinmarketcap.com/currencies'
// marketName to coinmarketcap page
const marketNameToPage: { [key: string]: string } = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BNB: 'binance-coin',
    SOL: 'solana',
    UNI: 'uniswap',
    AAVE: 'aave',
    FTT: 'ftx-token',
    MKR: 'maker',
    COMP: 'compound',
    SUSHI: 'sushiswap',
    SNX: 'synthetix-network-token',
    YFI: 'yearn-finance',
    CRV: 'curve-dao-token',
    WOO: 'wootrade',
    SRM: 'serum',
    PERP: 'perpetual-protocol',
    '1INCH': '1inch',
    RAY: 'raydium',
    OXY: 'oxygen',
    SLRS: 'solrise-finance',
}
interface Market {
    name: string
    price: number
}

const markets: { [key: string]: Market } = {}

async function fetchPrice(name: string): Promise<number> {
    console.log(`fetching price of ${name}`)
    const url = `${COINMARKETCAP_ENDPOINT}/${marketNameToPage[name]}`
    const resp = await fetch(url, { method: 'GET' })
    const root = parse(await resp.text())
    const priceStr = root.querySelector('div.priceValue ').text
    const price = parseFloat(priceStr.substr(1).replace(',', ''))
    console.log(`price: ${price}`)
    return price
}

async function updateMarkets() {
    for (const name in marketNameToPage) {
        if (!(name in markets)) {
            markets[name] = { name, price: 0 }
        }
        markets[name].price = await fetchPrice(name)
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
        console.log(`request market ${marketName}`)
        if (!(marketName in markets)) {
            res.statusCode = 404
            res.end('market not found')
            return
        }
        const price = markets[marketName].price
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        console.log(`price: ${price}`)
        res.end(`<root>${price}</root>`)
    })
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })
}

const sleep = (sec: number) => new Promise(res => setTimeout(res, sec * 1000))
async function main() {
    setupServer()
    while (true) {
        await updateMarkets()
        await sleep(5)
    }
}

if (require.main === module) {
    main()
}
