import {range} from 'lodash/utility';
import {intersection} from 'lodash/array';

const THUD_BOARD_SIZE = 15;

const COLUMN_INDICIES_BY_REF = {
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
	F: 5,
	G: 6,
	H: 7,
	J: 8,
	K: 9,
	L: 10,
	M: 11,
	N: 12,
	O: 13,
	P: 14,
};

const VALID_COLUMNS_BY_ROW = [
	[5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9, 10],
	[3, 4, 5, 6, 7, 8, 9, 10, 11],
	[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	[0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	[3, 4, 5, 6, 7, 8, 9, 10, 11],
	[4, 5, 6, 7, 8, 9, 10],
	[5, 6, 7, 8, 9],
];

const INITIAL_DWARF_POSITIONS = [
	'A6', 'A7', 'A9', 'A10',
	'B5', 'B11',
	'C4', 'C12',
	'D3', 'D13',
	'E2', 'E14',
	'F1', 'F15',
	'G1', 'G15',
	'J1', 'J15',
	'K1', 'K15',
	'L2', 'L14',
	'M3', 'M13',
	'N4', 'N12',
	'O5', 'O11',
	'P6', 'P7', 'P9', 'P10',
];

const INITIAL_TROLL_POSITIONS = [
	'G7', 'G8', 'G9',
	'H7', 'H9',
	'J7', 'J8', 'J9',
];

const INITIAL_EMPTY_POSITIONS = [
	'A8',
	'B6', 'B7', 'B8', 'B9', 'B10',
	'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11',
	'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12',
	'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13',
	'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14',
	'G2', 'G3', 'G4', 'G5', 'G6', 'G10', 'G11', 'G12', 'G13', 'G14',
	'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15',
	'J2', 'J3', 'J4', 'J5', 'J6', 'J10', 'J11', 'J12', 'J13', 'J14',
	'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13', 'K14',
	'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13',
	'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12',
	'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'N11',
	'O6', 'O7', 'O8', 'O9', 'O10',
	'P8'
];


export class Thud {
	constructor () {
		this.board = [];
		this.reset();
	}

	reset () {
		this.board = [];
		for (let i=0; i<THUD_BOARD_SIZE; i++) {
			let row = [];
			for (let j=0; j<THUD_BOARD_SIZE; j++) {
				row.push(null);
			}
			this.board.push(row);
		}
		INITIAL_DWARF_POSITIONS.forEach((position) => {
			this.set_piece(position, DWARF);
		});

		INITIAL_TROLL_POSITIONS.forEach((position) => {
			this.set_piece(position, TROLL);
		});
		INITIAL_EMPTY_POSITIONS.forEach((position) => {
			this.set_piece(position, EMPTY_PIECE);
		});
	}

	set_piece (position, piece) {
		/* This should only be called when setting the board up from scratch */
		let [row, column] = this.convert_position_to_coords(position);
		this.board[row][column] = piece;
	}

	get_piece (position) {
		let [row, column] = this.convert_position_to_coords(position);
		let piece = this.board[row][column];
		return piece;
	}

	/* Debug representation */
	debug () {
		let row_outputs = [
			'    A B C D E F G H J K L M N O P',
			'--+------------------------------',
		];
		this.board.forEach((row, row_index) => {
			let padded_index = pad_string(row_index + 1, 2);
			let column_outputs = [`${padded_index}|`];
			row.forEach((piece) => {
				if (piece) {
					column_outputs.push(piece.identfier);
				} else {
					column_outputs.push(' ');
				}
			});
			row_outputs.push(column_outputs.join(' '));
		});
		let board_as_string = row_outputs.join('\n');
		return board_as_string;
	}

	/* Utilities */

	convert_position_to_coords (position) {
		let column_ref = position[0];
		let column = COLUMN_INDICIES_BY_REF[column_ref];
		if (column === undefined) {
			throw new InvalidPositionError(`Column ${column_ref} is invalid`);
		}

		let row_ref = position.slice(1);
		let row = parseInt(row_ref, 10) - 1;

		// Check for the Thud stone
		if (row === 7 && column === 7) {
			throw new InvalidPositionError(`There is no piece at ${position}. The Thurd Stone is there!`);
		}

		// Check the piece is not off the top or side of the board
		if (row < 0 || THUD_BOARD_SIZE < row) {
			throw new InvalidPositionError(`Row ${row_ref} is invalid`);
		}

		// Check the piece is not outside at the corners
		let valid_columns_for_row = VALID_COLUMNS_BY_ROW[row] || [];
		if (valid_columns_for_row.indexOf(column) === -1) {
			throw new InvalidPositionError(`${position} is invalid`);
		}

		return [row, column];
	}

}


// Pieces
export class Piece {
	constructor (identfier, movement_limit) {
		this.identfier = identfier;
		this.movement_limit = movement_limit;
	}

	get_moves (board, position) {
		if (this.movement_limit === 0) {
			throw new ThudError('This piece cannot be moved!');
		}

		let row_count = board.length;
		let column_count = board[0].length;

		let board_rows = range(row_count);
		let board_columns = range(column_count);

		let [position_row, position_column] = position;
		let piece_row_candidates;
		let piece_column_candidates;
		if (this.movement_limit) {
			let piece_row_options = range(
				position_row - this.movement_limit,
				position_row + this.movement_limit + 1
			);
			piece_row_candidates = intersection(board_rows, piece_row_options);

			let piece_column_options = range(
				position_column - this.movement_limit,
				position_column + this.movement_limit + 1
			);
			piece_column_candidates = intersection(board_columns, piece_column_options);
		} else {
			piece_row_candidates = board_rows;
			piece_column_candidates = board_columns;
		}

		let possible_direct_moves = [];
		// Orthogonal moves
		piece_row_candidates.forEach((row_candidate) => {
			if (board[row_candidate][position_column] === EMPTY_PIECE) {
				possible_direct_moves.push([row_candidate, position_column]);
			}
		});

		piece_column_candidates.forEach((column_candidate) => {
			if (board[position_row][column_candidate] === EMPTY_PIECE) {
				possible_direct_moves.push([position_row, column_candidate]);
			}
		});

		// Diagonal moves
		piece_row_candidates.forEach((row_candidate) => {
			piece_column_candidates.forEach((column_candidate) => {
				if (row_candidate === column_candidate && board[row_candidate][column_candidate] === EMPTY_PIECE) {
					possible_direct_moves.push([row_candidate, column_candidate]);
				}
			});
		});

		return possible_direct_moves;
	}
}

export const TROLL = new Piece('T', 1);

export const DWARF = new Piece('D', null);

export const EMPTY_PIECE = new Piece('_', 0);


// Exceptions

class ThudError extends Error {}


export class InvalidPieceError extends ThudError {}

export class InvalidPositionError extends ThudError {}


// Utilities

var pad_string = function (string, width) {
	string += '';
	let padding = '';
	for (let i=string.length; i<width; i++) {
		padding += ' ';
	}
	let output = string + padding;
	return output;
};
