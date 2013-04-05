jQuery(document).ready(function($) {
		
	window.pads = new PadsCollection();
	for(var i=0; i<16; i++){
		pads.add(new PadModel());
	}

	var padsView = new PadsView({
		collection : pads
	});
	// 
});