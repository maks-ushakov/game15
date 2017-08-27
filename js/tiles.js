;(function (undefined) {
	let emptyCell = 15;
	let gameStart = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
	let gameState = [];

	const gameArea = document.querySelector("#game");

	gameArea.addEventListener('click', function (e) {
		let target = e.target;

		if(target.classList.contains("game-tile")) {
			let currentCell = target.dataset.cell;
			let diff = Math.abs(currentCell - emptyCell);
			if(diff === 4 || diff === 1 ) {
				change(currentCell, emptyCell, gameState);
				target.dataset.cell = emptyCell;
				emptyCell = currentCell;

				check();
			}
		}

		if (target.dataset.action === "new") {
			gameState = suffle(gameStart);
			render(gameState, gameArea);
		}
	});


	function suffle (arr) {
		let newArr = arr.slice();
		let size = newArr.length;
		for(let i = 0; i < size - 1; i++) {
			let index = i + Math.floor((size - i) * Math.random());
			change(i, index, newArr);
		}
		return newArr;
	}

	function change (firstIndex, secondIndex, arr) {
		let temp = arr[firstIndex];
		arr[firstIndex] = arr[secondIndex];
		arr[secondIndex] = temp;
	}

	function check () {
		let finishFlag = true;
		for(let i = 0; (i < gameState.length - 2) && finishFlag ; i++) {
			finishFlag = (i === (gameState[i] - 1));
		}
		finishFlag &= (gameState[gameState.length-1] === 0);
		if (finishFlag) alert("You have done it!!!")
	}

	function render (arr, target) {
		let area = target.querySelector(".game-area");
		clear(area);
		for(let i = 0; i < arr.length; i++) {
			if(arr[i] !== 0) {
				let tile = document.createElement('div');
				tile.dataset.cell = i;
				tile.className = `game-tile`;
				tile.innerHTML = arr[i];
				area.appendChild(tile);
			} else {
				emptyCell = i;
			}
		}
	}

	function clear (target) {
		target.innerHTML = '';
	} 
	
})();
