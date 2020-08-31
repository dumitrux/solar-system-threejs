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

    // scene setup
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    const cameraControls = new MyCameraControls(camera, canvas);

    scene.background = new THREE.Color('black');

    //scene.add(new THREE.GridHelper(3000, 30));

    /*
    var radius = 100;
    var radials = 1;
    var circles = 5;
    var divisions = 100;
    var helper = new THREE.PolarGridHelper(radius, radials, circles, divisions);
    scene.add(helper);
    */


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
        const farPlane = 10000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.set(0, 300, 400);
        //camera.up.set(0, 1, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        return camera;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new SolarSystem(scene),
            new AmbientLight(scene),
            new SunLight(scene),
            new Stars(scene)
        ];

        return sceneSubjects;
    }

    // center a planet on click on it
    function center(sizeToFitOnScreen, boxSize, boxCenter, camera) {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
        // compute a unit vector that points in the direction the camera is now
        // in the xz plane from the center of the box
        const direction = (new THREE.Vector3())
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();

        // move the camera to a position distance units way from the center
        // in whatever direction the camera was from the center already
        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));


        // pick some near and far values for the frustum that
        // will contain the box.
        camera.near = boxSize / 100;
        camera.far = boxSize * 100;

        camera.updateProjectionMatrix();

        // point the camera to look at the center of the box
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    }
    //const center = new THREE.Vector3(0, 0, 0);
    // set the camera to frame the box
    //frameArea(200, 100, center, camera);


    // It is called by the main at every frame.
    this.update = function (time, pickHelper, pickPosition) {
        for (let i = 0; i < sceneSubjects.length; i++)
            sceneSubjects[i].update(time);


        let x = sceneSubjects[0];
        pickHelper.pick(pickPosition, x.getAstrionomicalBodies(), camera, time, scene);
        cameraControls.update();
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