/*
The SceneManager is responsible for handling the Three.js side of the app, 
which is completely hidden from the main. It knows nothing about the DOM.


SceneManager is the component responsible for managing the scene. 
It works at high level, it shouldn’t know any detail about the content of the scene.
His responsibilities are:
    * create Scene, Renderer and Camera.
    * initialize a bunch of SceneSubjects.
    * update everything at every frame.


A SceneSubject represents one entity in the scene. 
The SceneManager usually contains multiple SceneSubjects.
*/


function SceneManager(canvas) {

    const clock = new THREE.Clock();

    // scene setup
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    //const cameraControls = new MyCameraControls(camera, scene);

    scene.background = new THREE.Color('black');



    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 500;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.z = 150;
        camera.lookAt(new THREE.Vector3(0,0,0));

        return camera;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new AmbientLight(scene),
            new Stars(scene),
            new SolarSystem(scene)
        ];

        return sceneSubjects;
    }

    // It is called by the main at every frame.
    this.update = function () {
        const elapsedTime = clock.getElapsedTime();

        for (let i = 0; i < sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        //cameraControls.update();
        renderer.render(scene, camera);
    }

    // Updates the aspect ratio of the camera and the size of the Renderer. 
    // It is called by the main each time the window is resized.
    this.onWindowResize = function () {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    //this.onClick(x, y)...
}