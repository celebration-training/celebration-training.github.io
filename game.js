import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x8f908b);

scene.fog = new THREE.Fog(
    0x8f908b,
    18,
    32
);


// ======================================================
// CAMERA
// ======================================================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(
    0,
    1.65,
    8
);


// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(
    renderer.domElement
);


// ======================================================
// POINTER LOCK
// ======================================================

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

let gameStarted = false;


startButton.addEventListener(
    "click",
    () => {

        gameStarted = true;

        controls.lock();

    }
);


controls.addEventListener(
    "lock",
    () => {

        startScreen.style.display = "none";

        crosshair.style.display = "block";

    }
);


// IMPORTANT:
//
// Losing mouse lock will NOT throw you
// back to the start screen anymore.

controls.addEventListener(
    "unlock",
    () => {

        if (gameStarted) {

            startScreen.style.display = "none";

            crosshair.style.display = "none";

        }

    }
);


// Click the game to regain mouse control.

renderer.domElement.addEventListener(
    "click",
    () => {

        if (
            gameStarted &&
            !controls.isLocked
        ) {

            controls.lock();

        }

    }
);


// ======================================================
// MATERIALS
// ======================================================

const wallMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xa7acb2,
        roughness: 0.95
    });


const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x70777d,
        roughness: 1
    });


const ceilingMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xc4c6c7,
        roughness: 1
    });


const tableMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x95662d,
        roughness: 0.8
    });


const metalMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x555b60,
        roughness: 0.7
    });


const chairMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x25292d,
        roughness: 0.9
    });


const blackMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x090909,
        roughness: 0.7
    });


const doorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x85613d,
        roughness: 0.8
    });


const blindMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xc8cdd0,
        roughness: 0.7
    });


const windowMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x889ba5,
        roughness: 0.2
    });


const lightMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xffffff,

        emissive: 0xffffff,

        emissiveIntensity: 1.5

    });


// ======================================================
// BOX CREATOR
// ======================================================

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


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    scene.add(mesh);


    return mesh;

}


// ======================================================
// ROOM DIMENSIONS
// ======================================================

const roomWidth = 14;
const roomDepth = 20;
const roomHeight = 4;


// ======================================================
// FLOOR
// ======================================================

makeBox(
    roomWidth,
    0.2,
    roomDepth,
    floorMaterial,
    0,
    -0.1,
    0
);


// ======================================================
// CEILING
// ======================================================

makeBox(
    roomWidth,
    0.2,
    roomDepth,
    ceilingMaterial,
    0,
    roomHeight,
    0
);


// ======================================================
// WALLS
// ======================================================

// FRONT WALL

makeBox(
    roomWidth,
    roomHeight,
    0.2,
    wallMaterial,
    0,
    2,
    -10
);


// BACK WALL

makeBox(
    roomWidth,
    roomHeight,
    0.2,
    wallMaterial,
    0,
    2,
    10
);


// LEFT WALL

makeBox(
    0.2,
    roomHeight,
    roomDepth,
    wallMaterial,
    -7,
    2,
    0
);


// RIGHT WALL

makeBox(
    0.2,
    roomHeight,
    roomDepth,
    wallMaterial,
    7,
    2,
    0
);


// ======================================================
// TV / BLACK SCREEN
// ======================================================

makeBox(
    5,
    2.4,
    0.15,
    blackMaterial,
    2.7,
    2.2,
    -9.82
);


// ======================================================
// DOOR
// ======================================================

makeBox(
    1.8,
    3.1,
    0.12,
    doorMaterial,
    -4.5,
    1.55,
    -9.83
);


// Door window

makeBox(
    0.65,
    1.25,
    0.05,
    windowMaterial,
    -4.5,
    2.05,
    -9.74
);


// ======================================================
// WINDOWS + BLINDS
// ======================================================

function createWindow(z) {

    // window

    makeBox(
        0.08,
        1.8,
        4.2,
        windowMaterial,
        -6.88,
        2.2,
        z
    );


    // blinds

    const slats = 12;


    for (
        let i = 0;
        i < slats;
        i++
    ) {

        const y =
            1.4 + i * 0.145;


        makeBox(
            0.1,
            0.035,
            4,
            blindMaterial,
            -6.80,
            y,
            z
        );

    }

}


createWindow(-4.4);

createWindow(3.5);


// ======================================================
// TABLES
// ======================================================

const colliders = [];


function addCollider(
    x,
    z,
    width,
    depth
) {

    colliders.push({

        minX: x - width / 2,

        maxX: x + width / 2,

        minZ: z - depth / 2,

        maxZ: z + depth / 2

    });

}


function createTable(
    x,
    z
) {

    // tabletop

    makeBox(
        3.2,
        0.16,
        1.45,
        tableMaterial,
        x,
        0.95,
        z
    );


    // legs

    const legs = [

        [-1.35, -0.55],

        [1.35, -0.55],

        [-1.35, 0.55],

        [1.35, 0.55]

    ];


    legs.forEach(
        ([lx, lz]) => {

            makeBox(
                0.12,
                0.9,
                0.12,
                metalMaterial,
                x + lx,
                0.45,
                z + lz
            );

        }
    );


    addCollider(
        x,
        z,
        3.45,
        1.7
    );

}


// ======================================================
// CHAIRS
// ======================================================

