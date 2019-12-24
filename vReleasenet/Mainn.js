Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';
//world
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3(0, -1110, 0))
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 20000);
var clock = new THREE.Clock({
    autoStart: true
});
controls = new THREE.PointerLockControls(camera, renderer.domElement)

// +++++++++ HTML ++++++++++++++++++
var instrucoesHTML = []
instrucoesHTML[0] = document.getElementById("info");
instrucoesHTML[1] = document.getElementById("infoStart");
instrucoesHTML[2] = document.getElementById("watermark");
// instrucoesHTML[3] = document.getElementById("uniProject");
var morteHTML = document.getElementById("morte")
var startHTML = document.getElementById("infoStart")
var rondaCompletaHTML = document.getElementById("rondaCompleta")
var newRoundHTML = document.getElementById("newRound")
var watermarkHTML = document.getElementById("watermark")
var uniProjectHTML = document.getElementById("uniProject")

startHTML.addEventListener('click', function () {
    if(!fimRonda){
        controls.lock()
        playerPaused = false
        toggle = false
        morteHTML.style.display = 'none'  
        newRoundHTML.style.display = 'none'  
    }
    else{
        rondaCompletaHTML.style.display = 'none';
        newRoundHTML.textContent = "RONDA " + ++ronda
        newRoundHTML.style.display = 'block'
        novaRonda()
        fimRonda = false
    }
})
morteHTML.addEventListener('click', function () {
    morteHTML.style.display = 'none';
    // instrucoesHTML.forEach(c => c.style.display = "-webkit-box")
})
rondaCompletaHTML.addEventListener('click', function () {
    rondaCompletaHTML.style.display = 'none'
    newRoundHTML.textContent = "ROUND " + ++ronda
    newRoundHTML.style.display = 'block'
    if(fimRonda){
        fimRonda = false
    }
})
newRoundHTML.addEventListener('click', function () {
    novaRonda().then(function(){
        newRoundHTML.style.display = 'none';  
        controls.lock()
        playerPaused = false 
          
    })
})
watermarkHTML.addEventListener('mouseover', function(){
    uniProjectHTML.style.display ="block"

})
watermarkHTML.addEventListener('mouseout', function(){
    uniProjectHTML.style.display ="none"
    
})

// startHTML.addEventListener('mouseover',function(){
//     startHTML.style.color = 'rgb(161, 161, 161)'
//     startHTML.style.transform = 'scale(1.1)'
// })
// startHTML.addEventListener('mouseout',function(){
//     startHTML.style.color = 'rgb(0,0,0,0)'
//     startHTML.style.transform = 'scale(1)'

// })
// SETAS (OTIMIZAR)


// // FPS TEST
// var stop = false;
// var frameCount = 0;

// var fps, fpsInterval, startTime, now, then, elapsed;


// // initialize the timer variables and start the animation

