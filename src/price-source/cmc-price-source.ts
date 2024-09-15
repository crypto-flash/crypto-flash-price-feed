import { PriceSource } from './price-source'
import Big from 'big.js'
import fetch from 'node-fetch'
import { parse } from 'node-html-parser'

// TODO: use coinmarketcap api free plan
export class CMCPriceSource implements PriceSource {
    private readonly COINMARKETCAP_ENDPOINT = 'https://coinmarketcap.com/currencies'

    async fetch(symbol: string) {
        const url = `${this.COINMARKETCAP_ENDPOINT}/${symbol}`
        const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
        const root = parse(await resp.text())
        const htmlElement = root.querySelector('#section-coin-overview > div.flexStart.alignBaseline > span')
        if (!htmlElement) {
            //console.log(root.toString())
            throw new Error('CMC rate limited')
        }
        const priceStr = htmlElement.text
        // priceStr is something like $27,334.04
        return Big(priceStr.substring(1).replace(',', ''))
    }
}
