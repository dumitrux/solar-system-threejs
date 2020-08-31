class PickHelper {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
    }

    pick(normalizedPosition, getAstrionomicalBodies, camera, time, scene) {
        // restore the color if there is a picked object
        if (this.pickedObject) {
            //this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
            this.pickedObject.material.color = this.pickedObjectSavedColor;
            this.pickedObject = undefined;
        }

        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera);

        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(getAstrionomicalBodies);
        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[0].object;
            // save its color
            //this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
            this.pickedObjectSavedColor = this.pickedObject.material.color;
            // set its emissive color to flashing red/yellow
            //this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
            this.pickedObject.material.color = new THREE.Color((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
            //this.addSprite(scene, this.pickedObject.position);
        }
    }

    addSprite(scene, position) {
        var spriteMap = new THREE.TextureLoader().load("assets/textures/moon.jpg");
        var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(position.x, position.y + 20, position.z);
        sprite.scale.set(10, 10, 10);
        scene.add(sprite);
    }
}