// function startAnimating(fps) {
//     fpsInterval = 1000 / fps;
//     then = Date.now();
//     startTime = then;
//     animate();
// }
//************************************************************* */
// VARIÁVEIS
var
    red = 0xFF0000,
    green = 0x00FF00,
    blue = 0x0000FF,
    listener = new THREE.AudioListener(),
    audio = new THREE.Audio(listener),
    audioDisparoBig = new THREE.Audio(listener),
    audioDisparoJogador = new THREE.Audio(listener),
    audioLoader = new THREE.AudioLoader(),
    light = new THREE.AmbientLight(0xFFFFFF, 3),
    plight = new THREE.PointLight(0xffffff, 2, 300),
    //textures
    textureDanger = new THREE.TextureLoader().load('textures/dangerZ.jpg'),
    textureInimigo = new THREE.TextureLoader().load('textures/indice.jpg'),
    textureDangerChao = new THREE.TextureLoader().load('textures/hazardStripes.jpg'),
    textureFire = new THREE.TextureLoader().load('textures/fire.jpg'),
    goldTexture = new THREE.TextureLoader().load('textures/gold.jpg'),
    mira1G = new THREE.BoxGeometry(.001, 5, .001),
    mira2G = new THREE.BoxGeometry(5, .001, .001),
    mirasM = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    }),
    mira1 = new THREE.Mesh(mira1G, mirasM),
    mira2 = new THREE.Mesh(mira2G, mirasM),
    chaoM = Physijs.createMaterial(new THREE.MeshLambertMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
    })),
    chaoG = new THREE.PlaneGeometry(8000, 8000),
    tetoG = new THREE.BoxGeometry(8000, 1, 8000, 5, 5, 5),
    chao = new Physijs.BoxMesh(chaoG, chaoM),
    tetoM = Physijs.createMaterial(new THREE.MeshLambertMaterial({
        color: 0x808080,
        side: THREE.DoubleSide,
        // wireframe: true
        map: new THREE.TextureLoader().load('textures/bkg1_top.png')
    })),
    teto = new THREE.Mesh(tetoG, tetoM),
    materialLimite = Physijs.createMaterial(new THREE.MeshLambertMaterial({
        color: 0x012C56,
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('textures/blue.png')
    })),
    geometriaLimite = new THREE.PlaneGeometry(8000, 1000),
    paredesLimite = [],

    bLoader = new THREE.CubeTextureLoader(),

    gemetriaMeshZona = new THREE.BoxGeometry(20, 250, 200),
    materialMeshZona = new THREE.MeshBasicMaterial({
        color: 0xc4302b,
        map: textureDanger
    }),

    s = 0,
    i = 0,
    r = 0,
    frame = 0,
    distance,
    distanciaJ,
    distanciaP,
    direcoesB = [],
    direcoesZ = [],
    direcao = new THREE.Vector3(),
    controls,
    noObjeto = false,
    jogador1 = new jogador(),
    balasJ = [],
    velocityJ = new THREE.Vector3(0, 0, 0),
    moveFrente = false,
    moveTras = false,
    moveDir = false,
    moveEsq = false,
    moveCima = false,
    moveBaixo = false,
    podeSaltar = true,
    paredesInterior = [],
    bang = false,
    velBang = new THREE.Vector3(0, 0, 0),
    junto = false,
    modelAK,
    modelDancer,
    loader = new THREE.GLTFLoader(),
    inimigoASeguir = false,
    numeroInimigos = 10,
    inimigos = [],
    numeroComida = 1,
    rPressionado = false,
    cont = 0,
    offset = 0.05,
    add = false,
    sprint = false,
    velocidadeJogador,
    meshesZonas = [],
    loaded = false,
    loadedInit = false,
    ronda = 1,
    final = [],

    boolCor = true,
    boolCorInimigo = true,
    pontos = 0,
    indiceTimeline = 0,
    tlArray = [],
    fimRonda = false,
    offsetModel = true,
    currTime = 0,
    prevTime = 0,
    shot = 0,
    velocidadeShotJogador = 0.45,
    naZona = false,
    toggle = false,
    iCor = 0,
    gameStart = false,
    playerPaused = true,
    m = 0,
    balasBig = [],
    g = 0,
    posBig = new THREE.Vector3(0, 120, 0),
    setasRet = [],
    setasTri = []

    jogador1.mesh.addEventListener('collision', function (obj, vel, angularV) {
        if (obj.name === 'balaBig') {
            if (jogador1.mesh.vida > 0) {
                if(gameStart){
                    jogador1.mesh.vida -= 50;
                }
                barraVidaJogador.setValue(jogador1.mesh.vida)
                scene.remove(obj)
                obj.alive = false
            }
        }
        // if (obj.name == 'comida') {

        //     controls.unlock()
        //     scene.remove(obj)
        //     obj.alive = false;   
        //     rondaCompletaHTML.style.display = 'block'    
        //     fimRonda = true
        //     playerPaused = true
            
        // }
    })

// ********* SOUNDS ************
audioLoader.load('sounds/MortalKombatTheme.mp3', function (buffer) {
    audio.setBuffer(buffer)
    audio.setVolume(0.15)
    audio.setLoop(true)
    audio.play()
})
audioLoader.load('sounds/fireArrow.wav', function (buffer) {
    audioDisparoBig.setBuffer(buffer)
    audioDisparoBig.setVolume(0.1)
})
audioLoader.load('sounds/shotSoundGame.wav', function (buffer) {
    audioDisparoJogador.setBuffer(buffer)
    audioDisparoJogador.setVolume(0.1)
})

camera.add(listener)
teto.rotation.x -= Math.PI / 2
teto.rotation.y -= Math.PI / 2

// create gsap array ( animations )
i = 0
while (i < 20) {
    tlArray[i] = new gsap.timeline()
    i++
}

