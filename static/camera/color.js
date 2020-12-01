var state = [];
var rotateIdxs_old = null;
var rotateIdxs_new = null;
var stateToFE = null;
var FEToState = null;
var legalMoves = null;

var solveStartState = [];
var solveMoves = [];
var solveMoves_rev = [];
var solveIdx = null;
var solution_text = null;

var faceNames = ["top", "bottom", "left", "right", "back", "front"];
var colorMap = {0: "#ffffff", 1: "#ffff1a", 4: "#0000ff", 5: "#33cc33", 2: "#ff8000",3: "#e60000"};
var colorName = {0: "W", 1: "Y", 4: "B", 5: "G", 2: "O",3: "R"};
var lastMouseX = 0,
  lastMouseY = 0;
var rotX = -30,
  rotY = -30;

var moves = []

function reOrderArray(arr,indecies) {
	var temp = []
	for(var i = 0; i < indecies.length; i++) {
		var index = indecies[i]
		temp.push(arr[index])
	}

	return temp;
}

/*
	Rand int between min (inclusive) and max (exclusive)
*/
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearCube() {
  for (i = 0; i < faceNames.length; i++) {
    var myNode = document.getElementById(faceNames[i]);
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }
}
function setCubMapColors(newState) {
	state = newState
	for(var i=0;i<54;i++){
		var id = "stickers_" + i.toString();
		document.getElementById(id).style["background-color"] = colorMap[Math.floor(newState[i]/9)];
	}
}

function setStickerColors(newState) {
	setCubMapColors(newState);
	state = newState
  clearCube()

  idx = 0
  for (i = 0; i < faceNames.length; i++) {
    for (j = 0; j < 9; j++) {
      var iDiv = document.createElement('div');
      iDiv.className = 'sticker';
      iDiv.style["background-color"] = colorMap[Math.floor(newState[idx]/9)]
      document.getElementById(faceNames[i]).appendChild(iDiv);
      idx = idx + 1
    }
  }
}

function buttonPressed(ev) {
	var face = ''
	var direction = '1'

	if (ev.shiftKey) {
		direction = '-1'
	}
	if (ev.which == 85 || ev.which == 117) {
		face='U'
	} else if (ev.which == 68 || ev.which == 100) {
		face = 'D'
	} else if (ev.which == 76 || ev.which == 108) {
		face = 'L'
	} else if (ev.which == 82 || ev.which == 114) {
		face = 'R'
	} else if (ev.which == 66 || ev.which == 98) {
		face = 'B'
	} else if (ev.which == 70 || ev.which == 102) {
		face = 'F'
	}
	if (face != '') {
		clearSoln();
		moves.push(face + "_" + direction);
		nextState();
	}
}


function enableScroll() {
	document.getElementById("first_state").disabled=false;
	document.getElementById("prev_state").disabled=false;
	document.getElementById("next_state").disabled=false;
	document.getElementById("last_state").disabled=false;
}

function disableScroll() {
	document.getElementById("first_state").blur(); //so keyboard input can work without having to click away from disabled button
	document.getElementById("prev_state").blur();
	document.getElementById("next_state").blur();
	document.getElementById("last_state").blur();

	document.getElementById("first_state").disabled=true;
	document.getElementById("prev_state").disabled=true;
	document.getElementById("next_state").disabled=true;
	document.getElementById("last_state").disabled=true;
}

/*
	Clears solution as well as disables scroll
*/
function clearSoln() {
	solveIdx = 0;
	solveStartState = [];
	solveMoves = [];
	solveMoves_rev = [];
	solution_text = null;
	document.getElementById("solution_text").innerHTML = "Solution:";
	disableScroll();
}

function setSolnText(setColor=true) {
	solution_text_mod = JSON.parse(JSON.stringify(solution_text))
	if (solveIdx >= 0) {
		if (setColor == true) {
			solution_text_mod[solveIdx] = solution_text_mod[solveIdx].bold().fontcolor("blue")
		} else {
			solution_text_mod[solveIdx] = solution_text_mod[solveIdx]
		}
	}
	document.getElementById("solution_text").innerHTML = "Solution: "+ solution_text_mod.join(" ");
}

