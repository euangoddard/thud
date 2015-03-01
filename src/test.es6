import should from 'should';

import {Thud,Troll,Dwarf,EMPTY_PIECE,InvalidPositionError,InvalidPieceError} from './thud';


describe('Board', () => {
  describe('Valid spaces', () => {
    let is_invalid_position_error = function (err) {
      return err instanceof InvalidPositionError;
    }

    it('should have 15 columns identified A to P (excluding I)', () => {
      let thud = new Thud();
      thud.get_piece('A8').should.be.ok;
      thud.get_piece('P8').should.be.ok;

      // Invalid column
      should.throws(() => {
        thud.get_piece('Q8');
      }, is_invalid_position_error);

      should.throws(() => {
        thud.get_piece('I8');
      }, is_invalid_position_error);

    });

    it('should have 15 rows identified 1 to 15', () => {
      let thud = new Thud();
      thud.get_piece('H1').should.be.ok;
      thud.get_piece('H15').should.be.ok;

      // Invalid row
      should.throws(() => {
        thud.get_piece('H0');
      }, is_invalid_position_error);

      should.throws(() => {
        thud.get_piece('H16');
      }, is_invalid_position_error);
    });

    it('should be octagonal with 5 squares on the top, bottom and sides and 6 squares on the diagonals', () => {
      let thud = new Thud();

      let expected_valid_squares = [
        'A6', 'A7', 'A8', 'A9', 'A10',
        'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11',
        'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12',
        'D3', 'D4', 'D5', 'D6', 'D7','D8', 'D9', 'D10', 'D11', 'D12', 'D13',
        'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15',
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15',
        'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13', 'G14', 'G15',
        'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'J12', 'J13', 'J14', 'J15',
        'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13', 'K14', 'K15',
        'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14',
        'M3', 'M4', 'M5', 'M6', 'M7','M8', 'M9', 'M10', 'M11', 'M12', 'M13',
        'N4', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'N11', 'N12',
        'O5', 'O6', 'O7', 'O8', 'O9', 'O10', 'O11',
        'P6', 'P7', 'P8', 'P9', 'P10',
      ];

      expected_valid_squares.forEach((piece_ref) => {
        thud.get_piece(piece_ref).should.be.ok;
      });

      let expected_invalid_squares = [
        'A1', 'A2', 'A3', 'A4', 'A5', 'A11', 'A12', 'A13', 'A14', 'A15',
        'B1', 'B2', 'B3', 'B4', 'B12', 'B13', 'B14', 'B15',
        'C1', 'C2', 'C3', 'C13', 'C14', 'C15',
        'D1', 'D2', 'D14', 'D15',
        'E1', 'E15',
        'L1', 'L15',
        'M1', 'M2', 'M14', 'M15',
        'N1', 'N2', 'N3', 'N13', 'N14', 'N15',
        'O1', 'O2', 'O3', 'O4', 'O12', 'O13', 'O14', 'O15',
        'P1', 'P2', 'P3', 'P4', 'P5', 'P11', 'P12', 'P13', 'P14', 'P15',
      ];

      expected_invalid_squares.forEach((piece_ref) => {
        should.throws(() => {
          thud.get_piece(piece_ref);
        }, is_invalid_position_error, piece_ref);
      });

    });

    it('should have the Thud stone at the centre', () => {
      let thud = new Thud();
      should.throws(() => {
        thud.get_piece('H8');
      }, is_invalid_position_error);
    });
  });

  describe('Initial board layout', () => {

    it('should have dwarves around the edges', () => {
      let initial_dwarf_positions = [
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
      let thud = new Thud();
      initial_dwarf_positions.forEach((position) => {
        thud.get_piece(position).should.be.instanceof(Dwarf, position);
      });
    });

    it('should have trolls around the Thud stone', () => {
      let initial_troll_positions = ['G7', 'G8', 'G9', 'H7', 'H9', 'J7', 'J8', 'J9'];
      let thud = new Thud();
      initial_troll_positions.forEach((position) => {
        thud.get_piece(position).should.be.instanceof(Troll, position);
      });
    });

    it('should have empty squares everwhere else', () => {
      let initial_empty_positions = [
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
      let thud = new Thud();
      initial_empty_positions.forEach((position) => {
        thud.get_piece(position).should.equal(EMPTY_PIECE, position);
      });

    });
  });

  describe('Board representation', () => {
    it('should be representable as a matrix', () => {
      let thud = new Thud();
      thud.board.should.be.Array;
      thud.board.length.should.equal(15);

      thud.board.forEach((line) => {
        line.should.be.Array;
        line.length.should.equal(15);
      });

      thud.board[0][5].should.be.instanceof(Dwarf);

      thud.board[6][6].should.be.instanceof(Troll);

      thud.board[0][7].should.equal(EMPTY_PIECE);

      (typeof thud.board[0][0]).should.equal(typeof null);

    });

    it('should be representable as a string for debugging purposes', () => {
      let thud = new Thud();
      let expected_debug_output =
      '    A B C D E F G H J K L M N O P\n\
--+------------------------------\n\
1 |           D D _ D D          \n\
2 |         D _ _ _ _ _ D        \n\
3 |       D _ _ _ _ _ _ _ D      \n\
4 |     D _ _ _ _ _ _ _ _ _ D    \n\
5 |   D _ _ _ _ _ _ _ _ _ _ _ D  \n\
6 | D _ _ _ _ _ _ _ _ _ _ _ _ _ D\n\
7 | D _ _ _ _ _ T T T _ _ _ _ _ D\n\
8 | _ _ _ _ _ _ T   T _ _ _ _ _ _\n\
9 | D _ _ _ _ _ T T T _ _ _ _ _ D\n\
10| D _ _ _ _ _ _ _ _ _ _ _ _ _ D\n\
11|   D _ _ _ _ _ _ _ _ _ _ _ D  \n\
12|     D _ _ _ _ _ _ _ _ _ D    \n\
13|       D _ _ _ _ _ _ _ D      \n\
14|         D _ _ _ _ _ D        \n\
15|           D D _ D D          '
      thud.debug().should.equal(expected_debug_output);
    });
  });
});


var make_mock_board = function (size) {
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


describe('Moves', () => {
  describe('Troll movement', () => {

    it('should be able to move one space horizontally, vertically and diagonally in both directions', () => {
      let mock_board = make_mock_board(5);
      let troll = new Troll();
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

    it('should not be able to move outside the board', () => {
      let mock_board = make_mock_board(3);
      let troll = new Troll();
      mock_board[0][0] = troll;
      let troll_moves = troll.get_moves(mock_board, [0, 0]);
      troll_moves.length.should.equal(3);
      let expected_moves = [[0, 1], [1, 0], [1, 1]];
      expected_moves.forEach((expected_move) => {
        troll_moves.should.containEql(expected_move);
      });
    });

    it('should not be able to on to another piece', () => {
      let mock_board = make_mock_board(3);
      let troll = new Troll();
      mock_board[1][1] = troll;
      mock_board[0][0] = new Troll();
      mock_board[2][2] = new Dwarf();

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

  });
});
