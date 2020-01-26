type Shoe = {
    purpose: string
}


type ShoeWorker = {
    (type: 'balletFlat'): BalletFlat
    (type: 'boot'): Boot
    (type: 'sneaker'): Sneaker
}

type ShoeSeller = {
    create: ShoeWorker
}



class BalletFlat implements Shoe {
    purpose = 'dancing'
}

class Boot implements Shoe {
    purpose = 'woodcutting'
}

class Sneaker implements Shoe {
    purpose = 'walking'
}

// let Shoe = {
//     create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
//         switch (type) {
//             case 'balletFlat': return new BalletFlat
//             case 'boot': return new Boot
//             case 'sneaker': return new Sneaker
//         }
//     }
// }

let Shoe: ShoeSeller = {
    create: (type: 'balletFlat' | 'boot' | 'sneaker') => {
        switch (type) {
            case 'balletFlat': return new BalletFlat
            case 'boot': return new Boot
            case 'sneaker': return new Sneaker
            default: throw new Error("No kind of that shoe available!")
        }
    }
}


Shoe.create('boot')

Shoe.create('balletFlat')