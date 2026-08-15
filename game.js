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

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document.body.appendChild(
    renderer.domElement
);


// ======================================================
// POINTER LOCK
// ======================================================

const controls =
    new PointerLockControls(
        camera,
        document.body
    );

const startScreen =
    document.getElementById(
        "start-screen"
    );

const startButton =
    document.getElementById(
        "start-button"
    );

const crosshair =
    document.getElementById(
        "crosshair"
    );

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

        startScreen.style.display =
            "none";

        crosshair.style.display =
            "block";

    }
);


controls.addEventListener(
    "unlock",
    () => {

        if (gameStarted) {

            startScreen.style.display =
                "none";

            crosshair.style.display =
                "none";

        }

    }
);


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
// BOX MAKER
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
// ROOM SIZE
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
// THIS IS THE TV / WINDOW WALL

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


// DOOR WINDOW

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

    // WINDOW SURFACE

    makeBox(
        0.08,
        1.8,
        4.4,
        windowMaterial,
        -6.88,
        2.2,
        z
    );


    // BLIND SLATS

    const slats = 12;


    for (
        let i = 0;
        i < slats;
        i++
    ) {

        const y =
            1.4 +
            i * 0.145;


        makeBox(
            0.1,
            0.035,
            4.2,
            blindMaterial,
            -6.80,
            y,
            z
        );

    }

}


// ONE WINDOW ON EACH SIDE OF TV

createWindow(
    -3.8
);

createWindow(
    3.8
);


// ======================================================
// TV
// ======================================================

// TV IS SLIGHTLY FARTHER INTO THE ROOM
// THAN THE BLINDS.
//
// THIS MAKES IT LOOK LIKE IT IS ON THE
// LAYER ABOVE THEM.

makeBox(
    0.18,
    2.35,
    4.8,
    blackMaterial,
    -6.65,
    2.2,
    0
);


// ======================================================
// COLLISION DATA
// ======================================================

const colliders = [];


function addCollider(
    x,
    z,
    width,
    depth
) {

    colliders.push({

        minX:
            x - width / 2,

        maxX:
            x + width / 2,

        minZ:
            z - depth / 2,

        maxZ:
            z + depth / 2

    });

}


// ======================================================
// TABLE MAKER
// ======================================================

function createTable(
    x,
    z,
    rotation = Math.PI / 2
) {

    const table =
        new THREE.Group();


    // TABLETOP

    const top =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                3.2,
                0.16,
                1.45
            ),

            tableMaterial

        );


    top.position.y =
        0.95;


    table.add(
        top
    );


    // LEGS

    const legs = [

        [-1.35, -0.55],

        [1.35, -0.55],

        [-1.35, 0.55],

        [1.35, 0.55]

    ];


    legs.forEach(
        ([lx, lz]) => {

            const leg =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        0.12,
                        0.9,
                        0.12
                    ),

                    metalMaterial

                );


            leg.position.set(
                lx,
                0.45,
                lz
            );


            table.add(
                leg
            );

        }
    );


    table.position.set(
        x,
        0,
        z
    );


    table.rotation.y =
        rotation;


    table.traverse(
        object => {

            if (
                object.isMesh
            ) {

                object.castShadow =
                    true;

                object.receiveShadow =
                    true;

            }

        }
    );


    scene.add(
        table
    );


    // TABLES ARE ROTATED 90 DEGREES,
    // SO COLLISION WIDTH/DEPTH ARE SWAPPED.

    addCollider(
        x,
        z,
        1.7,
        3.45
    );

}


// ======================================================
// CHAIR MAKER
// ======================================================

function createChair(
    x,
    z,
    rotation = 0
) {

    const chair =
        new THREE.Group();


    // SEAT

    const seat =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.65,
                0.12,
                0.65
            ),

            chairMaterial

        );


    seat.position.y =
        0.55;


    chair.add(
        seat
    );


    // BACK

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


    chair.add(
        back
    );


    // LEGS

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


            chair.add(
                leg
            );

        }
    );


    chair.position.set(
        x,
        0,
        z
    );


    chair.rotation.y =
        rotation;


    chair.traverse(
        object => {

            if (
                object.isMesh
            ) {

                object.castShadow =
                    true;

                object.receiveShadow =
                    true;

            }

        }
    );


    scene.add(
        chair
    );

}


// ======================================================
// CLASSROOM TABLE + 4 CHAIRS
// ======================================================

