/**
 * Implement a small typesafe assertion library, is.
 * Start by sketching out your types.
 */

// function is<T>(left: T, right: T): boolean {
//     if ( left === right ) {
//         return true
//     } else {
//         return false
//     }
// }


function is<T>(...args: T[]): boolean {
    if ( args.length < 2 ) throw new Error('At least two arguments required!')

    // Get the first element in the Array.
    let first = args[0]

    let filtered = args.filter( (value) => value === first )

    if ( args.length === filtered.length ) {
        return true
    } else {
        return false
    }
}

/**
 *  When you're done, you should be able to use it like this:
 */

// Compare a string and a string
console.log(is('string', 'otherstring')) // false 

// Compare a boolean and a boolean
console.log(is(true, false)) // false

// Compare a number and a number
console.log(is(42, 42)) // true

// Comparing two different types should give a compile-time error
// is(10, 'foo') // Error

// [Hard] I should be able to pass any number of arguments
console.log(is([1], [1, 2], [1, 2, 3])) // false