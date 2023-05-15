import Big from 'big.js'

export interface PriceSource {
    // do not throw error, return undefined instead
    fetch: (symbol: string) => Promise<Big | undefined>
}
