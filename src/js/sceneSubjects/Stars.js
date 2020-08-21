function Stars(scene) {
    var vertices = [];

    for (var i = 0; i < 6000; i++) {
        var x = THREE.MathUtils.randFloatSpread(600);
        var y = THREE.MathUtils.randFloat(-300, 300);
        var z = THREE.MathUtils.randFloat(-300, 300);

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

    this.update = function () {
        // do something
    }
}