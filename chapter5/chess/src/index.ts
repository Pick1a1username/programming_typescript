// 
type Color = 'Black' | 'White'

//
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'

//
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // (1)


// A set of coordinates for a piece
class Position {
    constructor(
        private file: File, // (2)
        private rank: Rank
    ) {}

    distanceFrom(position: Position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        }
    }
}

// A chess piece
abstract class Piece {
    protected position: Position // (3)

    constructor(
        private readonly color: Color, // (4)
        file: File,
        rank: Rank,
    ) {
        this.position = new Position(file, rank)
    }

    moveTo(position: Position) {
        this.position = position
    }

    abstract canMoveTo(position: Position): boolean
}




// Represents a chess game
class Game {
    private pieces = Game.makePieces()

    private static makePieces() {
        return [

            // Kings
            new King('White', 'E', 1),
            new King('Black', 'E', 8),

            // Queens
            new Queen('White', 'D', 1),
            new Queen('Black', 'D', 8),

            // Bishops
            new Bishop('White', 'C', 1),
            new Bishop('White', 'F', 1),
            new Bishop('Black', 'C', 1),
            new Bishop('Black', 'F', 1),

        ]
    }
}

// Six types of pieces
class King extends Piece {
    canMoveTo(position: Position) {
        let distance = this.position.distanceFrom(position)

        return distance.rank < 2 && distance.file < 2
    }
}

class Queen extends Piece {}
class Bishop extends Piece {}
class Knight extends Piece {}
class Rook extends Piece {}
class Pawn extends Piece {}


