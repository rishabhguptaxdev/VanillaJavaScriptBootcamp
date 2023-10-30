let keyPressed;
let x;
let gen;

function* changeColor(keyPressed) {
  let element = document.getElementsByClassName(`${keyPressed}`);
  let value = element[0].className;
  let replacedValue = value.replace("-outline-", "-");
  yield (element[0].className = replacedValue);
  element[0].className = value;
}

window.addEventListener("keydown", function (e) {
  if (gen) {
    gen.next();
  }
  keyPressed = e.keyCode;
  x = document.getElementById(keyPressed);
  if (!x) {
    return;
  }
  x.play();
  gen = changeColor(keyPressed);
  gen.next();
});
