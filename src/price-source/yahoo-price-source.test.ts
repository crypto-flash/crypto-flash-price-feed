import { YahooPriceSource } from './yahoo-price-source'

test('yahoo price source', async () => {
    const yahooPriceSource = new YahooPriceSource()
    const price = await yahooPriceSource.fetch('006208.TW')

    expect(price).not.toBeUndefined
    expect(+price!).toBeGreaterThan(0)
})
