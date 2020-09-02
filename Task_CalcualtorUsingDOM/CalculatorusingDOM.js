//\u00F7 and \u00D7 are the unicodes of ÷ and ×. Using them as chars is giving different symbols while using External JS file.
//function to check if the keypress is a digit or '.' and to validate where to and not to add symbols such as +,-,.
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    console.log(charCode);
    var currcont = document.getElementById('textArea').value;
    //Validation if given '=' or 'Enter' from the keyboard.
    if(charCode == 61 || charCode == 13){
        calculateTot();
        return false;
    }
    //Validation if input from keyboard is '.'
    if(charCode == 46){
        //console.log(document.getElementById('textArea').value);
        if(currcont === '0')
            return true;
        if(currcont === '')
            return false;
        if(currcont != '' && (currcont[currcont.length-1] != '+') && (currcont[currcont.length-1] != '-') && (currcont[currcont.length-1] != '\u00F7') && (currcont[currcont.length-1] != '\u00D7') && (currcont[currcont.length-1] != '.')){
            let i;
            for(i=0;i<currcont.length;i++){
                if((currcont[currcont.length-1-i] === '+') || (currcont[currcont.length-1-i] === '-') || (currcont[currcont.length-1-i] === '\u00F7') || (currcont[currcont.length-1-i] === '\u00D7')){
                    return true;
                }
                if((currcont[currcont.length-1-i] === '.'))
                    return false;  
            }
            if(!currcont[currcont.length-1-i])
                return true;
        }
        return false;
    }
    //Validation if input from keyboard is 0
    if(charCode == 48){
        if(currcont === ''){
            return true;
        }
        else{
            if(currcont[currcont.length-1] === '0'){
                for(let i=0;i<currcont.length;i++){
                    if((currcont[currcont.length-1-i] === '+') || (currcont[currcont.length-1-i] === '-') || (currcont[currcont.length-1-i] === '\u00F7') || (currcont[currcont.length-1-i] === '\u00D7')){
                        return false;
                    }
                    console.log(parseInt(currcont[currcont.length-1-i]));
                    if((currcont[currcont.length-1-i] === '.') || parseInt(currcont[currcont.length-1-i])>0){
                        console.log('yes');
                        return true;
                    }
                }
                return false;
            }
            else{
                return true;
            }
        }
    }
    //Validation if input from keyboard is sybols +,-,/,*
    if(charCode == 43 || charCode == 45 || charCode == 47 || charCode == 42 || charCode == 37){
        if(currcont === '' && charCode != 45)
            return false;
        if(currcont === '' && charCode == 45)
            return true;
        if(currcont != '' && (currcont[currcont.length-1] != '+') && (currcont[currcont.length-1] != '-') && (currcont[currcont.length-1] != '\u00F7') && (currcont[currcont.length-1] != '\u00D7') && (currcont[currcont.length-1] != '%') && (currcont[currcont.length-1] != '.')){
            if(charCode == 43 || charCode == 45 || charCode == 37)
                return true;
            else{
                if(charCode == 47){
                    document.getElementById("textArea").value += '\u00F7';
                    return false;
                }
                if(charCode == 42){
                    console.log('\uD83D\uDC04')
                    document.getElementById("textArea").value += '\u00D7';
                    return false;
                }
            }
            
        }
        //Validation if input is a symbol and the current last char is '.'
        if(currcont[currcont.length-1] == '.'){
            let temp = [];
            for(let i=0;i<currcont.length-1;i++){
                temp.push(currcont[i]);
            }
            if(charCode == 43 || charCode == 45 || charCode ==37){
                document.getElementById("textArea").value = temp.join('');
                return true;
            }
            if(charCode == 47){
                document.getElementById("textArea").value = temp.join('') + '\u00F7';
                return false;
            }
            if(charCode == 42){
                document.getElementById("textArea").value = temp.join('') + '\u00D7';
                return false;
            }

        }
    }
    //Validation if anything apart from numbers is entered
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    else{
        //validation to remove unecessary zeroes while entering a non-zero digit
        if(currcont === '0' ){
            document.getElementById("textArea").value = '';
        }
        if((currcont[currcont.length-1] === '0') && (currcont[currcont.length-2] === '+' || currcont[currcont.length-2] === '-' || currcont[currcont.length-2] === '\u00F7' || currcont[currcont.length-2] === '\u00D7')){
            let temp = [];
            for(let i=0;i<currcont.length-1;i++){
                temp.push(currcont[i]);
            }
            document.getElementById("textArea").value = temp.join('');
        }
    }
    return true;
}


