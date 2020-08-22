function Moon(scene, moonOrbit, objects, loader) {
    var moonMesh;

    loader.load(
        // resource
        '../../assets/textures/moon.jpg',

        // onLoad callback
        function (texture) {
            var geometry = new THREE.SphereGeometry(3, 32, 16);

            var material = new THREE.MeshPhongMaterial({ map: texture });
            moonMesh = new THREE.Mesh(geometry, material);

            //moon.position.set(100, 0, 0);
            //console.log(moonMesh.position);

            moonOrbit.add(moonMesh);
            objects.push(moonMesh);
        },

        // onError callback
        function (err) {
            console.error('Error on load moon texture.');
        }
    );

    return moonMesh;

    this.update = function () {
        // do something
    }
}