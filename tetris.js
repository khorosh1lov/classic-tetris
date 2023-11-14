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
		if (!this.isValid()) {
			this.tetromino.row -= 1;
			this.placeTetromino();
		}
	}

	moveTetrominoLeft() {
		this.tetromino.column -= 1;
		if (!this.isValid()) {
			this.tetromino.column += 1;
		}
	}

	moveTetrominoRight() {
		this.tetromino.column += 1;
		if (!this.isValid()) {
			this.tetromino.column -= 1;
		}
	}

	rotateTetromino() {
		const currentMatrix = this.tetromino.matrix;
		const rotatedMatrix = rotateMatrix(this.tetromino.matrix);

		this.tetromino.matrix = rotatedMatrix;

		if (!this.isValid()) {
			this.tetromino.matrix = currentMatrix;
		}
	}

	isValid() {
		const matrixSize = this.tetromino.matrix.length;

		for (let row = 0; row < matrixSize; row++) {
			for (let column = 0; column < matrixSize; column++) {
				if (!this.tetromino.matrix[row][column]) continue;
				if (this.isOutOfBound(row, column)) return false;
			}
		}

		return true;
	}

	isOutOfBound(row, column) {
		return this.tetromino.column + column < 0 ||
			this.tetromino.column + column >= GAME_FIELD_COLUMNS ||
			this.tetromino.row + row >= this.gameField.length;
	}

	placeTetromino() {
		const matrixSize = this.tetromino.matrix.length;

		for (let row = 0; row < matrixSize; row++) {
			for (let column = 0; column < matrixSize; column++) {
				if (!this.tetromino.matrix[row][column]) continue;

				this.gameField[this.tetromino.row + row][this.tetromino.column + column] = this.tetromino.name;
			}
		}

		this.generateTetromino();
	}
}