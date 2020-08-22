function Earth(scene, earthOrbit, objects, loader) {
    var earthMesh;

    loader.load(
        // resource
        '../../assets/textures/earth.jpg',

        // onLoad callback
        function (texture) {
            var geometry = new THREE.SphereGeometry(10, 32, 16);

            var material = new THREE.MeshPhongMaterial({ map: texture });
            earthMesh = new THREE.Mesh(geometry, material);

            //earth.position.set(100, 0, 0);
            console.log(earthMesh.position);

            earthOrbit.add(earthMesh);
            objects.push(earthMesh);

            console.log("EARTH");
            console.log(earthMesh);
            return earthMesh;
        },

        // onError callback
        function (err) {
            console.error('Error on load earth texture.');
        }
    );
}