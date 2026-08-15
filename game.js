import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";


// =====================================================
// SCENE / CAMERA / RENDERER
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x8f908b);

scene.fog = new THREE.Fog(
    0x8f908b,
    18,
    32
);


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


const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


document.body.appendChild(
    renderer.domElement
);


// =====================================================
// POINTER LOCK / START SCREEN
// =====================================================

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

let gameOver = false;


startButton.addEventListener(
    "click",
    () => {

        if (!gameStarted) {

            startGame();

        }


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
            !gameOver &&
            !controls.isLocked
        ) {

            controls.lock();

        }

    }
);


// =====================================================
// MATERIALS
// =====================================================

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


// =====================================================
// STUDENT MATERIALS
// =====================================================

const skinMaterials = [

    new THREE.MeshStandardMaterial({
        color: 0xf0c8a0,
        roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
        color: 0xd69b72,
        roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
        color: 0x9f6548,
        roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
        color: 0x6d4736,
        roughness: 0.9
    })

];


const shirtMaterials = [

    new THREE.MeshStandardMaterial({
        color: 0x354b63,
        roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
        color: 0x6a3f4b,
        roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
        color: 0x49634b,
        roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
        color: 0x5a4c72,
        roughness: 0.9
    }),

    new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        roughness: 0.9
    })

];


const hairMaterials = [

    new THREE.MeshStandardMaterial({
        color: 0x2b211b,
        roughness: 1
    }),

    new THREE.MeshStandardMaterial({
        color: 0x6d4a2e,
        roughness: 1
    }),

    new THREE.MeshStandardMaterial({
        color: 0xc6a96b,
        roughness: 1
    }),

    new THREE.MeshStandardMaterial({
        color: 0x161616,
        roughness: 1
    })

];


// =====================================================
// TEACHER MATERIALS
// =====================================================

const teacherHairMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xd7c6a5,

        roughness: 1

    });


const teacherShirtMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x171717,

        roughness: 0.9

    });


// =====================================================
// CUPCAKE / CARD MATERIALS
// =====================================================

const cupcakeWrapperMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x7c4a2f,

        roughness: 0.9

    });


const cupcakeFrostingMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xf2e5d5,

        roughness: 0.8

    });


const cardMaterial =
    new THREE.MeshStandardMaterial({

        color: 0xd7c7a2,

        roughness: 0.9

    });


const cardInkMaterial =
    new THREE.MeshStandardMaterial({

        color: 0x2f3d63,

        roughness: 0.9

    });


// =====================================================
// GEOMETRY HELPERS
// =====================================================

function makeBox(
    width,
    height,
    depth,
    material,
    x,
    y,
    z,
    parent = scene
) {

    const mesh =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),

            material

        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    parent.add(
        mesh
    );


    return mesh;

}


function makeCylinder(
    radiusTop,
    radiusBottom,
    height,
    material,
    x,
    y,
    z,
    parent = scene,
    segments = 12
) {

    const mesh =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                radiusTop,
                radiusBottom,
                height,
                segments
            ),

            material

        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    parent.add(
        mesh
    );


    return mesh;

}


function makeSphere(
    radius,
    material,
    x,
    y,
    z,
    parent = scene,
    widthSegments = 16,
    heightSegments = 12
) {

    const mesh =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                radius,
                widthSegments,
                heightSegments
            ),

            material

        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    parent.add(
        mesh
    );


    return mesh;

}


// =====================================================
// ROOM
// =====================================================

const roomWidth = 14;

const roomDepth = 20;

const roomHeight = 4;


makeBox(
    roomWidth,
    0.2,
    roomDepth,
    floorMaterial,
    0,
    -0.1,
    0
);


makeBox(
    roomWidth,
    0.2,
    roomDepth,
    ceilingMaterial,
    0,
    roomHeight,
    0
);


makeBox(
    roomWidth,
    roomHeight,
    0.2,
    wallMaterial,
    0,
    2,
    -10
);


makeBox(
    roomWidth,
    roomHeight,
    0.2,
    wallMaterial,
    0,
    2,
    10
);


makeBox(
    0.2,
    roomHeight,
    roomDepth,
    wallMaterial,
    -7,
    2,
    0
);


makeBox(
    0.2,
    roomHeight,
    roomDepth,
    wallMaterial,
    7,
    2,
    0
);


// =====================================================
// DOOR
// =====================================================

