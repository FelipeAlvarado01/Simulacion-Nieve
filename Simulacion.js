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
        
        this.colision_objecto = new Array();
        
        this.is_paused = false;
        
    }
    
    
    cargarGrid(grid){
        this.grid = grid;
    }
    
    cargarColisionObjeto(objeto){
        this.colision_objecto = objeto;
    }
         //mat4
    /*init(modelo){
        this.modeloalmundo = modelo;
        var x = this.grid.res_x;
        var y = this.grid.res_y;
        var z = this.grid.res_z;

    }*/
    
    dibujarContenido(grid,objetos){
        if(!this.is_paused){
            for(var i = 0; i < this.paso_simulacion; i++){
                for(var j=0;j<this.colision_objecto.length;j++){
                    if(!this.colision_objecto[j].es_estacionaria()){
                        this.colision_objecto[j].actualizar_posicion(this.delta_t);
                    }
                }
                //console.log("Si estoy dibujando contenido");
                grid.simular(this.delta_t, this.aceleracion_externa, objetos, this.parametros);
                
                //console.log("Si estoy dibujando contenido 2");
            }
        }
        
        //Actualizar la posicion de la particula
        this.dibujarParticulas(grid); 
        
    }
    
    /*dibujarGrid(){
        
    }*/
    
    dibujarParticulas(grid){
        var todas_particulas = grid.todas_particulas;

        console.log("tamArray Todas las particulas: "+ todas_particulas.length);
        for(var i=0;i<todas_particulas.length;i++){
           
            var geoPunto = new THREE.Geometry();
            geoPunto.vertices.push(new THREE.Vector3(todas_particulas[i].posicion.x,todas_particulas[i].posicion.y,todas_particulas[i].posicion.z));
            var matPunto = new THREE.PointsMaterial( {color:0xDBDBDB } );
            var punto = new THREE.Points(geoPunto,matPunto);
            //punto.applyMatrix(modelo_particula);				//Aplicar la matriz de traslación al objeto				
            //punto.elementsNeedUpdate = true;	//Avisar que la matriz del objeto ha cambiado
            scene.add(punto);
            
            console.log("Si dibuje particulas");
        }
        
        
                
        //for(var i=0;i<todas_particulas.length;i++){
            //var len = todas_particulas[i].cbrt_volumen;
            //var modelo_particula = new THREE.Matrix4();
            /*modelo_particula.set(0,0,0,0,
                                 0,0,0,0,
                                 0,0,0,0,
                                 0,0,0,0);*/
            
            //modelo_particula = scale(particle_model, new THREE.Vector3(len, len, len));
            //modelo_particula = mulMatriz4(modelo_particula,this.modeloalmundo);
            //var mat4 = new THREE.Matrix4();
            /*mat4.set(0,0,0,0,
                     0,0,0,0,
                     0,0,0,0,
                     0,0,0,0);*/
            //modelo_particula = mulMatriz4(modelo_particula,trasladarMat4(mat4, todas_particulas[i].poscion));  
        //}  
    }
    
    /*dibujarNodoGrid(){
        
    }
    
    dibujarFuerzaGrid(){
        
    }
    
    dibujarFuerzaParticula(){
        
    }*/
}