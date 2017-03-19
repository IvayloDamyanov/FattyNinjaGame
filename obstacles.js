function createObstacle(options){
    let boxes = [];
	
	let obstacle = {
		spriteSheets: options.spriteSheets,
        spriteSheet: options.spriteSheets[0],
		context: options.context,
		width: options.width,
		height: options.height,
		obstacleCrateYLine: options.obstacleCrateYLine,
		numberOfFrames: options.numberOfFrames,
		loopTicksPerFrame: options.loopTicksPerFrame,
		frameIndex: 0,
		loopTicksCount: 0,
		render: render,
		update: update,
		boxes: boxes,
		spawnBoxHurdle: spawnBoxHurdle,
		iterateBoxesArray: iterateBoxesArray
    };
    
	
	let clearOffset = 0;

    function render(drawCoordinates, clearCoordinates) {
		this.context.clearRect(
			clearCoordinates.x - clearOffset,
			clearCoordinates.y - clearOffset,
			this.width + clearOffset * 2,
			this.height + clearOffset * 2
		);

		this.context.drawImage(
			this.spriteSheet,
			this.frameIndex * this.width,
			0,
			this.width,
			this.height,
			drawCoordinates.x,
			drawCoordinates.y,
			this.width,
			this.height
		);
	}

	function update() {
		this.loopTicksCount += 1;

		if (this.loopTicksCount >= this.loopTicksPerFrame) {
			this.loopTicksCount = 0;
			this.frameIndex += 1;

			if (this.frameIndex >= this.numberOfFrames) {
				this.frameIndex = 0;
			}
		}
	}
	
	function spawnBoxHurdle() {
		var spawnChance = 0.01,
			spawnOffsetX = 200;
		var newBox = createPhysicalBody({
					coordinates: { x: 1000, y: this.obstacleCrateYLine},
					speed: { x: -3, y: 0 },
					height: this.height,
					width: this.width
				});

		if (Math.random() < spawnChance) {
			if (this.boxes.length) {
				if (this.boxes[boxes.length-1].coordinates.x < 700){
					var lastBox = boxes[boxes.length - 1];
					boxes.push(newBox);
				}
			} else {
				boxes.push(newBox);
			}
		}
	}

	function obstacleGarbageCollector(obstacle, index, obstacleArray){
		if (obstacle.coordinates.x < -obstacle.width) {
				obstacleArray.splice(index, 1);
				i -= 1;
				return true;
		}
	}

	function iterateObstaclesArray(){
		for (i = 0; i < this.obstacles.length; i += 1) {

			box = this.obstacles[i];

			if (obstacleGarbageCollector(box, i, this.obstacles)){
				continue;
			}

			let lastObstacleCrateCoordinates = box.move();
			this.render(box.coordinates, lastObstacleCrateCoordinates);
			this.update();

			// if (ninjaPhysicalBody.collidesWith(box.body)) {
			// 	alert("Game over!");
			// }
		}
	}

    return obstacle;
}