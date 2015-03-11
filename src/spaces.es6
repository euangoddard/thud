const COLUMN_REFS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

let COLUMN_INDICIES_BY_REF = {};
COLUMN_REFS.forEach((ref, index) => {
    COLUMN_INDICIES_BY_REF[ref] = index;
});


// Space

export class Space {
    constructor (identfier) {
        if (typeof identfier === 'string') {
            this.ref = identfier;
        } else {
            this.coordinates = identfier;
        }
    }

    get ref () {
        return this._ref;
    }

    set ref (space_reference) {
        this._ref = check_space_reference(space_reference);
    }

    get coordinates () {
        return convert_space_reference_to_coordinates(this.ref);
    }

    set coordinates (value) {
        this.ref = convert_coordinates_to_space_reference(...value);
    }

}


export class SpaceError extends Error {}


let convert_coordinates_to_space_reference = (row, column) => {
    let column_ref = COLUMN_REFS[column];
    let row_ref = row + 1;
    return `${column_ref}${row_ref}`;
};


/*
// Check for the Thud stone
if (row === 7 && column === 7) {
    throw new InvalidPositionError(`There is no piece at ${space_reference}. The Thurd Stone is there!`);
}

// Check the piece is not off the top or side of the board
if (row < 0 || THUD_BOARD_SIZE < row) {
    throw new InvalidPositionError(`Row ${row_ref} is invalid`);
}

// Check the piece is not outside at the corners
let valid_columns_for_row = VALID_COLUMNS_BY_ROW[row] || [];
if (valid_columns_for_row.indexOf(column) === -1) {
    throw new InvalidPositionError(`${space_reference} is invalid`);
}
*/


let check_space_reference = (space_reference) => {
    // Ensure that the reference is good
    convert_space_reference_to_coordinates(space_reference);
    return space_reference;
};


let convert_space_reference_to_coordinates = (space_reference) => {
    let column_ref = space_reference[0];
    let column = COLUMN_INDICIES_BY_REF[column_ref];
    if (column === undefined) {
        throw new SpaceError(`Column ${column_ref} is invalid`);
    }

    let row_ref = space_reference.slice(1);
    let row = parseInt(row_ref, 10) - 1;
    if (row < 0) {
        throw new SpaceError(`Row ${row_ref} is invalid`);
    }

    return [row, column];
};
