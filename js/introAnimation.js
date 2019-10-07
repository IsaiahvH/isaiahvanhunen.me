if(localStorage.getItem("name") != null){
	$("body, .form-label-group > label, .form-label-group input").css("transition", "none");
	introduceMyself(false, localStorage.getItem("name"));
}

$(document).ready(function() {
	setTimeout(function(){
		$('input[name=nameField]:not(:focus)').focus();
	}, 1500);

	if(localStorage.getItem("name") == null){
		$("#headSVG").on("load", function(){
			var svgElem = this;
			$('input[name=nameField]').keyup(function(e){
				if(e.keyCode == 13)
					introduceMyself(svgElem);
			});
		});
	}

	$("#talkBtn").click(function(){
		$(this).prop("disabled", true)
		$("#talkResponse1").css('visibility','visible').hide().slideDown();
		$("#talkResponse2").delay(3000).css('visibility','visible').hide().slideDown();
	});

	$("#resetGreeting").click(function(){
		localStorage.removeItem("name");
		location.reload();
	})
});

function introduceMyself(svgElem, name = false){
	if(svgElem)
		var SVGRoot = svgElem.contentDocument.documentElement;
	if(name){
		$("input[name=nameField]").val(name);
	} else {
		localStorage.setItem("name", $("input[name=nameField]").val());
	}
	$("input[name=nameField]").prop("disabled", true);
	$("#nameFieldHolder").addClass("col-10").removeClass("col-12");

	var TC = name ? 0 : 1;

	// Animate head
	var headDelay = TC*1000;
	$("#headSVG").delay(headDelay).animate({opacity: 1}, TC*500);

	// Animate introduction
	var introDelay = headDelay+TC*750
	$("#prefixText").delay(introDelay).animate({
		'margin-left' : "0%",
		'opacity' : '1',
	}, TC*500);
	$("input[name=nameField]").delay(introDelay+TC*600).queue(function(){
		$(this).val($(this).val()+".").dequeue();
	});

	// Blink
	if(svgElem){
		var blinkDelay = introDelay+TC*1000
		$("#rightEye", SVGRoot).delay(blinkDelay).queue(function(){
			$(this).addClass("blink").dequeue();
		}).delay(350).queue(function(){
			$(this).removeClass("blink").dequeue();
		});
	}

	// Animate body
	var bodyDelay = blinkDelay+TC*1000;
	$("body").delay(bodyDelay).queue(function(){
		$(this).removeClass("bg-dark").addClass("bg-greenish");
	});

	// Animate response
	$("#greetingResponse").delay(bodyDelay + TC*500).animate({opacity: 1}, TC*1000);
	$("#resetGreeting").delay(bodyDelay + TC*1500).queue(function(){
		$(this).css("visibility", "visible").dequeue();
	});
}