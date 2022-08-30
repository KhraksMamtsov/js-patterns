'use strict';
function Iterator( items ) {
	this.index = 0;
	this.items = items;
}

Iterator.prototype = {
	getCurrent     : function () {
		return this.items[this.index];
	},
	next       : function () {
		this.index++;
	},
	hasNext    : function () {
		return this.index < this.items.length;
	},
	reset      : function () {
		this.index = 0;
	}
};

var iter = new Iterator('qwe-asd-zxc');

for(iter.reset(); iter.hasNext(); iter.next()){
  console.log(iter.getCurrent());
}