(function myPlugin(){

function initPlugin(audioLib){

(function(audioLib){

function MyOsc (sampleRate, frequency) {
    this.sampleRate = isNaN(sampleRate) || sampleRate === null ? this.sampleRate : sampleRate;
    this.frequency = isNaN(frequency) || frequency === null ? this.frequency : frequency;
    
    for ( var prop in audioLib.generators.Oscillator.prototype) {
        this[prop] = audioLib.generators.Oscillator.prototype[prop];
    }
}

MyOsc.prototype = {
    sampleRate: 44100,
    frequency: 440
};

audioLib.generators('MyOsc', MyOsc);

audioLib.MyOsc = audioLib.generators.MyOsc;

}(audioLib));
audioLib.plugins('MyOsc', myPlugin);
}

if (typeof audioLib === 'undefined' && typeof exports !== 'undefined'){
    exports.init = initPlugin;
} else {
    initPlugin(audioLib);
}

}());
