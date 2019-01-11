var scene;
var scene2;
var camera;
var renderer;
var renderer2;
var width;
var height;
var canvas = document.getElementById("canvas-scene");
var canvas2 = document.getElementById("canvas-scene2");

function init() {

  width = $("#canvas-scene").width();
  height = $("#canvas-scene").height();

  scene = new THREE.Scene();
  scene2 = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer2 = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer2.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer2.setPixelRatio(window.devicePixelRatio);
  canvas.appendChild(renderer.domElement);
  canvas2.appendChild(renderer2.domElement);

  camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 1000);
  camera.position.set(0,-.5,38);
  camera.lookAt(0,0,0);

  scene.add(camera);
  scene2.add(camera);

  var light1 = new THREE.PointLight(0xffffff, 1);
  light1.position.set(-100, -250, 100);
  scene.add(light1);
  scene2.add(light1);

  var keyLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.5);
  keyLight.position.set(-100, 0, 100);
  var fillLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.75);
  fillLight.position.set(100, 0, 100);
  var backLight = new THREE.DirectionalLight(0xffffff, 1);
  backLight.position.set(100, 0, -100).normalize();

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);
  scene2.add(keyLight);
  scene2.add(fillLight);
  scene2.add(backLight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls2 = new THREE.OrbitControls(camera, renderer2.domElement);
  controls.enablePan = false;
  controls.zoomSpeed = .7;
  controls2.enablePan = false;
  controls2.zoomSpeed = .7;


  myLoader();
  myLoader2();

  window.addEventListener('resize', function() {
    width = $("#canvas-scene").width();
    height = $("#canvas-scene").height();
    renderer.setSize(width, height);
    renderer2.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

}

function myLoader() {

  var rotationSpeed;
  var myModel = 'nikeGltf.gltf';

  var loader = new THREE.GLTFLoader().setPath('models/');
  loader.load(myModel, function(gltf) {
    var mesh = gltf.scene;

    mesh.rotation.y = -3.2;

    rotationSpeed = .02;
    rotation();
    function rotation() {
      mesh.rotation.y -= rotationSpeed;
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(rotation);
    };

    mesh.traverse(function(node){
       if (node.isMesh) {
         node.material.color = new THREE.Color(0xffffff);
         node.material.wireframe = true;

         console.log(node.material);
         node.material.emissive = new THREE.Color(0x26FF74);

         let glowing = new TimelineMax({
           repeat: -1
         });

         glowing.add([
           TweenMax.fromTo(node.material, 2, {emissiveIntensity: 0}, {emissiveIntensity: .6}),
         ]).add([
           TweenMax.fromTo(node.material, 2, {emissiveIntensity: .6}, {emissiveIntensity: 0})
         ]);
       }
    });

    var Handler = function() {
       this.clickHandler = function() {
          var self = this;
          this.timerId = setTimeout(function() {
              // ACCELERATION
              rotationSpeed = 0.05;
          },1);

          this.timerId = setTimeout(function() {
              rotationSpeed = 0.02;
              // LINK TO 3D visualisation?
          },1000);
       };

       this.cancelHandler = function() {
           if (this.timerId) {
              clearTimeout(this.timerId);
              rotationSpeed = 0.02;
              mesh.rotation.x = 0;
              mesh.rotation.z = 0;
           }
       }
    }
    var h = new Handler();
    addEventListener('mousedown', h.clickHandler.bind(h));
    addEventListener('mouseup', h.cancelHandler.bind(h));

    scene.add(mesh);
  });

}

function myLoader2() {

  var rotationSpeed;
  var myModel = 'nikeGltf.gltf';

  var loader2 = new THREE.GLTFLoader().setPath('models/');
  loader2.load(myModel, function(gltf) {
    var mesh = gltf.scene;

    mesh.rotation.y = -3.2;

    rotationSpeed = .02;
    rotation();
    function rotation() {
      mesh.rotation.y -= rotationSpeed;
      renderer2.render(scene2, camera);
      controls2.update();
      requestAnimationFrame(rotation);
    };

    mesh.traverse(function(node){
       if (node.isMesh) {
         node.material.color = new THREE.Color(0xffffff);
         // console.log(node.material);
       }
    });

    var Handler = function() {
       this.clickHandler = function() {
          var self = this;
          this.timerId = setTimeout(function() {
              // ACCELERATION
              rotationSpeed = 0.05;
          },1);

          this.timerId = setTimeout(function() {
              rotationSpeed = 0.02;
              // LINK TO 3D visualisation?
          },1000);
       };

       this.cancelHandler = function() {
           if (this.timerId) {
              clearTimeout(this.timerId);
              rotationSpeed = 0.02;
              mesh.rotation.x = 0;
              mesh.rotation.z = 0;
           }
       }
    }
    var h = new Handler();
    addEventListener('mousedown', h.clickHandler.bind(h));
    addEventListener('mouseup', h.cancelHandler.bind(h));

    scene2.add(mesh);
  });

}

function animate() {
  width = $("#canvas-scene").width();//pas sur
  height = $("#canvas-scene").height();//pas sur
  renderer.setSize(width, height);//pas sur
  renderer2.setSize(width, height);//pas sur
  camera.aspect = width / height;//pas sur

  camera.updateProjectionMatrix();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  renderer2.render(scene2, camera);
  controls2.update();
};

init();
animate();








//
