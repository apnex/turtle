/*
ENTITY is the base class of all managed ENTITY objects for PAINTER.
ENTITY standardises the translation interface.
*/

// main
class Entity {
	constructor(id, kind, spec, group, enabled) {
		this.id = id;
		this.kind = kind;
		this.spec = spec;
		this.group = group;
		this.enabled = enabled;
		this.state = {};
		this.string = "";
	}
	newId() {
		let dec = Math.round(Math.random() * 16777215); // 000000-FFFFFF
		let hex = Number(dec).toString(16).padStart(6, '0');
		return hex;
	}
	update(spec = false) {
		if(spec) {
			Object.assign(this.spec, spec);
		}
	}
}

// export
export default Entity;
