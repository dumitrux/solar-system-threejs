function Sun(scene, solarSystem, objects, loader) {
    var sunMesh;

    loader.load(
        // resource
        '../../assets/textures/sun.jpg',

        // onLoad callback
        function (texture) {
            var geometry = new THREE.SphereGeometry(30, 32, 16);

            var material = new THREE.MeshBasicMaterial({ map: texture });
            sunMesh = new THREE.Mesh(geometry, material);

            //sun.position.set(0, 0, 0);
            //console.log(sunMesh.position);

            solarSystem.add(sunMesh);
            objects.push(sunMesh);
        },

        // onError callback
        function (err) {
            console.error('Error on load moon texture.');
        }
    );

    return sunMesh;

    this.update = function () {
        // do something
    }
}