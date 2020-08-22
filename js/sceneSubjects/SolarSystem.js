function SolarSystem(scene, time) {
    const loader = new THREE.TextureLoader();

    var astrionomicalBodies = [];

    const solarSystem = new THREE.Group();
    scene.add(solarSystem);
    var sunMesh = createSun("sun", 30, scene, solarSystem, astrionomicalBodies, loader);


    var mercuryOrbit = createOrbit(50, solarSystem);
    var mercuryMesh = createPlanet("mercury", 2, scene, mercuryOrbit, astrionomicalBodies, loader);


    var venusOrbit = createOrbit(80, solarSystem);
    var venusMesh = createPlanet("venus", 10, scene, venusOrbit, astrionomicalBodies, loader);


    var earthOrbit = createOrbit(130, solarSystem);
    var earthMesh = createPlanet("earth", 10, scene, earthOrbit, astrionomicalBodies, loader);

    var moonOrbit = createOrbit(20, earthOrbit);
    var moonMesh = createPlanet("moon", 3, scene, moonOrbit, astrionomicalBodies, loader);


    var marsOrbit = createOrbit(180, solarSystem);
    var marsMesh = createPlanet("mars", 8, scene, marsOrbit, astrionomicalBodies, loader);

    var phobosOrbit = createOrbit(11, marsOrbit);
    var phobosMesh = createPlanet("moon", 2, scene, phobosOrbit, astrionomicalBodies, loader);

    var deimosOrbit = createOrbit(15, marsOrbit);
    var deimosMesh = createPlanet("moon", 2, scene, deimosOrbit, astrionomicalBodies, loader);






    var jupiterOrbit = createOrbit(240, solarSystem);
    var jupiterMesh = createPlanet("jupiter", 30, scene, jupiterOrbit, astrionomicalBodies, loader);




    var saturnOrbit = createOrbit(310, solarSystem);
    var saturnMesh = createPlanet("saturn", 20, scene, saturnOrbit, astrionomicalBodies, loader);

    const innerRadius =  26;  
    const outerRadius =  32;  
    const thetaSegments = 18;  
    const saturnBelt = new THREE.RingBufferGeometry(
    innerRadius, outerRadius, thetaSegments);
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
      });
    const mesh = new THREE.Mesh(saturnBelt, material);
    mesh.rotation.x = Math.PI / 2 ;
    saturnOrbit.add(mesh);




    var uranusOrbit = createOrbit(370, solarSystem);
    var uranusMesh = createPlanet("uranus", 13, scene, uranusOrbit, astrionomicalBodies, loader);

    var neptuneOrbit = createOrbit(410, solarSystem);
    var neptuneMesh = createPlanet("neptune", 12, scene, neptuneOrbit, astrionomicalBodies, loader);


    /*
    // Saturn belt

    const innerRadius =  4.8;  
    const outerRadius =  6.8;  
    const thetaSegments = 18;  

    const geometry = new THREE.RingBufferGeometry(
    innerRadius, outerRadius, thetaSegments);

    */

    this.update = function (time) {
        astrionomicalBodies.forEach((obj) => {
            //solarSystem.rotation.y = time * 0.2; // rotate around the sun
            earthMesh.rotation.y = time * 0.2; // rotate the planet
        });
    }
}

function createOrbit(positionX) {
    const orbit = new THREE.Group();
    orbit.position.x = positionX;

    for (let i = 0, j = arguments.length; i < j; i++) {
        if (i == 0) continue;

        let x = arguments[i];
        x.add(orbit);
    }

    return orbit;
}

function createPlanet(name, size, scene, orbit, astrionomicalBodies, loader) {
    var geometry = new THREE.SphereGeometry(size, 32, 16);

    let texturePath = "../../assets/textures/" + name + ".jpg";

    //without callback
    var texture = loader.load(texturePath);

    var material = new THREE.MeshPhongMaterial({ map: texture });
    var planetMesh = new THREE.Mesh(geometry, material);

    orbit.add(planetMesh);
    astrionomicalBodies.push(planetMesh);

    return planetMesh;
}

function createSun(name, size, scene, orbit, astrionomicalBodies, loader) {
    var geometry = new THREE.SphereGeometry(size, 32, 16);

    let texturePath = "../../assets/textures/" + name + ".jpg";

    //without callback
    var texture = loader.load(texturePath);

    var material = new THREE.MeshBasicMaterial({ map: texture });
    var sunMesh = new THREE.Mesh(geometry, material);

    orbit.add(sunMesh);
    astrionomicalBodies.push(sunMesh);

    return sunMesh;

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