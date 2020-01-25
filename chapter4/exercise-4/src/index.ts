type ParamsWithString = [ unknown, string, ...unknown[] ]

function call<T extends ParamsWithString, R>(
    f: (...args: T) => R,
    ...args: T
): unknown {
    return f(...args)
}

function fill(length: number, value: string): string[] {
    return Array.from({length}, () => value)
}

function fillNotString(length: number, value: number): number[] {
    return Array.from({length}, () => value)
}

call(fill, 10, 'a') // evaluates to an array of 10 'a's

let a = call(fill, 10, 'a') //string[]
let b = call(fill, 10) // Error
let c = call(fill, 10, 'a', 'z') // Error

let d = call(fillNotString, 10, 2) // Error