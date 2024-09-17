import { PriceSourceType } from './price-source/price-source'

interface MarketConfig {
    priceSourceType: PriceSourceType
    symbol: string
}

export const MarketConfigs: Record<string, MarketConfig> = {
    BTC: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'BTCUSDT',
    },
    ETH: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'ETHUSDT',
    },
    SOL: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'SOLUSDT',
    },
    BNB: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'BNBUSDT',
    },
    LINK: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'LINKUSDT',
    },
    MKR: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'MKRUSDT',
    },
    PENDLE: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'PENDLEUSDT',
    },
    JUP: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'JUPUSDT',
    },
    PERP: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'PERPUSDT',
    },
    GMX: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'GMXUSDT',
    },
    PEPE: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'PEPEUSDT',
    },
    WIF: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'WIFUSDT',
    },
    DOGE: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'DOGEUSDT',
    },
    stETH: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'steth',
    },
    rETH: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'rocket-pool-eth',
    },
    INF: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'sanctum-infinity',
    },
    JitoSOL: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'jito-staked-sol',
    },
    MOCA: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'mocaverse',
    },
    ATH: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'aethir',
    },
    MERL: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'merlin-chain',
    },
    ZEUS: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'zeus-network',
    },
    BEND: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'bend-dao',
    },
    GENE: {
        priceSourceType: PriceSourceType.CMC,
        symbol: 'genopets',
    },
    '2330': {
        priceSourceType: PriceSourceType.YAHOO,
        symbol: '2330.TW',
    },
    '2454': {
        priceSourceType: PriceSourceType.YAHOO,
        symbol: '2454.TW',
    },
    '0050': {
        priceSourceType: PriceSourceType.YAHOO,
        symbol: '0050.TW',
    },
    // TODO: PURR in coingecko
}