//Funciton to add text to texbox through button press      
function addTxt(){
    var targ = event.target || event.srcElement;
    var targCont = targ.textContent||targ.innerText;
    var currCont = document.getElementById("textArea").value;
    //Validation if '=' selected from the buttons
    if(targCont === '='){
        calculateTot();
        document.getElementById("textArea").focus();
        return; // To not go further if '=' is clicked returning the function
    }
    if(targCont === 'CLR'){
        document.getElementById("textArea").value = '';
        document.getElementById("textArea").focus();
    }
    else{
        //Validation for button input of special characters +,-,÷,×
        if(targCont === '+' || targCont === '-' || targCont === '\u00F7' || targCont === '\u00D7' || targCont === 'modulus'){
            if(currCont === '' && targCont === '-')
                document.getElementById("textArea").value += targ.textContent || targ.innerText;
            if(currCont != '' && (currCont[currCont.length-1] != '+') && (currCont[currCont.length-1] != '-') && (currCont[currCont.length-1] != '\u00F7') && (currCont[currCont.length-1] != '\u00D7') &&  (currCont[currCont.length-1] != '%') &&(currCont[currCont.length-1] != '.')){
                if(targCont != 'modulus')
                    document.getElementById("textArea").value += targ.textContent || targ.innerText;
                else
                    document.getElementById("textArea").value += '%'
            }
            //Validation if input is a symbol and the current last char is '.'
            if(currCont[currCont.length-1] == '.'){
                let temp = [];
                for(let i=0;i<currCont.length-1;i++){
                    temp.push(currCont[i]);
                }
                if(targCont != 'modulus')
                    document.getElementById("textArea").value = temp.join('') + targCont;
                else
                    document.getElementById("textArea").value = temp.join('') + '%';
            }
        }
        else{
            //Validation for button input of '.'
            if(targCont === '.'){
                if(currCont === '0'){
                    document.getElementById("textArea").value += targ.textContent || targ.innerText;
                }
                else{
                    if(currCont != '' && (currCont[currCont.length-1] != '+') && (currCont[currCont.length-1] != '-') && (currCont[currCont.length-1] != '\u00F7') && (currCont[currCont.length-1] != '\u00D7') && (currCont[currCont.length-1] != '%') && (currCont[currCont.length-1] != '.')){
                        let i;
                        for(i=0;i<currCont.length;i++){
                            if((currCont[currCont.length-1-i] === '+') || (currCont[currCont.length-1-i] === '-') || (currCont[currCont.length-1-i] === '\u00F7') || (currCont[currCont.length-1-i] === '\u00D7') || (currCont[currCont.length-1-i] === '%')){
                                console.log(currCont[currCont.length-1-i])
                                document.getElementById("textArea").value += targ.textContent || targ.innerText;
                                break;
                            }
                            if((currCont[currCont.length-1-i] === '.'))
                                break;   
                        }
                        if(!currCont[currCont.length-1-i])
                            document.getElementById("textArea").value += targ.textContent || targ.innerText;
                    }
                }
            }
            else{
                //Validation for button input of 0
                if(targCont === '0'){
                    if(currCont === ''){
                        document.getElementById("textArea").value += targ.textContent || targ.innerText;
                    }
                    else{
                        if(currCont[currCont.length-1] === '0'){
                            for(let i=0;i<currCont.length;i++){
                                if((currCont[currCont.length-1-i] === '+') || (currCont[currCont.length-1-i] === '-') || (currCont[currCont.length-1-i] === '\u00F7') || (currCont[currCont.length-1-i] === '\u00D7') || (currCont[currCont.length-1-i] === '%')){
                                    break;
                                }
                                console.log(parseInt(currCont[currCont.length-1-i]));
                                if((currCont[currCont.length-1-i] === '.') || parseInt(currCont[currCont.length-1-i])){
                                    document.getElementById("textArea").value += targ.textContent || targ.innerText;
                                    break;
                                }
                            }
                        }
                        else{
                            document.getElementById("textArea").value += targ.textContent || targ.innerText;
                        }
                    }      
                }
                else{
                    //validation to remove unecessary zeroes while entering a non-zero digit
                    if(currCont === '0' ){
                        document.getElementById("textArea").value = targ.textContent || targ.innerText;
                    }
                    else{
                        if((currCont[currCont.length-1] === '0') && (currCont[currCont.length-2] === '+' || currCont[currCont.length-2] === '-' || currCont[currCont.length-2] === '\u00F7' || currCont[currCont.length-2] === '\u00D7' || currCont[currCont.length-2] === '%')){
                            console.log("going")
                            let temp = [];
                            for(let i=0;i<currCont.length-1;i++){
                                temp.push(currCont[i]);
                            }
                            document.getElementById("textArea").value = temp.join('') + targCont;
                        }
                        else{
                            document.getElementById("textArea").value += targ.textContent || targ.innerText;
                        }
                    }
                }
                
            }
        }
        
        document.getElementById("textArea").focus();
    }
    
}

