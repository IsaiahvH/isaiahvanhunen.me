$(document).ready(function() {
	$("#headSVG").on( "load", function(){
		var svgDoc = this.contentDocument;
		var svgRoot  = svgDoc.documentElement;
		
		$(document).mousemove(function(e){
			w = $(window);
			xOff = (e.clientX/w.width()-0.5)*16;
			yOff = (e.clientY/w.height()-0.5)*8;
			$("#leftEye, #rightEye", svgRoot).attr("transform", "translate("+xOff+" "+yOff+")");
		});
		$(document).mousedown(function(e){
			$("#rightEye", svgRoot).addClass("blink");
		});
		$(document).mouseup(function(e){
			$("#rightEye", svgRoot).removeClass("blink");
		});
	});
});