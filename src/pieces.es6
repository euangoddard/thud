import {pluck} from 'lodash/collection';

import {Space} from './spaces';


export class Piece {
    constructor (identfier, movement_limit) {
        this.identfier = identfier;
        this.movement_limit = movement_limit;
    }

    get_moves (board, space) {
        if (this.movement_limit === 0) {
            return [];
        }
        let [space_row, space_column] = space.coordinates;

        let valid_spaces = this.get_valid_spaces_for_board(board);

        let possible_direct_moves = [];

        let radius_limit = this.movement_limit || Infinity;
        for (let r=1; r<=radius_limit; r++) {
            let spaces_at_distance = this.get_spaces_at_distance(
                space_row,
                space_column,
                r
            );

            let valid_spaces_at_distance = get_intersecting_spaces(
                valid_spaces,
                spaces_at_distance
            );
            if (valid_spaces_at_distance.length) {
                possible_direct_moves = possible_direct_moves.concat(valid_spaces_at_distance);
            } else {
                break;
            }
        }
        return possible_direct_moves;
    }

    get_spaces_at_distance (x, y, r) {
        let candidate_coordinates = [
            [x + r, y], [x - r, y], // Horizontal
            [x, y + r], [x, y - r], // Vertical
            [x + r, y + r], [x + r, y - r], [x - r, y + r], [x - r, y - r] // Diagonal

        ];
        let candidate_spaces = [];
        candidate_coordinates.forEach((coordinates) => {
            try {
                candidate_spaces.push(new Space(coordinates));
            } catch (e) {
                // must be out of bounds
            }
        });
        return candidate_spaces;
    }

    get_valid_spaces_for_board (board) {
        let valid_spaces = [];
        board.forEach((row, row_index) => {
            row.forEach((space, column_index) => {
                if (space) {
                    valid_spaces.push(new Space([row_index, column_index]));
                }
            });
        });
        return valid_spaces;
    }

}

export const TROLL = new Piece('T', 1);

export const DWARF = new Piece('D', null);

export const EMPTY_PIECE = new Piece('_', 0);


let get_intersecting_spaces = (pool, candidates) => {
    let pool_refs = pluck(pool, 'ref');
    let intersecting_spaces = [];
    candidates.forEach((candidate) => {
        if (pool_refs.indexOf(candidate.ref) !== -1) {
            intersecting_spaces.push(candidate);
        }
    });
    return intersecting_spaces;
};
