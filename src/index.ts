import http from 'http'
const hostname = '127.0.0.1'
const port = 3000
const COINMARKETCAP_ENDPOINT = 'https://coinmarketcap.com/currencies/'
// marketName to coinmarketcap page
const marketNameToPage = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
}
interface Market {
    name: string
    price: number
}

const markets: { [key: string]: Market } = {}

async function fetchPrice(name: string): Promise<number> {
    console.log(`fetching price of ${name}`)
    // TODO
    return 100
}

async function updateMarkets() {
    for (const name in marketNameToPage) {
        if (!(name in markets)) {
            markets[name] = { name, price: 0 }
        }
        markets[name].price = await fetchPrice(name)
    }
}

function setupServer() {
    const server = http.createServer((req, res) => {
        const marketName = req.url?.substr(1)
        if (!marketName) {
            res.statusCode = 400
            res.end('no market name')
            return
        }
        console.log(`request market ${marketName}`)
        if (!(marketName in markets)) {
            res.statusCode = 404
            res.end('market not found')
            return
        }
        const price = markets[marketName].price
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        console.log(`price: ${price}`)
        res.end(`${price}`)
    })
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })
}

const sleep = (sec: number) => new Promise(res => setTimeout(res, sec * 1000))
async function main() {
    setupServer()
    while (true) {
        await updateMarkets()
        await sleep(5)
    }
}

if (require.main === module) {
    main()
}