function enableInput() {
	document.getElementById("verify").disabled=false;
	document.getElementById("solve").disabled=false;
	$(document).on("keypress", buttonPressed);
	//增加涂色按钮的启用


	document.getElementById("redButton").disabled = false;
	document.getElementById("yellowButton").disabled = false;
	document.getElementById("orangeButton").disabled = false;
	document.getElementById("greenButton").disabled = false;
	document.getElementById("whiteButton").disabled = false;
	document.getElementById("blueButton").disabled = false;
	document.getElementById("cancelButton").disabled = false;
	document.getElementById("stickers_0").disabled = false;
	document.getElementById("stickers_1").disabled = false;
	document.getElementById("stickers_2").disabled = false;
	document.getElementById("stickers_3").disabled = false;
	document.getElementById("stickers_4").disabled = false;
	document.getElementById("stickers_5").disabled = false;
	document.getElementById("stickers_6").disabled = false;
	document.getElementById("stickers_7").disabled = false;
	document.getElementById("stickers_8").disabled = false;
	document.getElementById("stickers_9").disabled = false;
	document.getElementById("stickers_10").disabled = false;
	document.getElementById("stickers_11").disabled = false;
	document.getElementById("stickers_12").disabled = false;
	document.getElementById("stickers_13").disabled = false;
	document.getElementById("stickers_14").disabled = false;
	document.getElementById("stickers_15").disabled = false;
	document.getElementById("stickers_16").disabled = false;
	document.getElementById("stickers_17").disabled = false;
	document.getElementById("stickers_18").disabled = false;
	document.getElementById("stickers_19").disabled = false;
	document.getElementById("stickers_20").disabled = false;
	document.getElementById("stickers_21").disabled = false;
	document.getElementById("stickers_22").disabled = false;
	document.getElementById("stickers_23").disabled = false;
	document.getElementById("stickers_24").disabled = false;
	document.getElementById("stickers_25").disabled = false;
	document.getElementById("stickers_26").disabled = false;
	document.getElementById("stickers_27").disabled = false;
	document.getElementById("stickers_28").disabled = false;
	document.getElementById("stickers_29").disabled = false;
	document.getElementById("stickers_30").disabled = false;
	document.getElementById("stickers_31").disabled = false;
	document.getElementById("stickers_32").disabled = false;
	document.getElementById("stickers_33").disabled = false;
	document.getElementById("stickers_34").disabled = false;
	document.getElementById("stickers_35").disabled = false;
	document.getElementById("stickers_36").disabled = false;
	document.getElementById("stickers_37").disabled = false;
	document.getElementById("stickers_38").disabled = false;
	document.getElementById("stickers_39").disabled = false;
	document.getElementById("stickers_40").disabled = false;
	document.getElementById("stickers_41").disabled = false;
	document.getElementById("stickers_42").disabled = false;
	document.getElementById("stickers_43").disabled = false;
	document.getElementById("stickers_44").disabled = false;
	document.getElementById("stickers_45").disabled = false;
	document.getElementById("stickers_46").disabled = false;
	document.getElementById("stickers_47").disabled = false;
	document.getElementById("stickers_48").disabled = false;
	document.getElementById("stickers_49").disabled = false;
	document.getElementById("stickers_50").disabled = false;
	document.getElementById("stickers_51").disabled = false;
	document.getElementById("stickers_52").disabled = false;
	document.getElementById("stickers_53").disabled = false;
}

