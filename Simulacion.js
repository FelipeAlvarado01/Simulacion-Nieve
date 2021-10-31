class Simulacion{
    
    constructor(parametros){ //Ingresa el objeto de la clase de  parametros fisicos
        this.paso_simulacion;
        this.parametros = parametros;
        
        this.modeltoworld =  new THREE.Matrix4();
        
        this.gravedad = new TREE.Vector3(0,-9.8,0);
        this.aceleracion_externa = new Array();
        
        this.grid;
        
        this.collision_objecto = new Array();
        
    }
    
    cargarGrid(grid){
        this.grid = grid;
    }
    
    cargarColisionObjeto(objeto){
        this.collision_objecto = objeto;
    }
    
    init(){
        
    }
    
    dibujarContenido(){
        
    }
    
    dibujarGrid(){
        
    }
    
    dibujarParticulas(){
        
    }
    
    dibujarNodoGrid(){
        
    }
    
    dibujarFuerzaGrid(){
        
    }
    
    dibujarFuerzaParticula(){
        
    }
}