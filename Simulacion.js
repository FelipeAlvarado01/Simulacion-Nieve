class Simulacion{
    
    constructor(frames_per_sec,delta_t,parametros){ //Ingresa el objeto de la clase de  parametros fisicos
        //Parametros para render
        this.frames_per_sec = frames_per_sec;
        //this.longitud = longitud;
        this.delta_t = delta_t;
        
        this.duracion_frames = 1. / frames_per_sec;
        this.paso_simulacion = Math.round(this.duracion_frames / delta_t);
        this.parametros = parametros;
        
        this.modeloalmundo =  new THREE.Matrix4();
        
        this.gravedad = new THREE.Vector3(0,-9.8,0);
        this.aceleracion_externa = new Array();//Es un arreglo para vectores3
        this.aceleracion_externa.push(this.gravedad);
        
        this.grid;
        
        this.colision_objecto;
        
        this.is_paused = false;
        
        this.objetos_en_escena = new Array();
        
    }
    
    cargarModeloalmundo(modeloalmundo){
        this.modeloalmundo = modeloalmundo;
    }
    cargarGrid(grid){
        this.grid = grid;
    }
    
    cargarColisionObjeto(objeto){
        this.colision_objecto = objeto;
        //console.log("tam colision objetos: "+this.colision_objecto.length);
    }
    
    dibujarContenido(){
        if(!this.is_paused){
            for(var i = 0; i < 30; i++){
                
                for(var j=0;j< this.colision_objecto.length;j++){
                    if(!this.colision_objecto[j].es_estacionaria()){
                        this.colision_objecto[j].actualizar_posicion(this.delta_t);
                    }
                }
                //console.log("Si estoy simulando");
                this.grid.simular(this.delta_t, this.aceleracion_externa,this.colision_objecto, this.parametros);
                console.log("-----------------------------------------------------");
            }
            //console.log("Llego aqui")
        }
        
        //Actualizar la posicion de la particula
        //console.log("Dibujando particulas");
        this.dibujarParticulas(); 
        //this.dibujarNodoGrid();
    }
    
    dibujarParticulas(){
        var todas_particulas = grid.todas_particulas;
        //console.log("Tamaño de todas las particulas: "+todas_particulas.length);
        
        for(var i=0;i<todas_particulas.length;i++){
            //console.log("pos x draw: "+todas_particulas[i].posicion.x);
            //console.log("pos y draw: "+todas_particulas[i].posicion.y);
            //console.log("pos z draw: "+todas_particulas[i].posicion.z);
            var len = todas_particulas[i].cbrt_volumen;
            
            var modelo_particula = new THREE.Matrix4();
            
            modelo_particula = mulMatriz4(modelo_particula,this.modeloalmundo);
            modelo_particula = mulMatriz4(modelo_particula,trasladarMat4(new THREE.Matrix4(), todas_particulas[i].posicion));
            
            var geoPunto = new THREE.Geometry();//Se crean las particulas de nieve
            geoPunto.vertices.push(new THREE.Vector3(0,0,0));
            var matPunto = new THREE.PointsMaterial( {color:0xDBDBDB } );
            var punto = new THREE.Points(geoPunto,matPunto);
            punto.applyMatrix(modelo_particula);				//Aplicar la matriz de traslación al objeto				
            punto.elementsNeedUpdate = true;

            scene.add(punto);
            this.objetos_en_escena.push(punto);
            
        }
    }
    
    eliminarObjetosEscena(){
        for(var i=0;i<this.objetos_en_escena.length;i++){
            scene.remove(this.objetos_en_escena[i]);
        }
        this.objetos_en_escena.length = 0;
    }
    
    
    dibujarNodoGrid(){
        this.grid.eliminarNodosNoUsados();
        this.grid.resetearGrid();
        
        for(var i=0;i<this.grid.nodos_en_uso.length;i++){
            console.log("si grafica nodos grid");
            if(this.grid.nodos_en_uso[i].particulas.length > 0){
                
               
                var len = this.grid.h; 
                var centro_nodo = Vec3MulEscalar(sumaVec3(this.grid.nodos_en_uso[i].index,new THREE.Vector3(0.5,0.5,0.5)),this.grid.h);
                
                var modelo_nodo = new THREE.Matrix4();
                modelo_nodo = mulMatriz4(modelo_nodo,this.modeloalmundo);
                modelo_nodo = mulMatriz4(modelo_nodo,trasladarMat4(new THREE.Matrix4(), centro_nodo));
                
                var geoPunto = new THREE.Geometry();//Se crean las particulas de nieve
                geoPunto.vertices.push(new THREE.Vector3(0,0,0));
                var matPunto = new THREE.PointsMaterial( {color:0xDBDBDB } );
                var punto = new THREE.Points(geoPunto,matPunto);
                punto.applyMatrix(modelo_nodo);//Aplicar la matriz de traslación al objeto				
                punto.elementsNeedUpdate = true;
                scene.add(punto); 
            }  
            
        }
    }
    
    /*dibujarFuerzaGrid(){
        
    }
    
    dibujarFuerzaParticula(){
        
    }*/
}