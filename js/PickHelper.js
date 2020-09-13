class PickHelper {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
    }

    pick(normalizedPosition, getAstrionomicalBodies, camera, time, scene) {
        // restore the color if there is a picked object
        if (this.pickedObject) {
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
            this.pickedObjectSavedColor = this.pickedObject.material.color;
            // set its emissive color to flashing red/yellow
            this.pickedObject.material.color = new THREE.Color((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
            this.openModal(this.pickedObject.position.x);
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

    openModal(positionX) {
        // Get the modal
        var modal = document.getElementById("myModal");

        var name = document.getElementById("nameOfObject");
        var planetSymbol = document.getElementById("planetSymbol");
        var volumeXEarths = document.getElementById("volumeXEarths");
        var orbitDistance = document.getElementById("orbitDistance");
        var equatorialRadius = document.getElementById("equatorialRadius");
        var surfaceGravity = document.getElementById("surfaceGravity");
        var rotationPeriodEarthDays = document.getElementById("rotationPeriodEarthDays");
        var orbitalPeriod = document.getElementById("orbitalPeriod");
        var meanOrbitVelocity = document.getElementById("meanOrbitVelocity");
        var atmoshpericConstituents = document.getElementById("atmoshpericConstituents");
        var moons = document.getElementById("moons");
        var rings = document.getElementById("rings");
        var adjective = document.getElementById("adjective");
        

        modal.style.display = "block";

        name.innerHTML = AstronomicalBodiesNames[positionX].name + "  ";
        planetSymbol.src = "./assets/astronomical-symbol/" +
                AstronomicalBodiesNames[positionX].name + "-symbol.png";
        volumeXEarths.innerHTML = AstronomicalBodiesNames[positionX].volumeXEarths;
        orbitDistance.innerHTML = AstronomicalBodiesNames[positionX].orbitDistance;
        equatorialRadius.innerHTML = AstronomicalBodiesNames[positionX].equatorialRadius;
        surfaceGravity.innerHTML = AstronomicalBodiesNames[positionX].surfaceGravity;
        rotationPeriodEarthDays.innerHTML = AstronomicalBodiesNames[positionX].rotationPeriodEarthDays;
        orbitalPeriod.innerHTML = AstronomicalBodiesNames[positionX].orbitalPeriod;
        meanOrbitVelocity.innerHTML = AstronomicalBodiesNames[positionX].meanOrbitVelocity;
        surfaceTemperature.innerHTML = AstronomicalBodiesNames[positionX].surfaceTemperature;
        atmoshpericConstituents.innerHTML = AstronomicalBodiesNames[positionX].atmoshpericConstituents;
        moons.innerHTML = AstronomicalBodiesNames[positionX].moons;
        rings.innerHTML = AstronomicalBodiesNames[positionX].rings;
        adjective.innerHTML = AstronomicalBodiesNames[positionX].adjective;
    }
}


// Astronomical bodie name with its position (x)
// This should be in a JSON file :/
var AstronomicalBodiesNames = {
    0: {
        "name": "Sun",
        "volumeXEarths": "1,300,000 ",
        "orbitDistance": "0",
        "equatorialRadius": "695,508",
        "surfaceGravity": "274",
        "rotationPeriodEarthDays": "25",
        "orbitalPeriod": "NA",
        "meanOrbitVelocity": "NA",
        "surfaceTemperature": "5505",
        "atmoshpericConstituents": "Hydrogen, Helium",
        "moons": "NA",
        "rings": "No",
        "adjective": "Solar",
    },
    60: {
        "name": "Mercury",
        "volumeXEarths": "0.056",
        "orbitDistance": "57,909,227",
        "equatorialRadius": "2,439",
        "surfaceGravity": "3.7",
        "rotationPeriodEarthDays": "58",
        "orbitalPeriod": "88",
        "meanOrbitVelocity": "107,218",
        "surfaceTemperature": "-173/427",
        "atmoshpericConstituents": "Potassium, Sodium, Atomic oxygen",
        "moons": "0",
        "rings": "No",
        "adjective": "Mercurian, Mercurial",
    },
    80: {
        "name": "Venus",
        "volumeXEarths": "0.866",
        "orbitDistance": "108,209,475",
        "equatorialRadius": "6,051",
        "surfaceGravity": "8.9",
        "rotationPeriodEarthDays": "-243",
        "orbitalPeriod": "225",
        "meanOrbitVelocity": "126,074",
        "surfaceTemperature": "462",
        "atmoshpericConstituents": "Carbon Dioxide, Nitrogen",
        "moons": "0",
        "rings": "No",
        "adjective": "Venusian",
    },
    110: {
        "name": "Earth",
        "volumeXEarths": "1",
        "orbitDistance": "149,598,262",
        "equatorialRadius": "6,371",
        "surfaceGravity": "9.8",
        "rotationPeriodEarthDays": "1",
        "orbitalPeriod": "365",
        "meanOrbitVelocity": "107,218",
        "surfaceTemperature": "-88/58",
        "atmoshpericConstituents": "Nitrogen, Oxygen",
        "moons": "1",
        "rings": "No",
        "adjective": "Terrestrial, Terran",
    },
    18: {
        "name": "Moon",
        "volumeXEarths": "0.02",
        "orbitDistance": "384,400",
        "equatorialRadius": "1,738",
        "surfaceGravity": "1.62",
        "rotationPeriodEarthDays": "-",
        "orbitalPeriod": "27",
        "meanOrbitVelocity": "3679",
        "surfaceTemperature": "-130/120",
        "atmoshpericConstituents": "Nitrogen, Oxygen",
        "moons": "0",
        "rings": "No",
        "adjective": "Lunar",
    },
    150: {        
        "name": "Mars",
        "volumeXEarths": "0.151",
        "orbitDistance": "227,943,824",
        "equatorialRadius": "3,389",
        "surfaceGravity": "3.7",
        "rotationPeriodEarthDays": "1",
        "orbitalPeriod": "687",
        "meanOrbitVelocity": "86,677",
        "surfaceTemperature": "-153/20",
        "atmoshpericConstituents": "Carbon Dioxide, Nitrogen, Argon",
        "moons": "2",
        "rings": "No",
        "adjective": "Martian",
    },
    220: {
        "name": "Jupiter",
        "volumeXEarths": "1,321",
        "orbitDistance": "778,340,821",
        "equatorialRadius": "69,911",
        "surfaceGravity": "24.8",
        "rotationPeriodEarthDays": "0.41",
        "orbitalPeriod": "4,333",
        "meanOrbitVelocity": "47,002",
        "surfaceTemperature": "NA",
        "atmoshpericConstituents": "Hydrogen, Helium",
        "moons": "79",
        "rings": "Yes",
        "adjective": "Jovian",
    },
    320: {
        "name": "Saturn",
        "volumeXEarths": "764",
        "orbitDistance": "1,426,666,422",
        "equatorialRadius": "58,232",
        "surfaceGravity": "10.4",
        "rotationPeriodEarthDays": "0.44",
        "orbitalPeriod": "10,759",
        "meanOrbitVelocity": "34,701",
        "surfaceTemperature": "NA",
        "atmoshpericConstituents": "Hydrogen, Helium",
        "moons": "83",
        "rings": "Yes",
        "adjective": "Saturnian",
    },
    420: {
        "name": "Uranus",
        "volumeXEarths": "63",
        "orbitDistance": "2,870,658,186",
        "equatorialRadius": "25,362",
        "surfaceGravity": "8.9",
        "rotationPeriodEarthDays": "-0.72",
        "orbitalPeriod": "30,687",
        "meanOrbitVelocity": "24,477",
        "surfaceTemperature": "NA",
        "atmoshpericConstituents": "Hydrogen, Helium, Methane",
        "moons": "27",
        "rings": "Yes",
        "adjective": "Saturnian",
    },
    500: {
        "name": "Neptune",
        "volumeXEarths": "58",
        "orbitDistance": "4,498,396,441",
        "equatorialRadius": "24,622",
        "surfaceGravity": "11.2",
        "rotationPeriodEarthDays": "0.67",
        "orbitalPeriod": "60,190",
        "meanOrbitVelocity": "19,566",
        "surfaceTemperature": "NA",
        "atmoshpericConstituents": "Hydrogen, Helium, Methane",
        "moons": "14",
        "rings": "Yes",
        "adjective": "Neptunian",
    }
};