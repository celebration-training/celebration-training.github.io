import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";


// --------------------
// SCENE
// --------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9b9b92);


// --------------------
// CAMERA
// --------------------

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.7, 7);


// --------------------
// RENDERER
// --------------------

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


// --------------------
// FIRST PERSON CONTROLS
// --------------------

const controls = new PointerLockControls(
    camera,
    document.body
);

const startScreen =
    document.getElementById("start-screen");

const startButton =
    document.getElementById("start-button");

const crosshair =
    document.getElementById("crosshair");


startButton.addEventListener("click", () => {
    controls.lock();
});


controls.addEventListener("lock", () => {
    startScreen.style.display = "none";
    crosshair.style.display = "block";
});


controls.addEventListener("unlock", () => {
    startScreen.style.display = "flex";
    crosshair.style.display = "none";
});


// --------------------
// LIGHTING
// --------------------

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.4
    );

scene.add(ambientLight);


const ceilingLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

ceilingLight.position.set(
    0,
    8,
    2
);

ceilingLight.castShadow = true;

scene.add(ceilingLight);


// --------------------
// MATERIALS
// --------------------

const wallMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xb8b8ae
    });

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x77776f
    });

const ceilingMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xd5d5cc
    });

const woodMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x7a5235
    });

const blackMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x1c1c1c
    });


// --------------------
// HELPER FUNCTION
// --------------------

function makeBox(
    width,
    height,
    depth,
    material,
    x,
    y,
    z
) {

    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );

    const object =
        new THREE.Mesh(
            geometry,
            material
        );

    object.position.set(
        x,
        y,
        z
    );

    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);

    return object;
}


// --------------------
// ROOM
// --------------------

// floor
makeBox(
    14,
    0.2,
    18,
    floorMaterial,
    0,
    0,
    0
);


// ceiling
makeBox(
    14,
    0.2,
    18,
    ceilingMaterial,
    0,
    4,
    0
);


// back wall
makeBox(
    14,
    4,
    0.2,
    wallMaterial,
    0,
    2,
    -9
);


// front wall
makeBox(
    14,
    4,
    0.2,
    wallMaterial,
    0,
    2,
    9
);


// left wall
makeBox(
    0.2,
    4,
    18,
    wallMaterial,
    -7,
    2,
    0
);


// right wall
makeBox(
    0.2,
    4,
    18,
    wallMaterial,
    7,
    2,
    0
);


// --------------------
// SCREEN / BOARD
// --------------------

makeBox(
    5,
    2.5,
    0.15,
    blackMaterial,
    0,
    2.2,
    -8.8
);


// --------------------
// TABLE FUNCTION
// --------------------

function createTable(x, z) {

    makeBox(
        3,
        0.18,
        1.5,
        woodMaterial,
        x,
        1,
        z
    );

    const legPositions = [
        [-1.25, -0.55],
        [1.25, -0.55],
        [-1.25, 0.55],
        [1.25, 0.55]
    ];

    legPositions.forEach(([lx, lz]) => {

        makeBox(
            0.12,
            1,
            0.12,
            blackMaterial,
            x + lx,
            0.5,
            z + lz
        );

    });
}


// --------------------
// CLASSROOM TABLES
// --------------------

createTable(-3.5, -3);
createTable(0, -3);
createTable(3.5, -3);

createTable(-3.5, 1);
createTable(0, 1);
createTable(3.5, 1);


// --------------------
// MRS. SISSOM'S DESK
// --------------------

makeBox(
    3.5,
    0.2,
    1.7,
    woodMaterial,
    4.7,
    1,
    6.5
);


// desk legs

makeBox(
    0.15,
    1,
    0.15,
    blackMaterial,
    3.2,
    0.5,
    6
);

makeBox(
    0.15,
    1,
    0.15,
    blackMaterial,
    6.2,
    0.5,
    6
);

makeBox(
    0.15,
    1,
    0.15,
    blackMaterial,
    3.2,
    0.5,
    7
);

makeBox(
    0.15,
    1,
    0.15,
    blackMaterial,
    6.2,
    0.5,
    7
);


// --------------------
// MOVEMENT
// --------------------

const keys = {};

document.addEventListener(
    "keydown",
    event => {
        keys[event.code] = true;
    }
);

document.addEventListener(
    "keyup",
    event => {
        keys[event.code] = false;
    }
);


const clock = new THREE.Clock();


// --------------------
// GAME LOOP
// --------------------

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    const speed = 5 * delta;

    if (controls.isLocked) {

        if (keys["KeyW"])
            controls.moveForward(speed);

        if (keys["KeyS"])
            controls.moveForward(-speed);

        if (keys["KeyA"])
            controls.moveRight(-speed);

        if (keys["KeyD"])
            controls.moveRight(speed);

    }

    renderer.render(
        scene,
        camera
    );
}

animate();


// --------------------
// WINDOW RESIZE
// --------------------

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
