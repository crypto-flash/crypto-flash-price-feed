import { PriceSource } from './price-source'
import Big from 'big.js'
import fetch from 'node-fetch'
import { parse } from 'node-html-parser'
import { marketNameToPage } from '../market'
import { log } from '../helper'

export class CMCPriceSource implements PriceSource {
    private readonly COINMARKETCAP_ENDPOINT = 'https://coinmarketcap.com/currencies'

    async fetch(symbol: string) {
        if (!(symbol in marketNameToPage)) {
            return undefined
        }
        const url = `${this.COINMARKETCAP_ENDPOINT}/${marketNameToPage[symbol]}`
        try {
            const resp = await fetch(url, { method: 'GET', timeout: 10 * 1000 })
            const root = parse(await resp.text())
            const htmlElement = root.querySelector('div.priceValue ')
            if (!htmlElement) {
                // probably rate limit
                //console.log(root.toString())
                return undefined
            }
            const priceStr = htmlElement.text
            // priceStr is something like $27,334.04
            return Big(priceStr.substring(1).replace(',', ''))
        } catch (err: any) {
            log(`[CMCPriceSource] fetch price for ${symbol} error: ${err}`)
            return undefined
        }
    }
}
