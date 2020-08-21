function MyCameraControls(camera, scene) {
    const controls = new OrbitControls(camera, scene);
    scene.add(controls.getObject());
}