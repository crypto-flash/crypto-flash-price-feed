import { BinancePriceSource } from './binance-price-source'

test('binance price source', async () => {
    const binancePriceSource = new BinancePriceSource()
    const price = await binancePriceSource.fetch('BTC')

    expect(price).not.toBeUndefined
    expect(+price!).toBeGreaterThan(0)
})
