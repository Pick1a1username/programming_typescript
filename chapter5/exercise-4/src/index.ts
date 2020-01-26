class RequestBuilder {
    private data: object | null = null
    private method: 'get' | 'post' | null = null
    private url: string | null = null
    private response: string | null = null

    setMethod(method: 'get' | 'post'): this {
        this.method = method
        return this
    }

    setData(data: object): this {
        this.data = data
        return this
    }

    setURL(url: string): this {
        this.url = url
        return this
    }

    send(): this {
        this.response = 'responsed'
        return this

    }
}


new RequestBuilder()
    .setURL('/users')
    .setMethod('get')
    .setData({firstName: 'Anna'})
    .send()

new RequestBuilder()
    .send()
