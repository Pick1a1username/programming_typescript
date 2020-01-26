class Animal {}

class Bird extends Animal {
    chirp() {}
}

class Crow extends Bird {
    caw() {}
}

function chirp(bird: Bird): Bird {
    bird.chirp()
    return bird
}

chirp(new Animal)
chirp(new Bird)
chirp(new Crow)

function clone(f: (b: Bird) => Bird): void {
    // ...
}

function birdToBird(b: Bird): Bird {
    // ...
    return new Bird
}

clone(birdToBird)

function birdToCrow(d: Bird): Crow {
    // ...
    return new Crow
}

clone(birdToCrow)

function birdToAnimal(d: Bird): Animal {
    // ...
    return new Animal
}

clone(birdToAnimal)



function animalToBird(a: Animal): Bird {
    // ...
    return new Bird
}

clone(animalToBird)

function crowToBird(c: Crow): Bird {
    // ...
    return new Bird
}

clone(crowToBird)