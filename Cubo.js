class Planos{
                //vec3,  vec3,   vec3,  float,   mat4,           mat4,  new THREE.Color(hex)
    constructor(origen, borde_u, borde_v, mu, modeloalmundo, mundoalmodelar,color){
            // atributos del cubo 
            this.superficie_offset = 0.0001;
            //Vectores 3
            this.origen = origen;
            this.borde_u = borde_u;
            this.borde_v = borde_v;
            //this.normal = this.borde_u.cross(this.borde_v).normalize(); 
            this.normal = normalizacion(productoCruz(this.borde_u,this.borde_v)); 
            this.mu = mu;     // friction coefficient_float

            this.velocidad_objeto = new THREE.Vector3(); //Inicializa la velocidad en 0,0,0
        
            //Matrices 3x3
            this.modeloalmundo = modeloalmundo;
            this.mundoalmodelar = mundoalmodelar;
        
            //Creacion del plano 
            //var colorP = new THREE.Color('blue');
            this.color = color;
            var geoPlano = new THREE.Geometry();
			
			var v0 = new THREE.Vector3();
			var v1 = this.borde_u;
			var v2 = sumaVec3(this.borde_u,this.borde_v);
			var v3 = this.borde_v;
            
            /*var  v0 = new THREE.Vector3(0.0,0.0,0.0);
			var  v1 = new THREE.Vector3(2.0,0.0,0.0);
			var  v2 = new THREE.Vector3(2.0,0.0,2.0);
			var  v3 = new THREE.Vector3(0.0,0.0,2.0);*/
			
			geoPlano.vertices.push(v0);//0
			geoPlano.vertices.push(v1);//1
			geoPlano.vertices.push(v2);//2
			geoPlano.vertices.push(v3);//3
			
			geoPlano.faces.push(new THREE.Face3(2,1,0));
			geoPlano.faces.push(new THREE.Face3(3,2,0));
			geoPlano.computeFaceNormals();
			
			geoPlano.faces[0].color = this.color;
			geoPlano.faces[1].color = this.color;
			
			var matPlano = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors});
			var plano = new THREE.Mesh(geoPlano,matPlano);
			
			scene.add( plano );
    }
    
    
     //Metodos del Cubo
    choque(posicion, velocidad, delta_t){
        
        var velocity_rel = restaVec3(velocidad,this.velocidad_objeto);
        var modelo_origen = mulVector(this.mundoalmodelar,this.origen);
        var siguiente_origen_modelo = mulVector(this.mundoalmodelar,sumaVec3(this.origen,Vec3MulEscalar(this.velocidad_objeto,delta_t)));
        var siguiente_posicion = sumaVec3(posicion,Vec3MulEscalar(velocidad,delta_t)); //Metodo de euler
        
        
        var siguiente_origen_posicion = restaVec3(siguiente_posicion,modelo_origen);
        var offset = productoPunto(restaVec3(posicion,modelo_origen),this.normal);
        var offset_siguiente = productoPunto(restaVec3(siguiente_posicion,siguiente_origen_modelo),this.normal);
        
        if(Math.abs(offset) < this.superficie_offset || offset * offset_siguiente < 0){
           var siguiente_posicion_plano = restaVec3(siguiente_origen_posicion, Vec3MulEscalar(this.normal,productoPunto(siguiente_origen_posicion,this.normal))); //vec3
           var proj_u = productoPunto(siguiente_posicion_plano,this.borde_u);    
           var proj_v = productoPunto(siguiente_posicion_plano,this.borde_v); 
           if(proj_u > 0 && proj_u < length2(this.borde_u) && proj_v > 0 && proj_v < length2(this.borde_v) ){
              
               var normal_externa;
               if(productoPunto(restaVec3(posicion,modelo_origen),this.normal) > 0){
                  normal_externa = this.normal; 
               }else{
                   normal_externa = Vec3MulEscalar(this.normal,-1);
               }
               
               var v_n = productoPunto(velocity_rel,normal_externa);
               var tangente_velocidad = restaVec3(velocity_rel,Vec3MulEscalar(normal_externa,v_n));
               var mag_tangente_velocidad = length(tangente_velocidad);
               
               if(mag_tangente_velocidad <= -this.mu * v_n){
                   return sumaVec3(this.velocidad_objeto, new THREE.Vector3(0,0,0));
               }else{
                   return sumaVec3(this.velocidad_objeto, Vec3MulEscalar(tangente_velocidad,(1 + this.mu * v_n / mag_tangente_velocidad)));
               }
            }
        } 
        
        return velocidad;
    }
    
    es_estacionaria(){
        return false;
    }
    
    set_velocidad(velocidad){
        this.velocidad_objeto = velocidad;
    }
    
    actualizar_posicion(delta_t){
        this.origen = sumaVec3(this.origen,mulVector(this.velocidad_objeto,delta_t)); //Metodo de euler
    }
}