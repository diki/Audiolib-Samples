(function myPlugin(){

function initPlugin(audioLib){

(function(audioLib){

    function AdvancedSampler (sampleRate, frequency) {

        this.sampleRate = isNaN(sampleRate) ? this.sampleRate : sampleRate;
        this.frequency  = isNaN(frequency) ? this.frequency : frequency;
        this.sampler    = audioLib.Sampler(this.sampleRate);

/*            for ( var prop in audioLib.generators.Sampler.prototype) {
                this[prop] = audioLib.generators.Sampler.prototype[prop];
            }*/
    }

    AdvancedSampler.prototype = {
        sampler: null,

        sampleRate: 44100,
        frequency: 440,
        phase: 1,
        pitch: 440,
        velocity: 1,

        delay: audioLib.Delay(this.sampleRate, 550, 0.9),

        getMix: function (ch) {
            return this.delay.getMix(ch);
        },

        generate: function () {
/*            this.phase += this.frequency / this.sampleRate;
            if (this.phase >= 1) {
                this.sampler.noteOn(this.pitch, this.velocity);
                this.phase %= 1;
            }*/

            this.sampler.generate();

            this.sample = this.sampler.getMix();

            //this.delay.append
            // this.sampler.append(this.delay);
            // // this.sample = this.sampler.getMix();
            this.delay.pushSample(this.sample, 0);
            this.delay.pushSample(this.sample, 1);

            this.ongenerate && this.ongenerate.apply(this, arguments);
            // this.sample += this.delay.getMix() * 0.5;
        }
    };

    audioLib.generators('AdvancedSampler', AdvancedSampler);

    audioLib.AdvancedSampler = audioLib.generators.AdvancedSampler;

}(audioLib));

audioLib.plugins('AdvancedSampler', myPlugin);
}

if (typeof audioLib === 'undefined' && typeof exports !== 'undefined'){
    exports.init = initPlugin;
} else {
    initPlugin(audioLib);
}

}());
