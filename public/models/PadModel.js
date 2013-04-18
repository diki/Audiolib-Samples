var PadModel = Backbone.Model.extend({
    
    defaults: {
        sampleURL: "samples/fx1.wav",
        buffer: null
    },

    initialize: function(options){
        //this.loadSample();
    },

    loadSample: function(url, sampleID) {
        console.log(sampleID);
        var self = this;
        if(url!==undefined){
            this.set("sampleURL", url);
        }

        console.log("calling here: ", this.get("sampleURL"), url);
        var request = new XMLHttpRequest();
        request.open("GET", this.get("sampleURL"), true);
        request.responseType = "arraybuffer";

        request.onload = function() {

            window.audioContext.decodeAudioData(
                request.response, function(buffer) {

                    //set this models buffer
                    self.set("buffer" , buffer);
                    self.set("sampleID", sampleID);

                    //var bufferBase64 = self.base64ArrayBuffer(buffer);
                    var bufferBase64 = bbd.encode(buffer);
                    // var bufferBase64 = ab2str(buffer);
                    console.log(bufferBase64);
                    window.localStorage.setItem(self.get("sampleID"),"bufferBase64");

                    $("#sample").attr("src", "data:audio/wav;base64,"+bufferBase64 );
                    // buffer is now ready!
                }
            ); 
        }
        request.send();
    },

    play: function(){
        //One-shot playback of an AudioBuffer
        this.bufferSourceNode = window.audioContext.createBufferSource();
        this.bufferSourceNode.buffer = this.get("buffer");
        this.bufferSourceNode.connect(window.audioContext.destination);
        this.bufferSourceNode.noteOn(0);
    },

    arrayBufferToBase64: function( buffer ) {
        var binary = ''
        var bytes = new Uint8Array( buffer )
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] )
        }
        return window.btoa( binary );
    },

    base64ArrayBuffer: function(arrayBuffer) {
          var base64    = ''
          var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
         
          var bytes         = new Uint8Array(arrayBuffer)
          var byteLength    = bytes.byteLength
          var byteRemainder = byteLength % 3
          var mainLength    = byteLength - byteRemainder
         
          var a, b, c, d
          var chunk
         
          // Main loop deals with bytes in chunks of 3
          for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
         
            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
            d = chunk & 63               // 63       = 2^6 - 1
         
            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
          }
         
          // Deal with the remaining bytes and padding
          if (byteRemainder == 1) {
            chunk = bytes[mainLength]
         
            a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
         
            // Set the 4 least significant bits to zero
            b = (chunk & 3)   << 4 // 3   = 2^2 - 1
         
            base64 += encodings[a] + encodings[b] + '=='
          } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
         
            a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
         
            // Set the 2 least significant bits to zero
            c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
         
            base64 += encodings[a] + encodings[b] + encodings[c] + '='
          }
          
          return base64
        }

});