import { CoinGeckoPriceSource } from './coin-gecko-price-source'
import dotenv from 'dotenv'

dotenv.config()

test('coin gecko price source', async () => {
    const coinGeckoPriceSource = new CoinGeckoPriceSource()
    const price = await coinGeckoPriceSource.fetch('bitcoin')

    expect(price).not.toBeUndefined
    expect(+price!).toBeGreaterThan(0)
})
