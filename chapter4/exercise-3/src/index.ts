type Reservation = {
    price: number
}

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
    (destination: string): Reservation
}

let reserve: Reserve = (
    fromOrDestination: Date | string, 
    toOrDestination?: Date | string,
    destination?: string
) => {
    if (
        fromOrDestination instanceof Date
        && toOrDestination instanceof Date
        && destination !== undefined    
    ) {
        // Book a one-way trip
        return {
            price: 100
        }
    } else if (typeof toOrDestination === 'string') {
        // Book a round trip
        return {
            price: 200
        }
    } else if (typeof fromOrDestination === 'string') {
        // Book a vacation that starts immediately.
        return {
            price: 1000
        }
    }

    throw new Error('Something went wrong!')
}

