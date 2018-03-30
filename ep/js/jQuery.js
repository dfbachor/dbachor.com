  //   set image opacity ////

// $("#header h1").css({
// 	padding: 50px;
//     text-align: center;
//     z-index: 2;
//     position: relative;
//     color: #fff;
// })

$("table tr").css("border","2px solid black");

function changeText(text){
	var display = document.getElementById('sale');
	display.innerHTML = "Leftover Equipment up to 50% off!!";
}

function defaultText(text){
	var display = document.getElementById('sale');
	display.innerHTML = "Get 'em before someone else does!!";
}