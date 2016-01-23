var calc = document.getElementById("kalkulator");
calc.style.width = "408px";
calc.style.background = "black";
calc.style.padding = "2px";
calc.style.fontSize = "30px";
calc.style.fontFamily = "Arial";
calc.style.verticalAlign = "middle";
calc.style.textAlign = "center";
calc.style.margin = "25px auto";
//calc.innerHTML = "dziala";

document.getElementsByTagName("body")[0].style.background = "brown";

var isLastOperatonSymbol = false;
var isLastValueSymbol = false;
var dotExist = false;
var result = 0;

var lVal = "";
var rVal = "";
var operator = "";

var operators = {
	'+': function(a, b){ return parseFloat(parseFloat(a.replace(',','.'))+parseFloat(b.replace(',','.'))).toFixed(2);},
	'-': function(a, b){ return parseFloat(parseFloat(a.replace(',','.'))-parseFloat(b.replace(',','.'))).toFixed(2);},
	'/': function(a, b){ return parseFloat(parseFloat(a.replace(',','.'))/parseFloat(b.replace(',','.'))).toFixed(2);},
	'*': function(a, b){ return parseFloat(parseFloat(a.replace(',','.'))*parseFloat(b.replace(',','.'))).toFixed(2);}
}

function creteDiv(name, content, isVal, addListeners, floatt, align, bgcolor, textcolor,width, height,fontsize,onmousOverColor){
	if(floatt == -1)	floatt=false;
	if(align == -1)		align="center";
	if(bgcolor == -1)	bgcolor="#bcbec1";
	if(textcolor == -1)	textcolor="black";
	if(width == -1)		width="80px";
	if(height == -1)	height="80px";
	if(fontsize == -1)	fontsize="38px";
	if(onmousOverColor == -1)	onmousOverColor="#d8d9db";

	var div = document.createElement("div");
	div.style.width = width;
	div.style.textAlign = align;
	div.style.height = height;
	div.style.background = bgcolor;
	div.style.fontWeight = "normal";
	div.style.fontSize = fontsize;
	div.style.verticalAlign = "middle";
	div.style.lineHeight = height;
	div.style.display = "inline-block";
	div.style.margin = "0 0 1px 1px";
	div.style.padding = "0 10px 0 10px";
	div.style.color = textcolor;
	div.innerHTML = content;
	div.setAttribute("id",name);

	if(floatt) div.style.cssFloat = "right";
	if(floatt) div.style.margin = "0 2px 1px 1px";
	if(addListeners){
		div.addEventListener("mouseover", function(){
			div.style.background = onmousOverColor;
			div.style.cursor = "pointer";
		}, false);
		div.addEventListener("mouseout", function(){
			div.style.background = bgcolor;
		}, false);
		div.addEventListener("click", function(){
			if(document.getElementById("valCurrentOperation").innerHTML == "error"){
				document.getElementById("valCurrentOperation").innerHTML = "";
			}
			if(content == "," && (!isLastValueSymbol || dotExist)){
				document.getElementById("valCurrentOperation").innerHTML = "error";
				document.getElementById("valResult").innerHTML = "0";
				isLastValueSymbol = true;
				isLastOperatonSymbol = false;
				dotExist = true;
				rVal = "";
				lVal = "";
			}
			else if (isVal && isLastValueSymbol){
				document.getElementById("valCurrentOperation").innerHTML += content;
				if (content == ","){
					dotExist = true;
				}
				if (!isLastOperatonSymbol){
					lVal += content;
				}else{
					rVal += content;
				}
			}else if(isVal && !isLastValueSymbol && !isLastOperatonSymbol){
				document.getElementById("valCurrentOperation").innerHTML = content;
				isLastValueSymbol = true;
				lVal += content;
			}else if(isVal && !isLastValueSymbol && isLastOperatonSymbol){
				document.getElementById("valCurrentOperation").innerHTML = content;
				isLastValueSymbol = true;
				rVal += content;
			}else if(!isVal && !isLastValueSymbol){
				document.getElementById("valCurrentOperation").innerHTML = "error";
				document.getElementById("valResult").innerHTML = "0";
				isLastValueSymbol = false;
				isLastOperatonSymbol = false;
				dotExist = false;
				rVal = "";
				lVal = "";
			}else if(!isVal && isLastValueSymbol && !isLastOperatonSymbol){
				document.getElementById("valResult").innerHTML =document.getElementById("valCurrentOperation").innerHTML;
				document.getElementById("valCurrentOperation").innerHTML = content;
				isLastValueSymbol = false;
				isLastOperatonSymbol = true;
				operator = content;
				dotExist = false;
			}else if(!isVal && isLastValueSymbol && isLastOperatonSymbol){
				document.getElementById("valCurrentOperation").innerHTML = content;
				isLastValueSymbol = false;
				dotExist = false;
				alert("Lewa wartosc: "+lVal+", prawa wartosc: "+rVal+", operator: "+operator);

				var res = operators[operator](lVal,rVal);
				if (res > 99999999999){
					document.getElementById("valResult").innerHTML="Przeciazenie";
				}else{
					document.getElementById("valResult").innerHTML=res;
				}

				rVal = "";
				lVal = "";
				isLastOperatonSymbol = false;

			}

		}, false);
	}


	calc.appendChild(div);
	return div;
}

creteDiv("valResult","0",false,false,-1, "right","#150918","white","383px",-1,"60px","#1a0500");
creteDiv("valCurrentOperation","",false,false,-1, "right","#150918","white", "383px", "40px","16px","#1a0500");
creteDiv("valDiv","/",false,true,true, "center","#d53d38","white",-1,-1,-1,"#f0726e");
var clearDiv = document.createElement("div");
	clearDiv.style.clear = "both";
	calc.appendChild(clearDiv);

creteDiv("val7","7",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("val8","8",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("val9","9",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("valMul","*",false,true,-1, -1,"#d53d38","white",-1,-1,-1,"#f0726e");
creteDiv("val4","4",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("val5","5",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("val6","6",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("valMin","-",false,true,-1, -1, "#d53d38","white",-1,-1,-1,"#f0726e");
creteDiv("val1","1",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("val2","2",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("val3","3",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("valAdd","+",false,true,-1, -1, "#d53d38","white",-1,-1,-1,"#f0726e");
creteDiv("val0","0",true,true, -1, -1, -1,"black","181px",-1,-1,-1,-1);
creteDiv("valDot",",",true,true,-1,-1,-1,-1,-1,-1,-1,-1);
creteDiv("valEq","=",false,true,-1, -1, "#d53d38","white",-1,-1,-1,"#f0726e");











