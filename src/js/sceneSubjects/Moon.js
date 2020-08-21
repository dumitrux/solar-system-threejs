function Moon(scene, moonOrbit, objects) {
    const loader = new THREE.TextureLoader();
    
    loader.load('../textures/moon.jpg', function (texture) {
        var geometry = new THREE.SphereGeometry(3, 12, 18);

        var material = new THREE.MeshPhongMaterial({ map: texture, overdraw: 0.5 });
        var moonMesh = new THREE.Mesh(geometry, material);

        //earth.position.set(100, 0, 0);

        moonOrbit.add(moonMesh);
        objects.push(moonMesh);
    });

    this.update = function () {
        // do something
    }
}