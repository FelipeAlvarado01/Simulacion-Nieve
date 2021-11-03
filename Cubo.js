class Cubo{
    constructor(origen, borde_u, borde_v, mu, modeloalmundo, mundoalmodelar){
            // atributos del cubo 
        
            //Vectores 3
            this.origen = origen;
            this.borde_u = borde_u;
            this.borde_v = borde_v;
            this.normal = this.borde_u.cross(this.borde_v).normalize(); 
            this.mu = mu;     // friction coefficient_float

            this.velocidad_objeto = new THREE.Vector3();
        
            //Matrices 3x3
            this.modeloalmundo = modeloalmundo;
            this.mundoalmodelar = mundoalmodelar;
        
            //Creacion de el cubo
            this.colorR = new THREE.Color( 0xAA3333 );
		  	this.colorG = new THREE.Color( 0x33AA33 );
		  	this.colorB = new THREE.Color( 0x333366 );
		    this.geoCubo = new THREE.Geometry();
			
            this.v0 = new THREE.Vector3(0.0,0.0,0.0);
			this.v1 = new THREE.Vector3(1.0,0.0,0.0);
			this.v2 = new THREE.Vector3(0.0,0.0,1.0);
			this.v3 = new THREE.Vector3(1.0,0.0,1.0);
			this.v4 = new THREE.Vector3(1.0,1.0,1.0);
			this.v5 = new THREE.Vector3(0.0,1.0,0.0); 
			this.v6 = new THREE.Vector3(1.0,1.0,0.0);  
			this.v7 = new THREE.Vector3(0.0,1.0,1.0); 
        
            //Vertices del cubo
			this.geoCubo.vertices.push(this.v0);
			this.geoCubo.vertices.push(this.v1);
			this.geoCubo.vertices.push(this.v2);
			this.geoCubo.vertices.push(this.v3);
			this.geoCubo.vertices.push(this.v4);
			this.geoCubo.vertices.push(this.v5);
			this.geoCubo.vertices.push(this.v6);
			this.geoCubo.vertices.push(this.v7);
			
            //Caras del cubo
			this.geoCubo.faces.push(new THREE.Face3(0,5,1));
			this.geoCubo.faces.push(new THREE.Face3(5,6,1));
			this.geoCubo.faces.push(new THREE.Face3(5,7,6));
			this.geoCubo.faces.push(new THREE.Face3(6,7,4));
			this.geoCubo.faces.push(new THREE.Face3(7,2,4));
			this.geoCubo.faces.push(new THREE.Face3(4,2,3));
			this.geoCubo.faces.push(new THREE.Face3(1,3,0));
			this.geoCubo.faces.push(new THREE.Face3(0,3,2));
			this.geoCubo.faces.push(new THREE.Face3(0,2,5));
			this.geoCubo.faces.push(new THREE.Face3(7,5,2));
			this.geoCubo.faces.push(new THREE.Face3(1,6,3));
			this.geoCubo.faces.push(new THREE.Face3(6,4,3));
			this.geoCubo.computeFaceNormals();
            
            //Colores de las caras
			this.geoCubo.faces[0].color = this.colorR;
			this.geoCubo.faces[1].color = this.colorR;
			this.geoCubo.faces[2].color = this.colorG;
			this.geoCubo.faces[3].color = this.colorG;
			this.geoCubo.faces[4].color = this.colorB;
			this.geoCubo.faces[5].color = this.colorB;
			this.geoCubo.faces[6].color = this.colorR;
			this.geoCubo.faces[7].color = this.colorR;
			this.geoCubo.faces[8].color = this.colorG;
			this.geoCubo.faces[9].color = this.colorG;
			this.geoCubo.faces[10].color = this.colorB;
			this.geoCubo.faces[11].color = this.colorB;
	
			this.matCubo = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
			this.Cubo = new THREE.Mesh(this.geoCubo,this.matCubo);
			//this.Cubo.applyMatrix(new THREE.Matrix4().makeTranslation(-0.5,-0.5,0-0.5));
	
            //scene.add(this.Cubo);
    }
     //Metodos del Cubo
    choque(posicion, velocidad, delta_t){
        var velocity_rel = restaVec3(velocidad,this.velocidad_objeto);
        var modelo_origen = mulVector(this.mundoalmodelar,this.origen);
        var siguiente_modelo_origen = mulVector(this.mundoalmodelar,sumaVec3(this.origen,Vec3MulEscalar(this.velocidad_objeto,delta_t)))
        var siguiente_posicion = sumaVec3(posicion,Vec3MulEscalar(velocidad,delta_t));
        
          /*vec3 velocity_rel = velocity - this->object_velocity;
          vec3 origin_model = vec3(worldtomodel * vec4(this->origin, 1.0));
          vec3 next_origin_model = vec3(worldtomodel * vec4(this->origin + object_velocity * delta_t, 1.0));
          vec3 next_position = position + velocity * delta_t;*/
    }
    
    es_estacionaria(){
        
    }
    
    set_velocity(velocity){
        
    }
    
    actualizar_posicion(delta_t){
        
    }
    
    
}