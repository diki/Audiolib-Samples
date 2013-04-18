jQuery(document).ready(function($) {
		
	window.pads = new PadsCollection();

    window.audioContext = new webkitAudioContext();

    var samples=["samples/fx1.wav", "samples/fx2.wav" , "samples/fx3.wav", "samples/fx4.wav"];
	for(var i=0; i<16; i++){
        var p = new PadModel({
            friendlyID: i
        });
        // p.set("frendlyID", i);

        p.loadSample(samples[i%4], i);
        //p.loadSample();
		pads.add(p);
	}

	var padsView = new PadsView({
		collection : pads
	});

    window.pm = new PadModel({
       friendlyID: "99" 
    });
	// 
});