function disableInput() {
	document.getElementById("verify").disabled=true;
	document.getElementById("solve").disabled=true;
	$(document).off("keypress", buttonPressed);
	//增加涂色按钮的禁用

	document.getElementById("redButton").disabled = true;
	document.getElementById("yellowButton").disabled = true;
	document.getElementById("orangeButton").disabled = true;
	document.getElementById("greenButton").disabled = true;
	document.getElementById("whiteButton").disabled = true;
	document.getElementById("blueButton").disabled = true;
	document.getElementById("cancelButton").disabled = true;
	document.getElementById("stickers_0").disabled = true;
	document.getElementById("stickers_1").disabled = true;
	document.getElementById("stickers_2").disabled = true;
	document.getElementById("stickers_3").disabled = true;
	document.getElementById("stickers_4").disabled = true;
	document.getElementById("stickers_5").disabled = true;
	document.getElementById("stickers_6").disabled = true;
	document.getElementById("stickers_7").disabled = true;
	document.getElementById("stickers_8").disabled = true;
	document.getElementById("stickers_9").disabled = true;
	document.getElementById("stickers_10").disabled = true;
	document.getElementById("stickers_11").disabled = true;
	document.getElementById("stickers_12").disabled = true;
	document.getElementById("stickers_13").disabled = true;
	document.getElementById("stickers_14").disabled = true;
	document.getElementById("stickers_15").disabled = true;
	document.getElementById("stickers_16").disabled = true;
	document.getElementById("stickers_17").disabled = true;
	document.getElementById("stickers_18").disabled = true;
	document.getElementById("stickers_19").disabled = true;
	document.getElementById("stickers_20").disabled = true;
	document.getElementById("stickers_21").disabled = true;
	document.getElementById("stickers_22").disabled = true;
	document.getElementById("stickers_23").disabled = true;
	document.getElementById("stickers_24").disabled = true;
	document.getElementById("stickers_25").disabled = true;
	document.getElementById("stickers_26").disabled = true;
	document.getElementById("stickers_27").disabled = true;
	document.getElementById("stickers_28").disabled = true;
	document.getElementById("stickers_29").disabled = true;
	document.getElementById("stickers_30").disabled = true;
	document.getElementById("stickers_31").disabled = true;
	document.getElementById("stickers_32").disabled = true;
	document.getElementById("stickers_33").disabled = true;
	document.getElementById("stickers_34").disabled = true;
	document.getElementById("stickers_35").disabled = true;
	document.getElementById("stickers_36").disabled = true;
	document.getElementById("stickers_37").disabled = true;
	document.getElementById("stickers_38").disabled = true;
	document.getElementById("stickers_39").disabled = true;
	document.getElementById("stickers_40").disabled = true;
	document.getElementById("stickers_41").disabled = true;
	document.getElementById("stickers_42").disabled = true;
	document.getElementById("stickers_43").disabled = true;
	document.getElementById("stickers_44").disabled = true;
	document.getElementById("stickers_45").disabled = true;
	document.getElementById("stickers_46").disabled = true;
	document.getElementById("stickers_47").disabled = true;
	document.getElementById("stickers_48").disabled = true;
	document.getElementById("stickers_49").disabled = true;
	document.getElementById("stickers_50").disabled = true;
	document.getElementById("stickers_51").disabled = true;
	document.getElementById("stickers_52").disabled = true;
	document.getElementById("stickers_53").disabled = true;
}

//增加涂色部分
var colors=[0,0,0,0,0,0];
var data=["red","yellow","orange","green","white","blue"];
var colorWordToIdx = {"white": 0, "yellow": 1, "orange": 2, "red": 3, "blue": 4, "green": 5};
var buttonColor="";

function colorSelect(ele){
	buttonColor=ele.id;
	colors=[0,0,0,0,0,0];
	switch(buttonColor){
		case "redButton":
			colors[0]=1;
			break;
		case "yellowButton":
			colors[1]=1;
			break;
		case "orangeButton":
			colors[2]=1;
			break;
		case "greenButton":
			colors[3]=1;
			break;
		case "whiteButton":
			colors[4]=1;
			break;
		case "blueButton":
			colors[5]=1;
			break;
		case "cancelButton":
			colors=[0,0,0,0,0,0];
		break;
	}
}

