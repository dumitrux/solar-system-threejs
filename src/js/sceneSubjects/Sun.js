function Sun(scene, solarSystem, objects) {
    const loader = new THREE.TextureLoader();

    var sun;

    loader.load('../textures/sun.jpg', function (texture) {
        var geometry = new THREE.SphereGeometry(30, 12, 18);

        var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
        sun = new THREE.Mesh(geometry, material);

        //sun.position.set(0, 0, 0);

        solarSystem.add(sun);
        objects.push(sun);
    });
    
    this.update = function () {
        // do something
    }
}