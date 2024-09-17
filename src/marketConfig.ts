import { PriceSourceType } from './price-source/price-source'

export interface MarketConfig {
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
    PURR: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'purr-2',
    },
    stETH: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'staked-ether',
    },
    rETH: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'rocket-pool-eth',
    },
    INF: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'socean-staked-sol',
    },
    JitoSOL: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'jito-staked-sol',
    },
    MOCA: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'mocaverse',
    },
    ATH: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'aethir',
    },
    MERL: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'merlin-chain',
    },
    ZEUS: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'zeus-network',
    },
    BEND: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'benddao',
    },
    GENE: {
        priceSourceType: PriceSourceType.COIN_GECKO,
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
}
