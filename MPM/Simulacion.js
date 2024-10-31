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
                var todas_particulas = grid.todas_particulas;
                /*console.log("posicion x: "+todas_particulas[0].posicion.x);
                console.log("posicion y: "+todas_particulas[0].posicion.y);
                console.log("posicion z: "+todas_particulas[0].posicion.z);
                
                console.log("velocidad x: "+todas_particulas[0].velocidad.x);
                console.log("velocidad y: "+todas_particulas[0].velocidad.y);
                console.log("velocidad z: "+todas_particulas[0].velocidad.z);
                console.log("-----------------------------------------------------");*/
            }

        }
        
        this.dibujarParticulas(); 
    }
    
    dibujarParticulas(){
        var todas_particulas = grid.todas_particulas;
        //console.log("Tamaño de todas las particulas: "+todas_particulas.length);
        
        for(var i=0;i<todas_particulas.length;i++){

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
}