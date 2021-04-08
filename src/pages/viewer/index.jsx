import { useEffect, useState } from 'react';
import Model from '../../models/room.rvt.json';

var scene;
var controls;
var renderer;
var camera;
var loader;
var model = Model;

export default function Viewer() {
    var extraCupboardCount = 0;
    var price = 1000;

    console.log('Init!');

    var init = function () {
        camera = new window.THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            2,
            40000
        );
        scene = new window.THREE.Scene();
        loader = new window.THREE.ObjectLoader();
        renderer = new window.THREE.WebGLRenderer();
        camera.position.set(5000, 5000, 15000);
        controls = new window.THREE.OrbitControls(camera, renderer.domElement);
        controls.update();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
        document.getElementById('viewer').appendChild(renderer.domElement);
        renderer.setClearColor(0xfff6ff);
    };

    var loadJSONModel = function () {
        const light = new window.THREE.SpotLight(0xffffff, 1);
        light.castShadow = true;
        light.position.set(-5000, 10000, -1000);
        scene.add(light);
        const light2 = new window.THREE.SpotLight(0xffffff, 1);
        light2.castShadow = true;
        light2.position.set(5000, 10000, -1000);
        scene.add(light2);
        var object = loader.parse(model);
        var materialObj = new window.THREE.MeshStandardMaterial({
            color: 0x777777,
            roughness: 0.5,
        });
        object.traverse(function (child) {
            if (child instanceof window.THREE.Mesh) {
                child.material = materialObj;
            }
        });
        scene.add(object);
    };

    var animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        render();
    };

    useEffect(() => {
        init();
        loadJSONModel();
        animate();
    }, []);

    var refreshModel = function () {
        console.log('Refresh!');
        console.log(scene);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
        render();
    };

    var addCupboard = function () {
        if (extraCupboardCount < 6) {
            extraCupboardCount += 1;
            price = 1000 + 1000 * extraCupboardCount;
            scene = new window.THREE.Scene();
            let data = {
                uuid: '9210424f-1942-492c-b415-44e942e7bbc3-00056f8f',
                name:
                    'FamilyInstance 櫥櫃 parametric_casework <356239 J.CTL-00 - Open, Custom Size>',
                type: 'RevitElement',
                matrix: [
                    1.0,
                    0.0,
                    0.0,
                    0.0,
                    0.0,
                    1.0,
                    0.0,
                    0.0,
                    0.0,
                    0.0,
                    1.0,
                    0.0,
                    0.0,
                    0.0,
                    0.0,
                    1.0,
                ],
                children: [
                    {
                        uuid:
                            '9210424f-1942-492c-b415-44e942e7bbc3-00056f8f-9210424f-1942-492c-b415-44e942e7bbc3-000546ce',
                        name:
                            'FamilyInstance 櫥櫃 parametric_casework <356239 J.CTL-00 - Open, Custom Size>',
                        type: 'Mesh',
                        matrix: [
                            1.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            1.0,
                            0.0,
                            0.0,
                            0.0,
                            0.0,
                            1.0,
                            0.0,
                            -800.0 * extraCupboardCount,
                            0.0,
                            0.0,
                            1.0,
                        ],
                        geometry:
                            '9210424f-1942-492c-b415-44e942e7bbc3-00056f8f-9210424f-1942-492c-b415-44e942e7bbc3-000546ce',
                        material: '9210424f-1942-492c-b415-44e942e7bbc3-000546ce',
                    },
                ],
            };
            model.object.children.push(data);
            loadJSONModel();
            document.getElementById('price').textContent = price;
        } else if (extraCupboardCount >= 6) {
            alert('The maximum cupboard is 7.');
        }
    };

    var reduceCupboard = function () {
        if (extraCupboardCount > -1) {
            extraCupboardCount -= 1;
            price = 1000 + 1000 * extraCupboardCount;
            scene = new window.THREE.Scene();
            model.object.children.pop();
            loadJSONModel();
            document.getElementById('price').textContent = price;
        } else if (extraCupboardCount <= -1) {
            alert('The minimum cupboard is 0.');
        }
    };

    var render = function () {
        renderer.render(scene, camera);
    };

    return (
        <div>
            <main className="p-8">
                <div className="nav flex justify-center items-center">
                    <div className="control w-1/2 flex justify-start">
                        <button className="p-4" onClick={refreshModel}>
                            Refresh Viewer
                        </button>
                        <button className="p-4" onClick={addCupboard}>
                            Add Cupboard
                        </button>
                        <button className="p-4" onClick={reduceCupboard}>
                            Reduce Cupboard
                        </button>
                    </div>
                    <div className="price w-1/2 flex justify-end">
                        <p>
                            Price: $<span id="price">1000</span>
                        </p>
                    </div>
                </div>
                <div id="viewer" className="flex justify-center"></div>
            </main>
        </div>
    );
}
