/*
Every logical component inside the scene should have its own separate component.
A SceneSubject has a basic interface:
    * a constructor that takes a Scene object.
    * a public method called update().
    * 
Here is the basic structure of a SceneSubject:
*/

function SceneSubjectTemplate(scene) {
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    this.update = function () {
        // do something
    }
}