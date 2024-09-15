import { BinancePriceSource } from './binance-price-source'

test('binance price source', async () => {
    const binancePriceSource = new BinancePriceSource()
    const price = await binancePriceSource.fetch('BTCUSDT')

    expect(price).not.toBeUndefined
    expect(+price!).toBeGreaterThan(0)
})
