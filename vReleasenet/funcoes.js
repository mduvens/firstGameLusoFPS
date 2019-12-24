carregarObjetos = function(){
    return new Promise(function (fim){
        loader.load('obj/santaDancer/scene.gltf', function (gltf) {
   
            modelDancer = gltf.scene
            modelDancer.scale.set(3, 3, 3)
            modelDancer.position.z = -2300
            modelDancer.position.y += 10
            modelDancer.position.x += 3700
            modelDancer.rotation.y -= Math.PI/2
            scene.add(modelDancer)
            mixer = new THREE.AnimationMixer(modelDancer);
            mixer.clipAction(gltf.animations[0]).play();
           
            //renderer.render(scene,camera)
       
    });
    // *** AK 47 ***
    loader.load('obj/ak47/scene.gltf', function (gltf) {
        modelAK = gltf.scene
        modelAK.scale.set(.15, .15, .15)
        modelAK.position.z = -70
        modelAK.position.y -= 20
        modelAK.position.x += 40
        //  modelAK.rotation.x -= Math.PI/2
        scene.add(modelAK)
       
        //renderer.render(scene,camera)
    });
    
        fim(true)
    })
}

ajustarJanela = function () {
    window.addEventListener('resize', function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    })
}
jogador = function () {
    this.geometria = new THREE.SphereGeometry(50, 32, 32);
    this.material = Physijs.createMaterial(new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: .1
    }))
    this.mesh = new Physijs.BoxMesh(this.geometria, this.material, 999)
    this.mesh.vida = 100
    this.mesh.alive = true
    this.mesh.name = 'jogador'
   
}
disparar = function () {

    bala = new balaJ
    bala.mesh.position.set(camera.position.x, camera.position.y - 10, camera.position.z)
    moverArmaADisparar()
    if (balasJ.length < 4 && r !== 4) {
        balasJ[r] = bala.mesh;
        scene.add(balasJ[r])
        audioDisparoJogador.play()
        movimentoBalaJogador(balasJ[r])
        r += 1
    } else {
        if (r < 3) {
            if (balasJ[r + 1].alive) {
                scene.remove(balasJ[r + 1])
            }
        }
        balasJ[r] = bala.mesh;
        scene.add(balasJ[r])
        audioDisparoJogador.play()
        movimentoBalaJogador(balasJ[r])

        r += 1
    }
    if (r === 4) {
        r = 0
        if (balasJ[0].alive) {
            scene.remove(balasJ[0])
        }
    }
}
disparoAutomatico = function () {
    if (rPressionado) {
        if (currTime - prevTime > velocidadeShotJogador) {
            prevTime = currTime
            disparar()
        }
    }

}
movimentoBalaJogador = function (objeto) {
    direcao = controls.getDirection(new THREE.Vector3(0, 200, 0))
    objeto.setLinearFactor(new THREE.Vector3(0, 0, 0))
    objeto.setLinearVelocity(new THREE.Vector3(direcao.x * 12500, direcao.y * 12500, direcao.z * 12500))
    objeto.setCcdMotionThreshold(1);
    objeto.setCcdSweptSphereRadius(0.2);

}
moverArmaADisparar = function () {
    if (loadedInit) {
        if (offsetModel) {
            modelAK.rotation.z += 0.1
            offsetModel = false;
        } else {
            modelAK.rotation.z -= 0.1
            offsetModel = true;
        }

    }
}
movimentoJogador = function () {

    if (camera.position.x < 3950 && camera.position.x > -3950 && camera.position.z < 3950 && camera.position.z > -3950 /*&& camera.position.y > 100*/ && controls.isLocked) {
        if (sprint == false) {
            velocidadeJogador = 15000
        } else {
            velocidadeJogador = 20000
        }
        if (moveFrente) velocityJ.z += velocidadeJogador * delta;
        if (moveTras) velocityJ.z -= velocidadeJogador * delta;
        if (moveDir) velocityJ.x += velocidadeJogador * delta;
        if (moveEsq) velocityJ.x -= velocidadeJogador * delta;
        // if (moveCima) controls.getObject().position.y += 900 * delta;      
    }

    evitarParedes(camera)

}
balaJ = function () {
    this.geo = new THREE.SphereGeometry(15, 3, 3, 0)
    this.material = Physijs.createMaterial(new THREE.MeshStandardMaterial({
        color: 0xA0A0A0
    }))
    this.mesh = new Physijs.BoxMesh(this.geo, this.material, 3)
    this.mesh.name = 'balaJ'
    this.mesh.alive = true

}
balaBig = function () {
    this.geo = new THREE.SphereGeometry(100, 32, 32)
    this.material = Physijs.createMaterial(new THREE.MeshBasicMaterial({
        map: textureFire
    }))
    this.mesh = new Physijs.SphereMesh(this.geo, this.material, 1000)
    this.mesh.alive = true;
    this.mesh.name = 'balaBig'
    this.mesh.vida = 100
}
criarBig = function () {
    bigB = new balaBig()
    bigB.mesh.position.set(posBig.x, posBig.y, posBig.z)
    balasBig[g] = bigB.mesh
    scene.add(balasBig[g])
    dir = obterDirecao(balasBig[g], camera)

    if(ronda == 1){
        offsetBig = .5
    }
    else if(ronda == 2 || ronda == 3){
        offsetBig = .8
    }
    else if (ronda> 3 && ronda <= 5){
        offsetBig = 1
    }  
    else if (ronda> 5 && ronda <= 7){
        offsetBig  = 1.4
    }else if (ronda> 7 && ronda <= 9){
        offsetBig  = 1.75
    }
    else{
        offsetBig = 2
    }
    balasBig[g].setLinearFactor(new THREE.Vector3(0, 0, 0))
    balasBig[g].setLinearVelocity(new THREE.Vector3(dir.x * offsetBig, 0, dir.z * offsetBig))
    g += 1
}
dispararBig = function () {
    if (frame % 200 == 0) {
        if (!gameStart) {
            gameStart = true
        }
        if (naZona == true) {
            
            if (balasBig.length < 4 && g !== 4) {
                criarBig()
                audioDisparoBig.play()
            } else {
                if (g < 3) {
                    if (balasBig[g + 1].alive) {
                        scene.remove(balasBig[g + 1])
                        balasBig[g + 1].alive = false
                    }
                }
                criarBig()
                audioDisparoBig.play()
            }
            if (g == 4) {
                g = 0;
                if (balasBig[0].alive) {
                    scene.remove(balasBig[0])
                    balasBig[0].alive = false
                }
            }

        }
    }
}
finalMesh = function () {
    this.geometria = new THREE.OctahedronGeometry(150)
    this.material = new THREE.MeshLambertMaterial({
        color: 0x606060,
        side: THREE.DoubleSide,
        map: goldTexture
    })
    this.mesh = new Physijs.BoxMesh(this.geometria, this.material, 0);
    this.mesh.alive = true
    this.mesh.name = "comida"
}
inimigo = function () {
    this.geometria = new THREE.DodecahedronGeometry(80);
    this.material = Physijs.createMaterial(new THREE.MeshLambertMaterial({
        map: textureInimigo
    }));


    this.mesh = new Physijs.BoxMesh(this.geometria, this.material, 1500000)
    this.mesh.vida = 100;
    this.mesh.name = 'inimigo'
    this.mesh.alive = true;
    this.mesh.direcao = new THREE.Vector3(0, 0, 0)
    this.mesh.aSeguir = false
    // rage -> permanent aSeguir when the player hits the enemy or vice versa.
    this.mesh.rage = false
    // colisao com outro Inimigo
    this.mesh.junto = false;

    //hit no jogador
    this.mesh.ataque = false
}
addInimigos = function () {
    return new Promise(function (fim) {
      

        for (let m = 0; m < numeroInimigos; m += 1) {
            inimigos[m] = new inimigo(100, 30);
            inimigos[m].mesh.position.set((Math.random() - 0.6) * 4800 - 1000, 100, (Math.random() - 0.6) * 4800 - 1000)
            scene.add(inimigos[m].mesh)
            inimigos[m].mesh.setCcdMotionThreshold(20);
            inimigos[m].mesh.setCcdSweptSphereRadius(0.2);
            inimigos[m].mesh.addEventListener('collision', function (obj, vel, ang, contNorm) {
                if (obj.name == 'inimigo') {
                    if (obj.junto == false) {
                        inimigos[m].mesh.junto = true
                    }
                }
                if (obj.name == 'balaJ') {
                    inimigos[m].mesh.rage = true
                    if (inimigos[m].mesh.vida > 20) {
                        inimigos[m].mesh.vida -= 20;
                    } else {
                        if(inimigos[m].mesh.alive){
                            scene.remove(inimigos[m].mesh)
                            inimigos[m].mesh.alive = false    
                        }
                    }
                    scene.remove(obj)
                    obj.alive = false
                }
                if (obj.name == 'jogador') {
                    inimigos[m].mesh.ataque = true
                    inimigos[m].mesh.rage = true
                    obj.vida -= 20
                    barraVidaJogador.setValue(obj.vida)
                }
            })

        }

        fim(true);
    });

}
corInimigo = function () {
    inimigos.forEach(function (c){
        if (c.mesh.alive) {
            if (c.mesh.aSeguir) {
                if (boolCorInimigo) {
                    c.mesh.material.color.set(0xd61a1f)
                } else {
                    c.mesh.material.color.set(0xFFFFFF)
                }
            } else {
                c.mesh.material.color.set(0xCCCCCC)
            }
        }
    })
}
movimentoInimigos = function () {
    inimigos.forEach(function (c){
        if (indiceTimeline == 15) {
            indiceTimeline = 0
        }
        if (c.mesh.alive) {
            // distancia
            
            distanciaJ = obterDirecao(c.mesh, controls.getObject())
            c.mesh.direcao = obterDirecao(c.mesh, controls.getObject())
            //perseguir jogador. fica permanente quando se interage com o c.mesh
            if ((c.mesh.direcao.x < 1000 && c.mesh.direcao.z < 1000) || c.mesh.rage) {
                c.mesh.direcao = obterDirecao(c.mesh, controls.getObject())
                c.mesh.aSeguir = true
                c.mesh.__dirtyPosition = true;
                c.mesh.__dirtyRotation = true;
                evitarParedes(c.mesh)

                if (c.mesh.junto == false && c.mesh.ataque == false) {
                    c.mesh.position.x += c.mesh.direcao.x * delta
                    c.mesh.position.z += c.mesh.direcao.z * delta
                } else if (c.mesh.junto) {
                    tlArray[indiceTimeline++].to(c.mesh.position, {
                        duration: .4,
                        z: c.mesh.position.z - c.mesh.direcao.z / 2,
                        x: c.mesh.position.x - c.mesh.direcao.x / 2
                    })
                    c.mesh.junto = false
                } else if (c.mesh.ataque) {
                    tlArray[indiceTimeline++].to(c.mesh.position, {
                        duration: .4,
                        z: c.mesh.position.z - c.mesh.direcao.z * 5,
                        x: c.mesh.position.x - c.mesh.direcao.x * 5
                    })
                    c.mesh.ataque = false
                }


            } else {
                c.mesh.aSeguir = false
            }
        }

    })
        // para nao estar a escrever "inimigos[n].mesh muitas vezes"

}
// a resolver
addFinal = function () {
    return new Promise(function (resolve) {
        final = new finalMesh()
        final.mesh.position.set(3850, 200, -3850)
        scene.add(final.mesh)
        resolve(true)
    })
}
limparVelocidades = function () {
    velocityJ.x = 0
    velocityJ.y = 0
    velocityJ.z = 0
    delta = 0
    moveDir = false, moveEsq = false, moveFrente = false, moveTras = false, moveCima = false, moveBaixo = false;
}
novaRonda = function () {
    //  limpar mapa 
    return new Promise(function (fim){
        inimigos.forEach(function (c){
            if (c.mesh.alive) {
                c.mesh.aSeguir = false
                scene.remove(c.mesh)    
            }
        })
        numeroInimigos += 5
        // addFinal().then( a resolver
        addInimigos().then(function (){
            jogador1.mesh.vida = 100
            barraVidaJogador.setValue(jogador1.mesh.vida)
            controls.unlock()
            console.log(numeroInimigos)    
    
        })
        fim(true)
    })
}
obterDirecao = function (fonte, destino) {
    direcao = new THREE.Vector3(destino.position.x - fonte.position.x, destino.position.y - fonte.position.y, destino.position.z - fonte.position.z);
    return direcao;
}
onKeyDown = function (e) {
    switch (e.keyCode) {
        case 66:
            if(controls.isLocked){
                controls.unlock()
            }else{
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
            }
            // headache
            // if(rondaCompletaHTML.style.display == 'none'){
            //     if(loadedInit == true){  
            //         morteHTML.style.display = 'none'  
            //         if (playerPaused == true || newRoundHTML.style.display == 'block'){
            //             newRoundHTML.style.display = 'none'
            //             controls.lock()   
            //             gameStart = true                        
            //         }                 
            //         else {
            //                 controls.unlock()
            //         }
            //     }    
            // }else{
            //     rondaCompletaHTML.style.display = 'none';
            //     if(morteHTML.style.display == 'none'){
            //         newRoundHTML.textContent = "RONDA " + ++ronda
            //         newRoundHTML.style.display = 'block'    
            //     }               
            // }
            // if(newRoundHTML.style.display == 'block' && rondaCompletaHTML.style.display == 'none'){
            //     newRoundHTML.style.display = 'none'
            //     toggle = false
                
            // }
            
           
            break;
        case 84:            
            if (controls.isLocked) {
                toggle = true
                // controls.unlock()                 
            }
            break;
        case 38:
        case 87:
            moveFrente = true
            break;
        case 37:
        case 65:
            moveEsq = true
            break;
        case 40:
        case 83:
            moveTras = true
            break;
        case 39:
        case 68:
            moveDir = true
            break;
        case 67:
            console.log(camera.position)
            // tl.to(cTeste.position,{duration: .2, z: cTeste.position.z + 200})
            break;
        case 70:
            // tl.to(cTeste.position,{duration: .2, z: cTeste.position.z - 200})          
            break;
        case 16:
            sprint = true
            break;
        case 32:
            
            if (podeSaltar === true) {
                noObjeto = false
                velocityJ.y += 2200;
            }
            podeSaltar = false
            break;
    }
}
onKeyUp = function (e) {
    switch (e.keyCode) {
        case 38:
        case 87:
            moveFrente = false
            break;
        case 37:
        case 65:
            moveEsq = false
            break;
        case 40:
        case 83:
            moveTras = false
            break;
        case 39:
        case 68:
            moveDir = false
            break;
        case 32:
            moveCima = false
            break;
        case 16:
            sprint = false
            break;
        case 67:


            break;
        case 84:
            if (controls.isLocked) {
                toggle = false
                // controls.unlock()                 
            }
            break;
    }
}
evitarParedes = function (obj) {
    if (indiceTimeline >= 15) {
        indiceTimeline = 0
    }
    let boolTipoObj = obj.name == 'inimigo' ? false : true
    if (obj.position.x >= 3950) {
        obj.position.x = 3949
    }
    if (obj.position.x <= -3950) {
        obj.position.x = -3949
    }
    if (obj.position.z >= 3950) {
        obj.position.z = 3949
    }
    if (obj.position.z <= -3950) {
        obj.position.z = -3949
    }
    if (obj.position.x > -3000 && obj.position.x < 4000 && obj.position.z < 2150 && obj.position.z > 2000) {
        if (boolTipoObj) {
            // avoid passing through the middle walls 
            obj.position.z = 2151
        } else {
            //enemy hitting the wall animation.
            tlArray[indiceTimeline++].to(obj.position, {
                duration: .7,
                z: obj.position.z + 1000
            })
        }
    }
    if (obj.position.x > -3000 && obj.position.x < 4000 && obj.position.z < 2000 && obj.position.z > 1850) {
        if (boolTipoObj) {
            obj.position.z = 1849
        } else {
            tlArray[indiceTimeline++].to(obj.position, {
                duration: .7,
                z: obj.position.z - 1000
            })
        }
    }
    if (obj.position.x > -4000 && obj.position.x < 3000 && obj.position.z > 0 && obj.position.z < 150) {
        if (boolTipoObj) {
            obj.position.z = 151
        } else {
            tlArray[indiceTimeline++].to(obj.position, {
                duration: .7,
                z: obj.position.z + 1000
            })
        }
    }
    if (obj.position.x > -4000 && obj.position.x < 3000 && obj.position.z < 0 && obj.position.z > -150) {
        if (boolTipoObj) {
            obj.position.z = -151
        } else {
            tlArray[indiceTimeline++].to(obj.position, {
                duration: .7,
                z: obj.position.z - 1000
            })
        }
    }
    if (obj.position.x > -3000 && obj.position.x < 4000 && obj.position.z > -2000 && obj.position.z < -1850) {
        if (boolTipoObj) {
            obj.position.z = -1849
        } else {
            tlArray[indiceTimeline++].to(obj.position, {
                duration: .7,
                z: obj.position.z + 1000
            })
        }
    }
    if (obj.position.x > -3000 && obj.position.x < 4000 && obj.position.z < -2000 && obj.position.z > -2150) {
        if (boolTipoObj) {
            obj.position.z = -2151
        } else {
            tlArray[indiceTimeline++].to(obj.position, {
                duration: .7,
                z: obj.position.z - 1000
            })
        }
    }

}
verificarZona = function () {
    if (camera.position.x > -2000 && camera.position.x < 3000 && camera.position.z > 2050) {
        posBig.x = -3850
        posBig.z = meshesZonas[0].position.z
        mudaCorVermelho(linhasGrandes[0].mesh)
        mudaCorVermelho(linhasGrandes[1].mesh)
        mudaCorVermelho(linhasPequenas[0].mesh)
        mudaCorVermelho(linhasPequenas[1].mesh)
        mudaCorVermelho(meshesZonas[0])
        mudaCorVermelho(chaoWire)

        return true
    } else if (camera.position.x > -4000 && camera.position.x < 2000 && camera.position.z < 1950 && camera.position.z > 0) {
        posBig.x = 3850
        posBig.z = meshesZonas[1].position.z
        mudaCorVermelho(linhasGrandes[2].mesh)
        mudaCorVermelho(linhasGrandes[3].mesh)
        mudaCorVermelho(linhasPequenas[2].mesh)
        mudaCorVermelho(linhasPequenas[3].mesh)
        mudaCorVermelho(meshesZonas[1])
        return true

    } else if (camera.position.x > -2000 && camera.position.x < 4000 && camera.position.z < 0 && camera.position.z > -2000) {
        posBig.x = -3850
        posBig.z = meshesZonas[2].position.z
        mudaCorVermelho(linhasGrandes[4].mesh)
        mudaCorVermelho(linhasGrandes[5].mesh)
        mudaCorVermelho(linhasPequenas[4].mesh)
        mudaCorVermelho(linhasPequenas[5].mesh)
        mudaCorVermelho(meshesZonas[2])
        return true
    } else if (camera.position.x > -4000 && camera.position.x < 2000 && camera.position.z < -2000) {
        posBig.x = 3850
        posBig.z = meshesZonas[3].position.z
        mudaCorVermelho(linhasGrandes[6].mesh)
        mudaCorVermelho(linhasGrandes[7].mesh)
        mudaCorVermelho(linhasPequenas[6].mesh)
        mudaCorVermelho(linhasPequenas[7].mesh)
        mudaCorVermelho(meshesZonas[3])
        return true

    } else {
        
        meshesZonas.forEach(c => c.material.color.set(0xf8b71d))
        linhasGrandes.forEach(v=> corForaZona(v.mesh))
        linhasPequenas.forEach(v=> corForaZona(v.mesh));
        corForaZona(chaoWire)
        return false
    }
}
paredeInterior = function () {
    this.geo = new THREE.BoxGeometry(7000, 500, 40),
        this.mat = materialInterior = Physijs.createMaterial(new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: .6
        }))
    this.mesh = new Physijs.BoxMesh(this.geo, this.mat, 0)
    this.mesh.name = "paredeI"
}

