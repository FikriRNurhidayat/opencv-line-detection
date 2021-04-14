const backButton = document.getElementById('btn-back');

backButton.addEventListener('click', () => {
  output.style.display = 'none';
  input.style.display = 'unset';
  image.src = null;
})
