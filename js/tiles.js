;(function (undefined) {
	let emptyCell = 15;
	let game = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

	const gameArea = document.querySelector("#game");

	gameArea.addEventListener('click', function (e) {
		let target = e.target;

		if(target.classList.contains("game-tile")) {
			let currentCell = target.dataset.cell;
			let diff = Math.abs(currentCell - emptyCell);
			if(diff === 4 || diff === 1 ) {
				target.classList.remove(`game-cell-${currentCell}`);
				target.dataset.cell = emptyCell;
				target.classList.add(`game-cell-${emptyCell}`);
				emptyCell = currentCell;
			}
		}

		if (target.dataset.action === "new") {
			render(suffle(game), gameArea);
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
		
	}

	function render (arr, target) {
		let area = target.querySelector(".game-area");
		clear(area);
		for(let i = 0; i < arr.length; i++) {
			if(arr[i] !== 0) {
				let tile = document.createElement('div');
				tile.dataset.cell = i;
				tile.className = `game-tile game-cell-${i}`;
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
