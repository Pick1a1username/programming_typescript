/**
 * Play around with declaration merging, to:
 * 
 * 1. Reimplement companion objects using namespaces and interfaces,
 *    instead of values and types.
 * 2. Add static methods to an enum.
 */
import { Currency, FromFunction } from './a'


let Currency: {
  DEFAULT: Currency['unit'],
  from: FromFunction
} = {
  DEFAULT: 'USD',
  from(value: number, unit: Currency['unit']): Currency {
      return {unit, value}
  }
}

let amountDue: Currency = {
  unit: 'JPY',
  value: 83733.10
}

let otherAmountDue = Currency.from(330, 'EUR')