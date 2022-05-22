#!/usr/bin/env node

import Style from './entities/style.js';
import Turtle from './turtle.js';
var turtle = new Turtle('move');

// assemble css
main();

function main() {
	// bassai dai
	kata();

	// string path testing
	//let steps = turtle.toPoints();

	let pathString = turtle.calcPath(turtle.toMovePoints());
	//console.log(pathString);

	let style = new Style('myid', {}, 'blah', true);
	style.keyCreate('svg', {
		"position"	: 'absolute',
		"top"		: '50%',
		"left"		: '50%',
		"transform"	: 'translate(-50%, -50%)'
	});
	style.keyCreate(':root', {
		"--path1"	: '"' + pathString + '"',
		"--line"	: '#bbffbb',
		"--box"		: '#ddddff'
	});
	style.keyCreate('.path1', {
		"d"		: 'path(var(--path1))',
		"stroke"	: 'var(--line)',
		"stroke-width"	: '5px',
		"fill"		: 'none'
	});
	style.keyCreate('#default',  {
		"transform"	: 'translate(-200px, 200px) translate(50%, 50%)'
	});
	style.keyCreate('.ninja-head',  {
		"r"		: '6',
		"fill"		: '#ff8f00',
		"stroke"	: '#ffd54f',
		"stroke-width"	: '2px',
		"fill-opacity"	: '1'
	});
	style.keyCreate('.ninja-body', {
		"rx"		: '2',
		"fill"		: '#ff8f00',
		"stroke"	: '#ffd54f',
		"stroke-width"	: '2px',
		"fill-opacity"	: '1',
		"width"		: '10px',
		"height"	: '10px',
		"transform"	: 'translate(-5px, -25px)'
	});
	style.keyCreate('.cursor', {
		"rx"		: '6',
		"fill"		: '#bbbbff',
		"stroke"	: 'var(--box)',
		"stroke-width"	: '4px',
		"fill-opacity"	: '0.5',
		"width"		: '40px',
		"height"	: '40px',
		"transform"	: 'translate(-20px, -20px)'
	});
	style.keyCreate('.turner', {
		"offset-path"	: 'path(var(--path1))',
		"offset-rotate"	: '0deg',
		"animation"	: 'move 70s linear infinite normal forwards'
	});
	console.log(style.string);

	// output keyframes
	let timeline = turtle.toKeySteps();
	let keyString = turtle.keyFrames('move', timeline);
	console.log(keyString);
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
