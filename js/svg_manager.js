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
                const sanitizedSvg = DOMPurify.sanitize(e.target.result, {SVG: true});

                // Create a temporary div to parse the SVG content
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sanitizedSvg;

                // Find the SVG element
                const svgElement = tempDiv.querySelector('svg');

                // Check if viewBox attribute is missing and width and height attributes are present
                const viewBoxMissing = !svgElement.getAttribute('viewBox');
                const widthPresent = svgElement.getAttribute('width');
                const heightPresent = svgElement.getAttribute('height');

                if (viewBoxMissing && widthPresent && heightPresent) {
                    // Set viewBox attribute
                    svgElement.setAttribute('viewBox', `0 0 ${svgElement.getAttribute('width')} ${svgElement.getAttribute('height')}`);

                    // Remove width and height attributes
                    svgElement.removeAttribute('width');
                    svgElement.removeAttribute('height');

                    // Set the innerHTML of the container with modified SVG
                    svgContainer.innerHTML = tempDiv.innerHTML;
                } else if (!viewBoxMissing && widthPresent && heightPresent) {
                    // Remove width and height attributes
                    svgElement.removeAttribute('width');
                    svgElement.removeAttribute('height');
                }

                // Set the innerHTML of the container with modified SVG
                svgContainer.innerHTML = tempDiv.innerHTML;

                // Set the uploadedFileName global variable
                uploadedFileName = fileNameWithoutExtension;
            };
            reader.readAsText(file);
        } else {
            console.error('Invalid file extension. Please choose an SVG file.');
        }
    }
});