function calculateTot(){
    //console.log(parseFloat('23+12*2'))
    if(document.getElementById("textArea").value === '')
        return;
    let vals = []; // Array to store all the values to be added at the end of parsing
    let opr = '';  // String storing the operation type
    //let val2 = 0;
    let vartot = 0;
    let opBool = false; //variable to check if the last operator is × or ÷ or %
    let tmpstr = '' // variable to store parsed numeric data with every iteration
    let currCont = document.getElementById("textArea").value;
    for(let i=0;i<currCont.length;i++){
        if(currCont[i] === '+' || currCont[i] === '-' || currCont[i] === '\u00F7' || currCont[i] === '\u00D7' || currCont[i] === '%'){
            if(opBool){
                if(currCont[i] === '+'){
                    vals.push(calc(opr,vals.pop(),parseFloat(tmpstr)));
                    tmpstr = '';
                    opBool = false;
                }
                else{
                    if(currCont[i] === '-'){
                        vals.push(calc(opr,vals.pop(),parseFloat(tmpstr)));
                        tmpstr = '-';
                        opBool = false;
                    }
                    else{
                        if(currCont[i] === '\u00F7'){
                            vals.push(calc(opr,vals.pop(),parseFloat(tmpstr)));
                            tmpstr = '';
                            opBool = true;
                            opr = 'div';
                        }
                        else{
                            if(currCont[i] === '\u00D7'){
                                vals.push(calc(opr,vals.pop(),parseFloat(tmpstr)));
                                tmpstr = '';
                                opBool = true;
                                opr = 'mul';
                            }
                            else{
                                if(currCont[i] === '%'){
                                    vals.push(calc(opr,vals.pop(),parseFloat(tmpstr)));
                                    tmpstr = '';
                                    opBool = true;
                                    opr = 'mod';
                                }
                            }
                        }
                    }
                }
            }
            else{
                if(currCont[i] === '+'){
                    vals.push(parseFloat(tmpstr));
                    tmpstr = '';
                    opBool = false;
                }
                else{
                    if(currCont[i] === '-'){
                        if(i != 0)
                            vals.push(parseFloat(tmpstr));
                        tmpstr = '-';
                        opBool = false;
                    }
                    else{
                        if(currCont[i] === '\u00F7'){
                            vals.push(parseFloat(tmpstr));
                            tmpstr = '';
                            opBool = true;
                            opr = 'div';
                        }
                        else{
                            if(currCont[i] === '\u00D7'){
                                vals.push(parseFloat(tmpstr));
                                tmpstr = '';
                                opBool = true;
                                opr = 'mul';
                            }
                            else{
                                if(currCont[i] === '%'){
                                    vals.push(parseFloat(tmpstr));
                                    tmpstr = '';
                                    opBool = true;
                                    opr = 'mod';
                                }
                            }
                        }
                    }
                }
            }
            
        }
        else{
            tmpstr = tmpstr + currCont[i];
        }
    }
    
    if(currCont[currCont.length-1] === '+' || currCont[currCont.length-1] === '-' || currCont[currCont.length-1] === '\u00F7' || currCont[currCont.length-1] === '\u00D7'){
        for(let i=0;i<vals.length;i++){
            vartot += vals[i];
        }
        vartot = calc(opr,vartot,vartot);
    }
    else{
        if(opBool){
            vals.push(calc(opr,vals.pop(),parseFloat(tmpstr)));
        }
        else{
            vals.push(parseFloat(tmpstr));
        }
        for(let i=0;i<vals.length;i++){
            vartot += vals[i];
        }
    }
    //document.getElementById("textArea").setAttribute('value',val1)
    document.getElementById("textArea").value = vartot;
}

