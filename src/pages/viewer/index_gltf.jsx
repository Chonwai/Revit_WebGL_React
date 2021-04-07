import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Viewer() {
    // const loader = new GLTFLoader();
    const scene = new THREE.Scene();
    var camera, renderer, controls, stats;
    var geometry, material, mesh;

    const loader = new GLTFLoader();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 20, 100);
    controls.update();

    var render = function () {
        renderer.render(scene, camera);
    };

    var loadGLTF = function () {
        loader.load(
            '/Model/room.gltf',
            async function (gltf) {
                console.log(gltf);
                scene.add(gltf.scene);
                render();
            },
            // onProgress callback
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },

            // onError callback
            function (err) {
                console.error('An error happened');
            }
        );
    };

    useEffect(() => {
        renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
        document.body.appendChild(renderer.domElement);
        renderer.setClearColor(0xfff6ff);

        loadGLTF();
        // loadJSONObject();

        geometry = new THREE.BoxGeometry(5, 5, 5);
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);
        camera.position.z = 10;
        renderer.render(scene, camera);

        var animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    }, []);

    var refreshModel = function () {
        console.log('Refresh!');
        loadGLTF();
    };

    return (
        <div>
            <main>
                <p>HiHi</p>
                <div id="ThreeJS" className="border h-24 w-24"></div>
                <button onClick={refreshModel}>Refresh Model</button>
            </main>
        </div>
    );
}