mudaOpacityParedes = function () {
    if (boolCor) {
        paredesInterior[0].material.opacity = .7
        paredesInterior[1].material.opacity = .5
        paredesInterior[2].material.opacity = .7
    } else {
        paredesInterior[0].material.opacity = .5
        paredesInterior[1].material.opacity = .7
        paredesInterior[2].material.opacity = .5

        // boolCor = true
    }
}
mudaCorVermelho = function (obj) {
    if (boolCor) {
        obj.material.color.set(0x870000)
    } else {
        obj.material.color.set(0xFd0000) // 0x3345b5
    }

}
corForaZona = function (obj) {
    if (obj.name != 'nhoko') {
        obj.material.color.set(0x339933)
    } else {
        obj.material.color.set(0x707070)
    }
}
linhaChaoGrande = function () {
    this.geo = new THREE.BoxGeometry(6000, 15, 50);
    this.mat = new THREE.MeshBasicMaterial({
        color: 0x4c9611
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.name = 'linhaChaoGrande'
}
linhaChaoPequena = function () {
    this.geo = new THREE.BoxGeometry(50, 15, 1950);
    this.mat = new THREE.MeshBasicMaterial({
        color: 0x4c9611
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.name = 'linhaChaoGrande'
}
addLinhas = function () {
    linhasGrandes[0].mesh.position.set(1000, 10, 3950)
    linhasGrandes[1].mesh.position.set(1000, 10, 2050)
    linhasGrandes[2].mesh.position.set(-1000, 10, 1950)
    linhasGrandes[3].mesh.position.set(-1000, 10, 50)
    linhasGrandes[4].mesh.position.set(1000, 10, -50)
    linhasGrandes[5].mesh.position.set(1000, 10, -1950)
    linhasGrandes[6].mesh.position.set(-1000, 10, -2050)
    linhasGrandes[7].mesh.position.set(-1000, 10, -3950)

    linhasPequenas[0].mesh.position.set(-2000, 10, 3000)
    linhasPequenas[1].mesh.position.set(3000, 10, 3000)
    linhasPequenas[2].mesh.position.set(-4000, 10, 1000)
    linhasPequenas[3].mesh.position.set(2000, 10, 1000)
    linhasPequenas[4].mesh.position.set(-2000, 10, -1000)
    linhasPequenas[5].mesh.position.set(4000, 10, -1000)
    linhasPequenas[6].mesh.position.set(-4000, 10, -3000)
    linhasPequenas[7].mesh.position.set(2000, 10, -3000)

    linhasGrandes.forEach(c => scene.add(c.mesh))
    linhasPequenas.forEach(c => scene.add(c.mesh))
}
setaTriangulo = function () {
    this.geo = new THREE.ConeGeometry(80, 150, 2);
    this.mat = new THREE.MeshBasicMaterial({
        color: 0x161d41,
        side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.name = 'triangulo'
}
setaRetangulo = function () {
    this.geo = new THREE.BoxGeometry(2, 50, 200)
    this.mat = new THREE.MeshBasicMaterial({
        color: 0x161d41,
        side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.name = 'retangulo'
}
addSetas = function () {
    i = 0
    while(i<3){
        setasRet[i] = new setaRetangulo()
        setasTri[i] = new setaTriangulo()
        i++
    }
    setasRet[0].mesh.position.set(-3998, 500, 2400)
    setasTri[0].mesh.position.set(-3998, 500, 2225)

    setasRet[1].mesh.position.set(+3998, 500, 175)
    setasTri[1].mesh.position.set(+3998, 500, 0)

    setasRet[2].mesh.position.set(-3998, 500, -1825)
    setasTri[2].mesh.position.set(-3998, 500, -2000)
 
    setasTri.forEach(c => c.mesh.rotation.x -= Math.PI/2)

    scene.add(setasRet[0].mesh)
    scene.add(setasTri[0].mesh)
    scene.add(setasRet[1].mesh)
    scene.add(setasTri[1].mesh)
    scene.add(setasRet[2].mesh)
    scene.add(setasTri[2].mesh)
}
mudaCorSetas = function () {
    mudaCorAzul = function (obj) {
        if (obj.name == 'retangulo') {
            if (boolCor) {
                obj.material.color.set(0x3345b5) // 0x3345b5
            } else {
                obj.material.color.set(0x161d41)
            }
        }
        if (obj.name == 'triangulo') {
            if (boolCor) {
                obj.material.color.set(0x3345b5)
            } else {
                obj.material.color.set(0x161d41)
            }
        }
    
    }
    mudaCorAzul(setasRet[0].mesh)
    mudaCorAzul(setasTri[0].mesh)
    mudaCorAzul(setasRet[1].mesh)
    mudaCorAzul(setasTri[1].mesh)
    mudaCorAzul(setasRet[2].mesh)
    mudaCorAzul(setasTri[2].mesh)
}
removerBalasColisao = function (objeto) {
    objeto.addEventListener('collision', function (obj, vel, ang) {
        if (obj.name == 'balaBig' || obj.name == 'balaJ') {
             if(obj.alive){
                scene.remove(obj)
                obj.alive = false;
    
             }
        }
    })
}
cantoMapa = function () {
    this.geo = new THREE.CylinderGeometry(15, 15, 1500, 32);
    this.material = new THREE.MeshBasicMaterial({
        color: 0x000000
    });
    this.mesh = new THREE.Mesh(this.geo, this.material);
    this.mesh.position.set(3990, 750, 3990)
}
// balaZ = function () {
//     this.geo = new THREE.SphereGeometry(30, 32, 32)
//     this.material = Physijs.createMaterial(new THREE.MeshStandardMaterial({
//         color: red,
//         map: new THREE.TextureLoader().load('textures/fire1.jpg')
//     }))
//     this.mesh = new Physijs.BoxMesh(this.geo, this.material, 100)
//     this.mesh.name = 'balaZombie'
//     this.mesh.alive = true;
// }
criarVidaJogadorHTML = function () {
    class barraProgresso {
        constructor(elemento, initialValue = 100) {
            this.valorElemento = elemento.querySelector('.valor-vida')
            this.setValue(initialValue)
        }
        setValue(valor) {
            if (valor < 0) {
                valor = 0
            }
            if (valor > 100) {
                valor = 100
            }
            this.valorVida = valor
            this.update()
        }
        update() {
            const vidaJogador = this.valorVida

            this.valorElemento.textContent = vidaJogador
        }
    }
    barraVidaJogador = new barraProgresso(document.querySelector('.vida-jogador'))

}
verificarMorte = function () {
    if (jogador1.mesh.vida <= 0) {
        // alert(" 🤣 MORRESTE 💀 💩")
        gameStart = false    
        limparVelocidades()
        numeroInimigos = 10
        controls.unlock()
        morteHTML.style.display = "block"
        //  limpar mapa 
        inimigos.forEach(function(c) {
            if (c.mesh.alive) {
                c.mesh.aSeguir = false
                scene.remove(c.mesh)  
                c.mesh.alive = false            
            }
           });
        balasBig.forEach(function(c){
            if(c.alive){
                scene.remove(c)
                c.alive = false
            }          
        })

        ronda = 1
        addInimigos()
        controls.getObject().position.set(3600, 100, 3200)
        jogador1.mesh.vida = 100;
        barraVidaJogador.setValue(jogador1.mesh.vida)
        console.log(numeroInimigos)
        camera.rotation.set(0, Math.PI / 2, 0)

    }

}
