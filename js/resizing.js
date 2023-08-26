/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(div) {
    // Select the target element
    const element = document.querySelector(div);
    // Select all resizer elements within the target element
    const resizers = document.querySelectorAll(div + ' .resizer');
    // Minimum size for resizing
    const minimum_size = 20;
    // Variables to store original dimensions and positions
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    // Loop through each resizer element
    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];

        // Event listener for mouse down on a resizer
        currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault();
            // Get original dimensions and positions
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));

            // Get the offset of the "svg-wrapper" element
            const svgWrapperRect = document.getElementById('svg-wrapper').getBoundingClientRect();

            original_x = element.getBoundingClientRect().left; // Adjusted position
            original_y = element.getBoundingClientRect().top;  // Adjusted position
            original_mouse_x = e.pageX; // Adjusted mouse coordinate
            original_mouse_y = e.pageY;  // Adjusted mouse coordinate


            // Add event listeners for resizing and stopping resizing
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });


        // Function for resizing the element
        function resize(e) {
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
            } else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.pageY - original_mouse_y)
                const width = original_width - (e.pageX - original_mouse_x)
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
                if (width > minimum_size && element.style.top <= 0) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
            } else if (currentResizer.classList.contains('top-right')) {
                const width = original_width + (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                }
            } else {
                const width = original_width - (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                }
            }
        }

        // Function to stop resizing
        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }
}

// Call the function with the desired selector
makeResizableDiv('.resizable')

