var scene;
var camera;
var renderer;
var width;
var height;
var canvas = document.getElementById("canvas-scene");

function init() {

  width = $("#canvas-scene").width();
  height = $("#canvas-scene").height();

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvas.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 1000);
  camera.position.set(0,-.5,38);
  camera.lookAt(0,0,0);

  scene.add(camera);

  var light1 = new THREE.PointLight(0xffffff, 1);
  light1.position.set(-100, -250, 100);
  scene.add(light1);

  var keyLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1);
  keyLight.position.set(-100, 0, 100);
  var fillLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1);
  fillLight.position.set(100, 0, 100);
  var backLight = new THREE.DirectionalLight(0xffffff, 1);
  backLight.position.set(100, 0, -100);

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.zoomSpeed = .7;


  myLoader();

  window.addEventListener('resize', function() {
    width = $("#canvas-scene").width();
    height = $("#canvas-scene").height();
    renderer.setSize(width, height);
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

    rotationSpeed = .01;
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
         node.material.wireframe = false;
       }
    });

    var Handler = function() {
       this.clickHandler = function() {
          var self = this;
          this.timerId = setTimeout(function() {
              // ACCELERATION
              rotationSpeed = 0.2;

              mesh.traverse(function(node){
                 if (node.isMesh) {
                   node.material.color = new THREE.Color(0xffffff);
                   node.material.wireframe = true;
                 }
              });

              let hold = new TimelineMax();


              TweenMax.to(".hold", .01, {autoAlpha: 1})



          },1);

          this.timerId = setTimeout(function() {
            rotationSpeed = .01;
            mesh.traverse(function(node){
               if (node.isMesh) {
                 node.material.wireframe = false;
                 node.material.color = new THREE.Color(newColor);
               }
            });
            TweenMax.to(".hold", .01, {autoAlpha: 0})
          },500);
       };

       this.cancelHandler = function() {
           if (this.timerId) {
              clearTimeout(this.timerId);
              rotationSpeed = 0.01;
              mesh.rotation.x = 0;
              mesh.rotation.z = 0;
              mesh.traverse(function(node){
                 if (node.isMesh) {
                   node.material.wireframe = false;
                 }
              });
           }
           TweenMax.to(".hold", .01, {autoAlpha: 0})
       }
    }


    var h = new Handler();
    var newColor;
    $(".colors-btn").mousedown(h.clickHandler.bind(h));
    $(".colors-btn").mousedown(function() {
      newColor = "" + $(this).css("background-color") + "";
      console.log(newColor);
    });
    $(".colors-btn").mouseup(h.cancelHandler.bind(h));
    // document.getElementsByClassName("colors-btn").addEventListener('mousedown', h.clickHandler.bind(h));
    // document.getElementsByClassName("colors-btn").addEventListener('mouseup', h.cancelHandler.bind(h));

    scene.add(mesh);
  });

}

function animate() {
  width = $("#canvas-scene").width();//pas sur
  height = $("#canvas-scene").height();//pas sur
  renderer.setSize(width, height);//pas sur
  camera.aspect = width / height;//pas sur

  camera.updateProjectionMatrix();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};

init();
animate();








//
