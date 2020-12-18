import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js'

function main() {
    // var canvas = document.getElementById('canvas');
    var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xffffff),
    camera,
    box,
    box2,
    width=800,
    height=600;

    function initScene() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement)

        scene.add(light);
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);

        camera.position.z = 100;
        scene.add(camera);

        box = new THREE.Mesh(
            new THREE.BoxGeometry(20,20,20),
            new THREE.MeshBasicMaterial({color: 'green'})
        );

        box2 = new THREE.Mesh(
            new THREE.BoxGeometry(10,10,21),
            new THREE.MeshBasicMaterial({color: 'red'})
        );
        
        box.name = "box";

        scene.add(box);
        scene.add(box2)
        // canvas.addEventListener('mousemove',move)
        // stats = new Stats();
        // stats.setMode(0);

        // stats.domElement.style.position = 'absolute'
        // stats.domElement.style.left = '0px'
        // stats.domElement.style.top = '0px'
        // document.body/appendChild(stats.domElement)

        // var squareGeom = new THREE.Geometry();
        // squareGeom.vertices.push(new THREE.Vector3(-1.0,1.0,0.0))
        // squareGeom.vertices.push(new THREE.Vector3(1.0,1.0,0.0))
        // squareGeom.vertices.push(new THREE.Vector3(-1.0,-1.0,0.0))

        // squareGeom.faces.push(new THREE.Face3(0,1,2));
        // var manualGeometry = new THREE.Mesh(squareGeom);

        // scene.add(manualGeometry)



        render();
    }

    function render() {
        // box.rotation.y += 0.1;
        // rotateFunc(0.05)
        renderer.render(scene, camera);
        requestAnimationFrame(render);

        // stats.update();
    } 
    function selfRotation(val) {
        box.position.y += val
    }
    function rotateFunc(val) {
        // box.position.x += val
        // box.rotation.y += val
        // box.position = new THREE.Vector3(0,0,box.position.y+=val)
        box.position.set(0,box.position.y+=val,0)
    }

    // function changeVertices(currentRow, increase) {
    //     for (let i = currentRow; i <= currentRow + rowSize; i++) {
    //         plane.geometry.vertices[i].z += increase;
    //     }

    //     currentWaveHeight += increase;

    //     plane.geometry.verticesNeedUpdate = true;
    // }

    function move(e) {
        box.rotation.x = e.pageX * 0.01;
        box.rotation.y = -e.pageX * 0.01;
    }

    function checkKey(e) {
        var left = 37, up = 38, right = 39, down = 40, increment = 1;

        e = e || window.event;

        if (e.keyCode == up) {
            box.rotation.z -= increment;
        }
        else if (e.keyCode == down) {
            box.rotation.z += increment;
        }
        else if (e.keyCode == left) {
            box.rotation.y -= increment;
        }
        else if (e.keyCode == right) {
            box.rotation.y += increment;
        }
    }

    function onDocumentMouseDown(e) {
        var projector = new THREE.Projector();

        var mouseClickVector = new THREE.Vector3(
            (e.clientX / width) * 2 - 1,
            -(e.clientY / height) * 2 + 1, 0.5
        );

        projector.unprojectVector(mouseClickVector, camera);

        var raycaster = new THREE.Raycaster(camera.position, mouseClickVector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {
            intersects[0].object.material.color.setHex(Math.random() * 0xffff)
        }
    }

    function checkForCollision() {
        var boxPosition1 = new THREE.Box3().setFromObject(box);
        var boxPosition2 = new THREE.box3().setFromObject(box2);

        if (boxPosition1.isInterSectionBox(boxPosition2)) {
            console.log("box touching")
        }
    }
    window.onkeydown = checkKey;
    window.addEventListener('mousedown', onDocumentMouseDown, false)
    initScene()

}
main();