makeBox(
    1.8,
    3.1,
    0.12,
    doorMaterial,
    -4.5,
    1.55,
    -9.83
);


makeBox(
    0.65,
    1.25,
    0.05,
    windowMaterial,
    -4.5,
    2.05,
    -9.74
);


// =====================================================
// WINDOWS / BLINDS
// =====================================================

function createWindow(
    z
) {

    makeBox(
        0.08,
        1.8,
        4.4,
        windowMaterial,
        -6.88,
        2.2,
        z
    );


    for (
        let i = 0;
        i < 12;
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


createWindow(
    -3.8
);


createWindow(
    3.8
);


// =====================================================
// TV
// =====================================================

makeBox(
    0.18,
    2.35,
    4.8,
    blackMaterial,
    -6.65,
    2.2,
    0
);


// =====================================================
// COLLISION DATA
// =====================================================

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


// =====================================================
// TABLES
// =====================================================

function createTable(
    x,
    z,
    rotation = Math.PI / 2
) {

    const table =
        new THREE.Group();


    makeBox(
        3.2,
        0.16,
        1.45,
        tableMaterial,
        0,
        0.95,
        0,
        table
    );


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
                lx,
                0.45,
                lz,
                table
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


    scene.add(
        table
    );


    addCollider(
        x,
        z,
        1.7,
        3.45
    );

}


// =====================================================
// CHAIRS
// =====================================================

function createChair(
    x,
    z,
    rotation = 0
) {

    const chair =
        new THREE.Group();


    makeBox(
        0.65,
        0.12,
        0.65,
        chairMaterial,
        0,
        0.55,
        0,
        chair
    );


    makeBox(
        0.65,
        0.75,
        0.12,
        chairMaterial,
        0,
        0.95,
        0.28,
        chair
    );


    const legs = [

        [-0.24, -0.24],

        [0.24, -0.24],

        [-0.24, 0.24],

        [0.24, 0.24]

    ];


    legs.forEach(
        ([lx, lz]) => {

            makeBox(
                0.07,
                0.55,
                0.07,
                metalMaterial,
                lx,
                0.275,
                lz,
                chair
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


    scene.add(
        chair
    );


    return chair;

}


// =====================================================
// STUDENTS — SEATED + HIGHER POLY
// =====================================================

const students = [];


function createStudent(
    x,
    z,
    rotation,
    index
) {

    const student =
        new THREE.Group();


    const skin =
        skinMaterials[
            index %
            skinMaterials.length
        ];


    const shirt =
        shirtMaterials[
            index %
            shirtMaterials.length
        ];


    const hair =
        hairMaterials[
            index %
            hairMaterials.length
        ];


    // WAIST

    makeBox(
        0.42,
        0.16,
        0.28,
        shirt,
        0,
        0.72,
        0.05,
        student
    );


    // TORSO

    makeBox(
        0.50,
        0.50,
        0.30,
        shirt,
        0,
        1.02,
        0.04,
        student
    );


    // ROUND HEAD

    makeSphere(
        0.20,
        skin,
        0,
        1.43,
        -0.01,
        student,
        16,
        12
    );


    // HAIR

    makeBox(
        0.40,
        0.10,
        0.36,
        hair,
        0,
        1.58,
        -0.01,
        student
    );


    makeBox(
        0.08,
        0.22,
        0.34,
        hair,
        -0.20,
        1.43,
        -0.01,
        student
    );


    makeBox(
        0.08,
        0.22,
        0.34,
        hair,
        0.20,
        1.43,
        -0.01,
        student
    );

// BACK HAIR

makeBox(
    0.36,
    0.28,
    0.10,
    hair,
    0,
    1.45,
    0.17,
    student
);
    // ARMS

    const leftArm =
        makeCylinder(
            0.055,
            0.055,
            0.38,
            skin,
            -0.34,
            0.98,
            -0.02,
            student,
            10
        );


    leftArm.rotation.z =
        0.18;


    const rightArm =
        makeCylinder(
            0.055,
            0.055,
            0.38,
            skin,
            0.34,
            0.98,
            -0.02,
            student,
            10
        );


    rightArm.rotation.z =
        -0.18;


    // THIGHS — HORIZONTAL FOR SITTING

    const leftThigh =
        makeCylinder(
            0.07,
            0.07,
            0.42,
            blackMaterial,
            -0.13,
            0.61,
            -0.10,
            student,
            10
        );


    leftThigh.rotation.x =
        Math.PI / 2;


    const rightThigh =
        makeCylinder(
            0.07,
            0.07,
            0.42,
            blackMaterial,
            0.13,
            0.61,
            -0.10,
            student,
            10
        );


    rightThigh.rotation.x =
        Math.PI / 2;


    // LOWER LEGS

    makeCylinder(
        0.06,
        0.06,
        0.42,
        blackMaterial,
        -0.13,
        0.30,
        -0.28,
        student,
        10
    );


    makeCylinder(
        0.06,
        0.06,
        0.42,
        blackMaterial,
        0.13,
        0.30,
        -0.28,
        student,
        10
    );


    // FEET

    makeBox(
        0.16,
        0.08,
        0.24,
        blackMaterial,
        -0.13,
        0.08,
        -0.20,
        student
    );


    makeBox(
        0.16,
        0.08,
        0.24,
        blackMaterial,
        0.13,
        0.08,
        -0.20,
        student
    );


    student.position.set(
        x,
        0,
        z
    );


    student.rotation.y =
        rotation;


    scene.add(
        student
    );


    students.push({

        index,

        group:
            student,

        x,

        z,

        rotation,

        hasCupcake:
            false

    });

}


// =====================================================
// CLASSROOM TABLES
// =====================================================

let studentCounter =
    0;


function classroomTable(
    x,
    z,
    occupiedSeats = 4
) {

    createTable(
        x,
        z,
        Math.PI / 2
    );


    const seats = [

        {
            x: x - 1.2,
            z: z - 0.7,
            rotation: -Math.PI / 2
        },

        {
            x: x - 1.2,
            z: z + 0.7,
            rotation: -Math.PI / 2
        },

        {
            x: x + 1.2,
            z: z - 0.7,
            rotation: Math.PI / 2
        },

        {
            x: x + 1.2,
            z: z + 0.7,
            rotation: Math.PI / 2
        }

    ];


    seats.forEach(
        (seat, seatIndex) => {

            createChair(
                seat.x,
                seat.z,
                seat.rotation
            );


            if (
                seatIndex <
                occupiedSeats &&

                studentCounter <
                20
            ) {

                createStudent(
                    seat.x,
                    seat.z,
                    seat.rotation,
                    studentCounter
                );


                studentCounter++;

            }

        }
    );

}


classroomTable(
    -2.8,
    -5,
    4
);


classroomTable(
    -2.8,
    0,
    4
);


classroomTable(
    -2.8,
    5,
    4
);


classroomTable(
    1.3,
    -5,
    4
);


classroomTable(
    1.3,
    0,
    4
);


classroomTable(
    1.3,
    5,
    0
);


// =====================================================
// MRS. SISSOM DESK
// =====================================================

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
    3.0,
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
    3.0,
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


// TEACHER CHAIR

createChair(
    4.6,
    8.8,
    0
);


// =====================================================
// MRS. SISSOM CHARACTER
// =====================================================

function createTeacher() {

    const teacher =
        new THREE.Group();


    // TORSO

    makeBox(
        0.62,
        0.76,
        0.36,
        teacherShirtMaterial,
        0,
        1.07,
        0,
        teacher
    );


    // ROUND FACE

    makeSphere(
        0.22,
        skinMaterials[0],
        0,
        1.66,
        -0.03,
        teacher,
        18,
        14
    );


    // HAIR

    makeSphere(
        0.235,
        teacherHairMaterial,
        0,
        1.72,
        0.01,
        teacher,
        18,
        12
    );


     makeBox(
        0.14,
        0.34,
        0.38,
        teacherHairMaterial,
        -0.23,
        1.66,
        0,
        teacher
    );


    makeBox(
        0.14,
        0.34,
        0.38,
        teacherHairMaterial,
        0.23,
        1.66,
        0,
        teacher
    );


    // TEACHER ARMS

    const leftArm =
        makeCylinder(
            0.065,
            0.065,
            0.52,
            skinMaterials[0],
            -0.38,
            1.02,
            -0.02,
            teacher,
            12
        );


    leftArm.rotation.z =
        0.08;


    const rightArm =
        makeCylinder(
            0.065,
            0.065,
            0.52,
            skinMaterials[0],
            0.38,
            1.02,
            -0.02,
            teacher,
            12
        );


    rightArm.rotation.z =
        -0.08;


    teacher.position.set(
        4.6,
        0,
        8.65
    );


    teacher.rotation.y =
        0;


    scene.add(
        teacher
    );

}


createTeacher();


// =====================================================
// CUPCAKES
// =====================================================

function createCupcake(
    x,
    y,
    z
) {

    const cupcake =
        new THREE.Group();


    makeCylinder(
        0.10,
        0.12,
        0.15,
        cupcakeWrapperMaterial,
        0,
        0.075,
        0,
        cupcake,
        14
    );


    makeSphere(
        0.105,
        cupcakeFrostingMaterial,
        0,
        0.18,
        0,
        cupcake,
        14,
        10
    );


    cupcake.position.set(
        x,
        y,
        z
    );


    scene.add(
        cupcake
    );


    return cupcake;

}


// =====================================================
// CUPCAKES ON TEACHER DESK
// =====================================================

for (
    let i = 0;
    i < 5;
    i++
) {

    createCupcake(
        3.65 + i * 0.35,
        1.05,
        7.6
    );

}


// =====================================================
// BIRTHDAY CARD
// =====================================================

const card =
    new THREE.Group();


makeBox(
    0.34,
    0.03,
    0.48,
    cardMaterial,
    0,
    0,
    0,
    card
);


makeBox(
    0.20,
    0.015,
    0.02,
    cardInkMaterial,
    0,
    0.025,
    0.08,
    card
);


makeBox(
    0.16,
    0.015,
    0.02,
    cardInkMaterial,
    0,
    0.025,
    -0.02,
    card
);


scene.add(
    card
);


// =====================================================
// CARD SYSTEM
// =====================================================

let cardStudentIndex =
    0;


let cardSignedCount =
    0;


let cardPassTimer =
    0;


const cardSignTime =
    2.5;


// 15% CHANCE TO GET STUCK

const cardStuckChance =
    0.15;


let cardStuck =
    false;


let stuckStudent =
    null;


// =====================================================
// CARD POSITION
// =====================================================

function updateCardPosition() {

    if (
        cardStudentIndex >=
        students.length
    ) {

        card.visible =
            false;

        return;

    }


    const student =
        students[
            cardStudentIndex
        ];


    const offset =
        new THREE.Vector3(
            0,
            0,
            -0.48
        );


    offset.applyAxisAngle(

        new THREE.Vector3(
            0,
            1,
            0
        ),

        student.rotation

    );


    card.position.set(

        student.x +
        offset.x,

        1.02,

        student.z +
        offset.z

    );


    card.rotation.set(
        0,
        -student.rotation,
        0
    );

}


updateCardPosition();


// =====================================================
// ADVANCE CARD
// =====================================================

function advanceCard() {

    if (
        cardSignedCount >=
        students.length ||

        cardStuck
    ) {

        return;

    }


    // CURRENT STUDENT SIGNS

    cardSignedCount++;


    // EVERYONE FINISHED

    if (
        cardSignedCount >=
        students.length
    ) {

        card.visible =
            false;


        showMessage(
            "ALL 20 STUDENTS SIGNED THE CARD.",
            1800
        );


        updateHUD();

        checkWin();

        return;

    }


    // RANDOM CHANCE THE CARD GETS STUCK

    if (
        Math.random() <
        cardStuckChance
    ) {

        cardStuck =
            true;


        stuckStudent =
            students[
                cardStudentIndex
            ];


        cardPassTimer =
            0;


        showMessage(
            "THE CARD GOT STUCK!",
            1800
        );


        updateHUD();

        return;

    }


    // NORMAL PASS

    cardStudentIndex++;


    cardPassTimer =
        0;


    updateCardPosition();


    showMessage(
        `CARD PASSED — ${cardSignedCount} / 20 SIGNED`,
        900
    );


    updateHUD();

}


// =====================================================
// UNSTICK CARD
// =====================================================

function unstickCard() {

    if (
        !cardStuck ||
        !stuckStudent
    ) {

        return;

    }


    cardStuck =
        false;


    stuckStudent =
        null;


    cardStudentIndex++;


    cardPassTimer =
        0;


    updateCardPosition();


    showMessage(
        "CARD MOVING AGAIN.",
        1200
    );


    updateHUD();

}


// =====================================================
// HUD
// =====================================================

const hud =
    document.createElement(
        "div"
    );


hud.style.position =
    "fixed";


hud.style.left =
    "20px";


hud.style.top =
    "20px";


hud.style.zIndex =
    "200";


hud.style.fontFamily =
    '"Stardos Stencil", serif';


hud.style.color =
    "#eeeadd";


hud.style.fontSize =
    "18px";


hud.style.letterSpacing =
    "1px";


hud.style.textShadow =
    "2px 2px 3px #000";


hud.style.pointerEvents =
    "none";


hud.innerHTML = `

    <div id="timerText">
        TIME: 1:45
    </div>

    <div id="cupcakeText">
        CUPCAKES: 0 / 20
    </div>

    <div id="cardText">
        CARD SIGNATURES: 0 / 20
    </div>

`;


document.body.appendChild(
    hud
);


// =====================================================
// OBJECTIVE
// =====================================================

const objective =
    document.createElement(
        "div"
    );


objective.style.position =
    "fixed";


objective.style.left =
    "50%";


objective.style.top =
    "24px";


objective.style.transform =
    "translateX(-50%)";


objective.style.zIndex =
    "200";


objective.style.fontFamily =
    '"Stardos Stencil", serif';


objective.style.color =
    "#eeeadd";


objective.style.fontSize =
    "18px";


objective.style.letterSpacing =
    "1px";


objective.style.textAlign =
    "center";


objective.style.textShadow =
    "2px 2px 3px #000";


objective.style.pointerEvents =
    "none";


objective.textContent =
    "GIVE A CUPCAKE TO ALL 20 STUDENTS. KEEP THE CARD MOVING.";


document.body.appendChild(
    objective
);


// =====================================================
// INTERACTION PROMPT
// =====================================================

const promptText =
    document.createElement(
        "div"
    );


promptText.style.position =
    "fixed";


promptText.style.left =
    "50%";


promptText.style.bottom =
    "80px";


promptText.style.transform =
    "translateX(-50%)";


promptText.style.zIndex =
    "210";


promptText.style.fontFamily =
    '"Stardos Stencil", serif';


promptText.style.color =
    "#ffffff";


promptText.style.fontSize =
    "20px";


promptText.style.letterSpacing =
    "2px";


promptText.style.textShadow =
    "2px 2px 4px #000";


promptText.style.pointerEvents =
    "none";


promptText.style.display =
    "none";


document.body.appendChild(
    promptText
);


// =====================================================
// CENTER MESSAGE
// =====================================================

const messageText =
    document.createElement(
        "div"
    );


messageText.style.position =
    "fixed";


messageText.style.left =
    "50%";


messageText.style.top =
    "50%";


messageText.style.transform =
    "translate(-50%, -50%)";


messageText.style.zIndex =
    "220";


messageText.style.fontFamily =
    '"Stardos Stencil", serif';


messageText.style.color =
    "#fff";


messageText.style.fontSize =
    "26px";


messageText.style.letterSpacing =
    "2px";


messageText.style.textAlign =
    "center";


messageText.style.textShadow =
    "3px 3px 5px #000";


messageText.style.pointerEvents =
    "none";


messageText.style.display =
    "none";


document.body.appendChild(
    messageText
);


// =====================================================
// END SCREEN
// =====================================================

const endScreen =
    document.createElement(
        "div"
    );


endScreen.style.position =
    "fixed";


endScreen.style.inset =
    "0";


endScreen.style.zIndex =
    "500";


endScreen.style.display =
    "none";


endScreen.style.alignItems =
    "center";


endScreen.style.justifyContent =
    "center";


endScreen.style.flexDirection =
    "column";


endScreen.style.background =
    "rgba(8, 10, 6, 0.94)";


endScreen.style.fontFamily =
    '"Stardos Stencil", serif';


endScreen.style.color =
    "#eeeadd";


endScreen.style.textAlign =
    "center";


endScreen.style.padding =
    "30px";


document.body.appendChild(
    endScreen
);


// =====================================================
// MESSAGES
// =====================================================

let messageTimeout =
    null;


function showMessage(
    text,
    duration = 1000
) {

    messageText.textContent =
        text;


    messageText.style.display =
        "block";


    if (
        messageTimeout
    ) {

        clearTimeout(
            messageTimeout
        );

    }


    messageTimeout =
        setTimeout(
            () => {

                messageText.style.display =
                    "none";

            },

            duration
        );

}


// =====================================================
// GAMEPLAY SETTINGS
// =====================================================

const GAME_TIME =
    105;


let timeRemaining =
    GAME_TIME;


let cupcakesDelivered =
    0;


let nearestStudent =
    null;


const interactionDistance =
    1.85;


// =====================================================
// START GAME
// =====================================================

function startGame() {

    gameStarted =
        true;


    gameOver =
        false;


    timeRemaining =
        GAME_TIME;


    cupcakesDelivered =
        0;


    cardStudentIndex =
        0;


    cardSignedCount =
        0;


    cardPassTimer =
        0;


    cardStuck =
        false;


    stuckStudent =
        null;


    card.visible =
        true;


    students.forEach(
        student => {

            student.hasCupcake =
                false;

        }
    );


    updateCardPosition();


    updateHUD();


    showMessage(
        "TRAINING STARTED — 1:45 ON THE CLOCK.",
        1800
    );

}


// =====================================================
// HUD UPDATE
// =====================================================

function updateHUD() {

    const safeTime =
        Math.max(
            0,
            timeRemaining
        );


    const minutes =
        Math.floor(
            safeTime /
            60
        );


    const seconds =
        Math.floor(
            safeTime %
            60
        )
        .toString()
        .padStart(
            2,
            "0"
        );


    document
        .getElementById(
            "timerText"
        )
        .textContent =
        `TIME: ${minutes}:${seconds}`;


    document
        .getElementById(
            "cupcakeText"
        )
        .textContent =
        `CUPCAKES: ${cupcakesDelivered} / 20`;


    document
        .getElementById(
            "cardText"
        )
        .textContent =

        cardStuck

            ? `CARD SIGNATURES: ${cardSignedCount} / 20 — STUCK!`

            : `CARD SIGNATURES: ${cardSignedCount} / 20`;

}


// =====================================================
// FIND NEAREST STUDENT
// =====================================================

function findNearestStudent() {

    let bestStudent =
        null;


    let bestDistance =
        Infinity;


    for (
        const student
        of students
    ) {

        if (
            student.hasCupcake
        ) {

            continue;

        }


        const dx =
            camera.position.x -
            student.x;


        const dz =
            camera.position.z -
            student.z;


        const distance =
            Math.hypot(
                dx,
                dz
            );


        if (

            distance <
            interactionDistance &&

            distance <
            bestDistance

        ) {

            bestStudent =
                student;


            bestDistance =
                distance;

        }

    }


    return bestStudent;

}


// =====================================================
// CHECK IF PLAYER IS NEAR STUCK CARD
// =====================================================

function playerNearStuckCard() {

    if (
        !cardStuck ||
        !stuckStudent
    ) {

        return false;

    }


    const dx =
        camera.position.x -
        stuckStudent.x;


    const dz =
        camera.position.z -
        stuckStudent.z;


    return (
        Math.hypot(
            dx,
            dz
        ) <
        interactionDistance
    );

}


// =====================================================
// GIVE CUPCAKE
// =====================================================

function deliverCupcake(
    student
) {

    if (
        !student ||
        student.hasCupcake ||
        gameOver
    ) {

        return;

    }


    student.hasCupcake =
        true;


    cupcakesDelivered++;


    const offset =
        new THREE.Vector3(
            0,
            0,
            -0.48
        );


    offset.applyAxisAngle(

        new THREE.Vector3(
            0,
            1,
            0
        ),

        student.rotation

    );


    createCupcake(

        student.x +
        offset.x,

        1.03,

        student.z +
        offset.z

    );


    showMessage(
        `CUPCAKE DELIVERED — ${cupcakesDelivered} / 20`,
        700
    );


    updateHUD();


    checkWin();

}


// =====================================================
// WIN CHECK
// =====================================================

function checkWin() {

    if (
        gameOver
    ) {

        return;

    }


    if (

        cupcakesDelivered >=
        20 &&

        cardSignedCount >=
        20

    ) {

        finishGame(
            true
        );

    }

}


// =====================================================
// END GAME
// =====================================================

function finishGame(
    won
) {

    gameOver =
        true;


    controls.unlock();


    crosshair.style.display =
        "none";


    promptText.style.display =
        "none";


    endScreen.style.display =
        "flex";


    if (
        won
    ) {

        endScreen.innerHTML = `

            <div style="
                font-size:56px;
                margin-bottom:20px;
            ">
                TRAINING COMPLETE
            </div>

            <div style="
                font-size:24px;
                line-height:1.6;
                max-width:800px;
            ">

                20 CUPCAKES DISTRIBUTED.

                <br>

                20 CARD SIGNATURES COLLECTED.

                <br><br>

                YOU HAVE SURVIVED
                CELEBRATION COORDINATOR TRAINING.

            </div>

        `;

    }

    else {

        endScreen.innerHTML = `

            <div style="
                font-size:56px;
                margin-bottom:20px;
            ">
                TRAINING FAILED
            </div>

            <div style="
                font-size:24px;
                line-height:1.6;
                max-width:800px;
            ">

                TIME EXPIRED.

                <br><br>

                CUPCAKES:
                ${cupcakesDelivered} / 20

                <br>

                CARD SIGNATURES:
                ${cardSignedCount} / 20

                <br><br>

                REFRESH THE PAGE TO TRY AGAIN.

            </div>

        `;

    }

}


// =====================================================
// E KEY
// =====================================================

document.addEventListener(
    "keydown",
    event => {

        if (

            event.code !==
            "KeyE" ||

            !gameStarted ||

            gameOver ||

            !controls.isLocked

        ) {

            return;

        }


        // STUCK CARD GETS PRIORITY

        if (
            playerNearStuckCard()
        ) {

            unstickCard();

            return;

        }


        // OTHERWISE GIVE CUPCAKE

        deliverCupcake(
            nearestStudent
        );

    }
);


// =====================================================
// LIGHTING
// =====================================================

const hemisphere =
    new THREE.HemisphereLight(
        0xffffff,
        0x555555,
        1.35
    );


scene.add(
    hemisphere
);


// =====================================================
// CEILING LIGHTS
// =====================================================

function createCeilingLight(
    x,
    z
) {

    const lightPanelMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xffffff,

            emissive: 0xffffff,

            emissiveIntensity: 1.5

        });


    makeBox(
        2.2,
        0.05,
        0.65,
        lightPanelMaterial,
        x,
        3.88,
        z
    );


    const light =
        new THREE.PointLight(
            0xffffff,
            20,
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


createCeilingLight(
    0,
    -4
);


createCeilingLight(
    0,
    3
);


// =====================================================
// SUNLIGHT
// =====================================================

const sun =
    new THREE.DirectionalLight(
        0xfff4d6,
        1.1
    );


sun.position.set(
    -8,
    6,
    5
);


sun.castShadow =
    false;


scene.add(
    sun
);


// =====================================================
// MOVEMENT
// =====================================================

const keys = {};


document.addEventListener(
    "keydown",
    event => {

        keys[
            event.code
        ] =
            true;

    }
);


document.addEventListener(
    "keyup",
    event => {

        keys[
            event.code
        ] =
            false;

    }
);


const playerRadius =
    0.32;


// =====================================================
// TABLE COLLISION
// =====================================================

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


// =====================================================
// KEEP PLAYER INSIDE ROOM
// =====================================================

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


// =====================================================
// GAME LOOP
// =====================================================

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


    // =================================================
    // TIMER + CARD
    // =================================================

    if (
        gameStarted &&
        !gameOver
    ) {

        timeRemaining -=
            delta;


        cardPassTimer +=
            delta;


        if (

            !cardStuck &&

            cardSignedCount <
            students.length &&

            cardPassTimer >=
            cardSignTime

        ) {

            advanceCard();

        }


        if (
            timeRemaining <=
            0
        ) {

            timeRemaining =
                0;


            updateHUD();


            finishGame(
                false
            );

        }

    }


    // =================================================
    // PLAYER MOVEMENT
    // =================================================

    if (
        controls.isLocked &&
        !gameOver
    ) {

        const previousX =
            camera.position.x;


        const previousZ =
            camera.position.z;


        const movementSpeed =
            4.1 *
            delta;


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


        // =================================================
        // INTERACTIONS
        // =================================================

        nearestStudent =
            findNearestStudent();


        if (
            playerNearStuckCard()
        ) {

            promptText.textContent =
                "PRESS E — UNSTICK CARD";


            promptText.style.display =
                "block";

        }

        else if (
            nearestStudent
        ) {

            promptText.textContent =
                "PRESS E — GIVE CUPCAKE";


            promptText.style.display =
                "block";

        }

        else {

            promptText.style.display =
                "none";

        }

    }

    else {

        nearestStudent =
            null;


        promptText.style.display =
            "none";

    }


    updateHUD();


    renderer.render(
        scene,
        camera
    );

}


animate();


// =====================================================
// WINDOW RESIZE
// =====================================================

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
