// An existing user that we got from the server
type ExistingUser = {
    id: number
    name: string
}

// A new user that hasn't been saved to the server yet
type NewUser = {
    name: string
}

//
function deleteUser(user: {id?: number, name: string}) {
    delete user.id
}

let existingUser: ExistingUser = {
    id: 123456,
    name: 'Ima User'
}

deleteUser(existingUser)


type LegacyUser = {
    id?: number | string
    name: string
}

let legacyUser: LegacyUser = {
    id: '793331',
    name: 'Xin Yang'
}

deleteUser(legacyUser)