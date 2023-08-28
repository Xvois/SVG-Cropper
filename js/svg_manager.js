const svgFileInput = document.getElementById('svg-input');
const svgContainer = document.getElementById('svg-display');

svgFileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileName = file.name;
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, ''); // Extract name without extension
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension === 'svg') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const sanitizedSvg = DOMPurify.sanitize(e.target.result, { SVG: true });
        svgContainer.innerHTML = sanitizedSvg;

        // Set the uploadedFileName global variable
        uploadedFileName = fileNameWithoutExtension;
      };
      reader.readAsText(file);
    } else {
      console.error('Invalid file extension. Please choose an SVG file.');
    }
  }
});
