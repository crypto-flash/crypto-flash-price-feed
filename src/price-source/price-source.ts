import Big from 'big.js'

export enum PriceSourceType {
    BINANCE = 'binance',
    CMC = 'cmc',
    YAHOO = 'yahoo',
}

export interface PriceSource {
    fetch: (symbol: string) => Promise<Big>
}
