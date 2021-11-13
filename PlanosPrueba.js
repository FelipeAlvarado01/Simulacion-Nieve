class PlanosPrueba{
                //vec3,  vec3,   vec3,  float,   mat4,           mat4,  new THREE.Color(hex)
    constructor(origen, borde_u, borde_v, mu, modeloalmundo, mundoalmodelar,color){
            // atributos del cubo 
            this.superficie_offset = 0.0001;
            //Vectores 3
            this.origen = origen;
            this.borde_u = borde_u;
            this.borde_v = borde_v;
        
            this.normal = normalizacion(productoCruz(borde_u,borde_v));
        
            this.plano = new Plane(this.normal,0);
            
            scene.add( this.plano );
            
            /*this.mu = mu;     // friction coefficient_float

            this.velocidad_objeto = new THREE.Vector3(0,0,0); //Inicializa la velocidad en 0,0,0
        
            //Matrices 4x4
            this.modeloalmundo = modeloalmundo;
            this.mundoalmodelar = mundoalmodelar;
        
            //Creacion del plano 
            //var colorP = new THREE.Color('transparent');
            this.color = color;
            var geoPlano = new THREE.Geometry();
			
			var v0 = new THREE.Vector3();//(0,0,0)
            var v1 = this.borde_u;
			var v2 = sumaVec3(this.borde_u,this.borde_v);
			var v3 = this.borde_v;
        	
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
			this.plano = new THREE.Mesh(geoPlano,matPlano);
			this.render();
			scene.add( this.plano );  */ 
    }
    
    
     //Metodos de los planos

    choque(posicion, velocidad, delta_t){
        
        var velocidad_rel = restaVec3(velocidad,this.velocidad_objeto);
        var modelo_origen = mulVector4Matriz4(this.origen,this.mundoalmodelar);//determina el origen en el que se encuentra el plano 
        var siguiente_origen_modelo = mulVector4Matriz4(sumaVec3(this.origen,Vec3MulEscalar(this.velocidad_objeto,delta_t)),this.mundoalmodelar);//Metodo de euler para determinar la siguiente posicion del plano
        var siguiente_posicion = sumaVec3(posicion,Vec3MulEscalar(velocidad,delta_t)); //Metodo de euler
     
        //Compruebe si siguiente_posicion entra en el plano infinito
        var siguiente_origen_posicion = restaVec3(siguiente_posicion,modelo_origen);
        var offset = productoPunto(restaVec3(posicion,modelo_origen),this.normal);//Revisa la proyeccion de la posicion particula y posicion del plano  
        var offset_siguiente = productoPunto(restaVec3(siguiente_posicion,siguiente_origen_modelo),this.normal);//Revisa la siguiente proyeccion de la posicion particula y posicion del plano
     
        //console.log("offset: "+offset );
        //console.log("offset_siguiente: "+ offset_siguiente );
        
        if(Math.abs(offset) < this.superficie_offset || offset * offset_siguiente < 0){
           //Comprueba si siguiente_posicion está dentro de límites finitos
           //console.log("Si se proyecta al plano");
            
           //Estas lineas solo se usan si se sabe que el objeto se va a mover
           //var siguiente_posicion_plano = restaVec3(siguiente_origen_posicion, Vec3MulEscalar(this.normal,productoPunto(siguiente_origen_posicion,this.normal))); //vec3
           //var proj_u = productoPunto(siguiente_posicion_plano,this.borde_u);    
           //var proj_v = productoPunto(siguiente_posicion_plano,this.borde_v); 
            
           //if(proj_u > 0 && proj_u < length2(this.borde_u) && proj_v > 0 && proj_v < length2(this.borde_v)){
               
               //console.log("Si hay colision con friccion");
               var normal_externa;
               
               if(productoPunto(restaVec3(posicion,modelo_origen),this.normal) > 0){
                  normal_externa = this.normal; 
               }else{
                  normal_externa = Vec3MulEscalar(this.normal,-1);
               }
               
               var v_n = productoPunto(velocidad_rel,normal_externa);
               var tangente_velocidad = restaVec3(velocidad_rel,Vec3MulEscalar(normal_externa,v_n));
               var mag_tangente_velocidad = length(tangente_velocidad);
               
               if(mag_tangente_velocidad <= -1 * this.mu * v_n){
                   //console.log("Colision estatica");
                   return sumaVec3(this.velocidad_objeto, new THREE.Vector3(0,0,0));
               }else{
                   //console.log("Colision dinamica");
                   return sumaVec3(this.velocidad_objeto, Vec3MulEscalar(tangente_velocidad,(1 + this.mu * v_n / mag_tangente_velocidad)));
               }
            //}
        } 
        //console.log("No hay colision");
        return velocidad;
    }

        /*choque(posicion, velocidad, delta_t){
        
        var velocidad_rel = restaVec3(velocidad,this.velocidad_objeto);
        var modelo_origen = mulVector4Matriz4(this.origen,this.mundoalmodelar);//determina el origen en el que se encuentra el plano 
        
        console.log("modelo_origen x: " + modelo_origen.x);
        console.log("modelo_origen y: " + modelo_origen.y);
        console.log("modelo_origen z: " + modelo_origen.z);
        
        var siguiente_origen_modelo = mulVector4Matriz4(sumaVec3(this.origen,Vec3MulEscalar(this.velocidad_objeto,delta_t)),this.mundoalmodelar);//Metodo de euler para determinar la siguiente posicion del plano
        var siguiente_posicion = sumaVec3(posicion,Vec3MulEscalar(velocidad,delta_t)); //Metodo de euler
        
            
        console.log("siguiente_origen_modelo x: " + siguiente_origen_modelo.x);
        console.log("siguiente_origen_modelo y: " + siguiente_origen_modelo.y);
        console.log("siguiente_origen_modelo z: " + siguiente_origen_modelo.z);
            
        //Compruebe si siguiente_posicion entra en el plano infinito
        //var siguiente_origen_posicion = restaVec3(siguiente_posicion,modelo_origen);
        var offset = productoPunto(restaVec3(posicion,modelo_origen),this.normal);//Revisa la proyeccion de la posicion particula y posicion del plano
        //var offset = productoPunto(restaVec3(posicion,modelo_origen),this.normal);//Revisa la proyeccion de la posicion particula y posicion del plano
        var offset_siguiente = productoPunto(restaVec3(siguiente_posicion,siguiente_origen_modelo),this.normal);//Revisa la siguiente proyeccion de la posicion particula y posicion del plano 
        
        if(Math.abs(offset) < this.superficie_offset || offset * offset_siguiente < 0){
               var normal_externa;
               
               if(productoPunto(restaVec3(posicion,modelo_origen),this.normal) > 0){
                  normal_externa = this.normal; 
                } else{
                  normal_externa = Vec3MulEscalar(this.normal,-1);
               }
               
               var v_n = productoPunto(velocidad_rel,normal_externa);
               var tangente_velocidad = restaVec3(velocidad_rel,Vec3MulEscalar(normal_externa,v_n));
               var mag_tangente_velocidad = length(tangente_velocidad);
               
               if(mag_tangente_velocidad <= -1 * this.mu * v_n){
                   //console.log("Colision estatica");
                   return sumaVec3(this.velocidad_objeto, new THREE.Vector3(0,0,0));
               }else{
                   //console.log("Colision dinamica");
                   return sumaVec3(this.velocidad_objeto, Vec3MulEscalar(tangente_velocidad,(1 + this.mu * v_n / mag_tangente_velocidad)));
               }
            //}
        } 
        //console.log("No hay colision");
        return velocidad;
    } */

    
    render(){
        var modelo = trasladarMat4(new THREE.Matrix4(),this.origen);
        this.plano.applyMatrix(modelo);
        this.plano.elementsNeedUpdate = true;
        
        //console.log("pos plano x: "+this.plano.position.x);
        //console.log("pos plano y: "+this.plano.position.y);
        //console.log("pos plano z: "+this.plano.position.z);
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