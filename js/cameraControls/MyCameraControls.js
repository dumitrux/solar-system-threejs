function MyCameraControls(camera, canvas) {
    const controls = new THREE.OrbitControls(camera, canvas);    

    this.update = function () {
        controls.update();
    }

    // limit the zooming
    controls.minDistance = 20;
    controls.maxDistance = 1250;
    //controls.zoomSpeed = 0.5;
}