let exp = ""
let display=document.getElementById("display").value
let inputBar = document.getElementById("display") // Input
let outputBar = document.getElementById("show") // Output

function replaceConstants(expression) {
    expression = expression.replace(/π/g, Math.PI);
    expression = expression.replace(/e/g, Math.E);
    return expression;
}

function appendExp(str)
{
    var inputField = document.getElementById('display');
    var cursorPosition = inputField.selectionStart;
    var currentValue = inputField.value;
    var newValue = currentValue.slice(0, cursorPosition) + str + currentValue.slice(cursorPosition);
    inputField.value = newValue;
    inputField.focus();
    inputField.setSelectionRange(cursorPosition +1, cursorPosition + str.length())
}

function clearKardo()
{
    display = ""
    inputBar.value = outputBar.value = ""
}

function replaceAllOccurrences(inputString, wordToReplace, newWord) {
    const regex = new RegExp("\\b" + wordToReplace + "\\b", "gi");
    return inputString.replace(regex, newWord);
}

function variableValueInput()
{
    let Name = document.getElementById("NameBar").value
    let Value = document.getElementById("ValueBar").value

    if(Name!=null && Value!=null)
    {
        assignValueToVariable(Name, Value);
    }
}

function assignValueToVariable(bName, bValue)
{
    const button = document.createElement("button");
    if(bName!=null && bName!= undefined && bName!=null && bValue!= undefined)
    {
        button.innerText = bName;
    }
    button.addEventListener("click", function() {
      appendExp(bName)
    });

    document.body.appendChild(button);
}

function calculate()
{
    try{
        exp = inputBar.value;
        exp = replaceAllOccurrences(exp, "sin", "Math.sin");
        exp = replaceAllOccurrences(exp, "tan", "Math.tan");
        exp = replaceAllOccurrences(exp, "cos", "Math.cos");
        exp = replaceAllOccurrences(exp, "sqrt", "Math.sqrt");
        exp = replaceConstants(exp);

        // exp = replaceKeysWithValues(exp, variableStore);
        exp = exp.replace(/\^/g, '**');
        outputBar.value = eval(exp).toFixed(4);
    }
    catch(error){
        outputBar.value = error.message;
    }
}