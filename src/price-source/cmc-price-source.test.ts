import { CMCPriceSource } from './cmc-price-source'

test('cmc price source', async () => {
    const cmcPriceSource = new CMCPriceSource()
    const price = await cmcPriceSource.fetch('BTC')

    expect(price).not.toBeUndefined
    expect(+price!).toBeGreaterThan(0)
})
