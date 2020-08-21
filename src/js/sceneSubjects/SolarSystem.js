function SolarSystem(scene) {
    const objects = [];
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);


    var planetSun = Sun(scene, solarSystem, objects);


    
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 60;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    var planetEarth = Earth(scene, earthOrbit, objects);





    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 20;
    earthOrbit.add(moonOrbit);

    var planetMoon = Moon(scene, moonOrbit, objects);




    this.update = function () {
        // do something
    }
}