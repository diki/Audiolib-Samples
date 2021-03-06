(function myPlugin(){

function initPlugin(audioLib){

(function(audioLib){

function LoopSequencer (sampleRate, tempo, length) {
	this.sampleRate = isNaN(sampleRate) || sampleRate === null ? this.sampleRate : sampleRate;
	this.tempo = isNaN(tempo) || tempo === null ? this.tempo : tempo;
	this.length = isNaN(length) || length === null ? this.length : length;
	this.sequence = [];
}

LoopSequencer.prototype = {
	sampleRate: 44100,
	position: 0,
	length: 4,
	tempo: 120,
	samples: null,
	sequence: null,
	
	generate: function () {

		var	lastPos	= this.position,
			seq	= this.sequence,
			pos, i, e;

		this.position	= pos = (lastPos + 60 / this.tempo / this.sampleRate) % this.length;

		for (i=0; i<seq.length; i++) {
			e = seq[i];
			if ((lastPos > pos && (e.t >= lastPos || pos > e.t)) || (lastPos <= e.t && pos > e.t)) {
				e.c.call(this);
				//distortion.append(e.s.generateBuffer());
			}
		}

		this.ongenerate && this.ongenerate.apply(this, arguments);
	},

	getMix: function () {
		return 0;
	},

	addEvent: function (callback, time) {
		var e = {
			c: callback instanceof Function ? callback : function () {
				callback.sampler.noteOn();
			},
			t: time,
			s: callback
		};

		this.sequence.push(e);

		return e;
	},

	removeEvent: function (e) {
		console.log(this.sequence);
		var i;
		for (i=0; i<this.sequence.length; i++) {
			this.sequence[i].t === e && this.sequence.splice(i--, 1);
		}
	},
};

audioLib.generators('LoopSequencer', LoopSequencer);

audioLib.LoopSequencer = audioLib.generators.LoopSequencer;

}(audioLib));
audioLib.plugins('LoopSequencer', myPlugin);
}

if (typeof audioLib === 'undefined' && typeof exports !== 'undefined'){
	exports.init = initPlugin;
} else {
	initPlugin(audioLib);
}

}());