function calc(op,val1,val2){
    if(op === 'add')
        return val1+val2
    if(op === 'sub')
        return val1-val2
    if(op === 'mul')
        return val1*val2
    if(op === 'div')
        return val1/val2
    if(op === 'mod')
        return val1%val2
}

var cont = document.createElement('div');
cont.setAttribute('class','container-fluid');
cont.style.paddingTop = '30px';

var maindiv = document.createElement('div');
maindiv.setAttribute('class','col-4 offset-4')

var textArea = document.createElement("input");
textArea.setAttribute('class','container font-weight-bold overflow-hidden')
textArea.setAttribute('type','text')
textArea.setAttribute('id','textArea');
textArea.setAttribute('onkeypress','return isNumberKey(event)')
textArea.style.textAlign = 'end';
textArea.style.height = '60px'
textArea.style.fontSize = '30px'

var r0 = document.createElement('div');
r0.setAttribute('class','row mt-2');

var r0c1 = document.createElement('div');
r0c1.setAttribute('class','col-sm-6')

var r0c2 = document.createElement('div');
r0c2.setAttribute('class','col-sm-6')

var clrbtn = document.createElement('button');
clrbtn.setAttribute('class','btn btn-danger btn-lg btn-block');
clrbtn.innerHTML = '<h1>CLR<h1>'
//n7.setAttribute('onClick','addToTextArea(event)');
clrbtn.addEventListener('click',addTxt);
r0c1.appendChild(clrbtn);

var smod = document.createElement('div');
smod.setAttribute('class','btn btn-light btn-lg btn-block');
smod.innerHTML = '<h1>modulus<h1>'
smod.addEventListener('click',addTxt);
r0c2.appendChild(smod);

r0.append(r0c1, r0c2);

var r1 = document.createElement('div');
r1.setAttribute('class','row mt-2');

var r1c1 = document.createElement('div');
r1c1.setAttribute('class','col-sm-3');

var r1c2 = document.createElement('div');
r1c2.setAttribute('class','col-sm-3');

var r1c3 = document.createElement('div');
r1c3.setAttribute('class','col-sm-3');

var r1c4 = document.createElement('div');
r1c4.setAttribute('class','col-sm-3');

var n7 = document.createElement('button');
n7.setAttribute('class','btn btn-light btn-lg btn-block');
n7.innerHTML = '<h1>7<h1>'
n7.addEventListener('click',addTxt);
r1c1.appendChild(n7);

var n8 = document.createElement('button');
n8.setAttribute('class','btn btn-light btn-lg btn-block');
n8.innerHTML = '<h1>8<h1>'
n8.addEventListener('click',addTxt);
r1c2.appendChild(n8);

var n9 = document.createElement('button');
n9.setAttribute('class','btn btn-light btn-lg btn-block');
n9.innerHTML = '<h1>9<h1>'
n9.addEventListener('click',addTxt);
r1c3.appendChild(n9);

var sadd = document.createElement('button');
sadd.setAttribute('class','btn btn-light btn-lg btn-block');
sadd.innerHTML = '<h1>+<h1>'
sadd.addEventListener('click',addTxt);
r1c4.appendChild(sadd);

r1.append(r1c1, r1c2, r1c3, r1c4);

var r2 = document.createElement('div');
r2.setAttribute('class','row mt-2');

var r2c1 = document.createElement('div');
r2c1.setAttribute('class','col-sm-3');

var r2c2 = document.createElement('div');
r2c2.setAttribute('class','col-sm-3');

var r2c3 = document.createElement('div');
r2c3.setAttribute('class','col-sm-3');

