/*
PATH is a managed ENTITY for the PAINTER factory.
PATH extends the ENTITY class to provide methods for manipulating and translating to/from an SVG <path> DOM object.
*/

// main class
class Turtle {
	constructor(id) {
		this.id = id;
		this.state = {
 			'path': [],
			'length': 0
		}
	}
	step(spec) {
		//console.log('move event!');
		this.state.path.push(spec);
	}
	pathToString() {
		let final = "";
		this.state.path.forEach((move) => {
			console.log(move);
		});
	}
	toPoints() {
		let direction = 0;
		let pos = [0, 0];
		let points = [];
		let length = 0;

		// calculate absolute position and direction at each step
		points.push([direction,	[pos[0], pos[1]]]); // start 0,0
		this.state.path.forEach((step) => {
			if(typeof(step.turn) != 'undefined') {
				direction = ((direction + step.turn + 8) % 8);
			}
			if(typeof(step.move) != 'undefined') {
				if(direction == 0) {
					pos[1] -= step.move;
				}
				if(direction == 1) {
					pos[0] += step.move;
					pos[1] -= step.move;
				}
				if(direction == 2) {
					pos[0] += step.move;
				}
				if(direction == 3) {
					pos[0] += step.move;
					pos[1] += step.move;
				}
				if(direction == 4) {
					pos[1] += step.move;
				}
				if(direction == 5) {
					pos[0] -= step.move;
					pos[1] += step.move;
				}
				if(direction == 6) {
					pos[0] -= step.move;
				}
				if(direction == 7) {
					pos[0] -= step.move;
					pos[1] -= step.move;
				}
				length += step.move;
			}
			let vector = [pos[0], pos[1]];
			points.push([direction, vector]);
		});
		this.state.length = length;
		return points;
	}
	toMovePoints() {
		let points = this.toPoints();
		let movePoints = [];
		let lastPos = [];
		points.forEach((point) => { // filter points for change in x,y
			if((point[1][0] != lastPos[0]) || (point[1][1] != lastPos[1])) {
				movePoints.push(point);
				lastPos = point[1];
			}
		});
		return movePoints;
	}
	calcPath(points) {
		// translate into line points
		let size = [100, 100];
		let pathString = "M ";
		points.forEach((point) => {
			if(pathString.length > 2) {
				pathString += " L ";
			}
			pathString += (point[1][0] * size[0]) + " " + (point[1][1] * size[1]);
		});
		this.toKeyframe(points);
		return pathString;
	}
	toKeyframe() {
		let points = this.toPoints();
		let frameIncrement = (100 / (points.length));
		let frameArray = [];
		let key = 0;
		frameArray.push([key, 0]); // start
		points.forEach((point) => {
			key += frameIncrement;
			frameArray.push([key, (point[0] * 45)]);
		});
		let transform = {};
		frameArray.forEach((frame) => {
			transform[frame[0] + "%"] = {
				"transform": 'rotate(' + frame[1] + 'deg)'
			}
		});
		return transform;
	}
	toKeySteps() {
		let totalSteps = this.state.path.length;
		//console.log('Total Steps: ' + totalSteps);

		// normalise all steps
		let steps = this.state.path;
		let normalisedSteps = [];
		normalisedSteps.push({ // initial state
			move: 0,
			turn: 0
		});

		// normalised to remain relative move and turn
		steps.forEach((step) => {
			let turn = 0;
			let move = 0;
			if(typeof(step.move) != 'undefined') {
				move = step.move;
			}
			if(typeof(step.turn) != 'undefined') {
				turn = step.turn;
			}
			normalisedSteps.push({
				move,
				turn
			});
		});
		//console.log(normalisedSteps);

		// translate from relative to absolute property definitions
		// issue with diagonals
		// need to rework to be absolute numerical direction [1-8]
		let curTurn = 0;
		let curMove = 0;
		let absoluteSteps = [];
		normalisedSteps.forEach((step) => {
			if(typeof(step.move) != 'undefined') {
				if(Math.abs(curTurn % 2) == 1) { // if moving diagonally - use sqrt(2)
					curMove += (Math.sqrt(2) * Math.abs(step.move));
				} else {
					curMove += Math.abs(step.move); // move along path
				}
			}
			if(typeof(step.turn) != 'undefined') {
				curTurn += step.turn; // current direction
			}
			absoluteSteps.push({
				move: curMove,
				turn: curTurn
			});
		});
		//console.log(absoluteSteps);

		// translate absoluteSteps to frames
		// each step is a transition between 2 frames
		// convert each step directly to a key frame
		let frameIncrement = (100 / (absoluteSteps.length - 1));
		let index1 = 0;
		let index2 = frameIncrement;
		let frameArray = [];
		absoluteSteps.forEach((step) => {
			frameArray.push([
				[
					Number.parseFloat(index1).toFixed(2),
					Number.parseFloat(index2).toFixed(2),
				],
				step
			]);
			index1 += frameIncrement;
			index2 += frameIncrement;
		});

		// calculate moveLength
		let moveLength = curMove;
		let timeline = this.buildTimeline(frameArray, moveLength);

		// output
		//console.log(this.keyFrames(this.id, timeline));
		return timeline;
	}
	testMoveLength() {
		/*
			calculate as
			current move as a percentage of total distance
			totalDistance = 10
			move = 1
			move = 2
			let moveIncrement = 1 / (totalDistance / 2)
		*/
	}
	buildTimeline(frameArray, moveLength) {
		// apply frames to duration // rework
		let timeline = {};
		let offsetDistance = 0;
		//console.log('Moves Length: ' + moveLength);
		//console.log('Frame Length: ' + frameArray.length);
		frameArray.forEach((frame) => {
			//let key = frame[0][0] + '%, ' + frame[0][1] + '%';
			let key = frame[0][0] + '%';
			if(frame[1].move > 0) {
				offsetDistance = (1 / (moveLength / frame[1].move)) * 100;
			}
			timeline[key] = {
				"offset-distance"	: Number.parseFloat(offsetDistance).toFixed(2) + '%',
				"transform"		: 'rotate(' + (frame[1].turn * 45) + 'deg)'
			}
		});
		return timeline;
	}
	keyFrames(key, body) {
		let frameString = "\n@keyframes " + key + " {";
		Object.entries(body).forEach((item) => {
			frameString += "\n\t" + item[0] + ' {';
			frameString += Object.entries(item[1]).reduce((prev, value) => {
				return prev + "\n\t\t" + value[0] + ': ' + value[1] + ';';
			}, "");
			frameString += "\n\t}";
		});
		frameString += "\n}";
		return frameString;
	}
};

// export
export default Turtle;
