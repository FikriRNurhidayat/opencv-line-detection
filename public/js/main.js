const container = document.getElementById('container');
const output = document.getElementById('output');

const input = document.getElementById('input');
input.addEventListener('change', (e) => {
  image.src = URL.createObjectURL(e.target.files[0]);
  input.style.display = 'none';
}, false)

onOpenCvReady = () => container.style.display = 'unset';

output.show = function() {
  this.style.display = 'flex'
}
