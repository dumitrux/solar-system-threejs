function Earth(scene, earthOrbit, objects) {
    const loader = new THREE.TextureLoader();
    
    loader.load('../textures/earth.png', function (texture) {
        var geometry = new THREE.SphereGeometry(10, 12, 18);

        var material = new THREE.MeshPhongMaterial({ map: texture, overdraw: 0.5 });
        var earth = new THREE.Mesh(geometry, material);

        //earth.position.set(100, 0, 0);

        earthOrbit.add(earth);
        objects.push(earth);
    });
    
    this.update = function () {
        // do something
    }
}