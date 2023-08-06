let exp = "";
let display = document.getElementById("display").value;
let inputBar = document.getElementById("display"); // Input
let outputBar = document.getElementById("show"); // Output
var buttonObj = { Name: "example", Value: 12 };
function replaceConstants(expression) {
  expression = expression.replace(/π/g, Math.PI);
  expression = expression.replace(/e/g, Math.E);
  return expression;
}

function appendExp(str) {
  var inputField = document.getElementById("display");
  var cursorPosition = inputField.selectionStart;
  var currentValue = inputField.value;
  var newValue =
    currentValue.slice(0, cursorPosition) +
    str +
    currentValue.slice(cursorPosition);
  inputField.value = newValue;
  inputField.focus();
  inputField.setSelectionRange(
    cursorPosition + 1,
    cursorPosition + str.length()
  );
}

function handleBackspace() {
  let input = document.getElementById("display").value;
  if (input.length === 0) {
    return;
  }
  let cursorIndex = document.getElementById("display").selectionStart;

  if (cursorIndex === 0) {
    return;
  }

  let functionsToDelete = ["tan(", "cos(", "sin(", "sqrt("];
  let deleted = false;
  for (let func of functionsToDelete) {
    if (input.slice(cursorIndex - func.length, cursorIndex) === func) {
      let newInput =
        input.slice(0, cursorIndex - func.length) + input.slice(cursorIndex);
      document.getElementById("display").value = newInput;
      deleted = true;
      break;
    }
  }
  if (!deleted) {
    let newInput = input.slice(0, cursorIndex - 1) + input.slice(cursorIndex);
    document.getElementById("display").value = newInput;
  }

  document.getElementById("display").selectionStart = cursorIndex - 1;
  document.getElementById("display").focus();
}

function clearKardo() {
  display = "";
  inputBar.value = outputBar.value = "";
}

function replaceAllOccurrences(inputString, wordToReplace, newWord) {
  const regex = new RegExp("\\b" + wordToReplace + "\\b", "gi");
  return inputString.replace(regex, newWord);
}
var arrObj = [];
function variableValueInput() {
  let bName = document.getElementById("NameBar").value;
  let bValue = document.getElementById("ValueBar").value;

  if (bName != undefined && bValue != undefined) {
    let buttonObj = {
      Name: bName,
      Value: bValue,
    };
    arrObj.push(buttonObj);
    createButton(bName);
  }
}

function createButton(bName) {
  const button = document.createElement("button");
  if (bName != null && bName != undefined) {
    button.innerText = bName;
  }
  button.addEventListener("click", function () {
    appendExp(bName);
  });
  const buttonParent = document.getElementById("buttonBnao");
  buttonParent.appendChild(button);
}
function calculate() {
  try {
    exp = inputBar.value;
    exp = replaceAllOccurrences(exp, "sin", "Math.sin");
    exp = replaceAllOccurrences(exp, "tan", "Math.tan");
    exp = replaceAllOccurrences(exp, "cos", "Math.cos");
    exp = replaceAllOccurrences(exp, "sqrt", "Math.sqrt");
    exp = replaceConstants(exp);
    if (arrObj.length) {
      arrObj.forEach((element) => {
        exp = replaceAllOccurrences(exp, element.Name, element.Value);
      });
    }
    exp = exp.replace(/\^/g, "**");
    outputBar.value = eval(exp).toFixed(4);
  } catch (error) {
    outputBar.value = error.message;
  }
}
