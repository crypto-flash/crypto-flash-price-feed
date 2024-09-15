import { PriceSource } from './price-source'
import Big from 'big.js'
import YahooStockAPI from 'yahoo-stock-api'
import { getSymbolResponse } from 'yahoo-stock-api/dist/types/getSymbol'

export class YahooPriceSource implements PriceSource {
    private readonly client = new YahooStockAPI()

    async fetch(symbol: string) {
        /* FIXME
        const result = await this.client.getSymbol({ symbol })
        if (result.error) {
            throw new Error(`${result.message}`)
        }
        // use bid as the current sell price
        return Big((result.response as unknown as getSymbolResponse).bid.value)*/
        return Big(0)
    }
}
