/**
 * FILENAME:    calculator-js.js
 * DESCRIPTION: This is the javascript for codyschindler.com/fcc/calculator.
 * REQS:        jQuery
 * VERISON:     1.0.2
 * UPDATED:     2015-11-16
 * WRITTEN BY:  Cody Schindler (quiksand)
 * ORGANIZATION: n/a
 * CHANGELOG:  
 * 1.0.0 (2015-11-03): Creation
 * 1.0.1 (2015-11-09): Deployment-nevermind
 * 1.0.2 (2015-11-12): Started from scratch on JS. Much cleaner now.
 * 1.0.3 (2015-11-16): Deployment
**/
//TODO: 
//Floating point erros can occur on division and modulo, although most should be rounded out. Should be fixed for other ops.
//Display overflow not handled properly. Want similar results to display:rtl, but that screws up handling of negative numbers. Oh well, time to ship and move on to other projects. 

$(document).ready(function(){
	var displayVar = "";
	var regOne = "";
	var regTwo = "";
	var currentOperator = "";
	var lastKey = 0;

	//performs operations and returns the result
	function regOperate(){
		var result = 0;
		switch(currentOperator){
			case '/':
				result = regOne / regTwo;
				result = Math.round(result * 1000000000) / 1000000000;
				break;

			case 'x':
				var temp1 = 0;
				var temp2 = 0;
				var correctionFactor = 1;
				if((String(regOne).indexOf(".")!= -1)||(String(regTwo).indexOf(".")!= -1)){
					if(String(regOne).indexOf(".") != -1){
						temp1 = String(regOne).length-String(regOne).indexOf(".");
					}
					if(String(regTwo).indexOf(".") != -1){
						temp2 = String(regTwo).length-String(regTwo).indexOf(".");
					}
					correctionFactor = Math.pow(10, Math.max(temp1, temp2));
				}
				result = Number(regOne)*correctionFactor * Number(regTwo)*correctionFactor;
				result /= Math.pow(correctionFactor, 2);
				break;
			case '+':
				var temp1 = 0;
				var temp2 = 0;
				// if(temp1.indexOf)
				var correctionFactor = 1;
				if((String(regOne).indexOf(".")!= -1)||(String(regTwo).indexOf(".")!= -1)){
					if(String(regOne).indexOf(".") != -1){
						temp1 = String(regOne).length-String(regOne).indexOf(".");
					}
					if(String(regTwo).indexOf(".") != -1){
						temp2 = String(regTwo).length-String(regTwo).indexOf(".");
					}
					correctionFactor = Math.pow(10, Math.max(temp1, temp2));
				}
				result = Number(regOne)*correctionFactor + Number(regTwo)*correctionFactor;
				result /= correctionFactor;
				break;
			case '-':
				var temp1 = 0;
				var temp2 = 0;
				var correctionFactor = 1;
				if((String(regOne).indexOf(".")!= -1)||(String(regTwo).indexOf(".")!= -1)){
					if(String(regOne).indexOf(".") != -1){
						temp1 = String(regOne).length-String(regOne).indexOf(".");
					}
					if(String(regTwo).indexOf(".") != -1){
						temp2 = String(regTwo).length-String(regTwo).indexOf(".");
					}
					correctionFactor = Math.pow(10, Math.max(temp1, temp2));
				}
				result = Number(regOne)*correctionFactor - Number(regTwo)*correctionFactor;
				result /= correctionFactor;
				break;
			case '%':
				result = regOne % regTwo;
				result = Math.round(result * 1000000000) / 1000000000;
				break;
			default:
				result = regTwo;
		}
		return result;
	}
	//Display functions just for code clarity
	function displayReg(someArg){
		$(".displayRegister").text(someArg);
	}
	function displayEnt(someArg){
		$(".displayEntry").text(someArg);
	}

	//Function for number clicks and decimals
	$(".num").click(function(){
		//condition for the last key being "=" resets the registers if the next key is a number further ops require an operation to be clicked
		if(lastKey == "="){
			//clear the registers
			//clear the distplays
			//clear current operator?
			regOne = "";
			regTwo = "";
			currentOperator = "";
			displayEnt("0");
			displayReg("");
		}
		regTwo += $(this).text();
		displayEnt(regTwo);
		lastKey = $(this).text();
	}); //num.click()

	$(".operator").click(function(){
		//store regOne in a temp variable since we'll need to display it after regOne has been changed if = was clicked.
		var tempOne = regOne;
		//only perform operations if last key was a number or period
		if($.isNumeric(lastKey)||(lastKey == ".")){
			regTwo = Number(regTwo);
			// regOperate works with the last operator, since the operations are run before the new variable is set
			regOne = regOperate();
		}
		//need two cases: one for equal and one for the rest
		if($(this).text() == "="){
			displayEnt(regOne);
			//further condition for if lastKey was an operation
			if($.isNumeric(lastKey)||(lastKey == ".")){
				displayReg(tempOne + " " + currentOperator + " " + regTwo + " =");
			}
			else{
				displayReg(tempOne + " =");
			}
			currentOperator = "=";
		}
		else{
			displayEnt(0);
			currentOperator = $(this).text();
			displayReg(regOne + " " + currentOperator);
		}
		//clear reg 2 for further numeric entry
		regTwo = "";
		lastKey = $(this).text();
	}); //operator.click()

	$(".sign").click(function(){
		regTwo *= -1;
		displayEnt(regTwo);
	});

	//All Clear clears all registers and returns to original display state
	$(".ac").click(function(){
		regOne = "";
		regTwo = "";
		currentOperator = "";
		displayEnt("0");
		displayReg("");
	}); //ac.click()

	//Clear Entry just clears register two and display entry
	$(".ce").click(function(){
		regTwo = "";
		displayEnt("0");
	}); //ce.click()

	//Function for keyboard entry
	$(document).keypress(function(k){
		switch(k.which){
			case 13:
				$(".equal").trigger("click");
				break;
			case 37:
				$(".modulo").trigger("click");
				break;
			case 42:
				$(".multiplication").trigger("click");
				break;
			case 43:
				$(".plus").trigger("click");
				break;
			case 44:
				$(".sign").trigger("click");
				break;
			case 45:
				$(".minus").trigger("click");
				break;
			case 46:
				$(".period").trigger("click");
				break;
			case 47:
				$(".division").trigger("click");
				break;
			case 48:
				$(".zero").trigger("click");
				break;
			case 49:
				$(".one").trigger("click");
				break;
			case 50:
				$(".two").trigger("click");
				break;
			case 51:
				$(".three").trigger("click");
				break;
			case 52:
				$(".four").trigger("click");
				break;
			case 53:
				$(".five").trigger("click");
				break;
			case 54:
				$(".six").trigger("click");
				break;
			case 55:
				$(".seven").trigger("click");
				break;
			case 56:
				$(".eight").trigger("click");
				break;
			case 57:
				$(".nine").trigger("click");
				break;			
			case 61:
				$(".equal").trigger("click");
				break;
			case 92:
				$(".ce").trigger("click");
				break;
			case 96:
				$(".ac").trigger("click");
				break;
			default:
				break;
		}
		console.log(k.which);
	}); //keypress function

}); //document.load()