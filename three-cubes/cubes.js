import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";

      function main() {
        // Canvas
        const canvas = document.querySelector("#c");

        // Renderer (WebGL)
        const renderer = new THREE.WebGLRenderer({ canvas });

        // Camera
        const fov = 75;
        const aspect = 2; // the canvas default is 300x150
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 3;

        // Scene
        const scene = new THREE.Scene();

        // Light
        {
          const color = 0xffffff;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(-1, 2, 4);
          scene.add(light);
        }

        // Box Geometry
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        // Material
        // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  Not affected by light
        // const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  greenish blue

        // Mesh - combination of three things: Geometry, Material and position, orientation and scale
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        // Call the renderer - I commented it because we call the renderer through the render function
        // renderer.render(scene, camera);

        function resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement;
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const needResize = canvas.width !== width || canvas.height !== height;
          if (needResize) {
            renderer.setSize(width, height, false);
          }
          return needResize;
        }

        function render(time) {
          time *= 0.001; // convert time to seconds

          // Resize canvas resolution according to window dimensions
          if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }

          // Fix stretch problem
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();

          cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * 0.1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
          });

          renderer.render(scene, camera);

          requestAnimationFrame(render);
        }

        requestAnimationFrame(render);

        function makeInstance(geometry, color, x) {
          const material = new THREE.MeshPhongMaterial({ color });

          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);

          cube.position.x = x;

          return cube;
        }

        const cubes = [
          makeInstance(geometry, 0x44aa88, 0),
          makeInstance(geometry, 0x8844aa, -3),
          makeInstance(geometry, 0xaa8844, 3),
        ];
      }