function classroomTable(
    x,
    z
) {

    // ROTATED TABLE
    // LONG SIDE RUNS TOWARD / AWAY FROM TV

    createTable(
        x,
        z,
        Math.PI / 2
    );


    // ==================================================
    // FOUR STUDENT CHAIRS
    //
    // ALL FOUR ARE ON THE SIDE AWAY FROM THE TV.
    //
    // THEY ALL FACE LEFT TOWARD THE TV.
    // ==================================================


    createChair(
        x + 1.25,
        z - 1.15,
        Math.PI / 2
    );


    createChair(
        x + 1.25,
        z - 0.38,
        Math.PI / 2
    );


    createChair(
        x + 1.25,
        z + 0.38,
        Math.PI / 2
    );


    createChair(
        x + 1.25,
        z + 1.15,
        Math.PI / 2
    );

}


// ======================================================
// CLASSROOM LAYOUT
// ======================================================

// TABLES CLOSEST TO TV

classroomTable(
    -2.8,
    -5
);


classroomTable(
    -2.8,
    0
);


classroomTable(
    -2.8,
    5
);


// SECOND SET OF TABLES

classroomTable(
    1.3,
    -5
);


classroomTable(
    1.3,
    0
);


classroomTable(
    1.3,
    5
);


// ======================================================
// MRS. SISSOM'S DESK
// ======================================================

makeBox(
    3.7,
    0.18,
    1.8,
    tableMaterial,
    4.6,
    0.95,
    7.6
);


// DESK LEG 1

makeBox(
    0.14,
    0.9,
    0.14,
    metalMaterial,
    3,
    0.45,
    6.9
);


// DESK LEG 2

makeBox(
    0.14,
    0.9,
    0.14,
    metalMaterial,
    6.2,
    0.45,
    6.9
);


// DESK LEG 3

makeBox(
    0.14,
    0.9,
    0.14,
    metalMaterial,
    3,
    0.45,
    8.3
);


// DESK LEG 4

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


// ======================================================
// MRS. SISSOM'S CHAIR
// ======================================================
//
// IMPORTANT:
// WE ARE LEAVING THIS ROTATION EXACTLY
// THE WAY IT ALREADY WAS.
//

createChair(
    4.6,
    8.8,
    Math.PI
);


// ======================================================
// CEILING LIGHT MAKER
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


    light.castShadow =
        true;


    light.shadow.bias =
        -0.001;


    scene.add(
        light
    );

}


// TWO CLASSROOM LIGHTS

createCeilingLight(
    0,
    -4
);


createCeilingLight(
    0,
    3
);


// ======================================================
// GENERAL ROOM LIGHT
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


// ======================================================
// SUNLIGHT
// ======================================================

const sun =
    new THREE.DirectionalLight(
        0xfff4d6,
        1.15
    );


sun.position.set(
    -8,
    6,
    5
);


// IMPORTANT:
//
// THE OLD DIRECTIONAL-LIGHT SHADOW WAS
// CAUSING THOSE GIANT TRIANGLES.
//
// KEEP THE LIGHT, BUT DON'T LET IT CAST
// THE WEIRD GIANT SHADOWS.

sun.castShadow =
    false;


scene.add(
    sun
);


// ======================================================
// KEYBOARD
// ======================================================

const keys = {};


document.addEventListener(
    "keydown",
    event => {

        keys[event.code] =
            true;

    }
);


document.addEventListener(
    "keyup",
    event => {

        keys[event.code] =
            false;

    }
);


// ======================================================
// PLAYER COLLISION
// ======================================================

const playerRadius =
    0.32;


function collidingWithFurniture(
    x,
    z
) {

    for (
        const collider
        of colliders
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


// ======================================================
// KEEP PLAYER INSIDE ROOM
// ======================================================

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


    camera.position.y =
        1.65;

}


// ======================================================
// CLOCK
// ======================================================

const clock =
    new THREE.Clock();


// ======================================================
// GAME LOOP
// ======================================================

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


        // W

        if (
            keys["KeyW"]
        ) {

            controls.moveForward(
                movementSpeed
            );

        }


        // S

        if (
            keys["KeyS"]
        ) {

            controls.moveForward(
                -movementSpeed
            );

        }


        // A

        if (
            keys["KeyA"]
        ) {

            controls.moveRight(
                -movementSpeed
            );

        }


        // D

        if (
            keys["KeyD"]
        ) {

            controls.moveRight(
                movementSpeed
            );

        }


        // DON'T LEAVE ROOM

        keepInsideRoom();


        // DON'T WALK THROUGH TABLES

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
