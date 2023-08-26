const svgFileInput = document.getElementById('svg-input');
const svgContainer = document.getElementById('svg-display');

svgFileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      svgContainer.innerHTML = e.target.result;
    };
    reader.readAsText(file);
  }
});
