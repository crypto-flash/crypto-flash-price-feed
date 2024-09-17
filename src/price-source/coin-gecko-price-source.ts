import { PriceSource } from './price-source'
import Big from 'big.js'

export class CoinGeckoPriceSource implements PriceSource {
    private readonly BINANCE_ENDPOINT = 'https://api.binance.com'

    async fetch(symbol: string) {
        const url = `${this.BINANCE_ENDPOINT}/api/v3/ticker/price?symbol=${symbol}`
        const resp = await fetch(url, { method: 'GET' })
        const result = (await resp.json()) as any
        return Big(result.price)
    }
}
