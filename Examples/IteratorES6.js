'use strict';
//
class Iterator {//Итератор
	constructor( items ) {
		this.index = 0;
		this.items = items;
	}

	[Symbol.iterator]() {
		return this;
	}

	next() {
		if (this.index < this.items.length){
			return {
				done  : false,
				value : this.items[this.index += 2]
			};
		}
		else {
			return {
				done  : true,
				value : undefined
			};
		}
	}
}

// function* Iterator(items){//Генератор-итератор
// 	for(let i of items){
// 		yield i;
// 	}
// }

let iter = new Iterator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

//console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

for ( let i of iter ) {
	console.log(i);
}

class GeneratorIterator {
	constructor( items ) {
		this.index = 0;
		this.items = items;
	}

	*[Symbol.iterator]() {
		for ( let i = 0; i < this.iterator.length; i++ ) {
			yield i;
		}
	}
}