// add shooting DANGER
i = 0
while (i < 4) {
    meshesZonas[i] = new THREE.Mesh(gemetriaMeshZona, new THREE.MeshBasicMaterial({
        color: green,
        map: textureDanger
    }))
    i++
}

// apagar balas jogador quando colidem
removerBalasColisao(chao)
for (let j = 0; j < 4; j += 1) {
    var paredeL = new Physijs.BoxMesh(geometriaLimite, materialLimite);
    removerBalasColisao(paredeL)
    paredesLimite.push(paredeL)

}
for (let i = 0; i < 3; i += 1) {
    var paredeI = new paredeInterior()
    removerBalasColisao(paredeI.mesh)
    paredesInterior.push(paredeI.mesh)

}
let linhasGrandes = []
for (let i = 0; i < 8; i++) {
    linhaGrande = new linhaChaoGrande()
    linhasGrandes[i] = linhaGrande
}

let linhasPequenas = []
for (let i = 0; i < 8; i++) {
    linhaPequena = new linhaChaoPequena()
    linhasPequenas[i] = linhaPequena
}
let chaoWire = new THREE.Mesh(new THREE.BoxGeometry(1950, 5, 1000, 3, 3), new THREE.MeshBasicMaterial({
    color: 0x202060,
    map: textureDangerChao
}))
chaoWire.position.set(3520, 16, 3000)
chaoWire.rotation.y += Math.PI / 2
chaoWire.name = 'nhoko'
// ******* POSITIONS & ROTATIONS ************
meshesZonas[0].position.set(-3980, 125, 3000)
meshesZonas[1].position.set(3980, 125, 1000)
meshesZonas[2].position.set(-3980, 125, -1000)
meshesZonas[3].position.set(3980, 125, -3000)
paredesLimite[0].position.set(4000, 500, 0)
paredesLimite[0].rotation.y += Math.PI / 2
paredesLimite[1].position.set(-4000, 500, 0)
paredesLimite[1].rotation.y += Math.PI / 2
paredesLimite[2].position.set(0, 500, 4000)
paredesLimite[3].position.set(0, 500, -4000)
paredesInterior[0].position.set(490, 252, 2000)
paredesInterior[0].rotation.set(0, 0, Math.PI)
paredesInterior[1].position.set(-490, 252, 0)
paredesInterior[2].position.set(490, 252, -2000)
mira1.position.z -= 500
mira2.position.z -= 500

chao.rotation.x = Math.PI / 2
chao.rotation.z = Math.PI / 2

chao.name = 'chao'
teto.position.set(0, 1000, 0)
teto.rotation.x += Math.PI / 2
//teto.rotation.z += Math.PI/2
plight.position.z -= 100


// text test
// var loader1 = new THREE.FontLoader();
// materials = [
//     new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
//     new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
// ];
// var geometry1
// loader1.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

// 	    geometry1 = new THREE.TextGeometry( 'Hello three.js!', {
// 		font: font,
// 		size: 80,
// 		height: 5,
// 		curveSegments: 12,
// 		bevelEnabled: true,
// 		bevelThickness: 10,
// 		bevelSize: 8,
// 		bevelOffset: 0,
// 		bevelSegments: 5
//     } );

// } );
// textMesh1 = new THREE.Mesh( geometry1, materials );
// textMesh1.position.set(3000,100,3500)
// textMesh1.scale.set(10,10,10)


// colisão jogador

// +++++++++++ MODELS +++++++++++++++++

// *** SANTA DANCER ***

//++++++++++++++++++++++++++++++++++++++++++tObject(9)
// EVENT LISTENERS

document.addEventListener('click', function () {
    if(controls.isLocked){
        if (currTime - prevTime > velocidadeShotJogador) {
            prevTime = currTime
            disparar()
        }
        document.addEventListener('mousedown', function () {
            rPressionado = true
        })
    
    }
})
document.addEventListener('mouseup', function () {
    rPressionado = false
})
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
let barraVida

