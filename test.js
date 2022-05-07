#!/usr/bin/env node

import Turtle from './turtle.js';
var turtle = new Turtle('move');

init();

// pinan shodan testing
// create a "timeline" object - that returns a keyframe definition
function init() {
	kata();

	// string path testing
	let steps = turtle.toPoints();
	turtle.toKeySteps();

	let pathString = turtle.calcPath(turtle.toMovePoints());
	console.log(pathString);
}

function kata() {
	// bassai dai

	// first sequence
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		turn: -4
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		turn: 4
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: -1
	});
	turtle.step({
		turn: 2
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 0
	});

	// pivot sequence
	turtle.step({
		turn: 2
	});
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		turn: -2
	});
	turtle.step({
		turn: 2
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		turn: 2
	});
	turtle.step({
		move: 0
	});

	// first kiai
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: -1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({ // kiai
		turn: -2
	});
	turtle.step({
		move: 0
	});

	// middle (rear) sequence
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 0
	});

	// circle forward strike
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 0
	});

	// spin to back and complete rear sequence
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({ // morote uke
		move: 0
	});
	turtle.step({
		move: -1
	});
	turtle.step({
		move: 0
	});
	turtle.step({ // morote uke
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: -1
	});
	turtle.step({
		move: 0
	});
	turtle.step({ // morote uke
		move: 1
	});
	turtle.step({
		move: 0
	});

	// final sequence
	turtle.step({
		turn: -6
	});
	turtle.step({
		move: 1
	});
	turtle.step({ // strike
		turn: 2
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		turn: 1
	});
	turtle.step({
		move: 1
	});
	turtle.step({
		move: 0
	});
	turtle.step({
		move: -1
	});
	turtle.step({
		turn: -2
	});
	turtle.step({
		move: -1
	});
	turtle.step({
		move: 0
	});
}
