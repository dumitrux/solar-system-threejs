/*
three basic responsibilities:
    * create the SceneManager, while passing a canvas to it (so that SceneManager won’t have to meddle with the DOM).
    * attach listeners to the DOM events we care about (such as windowresize or mousemove).
    * start the render loop, by calling requestAnimationFrame().

*/


//http-server --cors -o -c-1

const canvas = document.querySelector('#canvas');

const sceneManager = new SceneManager(canvas);

const pickPosition = { x: 0, y: 0 };
const pickHelper = new PickHelper();
clearPickPosition();


bindEventListeners();
render();

function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
}

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();
}

function render(time) {
    // convert time into seconds
    time *= 0.001;
    

    requestAnimationFrame(render);

    sceneManager.update(time, pickHelper, pickPosition);
}





// Picker




function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * canvas.width / rect.width,
        y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
}

function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}

function clearPickPosition() {
    // unlike the mouse which always has a position
    // if the user stops touching the screen we want
    // to stop picking. For now we just pick a value
    // unlikely to pick something
    pickPosition.x = -100000;
    pickPosition.y = -100000;
}


window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);

// Mobile support
window.addEventListener('touchstart', (event) => {
    // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
}, { passive: false });

window.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
});

window.addEventListener('touchend', clearPickPosition);