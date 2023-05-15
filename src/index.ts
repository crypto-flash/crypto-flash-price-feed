import http from 'http'

import { marketNameToPage } from './market'
import { BinancePriceSource } from './price-source/binance-price-source'
import { CMCPriceSource } from './price-source/cmc-price-source'
import Big from 'big.js'
import { sleep, log } from './helper'

const hostname = '0.0.0.0'
const port = 3000
const priceSources = [new BinancePriceSource(), new CMCPriceSource()]

interface Market {
    name: string
    price: Big
}

const markets: { [key: string]: Market } = {}

async function updateMarkets() {
    for (const name in markets) {
        try {
            for (const priceSource of priceSources) {
                const price = await priceSource.fetch(name)
                if (price) {
                    log(`[${priceSource.constructor.name}] ${name}: ${price}`)
                    markets[name].price = price
                    break
                }
            }
        } catch (err: any) {
            log(`fetchPriceError: ${err.toString()}`)
        }
    }
}

function initMarkets() {
    for (const name in marketNameToPage) {
        markets[name] = { name, price: Big(0) }
    }
}

function setupServer() {
    const server = http.createServer((req, res) => {
        const marketName = req.url?.substring(1)?.toUpperCase()
        if (marketName === 'FAVICON.ICO') {
            return
        }
        if (!marketName) {
            res.statusCode = 400
            res.end('no market name')
            return
        }
        if (marketName in markets) {
            const price = markets[marketName].price
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/plain')
            log(`response ${marketName} price: ${price}`)
            res.end(`<root>${price}</root>`)
            return
        }
    })
    server.listen(port, hostname, () => {
        log(`Server running at http://${hostname}:${port}/`)
    })
}

async function main() {
    initMarkets()
    setupServer()
    while (true) {
        try {
            await updateMarkets()
        } catch (err: any) {
            log(`err: ${err.toString()}`)
        }
        await sleep(60)
    }
}

if (require.main === module) {
    main()
}