function createChair(
    x,
    z,
    rotation = 0
) {

    const chair =
        new THREE.Group();


    // seat

    const seat =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.65,
                0.12,
                0.65
            ),

            chairMaterial

        );


    seat.position.y = 0.55;


    chair.add(seat);


    // back

    const back =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.65,
                0.75,
                0.12
            ),

            chairMaterial

        );


    back.position.set(
        0,
        0.95,
        0.28
    );


    chair.add(back);


    // legs

    const legLocations = [

        [-0.24, -0.24],

        [0.24, -0.24],

        [-0.24, 0.24],

        [0.24, 0.24]

    ];


    legLocations.forEach(
        ([lx, lz]) => {

            const leg =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        0.07,
                        0.55,
                        0.07
                    ),

                    metalMaterial

                );


            leg.position.set(
                lx,
                0.275,
                lz
            );


            chair.add(leg);

        }
    );


    chair.position.set(
        x,
        0,
        z
    );


    chair.rotation.y = rotation;


    chair.traverse(
        object => {

            if (object.isMesh) {

                object.castShadow = true;

                object.receiveShadow = true;

            }

        }
    );


    scene.add(chair);

}


// ======================================================
// TABLE + CHAIR GROUP
// ======================================================

function classroomTable(
    x,
    z
) {

    createTable(
        x,
        z
    );


    // two chairs on one side

    createChair(
        x - 0.8,
        z + 1.05,
        Math.PI
    );


    createChair(
        x + 0.8,
        z + 1.05,
        Math.PI
    );


    // one chair opposite

    createChair(
        x,
        z - 1.05,
        0
    );

}


// ======================================================
// CLASSROOM LAYOUT
// ======================================================

// Front row

classroomTable(
    -2.4,
    -5.2
);


classroomTable(
    2.2,
    -5.2
);


// Middle row

classroomTable(
    -2.4,
    -1.5
);


classroomTable(
    2.2,
    -1.5
);


// Back row

classroomTable(
    -2.4,
    2.2
);


classroomTable(
    2.2,
    2.2
);


// ======================================================
// MRS. SISSOM'S DESK
// ======================================================

// opposite back corner

makeBox(
    3.7,
    0.18,
    1.8,
    tableMaterial,
    4.6,
    0.95,
    7.6
);


makeBox(
    0.14,
    0.9,
    0.14,
    metalMaterial,
    3,
    0.45,
    6.9
);


makeBox(
    0.14,
    0.9,
    0.14,
    metalMaterial,
    6.2,
    0.45,
    6.9
);


makeBox(
    0.14,
    0.9,
    0.14,
    metalMaterial,
    3,
    0.45,
    8.3
);


makeBox(
    0.14,
    0.9,
    0.14,
    metalMaterial,
    6.2,
    0.45,
    8.3
);


addCollider(
    4.6,
    7.6,
    4,
    2.1
);


// Teacher chair

createChair(
    4.6,
    8.8,
    Math.PI
);


// ======================================================
// CEILING LIGHTS
// ======================================================

function createCeilingLight(
    x,
    z
) {

    makeBox(
        2.2,
        0.05,
        0.65,
        lightMaterial,
        x,
        3.88,
        z
    );


    const light =
        new THREE.PointLight(
            0xffffff,
            22,
            12,
            2
        );


    light.position.set(
        x,
        3.6,
        z
    );


    light.castShadow = true;


    scene.add(light);

}


createCeilingLight(
    0,
    -4
);


createCeilingLight(
    0,
    3
);


// ======================================================
// GENERAL LIGHT
// ======================================================

const hemisphere =
    new THREE.HemisphereLight(
        0xffffff,
        0x555555,
        1.35
    );


scene.add(
    hemisphere
);


// sunlight

const sun =
    new THREE.DirectionalLight(
        0xfff4d6,
        1.3
    );


sun.position.set(
    -8,
    6,
    5
);


sun.castShadow = true;


scene.add(
    sun
);


// ======================================================
// MOVEMENT
// ======================================================

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


// ======================================================
// COLLISION
// ======================================================

const playerRadius = 0.32;


function collidingWithFurniture(
    x,
    z
) {

    for (
        const collider of colliders
    ) {

        if (

            x + playerRadius >
            collider.minX &&

            x - playerRadius <
            collider.maxX &&

            z + playerRadius >
            collider.minZ &&

            z - playerRadius <
            collider.maxZ

        ) {

            return true;

        }

    }


    return false;

}


function keepInsideRoom() {

    camera.position.x =
        THREE.MathUtils.clamp(
            camera.position.x,
            -6.55,
            6.55
        );


    camera.position.z =
        THREE.MathUtils.clamp(
            camera.position.z,
            -9.5,
            9.5
        );


    camera.position.y = 1.65;

}


// ======================================================
// GAME LOOP
// ======================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    if (
        controls.isLocked
    ) {

        const previousX =
            camera.position.x;


        const previousZ =
            camera.position.z;


        const movementSpeed =
            4.1 * delta;


        if (
            keys["KeyW"]
        ) {

            controls.moveForward(
                movementSpeed
            );

        }


        if (
            keys["KeyS"]
        ) {

            controls.moveForward(
                -movementSpeed
            );

        }


        if (
            keys["KeyA"]
        ) {

            controls.moveRight(
                -movementSpeed
            );

        }


        if (
            keys["KeyD"]
        ) {

            controls.moveRight(
                movementSpeed
            );

        }


        keepInsideRoom();


        if (
            collidingWithFurniture(
                camera.position.x,
                camera.position.z
            )
        ) {

            camera.position.x =
                previousX;


            camera.position.z =
                previousZ;

        }

    }


    renderer.render(
        scene,
        camera
    );

}


animate();


// ======================================================
// WINDOW RESIZE
// ======================================================

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