function colorSet(ele){
	var strId = ele.id;
	var tempStickerIdxArr = strId.split('_');
	var tempIdx = parseInt(tempStickerIdxArr[1]);
	var indexSet=-1;
	indexSet=colors.indexOf(1);
	if (indexSet >=0 ){
		var colorValue=data[indexSet];
		var colorIdx = colorWordToIdx[colorValue];
		ele.style.backgroundColor=colorValue;
		state[tempIdx] = 9 * colorIdx;
		setStickerColors(state);
		setState()
	}
}


function setState() {
	var col = "[";
	var W = "[";
	var Y = "[";
	var B = "[";
	var G = "[";
	var O = "[";
	var R = "[";
	// document.getElementById("givenState").value = state;
	if (state.length == 0) 
		state =  [2, 5, 8, 1, 4, 7, 0, 3, 6, 11, 14, 17, 10, 13, 16, 9, 12, 15, 20, 23, 26, 19, 22, 25, 18, 21, 24, 29, 32, 35, 28, 31, 34, 27, 30, 33, 42, 39, 36, 43, 40, 37, 44, 41, 38, 47, 50, 53, 46, 49, 52, 45, 48, 51];
	for(var i=0;i<54;i++) {
		col += colorName[Math.floor(state[i]/9)] + ", ";
		if (i < 9) {
			W += colorName[Math.floor(state[i]/9)] + ", ";
		} else if (i < 18) {
			Y += colorName[Math.floor(state[i]/9)] + ", ";
		} else if (i < 27) {
			O += colorName[Math.floor(state[i]/9)] + ", ";
		} else if (i < 36) {
			R += colorName[Math.floor(state[i]/9)] + ", ";
		} else if (i < 45) {
			B += colorName[Math.floor(state[i]/9)] + ", ";
		} else if (i < 54) {
			G += colorName[Math.floor(state[i]/9)] + ", ";
		}
	}
	col = col.substring(0, col.length - 2);
	W = W.substring(0, W.length - 2);
	Y = Y.substring(0, Y.length - 2);
	B = B.substring(0, B.length - 2);
	G = G.substring(0, G.length - 2);
	O = O.substring(0, O.length - 2);
	R = R.substring(0, R.length - 2);
	color_output.innerHTML= col + "]";
	verify_str.value ="[" + state.toString() + "]";
	W_output.innerHTML = W + "]";
	Y_output.innerHTML = Y + "]";
	B_output.innerHTML = B + "]";
	G_output.innerHTML = G + "]";
	O_output.innerHTML = O + "]";
	R_output.innerHTML = R + "]";
}
function nextState(moveTimeout=0) {
	if (moves.length > 0) {
		disableInput();
		disableScroll();
		move = moves.shift() // get Move
		
		//convert to python representation
		state_rep = reOrderArray(state,FEToState)
		newState_rep = JSON.parse(JSON.stringify(state_rep))

		//swap stickers
		for (var i = 0; i < rotateIdxs_new[move].length; i++) {
			newState_rep[rotateIdxs_new[move][i]] = state_rep[rotateIdxs_old[move][i]]
		}

		// Change move highlight
		if (moveTimeout != 0){ //check if nextState is used for first_state click, prev_state,etc.
				solveIdx++
				setSolnText(setColor=true)
		}

		//convert back to HTML representation
		newState = reOrderArray(newState_rep,stateToFE)

		//set new state
		setStickerColors(newState)

		//Call again if there are more moves
		if (moves.length > 0) {
			setTimeout(function(){nextState(moveTimeout)}, moveTimeout);
		} else {
			setState()
			enableInput();
			if (solveMoves.length > 0) {
				enableScroll();
				setSolnText();
			}
		}
	} else {
		enableInput();
		if (solveMoves.length > 0) {
			enableScroll();
			setSolnText();
		}
	}
}
// "U_-1", "U_1", "D_-1", "D_1", "L_-1", "L_1", "R_-1", "R_1", "B_-1", "B_1", "F_-1", "F_1"
function changeCube(move) {
	disableInput();
	clearSoln();
	moves.push(legalMoves[move]);
	nextState(0);
}


