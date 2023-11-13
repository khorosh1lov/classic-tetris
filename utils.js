export const GAME_FIELD_ROWS = 20;
export const GAME_FIELD_COLUMNS = 10;
export const TETROMINO_NAMES = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
export const TETROMINOES = {
	'I': [
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	'J': [
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0],
	],
    'L': [
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0],
	],
    'O': [
		[1, 1],
		[1, 1],
	],
	'S': [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0],
	],
	'Z': [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0],
	],
	'T': [
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0],
	],
};

export function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export function convertPosToIndex(row, column) {
	return row * GAME_FIELD_COLUMNS + column;
}

export function rotateMatrix(matrix) {
	const N = matrix.length;
	const rotatedMatrix = [];

	for (let i = 0; i < N; i++) {
		rotatedMatrix[i] = [];

		for (let j = 0; j < N; j++) {
			rotatedMatrix[i][j] = matrix[N - j - 1][i];
		}
	}

	return rotatedMatrix;
}