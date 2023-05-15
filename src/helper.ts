export function log(msg: string) {
    console.log(`[${new Date().toISOString()}] ${msg}`)
}

export const sleep = (sec: number) => new Promise(res => setTimeout(res, sec * 1000))
