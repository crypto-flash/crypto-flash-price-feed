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
    APE: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'APEUSDT',
    },
    ENA: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'ENAUSDT',
    },
    EIGEN: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'EIGENUSDT',
    },
    OP: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'OPUSDT',
    },
    BANANA: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'BANANAUSDT',
    },
    AAVE: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'AAVEUSDT',
    },
    TAO: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'TAOUSDT',
    },
    PENGU: {
        priceSourceType: PriceSourceType.BINANCE,
        symbol: 'PENGUUSDT',
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
    NEKOCOIN: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'nekocoin-2',
    },
    JLP: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'jupiter-perpetuals-liquidity-provider-token',
    },
    HYPE: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'hyperliquid',
    },
    FLUID: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'instadapp',
    },
    MORPHO: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'morpho',
    },
    ODOS: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'odos',
    },
    VIRTUAL: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'virtual-protocol',
    },
    GRIFFAIN: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'griffain',
    },
    TRUMP: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'official-trump',
    },
    ANON: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'heyanon',
    },
    AIXBT: {
        priceSourceType: PriceSourceType.COIN_GECKO,
        symbol: 'aixbt',
    },
    '006208': {
        priceSourceType: PriceSourceType.YAHOO,
        symbol: '006208.TW',
    },
}
