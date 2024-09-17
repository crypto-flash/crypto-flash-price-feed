import { PriceSource } from './price-source'
import Big from 'big.js'
import yahooFinance from 'yahoo-finance2'

yahooFinance.suppressNotices(['yahooSurvey'])

export class YahooPriceSource implements PriceSource {
    async fetch(symbol: string) {
        const result = await yahooFinance.quote(symbol, { fields: ['bid'] })
        // use bid as the current sell price
        return Big(result.bid as number)
    }
}
