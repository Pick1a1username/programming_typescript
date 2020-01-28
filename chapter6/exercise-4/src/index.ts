class GlobalCache {
    userId: string

    constructor() {
        this.userId = 'a1b2c3'
    }

    get(typ: string) {
        return this.userId
    }
}

function fetchUser() {
    const globalCache = new GlobalCache()
    userId = globalCache.get('userId')
}

let userId: string = ''

fetchUser()

console.log(userId)
console.log(userId.toUpperCase())

