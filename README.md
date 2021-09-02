# Crypto Flash Price Feed

Crypto Flash Price Feed is a price feed server to return the current price of cryptocurrencies from CoinMarketCap.
The response is in XML format so we can use it in google sheets with `IMPORTXML`

# install

```bash
npm i
npm run build
```

# run

```bash
npm start
```

# usage

GET http://localhost:3000/BTC

result:

```
<root>49941.44</root>
```

To use it with google sheets:

```
=IMPORTXML("http://hostname:3000/BTC", "/")
```

To add more cryptocurrencies, update `/src/market.ts`.
