const threshold = document.getElementById('threshold');
const ratio = document.getElementById('ratio');

threshold.addEventListener('change', (e) => {
  image.onThresholdChanged(parseFloat(e.target.value));
})

ratio.addEventListener('change', (e) => {
  image.onRatioChanged(parseFloat(e.target.value));
})

threshold.set = function(value) {
  return this.value = value;
}

ratio.set = function(value) {
  return this.value = value;
}
