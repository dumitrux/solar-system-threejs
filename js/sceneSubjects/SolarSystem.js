function SolarSystem(scene, time) {
    const loader = new THREE.TextureLoader();

    var astrionomicalBodies = [];

    const solarSystem = new THREE.Group();
    scene.add(solarSystem);
    var sunMesh = createSun("sun", 30, scene, solarSystem, astrionomicalBodies, loader);


    var mercuryOrbit = createOrbit(solarSystem);
    var mercuryMesh = createPlanet("mercury", 2, 50, scene, mercuryOrbit, astrionomicalBodies, loader);
    createOrbitLine(50, scene, astrionomicalBodies);

    var venusOrbit = createOrbit(solarSystem);
    var venusMesh = createPlanet("venus", 10, 60, scene, venusOrbit, astrionomicalBodies, loader);
    createOrbitLine(60, scene, astrionomicalBodies);

    var earthOrbit = createOrbit(solarSystem);
    var earthMesh = createPlanet("earth", 10, 80, scene, earthOrbit, astrionomicalBodies, loader);
    createOrbitLine(80, scene, astrionomicalBodies);

    var moonOrbit = createMoonOrbit(80, earthOrbit);
    var moonMesh = createPlanet("moon", 3, 15, scene, moonOrbit, astrionomicalBodies, loader);
    createOrbitLine(15, moonOrbit, astrionomicalBodies);


    var marsOrbit = createOrbit(solarSystem);
    var marsMesh = createPlanet("mars", 8, 120, scene, marsOrbit, astrionomicalBodies, loader);
    createOrbitLine(120, scene, astrionomicalBodies);

    /*
    var phobosOrbit = createOrbit(marsOrbit);
    var phobosMesh = createPlanet("moon", 2, scene, phobosOrbit, astrionomicalBodies, loader);

    var deimosOrbit = createOrbit(marsOrbit);
    var deimosMesh = createPlanet("moon", 2, scene, deimosOrbit, astrionomicalBodies, loader);
    */

    var jupiterOrbit = createOrbit(solarSystem);
    var jupiterMesh = createPlanet("jupiter", 30, 160, scene, jupiterOrbit, astrionomicalBodies, loader);
    createOrbitLine(160, scene, astrionomicalBodies);

    var saturnOrbit = createOrbit(solarSystem);
    var saturnMesh = createPlanet("saturn", 20, 240, scene, saturnOrbit, astrionomicalBodies, loader);
    createOrbitLine(240, scene, astrionomicalBodies);

    const innerRadius = 26;
    const outerRadius = 32;
    const thetaSegments = 18;
    const saturnBelt = new THREE.RingBufferGeometry(
        innerRadius, outerRadius, thetaSegments);
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(saturnBelt, material);
    mesh.rotation.x = Math.PI / 2;

    mesh.position.set(240, 0, 0);
    saturnOrbit.add(mesh);


    var uranusOrbit = createOrbit(solarSystem);
    var uranusMesh = createPlanet("uranus", 13, 320, scene, uranusOrbit, astrionomicalBodies, loader);
    createOrbitLine(320, scene, astrionomicalBodies);

    var neptuneOrbit = createOrbit(solarSystem);
    var neptuneMesh = createPlanet("neptune", 12, 360, scene, neptuneOrbit, astrionomicalBodies, loader);
    createOrbitLine(360, scene, astrionomicalBodies);


    this.update = function (time) {
        mercuryOrbit.rotation.y = time * 2; // rotate around the sun
        mercuryMesh.rotation.y = time * 0.20; // rotate the planet

        venusOrbit.rotation.y = time * 1;
        venusMesh.rotation.y = time * 0.5;

        earthOrbit.rotation.y = time * 0.5;
        earthMesh.rotation.y = time * 0.2;

        moonOrbit.rotation.y = time * 0.5;
        moonMesh.rotation.y = time * 0.2;

        marsOrbit.rotation.y = time * 0.6;
        marsMesh.rotation.y = time * 0.2;

        jupiterOrbit.rotation.y = time * 0.4;
        jupiterMesh.rotation.y = time * 0.2;

        saturnOrbit.rotation.y = time * 0.3;
        saturnMesh.rotation.y = time * 0.2;

        uranusOrbit.rotation.y = time * 0.08;
        uranusMesh.rotation.y = time * 0.2;

        neptuneOrbit.rotation.y = time * 0.05;
        neptuneMesh.rotation.y = time * 0.2;
    }

    this.getAstrionomicalBodies = function() {
        return astrionomicalBodies;
    }
}

function createOrbit() {
    const orbit = new THREE.Group();

    for (let i = 0, j = arguments.length; i < j; i++) {
        arguments[i].add(orbit);
    }

    return orbit;
}

function createMoonOrbit(distanceX) {
    const orbit = new THREE.Group();
    orbit.position.x = distanceX;

    for (let i = 0, j = arguments.length; i < j; i++) {
        if(i == 0) continue;
        arguments[i].add(orbit);
    }

    return orbit;
}

function createPlanet(name, size, distanceX, scene, orbit, astrionomicalBodies, loader) {
    var geometry = new THREE.SphereGeometry(size, 32, 16);

    let texturePath = "assets/textures/" + name + ".jpg";

    //without callback
    var texture = loader.load(texturePath);

    var material = new THREE.MeshPhongMaterial({ map: texture });
    var planetMesh = new THREE.Mesh(geometry, material);

    planetMesh.position.set(distanceX, 0, 0);

    orbit.add(planetMesh);
    astrionomicalBodies.push(planetMesh);

    return planetMesh;
}

function createSun(name, size, scene, orbit, astrionomicalBodies, loader) {
    var geometry = new THREE.SphereGeometry(size, 32, 16);

    let texturePath = "assets/textures/" + name + ".jpg";

    //without callback
    var texture = loader.load(texturePath);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var sunMesh = new THREE.Mesh(geometry, material);

    orbit.add(sunMesh);
    astrionomicalBodies.push(sunMesh);

    return sunMesh;
}

function createOrbitLine(distanceX, scene, astrionomicalBodies) {
    const innerRadius = distanceX-1;
    const outerRadius = distanceX+1;
    const thetaSegments = 50;
    const geometry = new THREE.RingBufferGeometry(innerRadius, outerRadius, thetaSegments);
    const material = new THREE.MeshBasicMaterial({
        color: 0xf5e96c,
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;

    astrionomicalBodies.push(mesh);
    scene.add(mesh);
}




/*
astronomical bodies: asteroids, moons, planets, and stars
astronomical objects: planetary systems, star clusters, nebulae, and galaxies
*/






// add line to show orbit
/*
const innerRadius =  50;
const outerRadius =  50;
const thetaSegments = 1800;
const geometry = new THREE.RingBufferGeometry(
innerRadius, outerRadius, thetaSegments);
const material = new THREE.PointsMaterial({
    //color: 'red',
    //size: 1,
    //sizeAttenuation: true,
});
const points = new THREE.Points(geometry, material);
scene.add(points);
*/