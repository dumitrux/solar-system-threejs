import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { OBJLoader2 } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js';
import { MtlObjBridge } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

//http-server --cors -o -c-1 

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 0);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, canvas);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    class ColorGUIHelper {
        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }
        get value() {
            return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
            this.object[this.prop].set(hexString);
        }
    }

    const gui = new GUI();
    //Ambiental light
    {
        const color = 0xFFFFFF;
        const intensity = 0.2;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

        //gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        //gui.add(light, 'intensity', 0.1, 2, 0.01);
    }

    //Light of the sun
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.PointLight(color, intensity);
        light.position.set(0, 0, 0);
        scene.add(light);


        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        gui.add(light, 'intensity', 0.1, 2, 0.01);
    }

    //Stars
    {
        var vertices = [];

        for (var i = 0; i < 6000; i++) {
            var x = THREE.MathUtils.randFloatSpread(2000);
            var y = THREE.MathUtils.randFloat(-1000, 1000);
            var z = THREE.MathUtils.randFloat(-1000, 1000);

            vertices.push(x, y, z);
        }

        /*
        const radius = 50;
        const widthSegments = 18;
        const heightSegments = 18;
        var geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
        */
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        var material = new THREE.PointsMaterial({
            color: 0xfffe7d,
            //sizeAttenuation: false,
            //size: 3,
        });

        var points = new THREE.Points(geometry, material);

        scene.add(points);
    }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
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

    {
        const mtlLoader = new MTLLoader();
        mtlLoader.load('./img/ufo/Low_poly_UFO.mtl', (mtlParseResult) => {
            const objLoader = new OBJLoader2();
            const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
            objLoader.addMaterials(materials);
            objLoader.load('./img/ufo/Low_poly_UFO.obj', (root) => {
                scene.add(root);
                //console.log(root)
                root.scale.set(0.1, 0.1, 0.1)
                root.position.set(100, 20, 0);


                /*
                // compute the box that contains all the stuff
                // from root and below
                const box = new THREE.Box3().setFromObject(root);

                const boxSize = box.getSize(new THREE.Vector3()).length();
                const boxCenter = box.getCenter(new THREE.Vector3());
                
                console.log(boxSize);
                console.log(boxCenter);
                // set the camera to frame the box
                frameArea(boxSize * 1.2, boxSize, boxCenter, camera);
                

                // update the Trackball controls to handle the new size
                controls.maxDistance = boxSize * 10;
                controls.target.copy(boxCenter);
                controls.update();
                */
            });
        });
    }





    const objects = [];
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    //Planets
    const cubes = [];  // just an array we can use to rotate the cubes
    const loader = new THREE.TextureLoader();

    loader.load('./img/sun.jpg', function (texture) {
        var geometry = new THREE.SphereGeometry(30, 12, 18);

        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
        var sun = new THREE.Mesh(geometry, material);

        //sun.position.set(0, 0, 0);

        solarSystem.add(sun);
        objects.push(sun);
    });



    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 60;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    loader.load('./img/earth.png', function (texture) {
        var geometry = new THREE.SphereGeometry(10, 12, 18);

        var material = new THREE.MeshPhongMaterial({ map: texture, overdraw: 0.5 });
        var earth = new THREE.Mesh(geometry, material);

        //earth.position.set(100, 0, 0);

        earthOrbit.add(earth);
        objects.push(earth);
    });


    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 20;
    earthOrbit.add(moonOrbit);

    loader.load('./img/moon.jpg', function (texture) {
        var geometry = new THREE.SphereGeometry(3, 12, 18);

        var material = new THREE.MeshPhongMaterial({ map: texture, overdraw: 0.5 });
        var moonMesh = new THREE.Mesh(geometry, material);

        //earth.position.set(100, 0, 0);

        moonOrbit.add(moonMesh);
        objects.push(moonMesh);
    });
















    const center = new THREE.Vector3(0, 0, 0);
    // set the camera to frame the box
    frameArea(200, 100, center, camera);


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.0001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        objects.forEach((obj) => {
            obj.rotation.y = time;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
