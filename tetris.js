import {
	GAME_FIELD_COLUMNS,
	GAME_FIELD_ROWS,
	TETROMINOES,
	TETROMINO_NAMES,
	getRandomElement,
	rotateMatrix
} from './utils.js';

export class Tetris {
	constructor() {
		this.gameField;
		this.tetromino;
		this.init();
	}

	init() {
		this.generateGameField();
		this.generateTetromino();
	}

	generateGameField() {
		this.gameField = new Array(GAME_FIELD_ROWS).fill().map(() => new Array(GAME_FIELD_COLUMNS).fill(0));

		//console.table(this.gameField);
	}

	generateTetromino() {
		const name = getRandomElement(TETROMINO_NAMES);
		const matrix = TETROMINOES[name];

		const column = GAME_FIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
		//const row = -2;
		const row = 3;

		this.tetromino = {
			name,
			matrix,
			column,
			row,
		};
	}

	moveTetrominoDown() {
		this.tetromino.row += 1;
	}

	moveTetrominoLeft() {
		this.tetromino.column -= 1;
	}

	moveTetrominoRight() {
		this.tetromino.column += 1;
	}

	rotateTetromino() {
		const rotatedMatrix = rotateMatrix(this.tetromino.matrix);
		this.tetromino.matrix = rotatedMatrix;
	}
}