export type Currency = {
    unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
    value: number
}

export type FromFunction = ( value: number, unit: Currency['unit'] ): Currency
