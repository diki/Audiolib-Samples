var PadModel = Backbone.Model.extend({
    
    defaults: {
        sampleURL: "samples/fx1.wav",
        buffer: null
    },

    initialize: function(){
        // AudioDB.open();
        // AudioDB.getSound("0", function(){});
    },

    loadSample: function(url) {

        var sampleID = this.get("sampleID");
        var self = this;

        var sampleBase64 = AudioDB.getSound(sampleID, function(s){
            if(s!==undefined){
                var buffer = Base64.decode(s.src);
                self.set("buffer" , buffer);

                $("body").append('<audio id="sample_'+sampleID+'" src="'+s.src+'" controls="controls"></audio>');

                self.set("existing", true);
                return;
            } else {
                if(url!==undefined){
                    self.set("sampleURL", url);
                }

                var request = new XMLHttpRequest();
                request.open("GET", self.get("sampleURL"), true);
                request.responseType = "arraybuffer";

                var fileReader = new FileReader();
                request.onload = function() {

                    window.audioContext.decodeAudioData(
                        request.response, function(buffer) {

                            //encode wav file to Base64 and save it to IndexedDB
                            var blob = new Blob([new Uint16Array(request.response)], {type: "audio/wav"});
                            fileReader.onload = function(evt){
                                var result = evt.target.result;
                                //write base64 encoded string to AudioDB with sampleID
                                AudioDB.addSound(sampleID, result);
                            }
                            fileReader.readAsDataURL(blob);

                            //set this models buffer
                            self.set("buffer" , buffer);
                            console.log("buffer", buffer);

                            var sb = Base64.encode(buffer);
                            console.log(Base64.decode(sb));
                        }
                    ); 
                }
                request.send();
            }
        });

        
    },

    play: function(){
        // if(this.get("existing")){
        //     var mediaElement = $("#sample_"+this.get("sampleID"))[0];
        //     this.sourceNode = window.audioContext.createMediaElementSource(mediaElement);
        //     this.sourceNode.connect(window.audioContext.destination);
        //     //this.sourceNode.noteOn(0);
        //     return;
        // }
        //One-shot playback of an AudioBuffer
        this.bufferSourceNode = window.audioContext.createBufferSource();
        this.bufferSourceNode.buffer = this.get("buffer");
        this.bufferSourceNode.connect(window.audioContext.destination);
        this.bufferSourceNode.noteOn(0);
    }

});