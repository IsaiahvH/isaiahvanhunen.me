$(document).ready(function() {
	$('input[name=nameField]').keyup(function(e){
		if(e.keyCode == 13){
			$(this).prop("disabled", true).val($(this).val()+".");
			$("#nameFieldHolder").delay(1000).addClass("col-10").removeClass("col-12");
			$("#prefixText").delay(1750).animate({
				'margin-left' : "0%",
				'opacity' : '1',
			}, 500);
			$("#greetingResponse").delay(2750).animate({opacity: 1}, 1000);
		}
	});

	$("#talkBtn").click(function(){
		$("#talkResponse").css('visibility','visible').hide().slideDown();
	});
});