setTimeout(function () {
  $('#ajaxBusy').remove();
}, 5000);

window.onload = function () {
  removeAttributes('bannersproductstopmobileone');
  removeAttributes('bannersproductstopmobiletwo');
};

function removeAttributes(attributeName) {
  const elementRemove = document.querySelector(`img[alt="${attributeName}"]`);

  if (elementRemove) {
    elementRemove.removeAttribute('width');
    elementRemove.removeAttribute('height');
  }
}
