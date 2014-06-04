var score = 0;

$(document).ready(function() {
	//If player is new
	if ($.cookie("score") == undefined) {
		alert("Welcome! It seems that you're new here. Gameplay is simple; just click the gray ring on the spot opposite the white dot as quickly as you can.");
		$.cookie("score", 0, {expires: 365});
	} else {
		$('#highscore').text("Highscore: " + $.cookie("score").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	}
});

$('canvas').click(function(e) {
	var x = e.clientX - $(this).offset().left;
	var y = e.clientY - $(this).offset().top;
	var distFromCent = Math.sqrt(
		Math.pow(x - centX, 2)
		+Math.pow(y - centY, 2)
	);

	var angle = normalize(540 - (
		Math.atan2(
			x - centX,
			y - centY
		)
	) * (
		180 / Math.PI
	));
	
	console.log("Click detected...");
	// console.log("Position: " + x + ", " + y);
	// console.log("Distance from center: " + distFromCent);
	console.log("Angle: " + angle);

	//If click is valid
	if (distFromCent > radius - (stroke / 2) &&
		distFromCent < radius + (stroke / 2)
		) {
		var d = new Date();
		var timeMultiplier = 1000 * (1 / (d.getTime() - drawTime));
		

		console.log("Offset: " + getOffset(angle, targetAngle));
		score += Math.round(timeMultiplier * (getOffset(angle, normalize(targetAngle + 180)) - 90));
		$('#score').text("Score: " + score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

		console.log("Click valid!");
	} else {
		console.log("Click invalid!");
	}

	drawBG();
	targetAngle = drawAntiTarget();
});


//Save highscore
$(window).bind('beforeunload', function() {
	if (score > $.cookie("score")) {
		$.cookie("score", score, {expires: 365});
	}
});

function getOffset(angle1, angle2) {
	var offset;

	if (angle1 > angle2) {
		offset = angle1 - angle2;
	} else {
		offset = angle2 - angle1;
	}

	while (offset > 180) {
		offset = 360 - offset;
	}

	return offset;
}
