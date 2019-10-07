if(localStorage.getItem("name") != null){
	introduceMyself(false, localStorage.getItem("name"));
} else {
	$("#welcomeSection").removeClass("bg-greenish").addClass("hidden bg-dark");
}

$('#fullpage').fullpage({
	licenseKey: "d0m8b1M",
	autoScrolling: true
});

$(document).ready(function() {
	setTimeout(function(){
		$('input[name=nameField]:not(:focus)').focus();
	}, 1500);

	$("#headSVG").on("load", function(){
		$("#loadScreen").css("opacity", "0");
		if(localStorage.getItem("name") == null){
			var svgElem = this;
			$('input[name=nameField]').keyup(function(e){
				if(e.keyCode == 13)
					introduceMyself(svgElem);
			});
		}
	});

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
	$("input[name=nameField]").prop("disabled", true);
	$("#nameFieldHolder").addClass("col-10").removeClass("col-12");
	if(name){
		$("input[name=nameField]").val(name+".");
	} else {
		localStorage.setItem("name", $("input[name=nameField]").val());
		doIntroAnimation(svgElem);
	}
}

function doIntroAnimation(svgElem){
	var SVGRoot = svgElem.contentDocument.documentElement;

	// Animate head
	var headDelay = 1000;
	$("#headSVG").delay(headDelay).animate({opacity: 1}, 500);

	// Animate introduction
	var introDelay = headDelay+750
	$("#prefixText").delay(introDelay).animate({
		'margin-left' : "0%",
		'opacity' : '1',
	}, 500);
	$("input[name=nameField]").delay(introDelay+600).queue(function(){
		$(this).val($(this).val()+".").dequeue();
	});

	// Blink
	if(svgElem){
		var blinkDelay = introDelay+1000
		$("#rightEye", SVGRoot).delay(blinkDelay).queue(function(){
			$(this).addClass("blink").dequeue();
		}).delay(350).queue(function(){
			$(this).removeClass("blink").dequeue();
		});
	}

	// Animate body
	var bodyDelay = blinkDelay+1000;
	$("#welcomeSection").delay(bodyDelay).queue(function(){
		$(this).removeClass("bg-dark").addClass("bg-greenish");
	});

	// Animate response
	$("#greetingResponse").delay(bodyDelay + 500).animate({opacity: 1}, 1000);
	$("#resetGreeting").delay(bodyDelay + 1500).queue(function(){
		$(this).css("visibility", "visible").dequeue();
	});
}