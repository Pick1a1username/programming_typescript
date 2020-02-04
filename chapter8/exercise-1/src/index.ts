import {readFile} from 'fs'

function promisify<T, U>(f: (x: T) => U): Promise<T> {
    return new Promise((resolve, reject) => {
        f(x, )
    })
}

let readFilePromise = promisify(readFile)

readFilePromise('./myfile.ts')
    .then(result => console.log('success reading file', result.toString()))
    .catch(error => console.error('error reading file', error))