function init() {

    controls.getObject().position.set(3600, 100, 3200)
    controls.getObject().rotation.set(0, Math.PI / 2, 0)
    jogador1.mesh.position.set(3600, 100, 3200)
    scene.add(camera)
    //scene.background = bLoader.load(backG);
    camera.add(listener)
    camera.add(plight)
    scene.add(light)
    scene.add(jogador1.mesh)
    scene.add(chao)
    scene.add(mira1);
    scene.add(mira2);
    scene.add(teto)
    camera.add(mira1)
    camera.add(mira2)
    scene.add(chaoWire)
    // scene.add(textMesh1)
    // let cantoTeste = new cantoMapa()
    // scene.add(cantoTeste.mesh)
    // scene.add(cTeste)
    addInimigos()
    addFinal()
    criarVidaJogadorHTML()
    scene.add(controls.getObject());

    for (i = 0; i < meshesZonas.length; i += 1) {
        scene.add(meshesZonas[i])
    }

    for (i = 0; i < paredesLimite.length; i += 1) {
        scene.add(paredesLimite[i])
    }
    for (i = 0; i < paredesInterior.length; i += 1) {
        scene.add(paredesInterior[i])
    }
    addLinhas()
    addSetas()
    renderer.render(scene, camera)
    loadedInit = true
}

function animate() {
    delta = clock.getDelta()
    currTime += delta
    jogador1.mesh.__dirtyPosition = true
    naZona = verificarZona()
    corInimigo()

    mudaOpacityParedes()
    final.mesh.__dirtyRotation = true
    final.mesh.rotation.z += 0.015
    final.mesh.rotation.x += 0.015
    if (indiceTimeline >= 15) {
        indiceTimeline = 0
    }
    //  // FPS TEST
    //  now = Date.now();
    //  elapsed = now - then;

    //  // if enough time has elapsed, draw the next frame

    //  if (elapsed > fpsInterval) {

    //      // Get ready for next frame by setting then=now, but also adjust for your
    //      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    //      then = now - (elapsed % fpsInterval);

    //      // Put your drawing code here

    //  }
    if(controls.getObject().position.x > 3700 && controls.getObject().position.z < -3700){
        controls.unlock()
        rondaCompletaHTML.style.display = 'block'  
        // a resolver
        fimRonda = true
        playerPaused = true
        controls.getObject().position.set(3600, 100, 3200)
        controls.getObject().rotation.set(0, Math.PI / 2, 0)
        jogador1.mesh.position.set(3600, 100, 3200)
        
    }
    if (controls.isLocked && playerPaused) {
        playerPaused = false
    }
    if (toggle) {
        instrucoesHTML.forEach(c => c.style.display = "block")
    } else {
        instrucoesHTML.forEach(c => c.style.display = "none")
        // morteHTML.style.display = "none"
    }
    if (playerPaused) {
        instrucoesHTML.forEach(c => c.style.display = "block")
        startHTML.style.display = 'block'
    } 

    if (controls.isLocked === false) {
        playerPaused = true
    }
    if (controls.isLocked === true) {

        if (add == false) {
            camera.add(modelAK)
            add = true
        }
        if (loadedInit == true) {
            mixer.update(delta);
        }
        movimentoInimigos()
        mudaCorSetas()
        movimentoJogador()
        dispararBig()
        disparoAutomatico()
        jogador1.mesh.position.set(camera.position.x, camera.position.y, camera.position.z)
        frame += 1;
        // Movimento Jogador
        velocityJ.x -= velocityJ.x * 10.0 * delta;
        velocityJ.z -= velocityJ.z * 10.0 * delta;
        velocityJ.y -= 9.8 * 500.0 * delta;
        controls.moveRight(velocityJ.x * delta);
        controls.moveForward(velocityJ.z * delta);
        controls.getObject().position.y += (velocityJ.y * delta); // new behavior
        if (controls.getObject().position.y < 150) {
            velocityJ.y = 0;
            controls.getObject().position.y = 150;
            podeSaltar = true;
        }
        verificarMorte()
        // controlar bool cores
        if (frame % 40 == 0) {
            boolCor ? boolCor = false : boolCor = true
        }
        if (frame % 15 == 0) {
            boolCorInimigo ? boolCorInimigo = false : boolCorInimigo = true
        }
        // fim da ronda
        if (fimRonda) {         
          
            limparVelocidades()
            
        }

    }

    ajustarJanela();
    scene.simulate();
    renderer.render(scene, camera)
    requestAnimationFrame(animate);

}
carregarObjetos().then(init()).then(animate())
// if (loadedInit) {
//     startAnimating(60)
// }
// if (loadedInit) {
//     animate()
// }