var r2c4 = document.createElement('div');
r2c4.setAttribute('class','col-sm-3');

var n4 = document.createElement('button');
n4.setAttribute('class','btn btn-light btn-lg btn-block');
n4.innerHTML = '<h1>4<h1>'
n4.addEventListener('click',addTxt);
r2c1.appendChild(n4);

var n5 = document.createElement('button');
n5.setAttribute('class','btn btn-light btn-lg btn-block');
n5.innerHTML = '<h1>5<h1>';
n5.addEventListener('click',addTxt);
r2c2.appendChild(n5);

var n6 = document.createElement('button');
n6.setAttribute('class','btn btn-light btn-lg btn-block');
n6.innerHTML = '<h1>6<h1>'
n6.addEventListener('click',addTxt);
r2c3.appendChild(n6);

var smul = document.createElement('button');
smul.setAttribute('class','btn btn-light btn-lg btn-block');
smul.innerHTML = '<h1>&#215;<h1>'
smul.addEventListener('click',addTxt);
r2c4.appendChild(smul);

r2.append(r2c1, r2c2, r2c3, r2c4);

var r3 = document.createElement('div');
r3.setAttribute('class','row mt-2');

var r3c1 = document.createElement('div');
r3c1.setAttribute('class','col-sm-3');

var r3c2 = document.createElement('div');
r3c2.setAttribute('class','col-sm-3');

var r3c3 = document.createElement('div');
r3c3.setAttribute('class','col-sm-3');

var r3c4 = document.createElement('div');
r3c4.setAttribute('class','col-sm-3');

var n1 = document.createElement('button');
n1.setAttribute('class','btn btn-light btn-lg btn-block');
n1.innerHTML = '<h1>1<h1>'
n1.addEventListener('click',addTxt);
r3c1.appendChild(n1);

var n2 = document.createElement('button');
n2.setAttribute('class','btn btn-light btn-lg btn-block');
n2.innerHTML = '<h1>2<h1>'
n2.addEventListener('click',addTxt);
r3c2.appendChild(n2);

var n3 = document.createElement('button');
n3.setAttribute('class','btn btn-light btn-lg btn-block');
n3.innerHTML = '<h1>3<h1>'
n3.addEventListener('click',addTxt);
r3c3.appendChild(n3);

var ssub = document.createElement('button');
ssub.setAttribute('class','btn btn-light btn-lg btn-block');
ssub.innerHTML = '<h1>-<h1>'
ssub.addEventListener('click',addTxt);
r3c4.appendChild(ssub);

r3.append(r3c1, r3c2, r3c3, r3c4);

var r4 = document.createElement('div');
r4.setAttribute('class','row mt-2');

var r4c1 = document.createElement('div');
r4c1.setAttribute('class','col-sm-3');

var r4c2 = document.createElement('div');
r4c2.setAttribute('class','col-sm-3');

var r4c3 = document.createElement('div');
r4c3.setAttribute('class','col-sm-3');

var r4c4 = document.createElement('div');
r4c4.setAttribute('class','col-sm-3');

var sdiv = document.createElement('button');
sdiv.setAttribute('class','btn btn-light btn-lg btn-block');
sdiv.innerHTML = '<h1>&#247;<h1>'
sdiv.addEventListener('click',addTxt);
r4c1.appendChild(sdiv);

var n0 = document.createElement('button');
n0.setAttribute('class','btn btn-light btn-lg btn-block');
n0.innerHTML = '<h1>0<h1>'
n0.addEventListener('click',addTxt);
r4c2.appendChild(n0);

var sdot = document.createElement('button');
sdot.setAttribute('class','btn btn-light btn-lg btn-block');
sdot.innerHTML = '<h1>.<h1>'
sdot.addEventListener('click',addTxt);
r4c3.appendChild(sdot);

var sequ = document.createElement('button');
sequ.setAttribute('class','btn btn-primary btn-lg btn-block');
sequ.innerHTML = '<h1>=<h1>'
sequ.addEventListener('click',addTxt);
r4c4.appendChild(sequ);

r4.append(r4c1, r4c2, r4c3, r4c4);

maindiv.append(textArea,r0,r1,r2, r3, r4);

cont.appendChild(maindiv);
document.body.append(cont);