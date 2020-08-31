function SunLight(scene) {
    const color = 0xFFFFFF;
    const intensity = 0.5;
    const sunLight = new THREE.PointLight(color, intensity);
    sunLight.position.set(0, 0, 0);

    scene.add(sunLight)

    this.update = function () {
        // do something
    }

    //gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    //gui.add(light, 'intensity', 0.1, 2, 0.01);
}