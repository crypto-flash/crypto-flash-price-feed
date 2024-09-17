import { CoinGeckoPriceSource } from './coin-gecko-price-source'
import dotenv from 'dotenv'

dotenv.config()

test('coin gecko price source', async () => {
    const coinGeckoPriceSource = new CoinGeckoPriceSource()
    const price = await coinGeckoPriceSource.fetch('bitcoin')

    expect(price).not.toBeUndefined
    expect(+price!).toBeGreaterThan(0)
})

test('coin gecko price source fetch prices', async () => {
    const coinGeckoPriceSource = new CoinGeckoPriceSource()
    const prices = await coinGeckoPriceSource.fetchPrices(['bitcoin', 'ethereum'])

    expect(prices['bitcoin']).not.toBeUndefined
    expect(+prices['bitcoin']!).toBeGreaterThan(0)

    expect(prices['ethereum']).not.toBeUndefined
    expect(+prices['ethereum']!).toBeGreaterThan(0)
})
