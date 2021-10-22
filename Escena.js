function creacion(){
//Creacion de estructura basica de Three.js
scene = new THREE.Scene();
aspect = window.innerWidth / window.innerHeight;
camera = new THREE.PerspectiveCamera( 45, aspect, 0.1, 1000);
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
scene.background =new THREE.Color( 0xFFFFFF );

document.body.appendChild( renderer.domElement );
controls = new THREE.OrbitControls(camera, renderer.domElement);
						
var x = new THREE.Vector3( 1, 0, 0 );
var y = new THREE.Vector3( 0, 1, 0 );
var z = new THREE.Vector3( 0, 0, 1 );
var origin = new THREE.Vector3( 0, 0, 0 );

var ejeX = new THREE.ArrowHelper( x, origin, 1, 0xFF1400 );
var ejeY = new THREE.ArrowHelper( y, origin, 1, 0x7DFF00 );
var ejeZ = new THREE.ArrowHelper( z, origin, 1, 0x0027FF );           
            
scene.add(ejeX);
scene.add(ejeY);
scene.add(ejeZ);
			
camera.position.x = 15;
camera.position.y =	0;	 
camera.position.z = 15;
camera.lookAt( origin ); 
}

function renderEscena() {
  //camera.position.x+=1;
  renderer.render(scene, camera);
}