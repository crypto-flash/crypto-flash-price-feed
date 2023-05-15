import { PriceSource } from './price-source'
import Big from 'big.js'
import { log } from '../helper'
import YahooStockAPI from 'yahoo-stock-api'
import { getSymbolResponse } from 'yahoo-stock-api/dist/types/getSymbol'
import { marketNameToPage } from '../market'

export class YahooPriceSource implements PriceSource {
    private readonly client = new YahooStockAPI()

    async fetch(symbol: string) {
        if (!(symbol in marketNameToPage)) {
            return undefined
        }
        try {
            const result = await this.client.getSymbol({ symbol: marketNameToPage[symbol] })
            if (result.error) {
                throw new Error(`${result.message}`)
            }
            // use bid as the current sell price
            return Big((result.response as unknown as getSymbolResponse).bid.value)
        } catch (err: any) {
            log(`[YahooPriceSource] fetch price for ${symbol} error: ${err}`)
            return undefined
        }
    }
}
