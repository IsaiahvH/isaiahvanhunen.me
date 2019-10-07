$(document).ready(function() {
	$("#headSVG").on("load", function(){
		var SVGRoot  = this.contentDocument.documentElement;
		
		$(document).mousemove(function(e){
			w = $(window);
			xOff = (e.clientX/w.width()-0.5)*16;
			yOff = (e.clientY/w.height()-0.5)*8;
			$("#leftEye, #rightEye", SVGRoot).attr("transform", "translate("+xOff+" "+yOff+")");
		});
		$(document).mousedown(function(e){
			$("#rightEye", SVGRoot).addClass("blink");
		});
		$(document).mouseup(function(e){
			$("#rightEye", SVGRoot).removeClass("blink");
		});
	});
});