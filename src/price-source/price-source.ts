import Big from 'big.js'

export enum PriceSourceType {
    BINANCE = 'binance',
    CMC = 'cmc',
    YAHOO = 'yahoo',
    COIN_GECKO = 'coin-gecko',
}

export interface PriceSource {
    fetch: (symbol: string) => Promise<Big>
}
