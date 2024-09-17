import { PriceSource } from './price-source'
import Big from 'big.js'

export class CoinGeckoPriceSource implements PriceSource {
    private readonly apiKey: string
    private readonly endpoint = 'https://api.coingecko.com/api/v3'

    constructor() {
        if (!process.env.COIN_GECKO_API_KEY) {
            throw new Error('no coin gecko api key')
        }
        this.apiKey = process.env.COIN_GECKO_API_KEY
    }

    async fetch(symbol: string) {
        const params = new URLSearchParams()
        params.append('ids', symbol)
        params.append('vs_currencies', 'usd')
        const resp = await this.get('simple/price', params)
        return Big(resp[symbol].usd)
    }

    async fetchPrices(symbols: string[]) {
        const params = new URLSearchParams()
        params.append('ids', symbols.join(','))
        params.append('vs_currencies', 'usd')
        const resp = await this.get('simple/price', params)

        const result: Record<string, Big> = {}
        symbols.forEach(symbol => (result[symbol] = Big(resp[symbol].usd)))
        return result
    }

    private async get(path: string, params: URLSearchParams) {
        const headers = {
            'x-cg-demo-api-key': this.apiKey,
        }
        const url = new URL(`${this.endpoint}/${path}`)
        url.search = params.toString()
        const resp = await fetch(url, { method: 'GET', headers })
        return (await resp.json()) as any
    }
}