function solveCube() {
	disableInput();
	clearSoln();
	document.getElementById("solution_text").innerHTML = "SOLVING..."
	$.ajax({
		url: 'http://39.97.212.230:5000/solve',
		data: {"state": JSON.stringify(state)},
		crossDomain: true,
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			solveStartState = JSON.parse(JSON.stringify(state))
			solveMoves = response["moves"];
			solveMoves_rev = response["moves_rev"];
			solution_text = response["solve_text"];
			solution_text.push("SOLVED!")
			setSolnText(true);

			moves = JSON.parse(JSON.stringify(solveMoves))

			setTimeout(function(){nextState(500)}, 500);
		},
		error: function(error) {
				console.log(error);
				// document.getElementById("solution_text").innerHTML = "..."
				// setTimeout(function(){solveCube()}, 500);
		},
	});
}

$( document ).ready($(function() {
	disableInput();
	clearSoln();
	$.ajax({
		url: '/initState',
		data: {},
		type: 'GET',
		dataType: 'json',
		success: function(response) {
			setStickerColors(response["state"]);
			rotateIdxs_old = response["rotateIdxs_old"];
			rotateIdxs_new = response["rotateIdxs_new"];
			stateToFE = response["stateToFE"];
			FEToState = response["FEToState"];
			legalMoves = response["legalMoves"]
			enableInput();
		},
		error: function(error) {
			console.log(error);
		},
	});

	$("#cube").css("transform", "translateZ( -100px) rotateX( " + rotX + "deg) rotateY(" + rotY + "deg)"); //Initial orientation	

	$('#set').click(function() {
		alert("TODO")
	});
// "U_-1", "U_1", "D_-1", "D_1", "L_-1", "L_1", "R_-1", "R_1", "B_-1", "B_1", "F_-1", "F_1"
	$('#U_-1').click(function() {
		changeCube(0);
	});

	$('#U_1').click(function() {
		changeCube(1);
	});
	$('#D_-1').click(function() {
		changeCube(2);
	});

	$('#D_1').click(function() {
		changeCube(3);
	});
	$('#L_-1').click(function() {
		changeCube(4);
	});

	$('#L_1').click(function() {
		changeCube(5);
	});
	$('#R_-1').click(function() {
		changeCube(6);
	});

	$('#R_1').click(function() {
		changeCube(7);
	});
	$('#B_-1').click(function() {
		changeCube(8);
	});

	$('#B_1').click(function() {
		changeCube(9);
	});
	$('#F_-1').click(function() {
		changeCube(10);
	});

	$('#F_1').click(function() {
		changeCube(11);
	});

	$('#solve').click(function() {
		solveCube()
	});

	$('#first_state').click(function() {
		if (solveIdx > 0) {
			moves = solveMoves_rev.slice(0, solveIdx).reverse();
			solveIdx = 0;
			nextState();
		}
	});

	$('#prev_state').click(function() {
		if (solveIdx > 0) {
			solveIdx = solveIdx - 1
			moves.push(solveMoves_rev[solveIdx])
			nextState()
		}
	});

	$('#next_state').click(function() {
		if (solveIdx < solveMoves.length) {
			moves.push(solveMoves[solveIdx])
			solveIdx = solveIdx + 1
			nextState()
		}
	});

	$('#last_state').click(function() {
		if (solveIdx < solveMoves.length) {
			moves = solveMoves.slice(solveIdx, solveMoves.length);
			solveIdx = solveMoves.length
			nextState();
		}
	});

	$('#cube_div').on("mousedown", function(ev) {
		lastMouseX = ev.clientX;
		lastMouseY = ev.clientY;
		$('#cube_div').on("mousemove", mouseMoved);
	});
	$('#cube_div').on("mouseup", function() {
		$('#cube_div').off("mousemove", mouseMoved);
	});
	$('#cube_div').on("mouseleave", function() {
		$('#cube_div').off("mousemove", mouseMoved);
	});
	$('#verify').click(function() {
		var state_verify = JSON.parse(verify_str.value);
		var col = "";
		col += colorName[Math.floor(state_verify[0]/9)];
		col += colorName[Math.floor(state_verify[1]/9)];
		col += colorName[Math.floor(state_verify[2]/9)];
		col += colorName[Math.floor(state_verify[3]/9)];
		col += colorName[Math.floor(state_verify[4]/9)];
		col += colorName[Math.floor(state_verify[5]/9)];
		col += colorName[Math.floor(state_verify[6]/9)];
		col += colorName[Math.floor(state_verify[7]/9)];
		col += colorName[Math.floor(state_verify[8]/9)];
		col += colorName[Math.floor(state_verify[18]/9)];
		col += colorName[Math.floor(state_verify[19]/9)];
		col += colorName[Math.floor(state_verify[20]/9)];
		col += colorName[Math.floor(state_verify[45]/9)];
		col += colorName[Math.floor(state_verify[46]/9)];
		col += colorName[Math.floor(state_verify[47]/9)];
		col += colorName[Math.floor(state_verify[27]/9)];
		col += colorName[Math.floor(state_verify[28]/9)];
		col += colorName[Math.floor(state_verify[29]/9)];
		col += colorName[Math.floor(state_verify[44]/9)];
		col += colorName[Math.floor(state_verify[43]/9)];
		col += colorName[Math.floor(state_verify[42]/9)];
		col += colorName[Math.floor(state_verify[21]/9)];
		col += colorName[Math.floor(state_verify[22]/9)];
		col += colorName[Math.floor(state_verify[23]/9)];
		col += colorName[Math.floor(state_verify[48]/9)];
		col += colorName[Math.floor(state_verify[49]/9)];
		col += colorName[Math.floor(state_verify[50]/9)];
		col += colorName[Math.floor(state_verify[30]/9)];
		col += colorName[Math.floor(state_verify[31]/9)];
		col += colorName[Math.floor(state_verify[32]/9)];
		col += colorName[Math.floor(state_verify[41]/9)];
		col += colorName[Math.floor(state_verify[40]/9)];
		col += colorName[Math.floor(state_verify[39]/9)];
		col += colorName[Math.floor(state_verify[24]/9)];
		col += colorName[Math.floor(state_verify[25]/9)];
		col += colorName[Math.floor(state_verify[26]/9)];
		col += colorName[Math.floor(state_verify[51]/9)];
		col += colorName[Math.floor(state_verify[52]/9)];
		col += colorName[Math.floor(state_verify[53]/9)];
		col += colorName[Math.floor(state_verify[33]/9)];
		col += colorName[Math.floor(state_verify[34]/9)];
		col += colorName[Math.floor(state_verify[35]/9)];
		col += colorName[Math.floor(state_verify[38]/9)];
		col += colorName[Math.floor(state_verify[37]/9)];
		col += colorName[Math.floor(state_verify[36]/9)];
		col += colorName[Math.floor(state_verify[9]/9)];
		col += colorName[Math.floor(state_verify[10]/9)];
		col += colorName[Math.floor(state_verify[11]/9)];
		col += colorName[Math.floor(state_verify[12]/9)];
		col += colorName[Math.floor(state_verify[13]/9)];
		col += colorName[Math.floor(state_verify[14]/9)];
		col += colorName[Math.floor(state_verify[15]/9)];
		col += colorName[Math.floor(state_verify[16]/9)];
		col += colorName[Math.floor(state_verify[17]/9)];
		if (verify_main(col) == 0)
		  alert("verifyed");
		else
		  alert(msgtxt);
		msgtxt = [];
	  });
	console.log( "ready!" );
}));


function mouseMoved(ev) {
  var deltaX = ev.pageX - lastMouseX;
  var deltaY = ev.pageY - lastMouseY;

  lastMouseX = ev.pageX;
  lastMouseY = ev.pageY;

  rotY += deltaX * 0.2;
  rotX -= deltaY * 0.5;

  $("#cube").css("transform", "translateZ( -100px) rotateX( " + rotX + "deg) rotateY(" + rotY + "deg)");
}
