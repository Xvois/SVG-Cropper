// Function to make a resizable and draggable div
function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizable = document.getElementById("svg-resizable");
    const resizers = element.querySelectorAll('.resizer');
    const svgWrapper = document.getElementById('svg-wrapper');
    const minimum_size = 20;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;


    let original_width = 0;
    let original_height = 0;
    let original_left = 0;
    let original_top = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    // Helper function to get integer values from style properties
    const getStyleValue = (element, styleProperty) => parseFloat(getComputedStyle(element).getPropertyValue(styleProperty).replace("px", ""));

    // Function to handle dragging when the "+" tile is clicked
    const dragTile = element.querySelector('.drag-tile');
    dragTile.addEventListener('mousedown', function (e) {
        e.preventDefault();
        isDragging = true;

        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', stopDrag);
    });

    function drag(e) {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        const wrapperTop = svgWrapper.getBoundingClientRect().top;
        const wrapperLeft = svgWrapper.getBoundingClientRect().left;

        // Calculate the maximum allowed top and left values
        const maxTop = svgWrapper.clientHeight - element.clientHeight;
        const maxLeft = svgWrapper.clientWidth - element.clientWidth;

        // Clamp the x and y values to the specified bounds
        const clampedX = Math.min(Math.max(x - wrapperLeft, 0), maxLeft);
        const clampedY = Math.min(Math.max(y - wrapperTop, 0), maxTop);

        element.style.left = clampedX + 'px';
        element.style.top = clampedY + 'px';

        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_left = getStyleValue(element, "left");
        original_top = getStyleValue(element, "top");
    }


    function stopDrag() {
        isDragging = false;
        window.removeEventListener('mousemove', drag);
    }


    for (const resizer of resizers) {
        resizer.addEventListener('mousedown', function (e) {
            e.preventDefault();

            // Store original dimensions and positions
            original_width = element.clientWidth;
            original_height = element.clientHeight;
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_left = getStyleValue(element, "left");
            original_top = getStyleValue(element, "top");
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;

            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });

        function resize(e) {
            const dx = e.pageX - original_mouse_x;
            const dy = e.pageY - original_mouse_y;

            const wrapperTop = svgWrapper.getBoundingClientRect().top;
            const wrapperLeft = svgWrapper.getBoundingClientRect().left;

            const newLeft = original_x - wrapperLeft + dx;
            const newTop = original_y - wrapperTop + dy;

            const clampedTop = Math.max(newTop, 0);
            const clampedLeft = Math.max(newLeft, 0);

            if (resizer.classList.contains('bottom-right')) {
                const width = original_width + dx;
                const height = original_height + dy;

                const maxWidth = getStyleValue(svgWrapper, "width") - original_left;
                const maxHeight = getStyleValue(svgWrapper, "height") - original_top;

                // Width adjustment
                if (width > minimum_size) {
                    element.style.width = Math.min(width, maxWidth) + 'px';
                }

                // Height adjustment
                if (height > minimum_size) {
                    element.style.height = Math.min(height, maxHeight) + 'px';
                }
            } else if (resizer.classList.contains('bottom-left')) {
                const height = original_height + dy;
                const width = original_width - dx;

                const maxWidth = original_width + original_left;
                const maxHeight = getStyleValue(svgWrapper, "height") - original_top;

                // Height adjustment
                if (height > minimum_size) {
                    element.style.height = Math.min(height, maxHeight) + 'px';
                }

                // Width adjustment
                if (width > minimum_size && clampedLeft >= 0) {
                    element.style.width = Math.min(width, maxWidth) + 'px';
                    element.style.left = clampedLeft + 'px';
                }
            } else if (resizer.classList.contains('top-right')) {
                const width = original_width + dx;
                const height = original_height - dy;

                const maxWidth = getStyleValue(svgWrapper, "width") - original_left;

                // Width adjustment
                if (width > minimum_size) {
                    element.style.width = Math.min(width, maxWidth) + 'px';
                }

                // Height adjustment
                const maxHeight = original_height + original_top;
                if (height > minimum_size && clampedTop >= 0) {
                    element.style.height = Math.min(height, maxHeight) + 'px';
                    element.style.top = clampedTop + 'px';
                }
            } else if (resizer.classList.contains('top-left')) {
                const width = original_width - dx;
                const height = original_height - dy;

                const maxWidth = original_width + original_left;

                // Width adjustment
                if (width > minimum_size && clampedLeft >= 0) {
                    element.style.width = Math.min(width, maxWidth) + 'px';
                    element.style.left = clampedLeft + 'px';
                }

                // Height adjustment
                const maxHeight = original_height + original_top;
                if (height > minimum_size && clampedTop >= 0) {
                    element.style.height = Math.min(height, maxHeight) + 'px';
                    element.style.top = clampedTop + 'px';
                }
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
        }

        // Function to handle resizing on window resize
        function handleWindowResize() {
            const wrapperTop = svgWrapper.getBoundingClientRect().top;
            const wrapperLeft = svgWrapper.getBoundingClientRect().left;

            const clampedTop = Math.max(original_y - wrapperTop, 0);
            const clampedLeft = Math.max(original_x - wrapperLeft, 0);

            const width = getStyleValue(resizable, "width");
            const height = getStyleValue(resizable, "height");

            const maxWidth = getStyleValue(svgWrapper, "width") - original_left;
            const maxHeight = getStyleValue(svgWrapper, "height") - original_top;

            // Width adjustment
            if (width > minimum_size) {
                element.style.width = Math.min(width, maxWidth) + 'px';
            }

            // Height adjustment
            if (height > minimum_size) {
                element.style.height = Math.min(height, maxHeight) + 'px';
            }
        }

        window.addEventListener('resize', handleWindowResize);

    }
}

// Call the function with the desired selector
makeResizableDiv('.resizable');
