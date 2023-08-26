// Function to make a resizable and draggable div
function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = element.querySelectorAll('.resizer');
    const svgWrapper = document.getElementById('svg-wrapper');
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];

        currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault();
            original_width = parseFloat(getComputedStyle(element).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element).getPropertyValue('height').replace('px', ''));

            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
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

            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + dx;
                const height = original_height + dy;
                if (width > minimum_size) {
                    element.style.width = width + 'px';
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px';
                }
            } else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + dy;
                const width = original_width - dx;
                if (height > minimum_size) {
                    element.style.height = height + 'px';
                }
                if (width > minimum_size && original_x + dx >= 0) {
                    element.style.width = width + 'px';
                    element.style.left = (original_x - wrapperLeft) + dx + 'px';
                }
            } else if (currentResizer.classList.contains('top-right')) {
                const width = original_width + dx;
                const height = original_height - dy;
                if (width > minimum_size) {
                    element.style.width = width + 'px';
                }
                if (height > minimum_size && original_y + dy >= 0) {
                    element.style.height = height + 'px';
                    element.style.top = (original_y - wrapperTop) + dy + 'px';
                }
            } else if (currentResizer.classList.contains('top-left')) {
                const width = original_width - dx;
                const height = original_height - dy;
                if (width > minimum_size && original_x + dx >= 0) {
                    element.style.width = width + 'px';
                    element.style.left = (original_x - wrapperLeft) + dx + 'px';
                }
                if (height > minimum_size && original_y + dy >= 0) {
                    element.style.height = height + 'px';
                    element.style.top = (original_y - wrapperTop) + dy + 'px';
                }
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
        }
    }

}

// Call the function with the desired selector
makeResizableDiv('.resizable');
