$(document).ready(function() {
	setTimeout(function(){
		$('input[name=nameField]').focus();
	}, 1500);

	$('input[name=nameField]').keyup(function(e){
		if(e.keyCode == 13){
			$(this).prop("disabled", true).val($(this).val()+".");
			$("#nameFieldHolder").addClass("col-10").removeClass("col-12");
			$("#headSVG").delay(1000).animate({opacity: 1}, 500);
			$("#prefixText").delay(1750).animate({
				'margin-left' : "0%",
				'opacity' : '1',
			}, 500);
			setTimeout(function(){
				$("body").removeClass("bg-dark").addClass("bg-greenish");
			}, 2500);
			$("#greetingResponse").delay(3750).animate({opacity: 1}, 1000);
		}
	});

	$("#talkBtn").click(function(){
		$(this).prop("disabled", true)
		$("#talkResponse1").css('visibility','visible').hide().slideDown();
		$("#talkResponse2").delay(3000).css('visibility','visible').hide().slideDown();
	});
});