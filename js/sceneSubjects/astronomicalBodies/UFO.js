function UFO(scene) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('./img/ufo/Low_poly_UFO.mtl', (mtlParseResult) => {
        const objLoader = new OBJLoader2();
        const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
        objLoader.addMaterials(materials);
        objLoader.load('./img/ufo/Low_poly_UFO.obj', (root) => {
            scene.add(root);
            //console.log(root)
            root.scale.set(0.1, 0.1, 0.1)
            root.position.set(100, 20, 0);


            /*
            // compute the box that contains all the stuff
            // from root and below
            const box = new THREE.Box3().setFromObject(root);
    
            const boxSize = box.getSize(new THREE.Vector3()).length();
            const boxCenter = box.getCenter(new THREE.Vector3());
            
            console.log(boxSize);
            console.log(boxCenter);
            // set the camera to frame the box
            frameArea(boxSize * 1.2, boxSize, boxCenter, camera);
            
    
            // update the Trackball controls to handle the new size
            controls.maxDistance = boxSize * 10;
            controls.target.copy(boxCenter);
            controls.update();
            */
        });
    });

    this.update = function () {
        // do something
    }
}