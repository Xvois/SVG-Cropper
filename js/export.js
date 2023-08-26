// Function to export a cropped SVG based on resizable elements
function exportCroppedSVG() {
    // Get the main display SVG element (first child of #svg-display)
    const svgElement = document.querySelector("#svg-display > :first-child");

    // Get the resizable element
    const resizableElement = document.getElementById("svg-resizable");

    // Get the original viewBox dimensions of the SVG
    const originalViewBoxArray = svgElement.getAttribute("viewBox").split(" ");
    const originalViewBoxHeight = originalViewBoxArray[3];
    const originalViewBoxWidth = originalViewBoxArray[2];

    // Get the dimensions of the display area
    const displayHeight = svgElement.clientHeight;
    const displayWidth = svgElement.clientWidth;

    // Helper function to get integer values from style properties
    const getStyleValue = (element, styleProperty) => parseFloat(getComputedStyle(element).getPropertyValue(styleProperty).replace("px", ""));

    // Get dimensions and positions of the resizable element
    const resizableTop = getStyleValue(resizableElement, "top");
    const resizableLeft = getStyleValue(resizableElement, "left");
    const resizableHeight = getStyleValue(resizableElement, "height");
    const resizableWidth = getStyleValue(resizableElement, "width");

    // Calculate factors for resizing and positioning
    const topFactor = resizableTop / displayHeight;
    const leftFactor = resizableLeft / displayWidth;

    // Calculate new dimensions and positions for the viewBox
    const minX = parseFloat(originalViewBoxArray[0]) + (leftFactor * originalViewBoxWidth);
    const width = (resizableWidth / displayWidth) * originalViewBoxWidth;
    const minY = parseFloat(originalViewBoxArray[1]) + (topFactor * originalViewBoxHeight);
    const height = (resizableHeight / displayHeight) * originalViewBoxHeight;

    // Construct the new viewBox string
    const viewBox = `${minX} ${minY} ${width} ${height}`;

    // Clone the SVG element and set the new viewBox
    const svgCopy = svgElement.cloneNode(true);
    svgCopy.setAttribute("viewBox", viewBox);
    svgCopy.setAttribute("width", width);
    svgCopy.setAttribute("height", height);

    // Serialize the SVG element to a string
    const svgString = new XMLSerializer().serializeToString(svgCopy);

    // Create a Blob containing the SVG content
    const blob = new Blob([svgString], {type: "image/svg+xml"});

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a downloadable link
    const link = document.createElement("a");
    link.href = url;
    link.download = "svg-cropped.svg";
    link.innerHTML = "Download SVG";

    // Click the link to trigger the download
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
}
