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
    const getStyleValue = (element, styleProperty) => parseInt(getComputedStyle(element).getPropertyValue(styleProperty).replace("px", ""));

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

    // Log the top value of the resizable element
    console.log(resizableTop);

    // Log the original and updated viewBox values
    console.log(`Before: ${originalViewBoxArray.join(" ")}`);
    console.log(`After: ${viewBox}`);
}
