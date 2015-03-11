import should from 'should';
import {uniq} from 'lodash/array';
import {pluck} from 'lodash/collection';


import {Piece,EMPTY_PIECE,DWARF,TROLL} from '../pieces';
import {Space} from '../spaces';


describe('Pieces', () => {

  it('should be configurable to have limited movement', () => {
    let mock_piece = new Piece('M', 1);
    mock_piece.movement_limit.should.equal(1);

    let mock_board = make_mock_board(5);
    mock_board[2][2] = mock_piece;
    let moves = mock_piece.get_moves(mock_board, new Space('C3'));
    moves.length.should.equal(8);
    let expected_moves = [
      new Space('B2'), new Space('C2'), new Space('D2'), 
      new Space('B3'), new Space('D3'), 
      new Space('B4'), new Space('C4'), new Space('D4'), 
    ];
    assert_moves_equal(expected_moves, moves);
  });

  it('should be configurable to have unbounded movement', () => {
    false.should.be.ok;
  });

  it('should move only within the limits of the board', () => {
    false.should.be.ok;
  });

  it('should move on to valid spaces', () => {
    false.should.be.ok;
  });

  it('should only move through valid spaces', () => {
    false.should.be.ok;
  });

  it('should only move on to empty spaces', () => {
    false.should.be.ok;
  });

  it('should only move through empty spaces', () => {
    false.should.be.ok;
  });

  /*
  describe('TROLL', () => {

    it('should be able to move one space horizontally, vertically and diagonally in both directions', () => {
      let mock_board = make_mock_board(5);
      let troll = new TROLL();
      mock_board[1][1] = troll;
      let troll_moves = troll.get_moves(mock_board, [1, 1]);
      troll_moves.length.should.equal(8);
      let expected_moves = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 2],
        [2, 0], [2, 1], [2, 2],
      ];
      expected_moves.forEach((expected_move) => {
        troll_moves.should.containEql(expected_move);
      });
    });

    it('should not be possible to move outside the board', () => {
      let mock_square_board = make_mock_board(3);
      let troll = new TROLL();
      mock_square_board[0][0] = troll;
      let troll_moves = troll.get_moves(mock_square_board, [0, 0]);
      troll_moves.length.should.equal(3);
      let expected_moves = [[0, 1], [1, 0], [1, 1]];
      expected_moves.forEach((expected_move) => {
        troll_moves.should.containEql(expected_move);
      });

      let mock_diamond_board = make_mock_board(3);
      mock_diamond_board[0][0] = null;
      mock_diamond_board[0][2] = null;
      mock_diamond_board[2][0] = null;
      mock_diamond_board[2][2] = null;
      mock_diamond_board[1][1] = troll;
      troll_moves = troll.get_moves(mock_diamond_board, [1, 1]);
      troll_moves.length.should.equal(4);
      expected_moves = [[0, 1], [1, 0], [1, 2], [2, 1]];
      expected_moves.forEach((expected_move) => {
        troll_moves.should.containEql(expected_move);
      });

    });

    it('should not be possible to move on to another piece', () => {
      let mock_board = make_mock_board(3);
      let troll = new TROLL();
      mock_board[1][1] = troll;
      mock_board[0][0] = new TROLL();
      mock_board[2][2] = new DWARF();

      let troll_moves = troll.get_moves(mock_board, [1, 1]);
      troll_moves.length.should.equal(6);
      let expected_moves = [
        [0, 1], [0, 2],
        [1, 0], [1, 2],
        [2, 0], [2, 1],
      ];
      expected_moves.forEach((expected_move) => {
        troll_moves.should.containEql(expected_move);
      });
    });

    it('should not be possible to move through another piece', () => {
      false.should.be.ok;
    });

    it('should not be possible to move through an empty space', () => {
      false.should.be.ok;
    });

    it('should be possible for a troll to shove another troll', () => {
      false.should.be.ok;
    });

  });
*/
});

let make_mock_board = (size) => {
  let rows = [];
  for (let i=0; i<size; i++) {
    let columns = [];
    for (let j=0; j<size; j++) {
      columns.push(EMPTY_PIECE);
    }
    rows.push(columns);
  }
  return rows;
};


let assert_moves_equal = (expected_moves, moves) => {
  moves.should.be.Array;
  moves.length.should.equal(expected_moves.length);
  expected_move_refs = pluck(expected_moves, 'ref');
  
  let matched_move_refs = [];
  moves.forEach((move) => {
    expected_move_refs.should.containEql(move.ref);
    matched_move_refs.push(move.ref);
  });
  
  let unique_matched_move_refs = uniq(matched_move_refs);
  unique_matched_move_refs.length.should.equal(expected_moves.length);
};