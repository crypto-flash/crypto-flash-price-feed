import http from 'http'

import { MarketConfigs } from './marketConfig'
import { BinancePriceSource } from './price-source/binance-price-source'
import { CMCPriceSource } from './price-source/cmc-price-source'
import { YahooPriceSource } from './price-source/yahoo-price-source'
import Big from 'big.js'
import { sleep, log } from './helper'
import { PriceSource, PriceSourceType } from './price-source/price-source'

const hostname = '0.0.0.0'
const port = 3000

const priceSources: Record<PriceSourceType, PriceSource> = {
    [PriceSourceType.BINANCE]: new BinancePriceSource(),
    [PriceSourceType.CMC]: new CMCPriceSource(),
    [PriceSourceType.YAHOO]: new YahooPriceSource(),
}

interface Market {
    name: string
    price: Big
}

const markets: { [key: string]: Market } = {}

async function updateMarkets() {
    for (const [name, marketConfig] of Object.entries(MarketConfigs)) {
        const priceSourceType = marketConfig.priceSourceType
        log(`fetching ${name} from ${priceSourceType}`)
        try {
            const priceSource = priceSources[priceSourceType]
            const price = await priceSource.fetch(marketConfig.symbol)
            log(`[${priceSourceType}] ${name}: ${price}`)
            markets[name] = { name, price }
        } catch (err: any) {
            log(`fetchPriceError: ${err.toString()}`)
        }
    }
}

function setupServer() {
    const server = http.createServer((req, res) => {
        const marketName = req.url?.substring(1)
        if (marketName === 'FAVICON.ICO') {
            return
        }
        if (!marketName) {
            res.statusCode = 400
            res.end('no market name')
            return
        }
        if (!(marketName in markets)) {
            res.statusCode = 404
            res.end('market not found')
            return
        }
        const price = markets[marketName].price
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        log(`response ${marketName} price: ${price}`)
        res.end(`<root>${price}</root>`)
    })
    server.listen(port, hostname, () => {
        log(`Server running at http://${hostname}:${port}/`)
    })
}

async function main() {
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
