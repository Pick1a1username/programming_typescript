// 1. For each of these values, what type will TypeScript infer?

let a = 1042
let b = 'apples and oranges'
const c = 'pineapples'
let d = [true, true, false]
let e = {type: 'ficus'}
let f = [1, false]
const g = [3]
let h = null

// 2. Why does each of these throw the error it does?
let i: 3 = 3
i = 4

let j = [1, 2, 3]
j.push(4)
j.push('5')

let k: never = 4

let l: unknown = 4
let m = l * 2