function MyCameraControls(camera, canvas) {
    const controls = new THREE.OrbitControls(camera, canvas);    

    this.update = function () {
        controls.update();
    }
}