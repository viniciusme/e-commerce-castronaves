// Show Div And Hide Div

function ShowDiv(el) {
  var display = document.getElementById(el).style.display;
  document.getElementById(el).style.display = 'flex';
}

function hideDiv(el) {
  var display = document.getElementById(el).style.display;
  document.getElementById(el).style.display = 'none';
}
