import { PriceSource } from './price-source'
import Big from 'big.js'
import fetch from 'node-fetch'
import { log } from '../helper'

export class BinancePriceSource implements PriceSource {
    private readonly BINANCE_ENDPOINT = 'https://api.binance.com'

    private async fetchBinancePriceByQuote(symbol: string, quote: string) {
        const url = `${this.BINANCE_ENDPOINT}/api/v3/ticker/price?symbol=${symbol}${quote}`
        try {
            const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
            const result = (await resp.json()) as any
            return result.price ? Big(result.price) : undefined
        } catch (err: any) {
            return undefined
        }
    }

    async fetch(symbol: string) {
        symbol = symbol.toUpperCase()
        try {
            let price = await this.fetchBinancePriceByQuote(symbol, 'USDT')
            if (price) {
                return price
            }
            price = await this.fetchBinancePriceByQuote(symbol, 'BUSD')
            return price
        } catch (err: any) {
            log(`[BinancePriceSource] fetch price for ${symbol} error: ${err}`)
            return undefined
        }
    }
}
