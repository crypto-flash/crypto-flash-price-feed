# Crypto Flash Price Feed

Crypto Flash Price Feed is a price feed server to return the current price of cryptocurrencies from CoinMarketCap.
The response is in XML format so we can use it in google sheets with `IMPORTXML()`

# Installation

```bash
npm i
npm run build
```

# Run

```bash
npm start
```

# Usage

GET http://localhost:3000/BTC

Result:

```
<root>49941.44</root>
```

To use it with google sheets:

```
=IMPORTXML("http://hostname:3000/BTC", "/")
```

To add more cryptocurrencies, update `src/market.ts`.
