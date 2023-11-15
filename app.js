import { GAME_FIELD_COLUMNS, GAME_FIELD_ROWS, convertPosToIndex } from './utils.js';

import { Tetris } from "./tetris.js";

const tetris = new Tetris();
const cells = document.querySelectorAll('.grid>div');

const drawGameField = () => {
	for (let row = 0; row < GAME_FIELD_ROWS; row++) {
		for (let column = 0; column < GAME_FIELD_COLUMNS; column++) {
			if (!tetris.gameField[row][column]) continue;
			const name = tetris.gameField[row][column];
			const cellIndex = convertPosToIndex(row, column);
			cells[cellIndex].classList.add(name);
		}
	}
}
 
const drawTetromino = () => {
	const name = tetris.tetromino.name;
	const tetrominoMatrixSize = tetris.tetromino.matrix.length;

	for (let row = 0; row < tetrominoMatrixSize; row++) {
		for (let column = 0; column < tetrominoMatrixSize; column++) {
			if (!tetris.tetromino.matrix[row][column]) continue;
			if (tetris.tetromino.row + row < 0) continue;

			const cellIndex = convertPosToIndex(tetris.tetromino.row + row, tetris.tetromino.column + column);
			cells[cellIndex].classList.add(name);
		}
	}
}

const draw = () => {
    cells.forEach(cell => cell.removeAttribute('class'));
	drawGameField();
    drawTetromino();
}

const rotate = () => {
	tetris.rotateTetromino();
	draw();
};

const moveDown = () => {
	tetris.moveTetrominoDown();
    draw();
}

const moveLeft = () => {
	tetris.moveTetrominoLeft();
	draw();
};

const moveRight = () => {
	tetris.moveTetrominoRight();
	draw();
};

const onKeyDown = (event) => {
    switch (event.key) {
		case 'Shift':
			rotate();
			break;
		case 'ArrowDown':
			moveDown();
			break;
		case 'ArrowLeft':
			moveLeft();
			break;
		case 'ArrowRight':
			moveRight();
			break;
		default:
			break;
	}
}

const initKeyDown = () => {
    document.addEventListener('keydown', onKeyDown);
}

initKeyDown();
draw();
