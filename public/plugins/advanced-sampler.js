(function myPlugin(){

function initPlugin(audioLib){

(function(audioLib){

    function AdvancedSampler (sampleRate, frequency) {

        this.sampleRate = isNaN(sampleRate) ? this.sampleRate : sampleRate;
        this.frequency  = isNaN(frequency) ? this.frequency : frequency;
        this.sampler    = new audioLib.Sampler(this.sampleRate);
        
        this.delay = new audioLib.Delay(this.sampleRate);
        this.delay.time = 550;
        this.delay.feedback = 0.5;

        this.distortion = new audioLib.Distortion(44100);
        this.distortion.gain = 10.00; 
        this.distortion.master = 10.00;
    }

    AdvancedSampler.prototype = {
        sampler: null,

        sampleRate: 44100,
        frequency: 440,
        phase: 1,
        pitch: 440,
        velocity: 1,

        //delay: audioLib.Delay(this.sampleRate, 550, 0.8),

        getMix: function () {
            //return this.distortion.getMix(ch) + this.delay.getMix(ch);
            return this.sample;
        },


        generate: function () {
            this.sampler.generate();

            this.sample = this.sampler.getMix();

            this.distortion.pushSample(this.sample, 0);
            this.distortion.pushSample(this.sample, 1);
            this.sample += this.distortion.getMix();

            this.delay.pushSample(this.sample, 0);
            this.delay.pushSample(this.sample, 1);
            this.sample = this.delay.getMix();

            // this.reverb.pushSample(this.sample, 0);
            // this.reverb.pushSample(this.sample, 1);
            // this.sample += this.reverb.getMix();
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
