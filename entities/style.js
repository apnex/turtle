/*
STYLE is a managed ENTITY for the PAINTER factory.
STYLE extends the ENTITY class to provide methods for manipulating and translating to/from an SVG <style> DOM object.
*/
import Entity from './entity.js';

// main class
class Style extends Entity {
	constructor(id, spec, group, enabled = true) {
		super(id, 'style', spec, group, enabled);
		this.update(this.createSpec(id, spec));
	}
	createSpec(id, spec) {
		return {
			"id"	: id
		};
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

		let finalString = "";
		Object.keys(this.state).forEach((item) => {
			finalString += this.keyToString(item);
		});
		finalString += frameString;
		this.string = finalString;
	}
	keyCreate(key, value) {
		this.state[key] = value;
		let finalString = "";
		Object.keys(this.state).forEach((item) => {
			finalString += this.keyToString(item);
		});
		this.string = finalString;
	}
	keyToString(key) {
		let value = this.state[key];
		let string = "\n" + key + ' {' + "\n";
		Object.entries(value).forEach((item) => {
			string += "\t" + item[0] + ': ' + item[1] + ';' + "\n";
		});
		string += '}';
		return string;
	}
	toObject() {
		console.log('Style To Object');
		let body = this.string;

		// extract and build object
		const re = /([\w#-.:]+)\s({[^}]+})/gm;
		let arr = body.matchAll(re);

		// build object
		let final = {};
		for(let result of arr) {
			final[result[1]] = this.parseCss(result[2]);
		}
		return final;
	}
	parseCss(body) {
		// extract and build object
		const re = /([\w#-]+):\s+([^;]+)/gm;
		let arr = body.matchAll(re);

		// build object
		let final = {};
		for(let result of arr) {
			final[result[1]] = result[2];
		}
		return final;
	}
};

// export
export default Style;
