/**
 * Design a way to handle errors for the following API,
 * using one of the patterns from this chapter.
 * In this API, every operation might fail - feel free to update
 * the API's method signatures to allow for failures
 * (or don't, if you prefer). Thiank about how you might perform
 * a sequence of actions while handling errors that come up
 * (e.g., getting the logged-in user's ID, then getting their list of
 * friends, then getting each friend's name)
 */

type User = {
    id: string,
    name: string,
    logged: boolean,
    friends: string[]
}

type UserID = User['id']

class UserNotFoundError extends Error {
    constructor(...params: any[]) {
        super(...params)
        
        this.name = "UserNotFoundError"
    }
}

class IDNotUniqueError extends Error {
    constructor(...params: any[]) {
        super(...params)
        
        this.name = "IDNotUniqueError"
    }
}


class API {
    db: User[]

    constructor() {
        this.db = [
            {
                id: "1",
                name: "Bob",
                logged: true,
                friends: ["2", "4"]    
            },
            {
                id: "2",
                name: "John",
                logged: true,
                friends: ["1", "4"]    
            },
            {
                id: "3",
                name: "Bang",
                logged: false,
                friends: ["1"]    
            },
            {
                id: "4",
                name: "Yamada",
                logged: true,
                friends: ["1", "2"]    
            },
            {
                id: "4",
                name: "やまだ",
                logged: true,
                friends: ["1", "2"]    
            },
        ]
    }

    getLoggedInUser(): UserID[] {
        return this.db
            .filter( _ => _.logged === true )
            .map( _ => _.id )
    }

    getFriendIDs(userID: UserID): UserID[] | UserNotFoundError | IDNotUniqueError {
        let user = this.getUserByID(userID)

        if ( user instanceof UserNotFoundError ) return user
        if ( user instanceof IDNotUniqueError ) return user

        return user.friends
    }

    getUserName(userID: UserID): string | UserNotFoundError | IDNotUniqueError {
        return this.getUserByID(userID).name
    }

    private getUserByID(userID: UserID): User | UserNotFoundError | IDNotUniqueError {
        let users = this.db.filter( _ => _.id === userID )

        if ( users.length < 1 ) return new UserNotFoundError()
        if ( users.length > 1 ) return new IDNotUniqueError()

        return users[0]
    }
}


const api = new API()

console.log(api.getLoggedInUser())
console.log(api.getFriendIDs("1"))
console.log(api.getUserName("4"))
console.log(api.getUserName("5"))


