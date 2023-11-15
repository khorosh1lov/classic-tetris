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
	}

	generateTetromino() {
		const name = getRandomElement(TETROMINO_NAMES);
		const matrix = TETROMINOES[name];

		const column = GAME_FIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
		const row = 0;

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

		// Adjust the tetromino position if it's out of bounds
		while (!this.isValid()) {
			// If the tetromino is out of the left boundary, shift it to the right
			if (this.isOutOfLeftBound()) {
				this.tetromino.column += 1;
			}
			// If the tetromino is out of the right boundary, shift it to the left
			else if (this.isOutOfRightBound()) {
				this.tetromino.column -= 1;
			} else {
				// If the tetromino cannot be adjusted to fit, revert to the original matrix
				this.tetromino.matrix = currentMatrix;
				break;
			}
		}
	}

	isValid() {
		const matrixSize = this.tetromino.matrix.length;

		for (let row = 0; row < matrixSize; row++) {
			for (let column = 0; column < matrixSize; column++) {
				if (!this.tetromino.matrix[row][column]) continue;
				if (this.isOutOfBound(row, column)) return false;
				if (this.isCollides(row, column)) return false;
			}
		}

		return true;
	}

	isOutOfBound(row, column) {
		return this.tetromino.column + column < 0 || this.tetromino.column + column >= GAME_FIELD_COLUMNS || this.tetromino.row + row >= this.gameField.length;
	}

	isOutOfLeftBound() {
		for (let row = 0; row < this.tetromino.matrix.length; row++) {
			for (let col = 0; col < this.tetromino.matrix[row].length; col++) {
				if (this.tetromino.matrix[row][col] !== 0) {
					if (this.tetromino.column + col < 0) {
						return true;
					}
				}
			}
		}
		return false;
	}

	isOutOfRightBound() {
		for (let row = 0; row < this.tetromino.matrix.length; row++) {
			for (let col = 0; col < this.tetromino.matrix[row].length; col++) {
				if (this.tetromino.matrix[row][col] !== 0) {
					if (this.tetromino.column + col >= GAME_FIELD_COLUMNS) {
						return true;
					}
				}
			}
		}
		return false;
	}

	isCollides(row, column) {
		return this.gameField[this.tetromino.row + row]?.[this.tetromino.column + column];
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