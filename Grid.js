
class GridNode{
    
    constructor(){
        this.index;	// the {i, j, k} index of the grid node
        this.masa;			// interpolated mass
        this.velocidad;		// interpolated velocity
        this.siguiente_velocidad; // for part 4, 5, 6
        this.fuerza;
        
        this.particulas = new Array(); //Array de tamaño dinamico (no definido);
    }
}

class Grid{
    
    constructor(res_x,res_y,res_z,h){  
       //Atributos y inicializacion    
       this.res_x = res_x;
       this.res_y = res_y;
       this.res_z = res_z;
  
       this.dim_x = res_x * h;
       this.dim_y = res_y * h;
       this.dim_z = res_z * h;
        
       this.h;  
        
       this.primer_paso = true; 
       this.steps_since_node_reset = 0;
        
       this.todas_particulas = new Array();
       this.Nodos_en_uso = new Set();
        
        /**
        Array multidimensional para los nodos
        Se define la grid para realizar los calculos
        **/
        
        this.nodos = new Array(this.res_x); 
        for(var i=0; i<this.nodos; i++) {
            this.nodos[i] = new Array(this.res_y);
            for(var j=0; j<this.nodos[i].length; j++) {
                this.nodos[i][j] = new Array(this.res_z);
            }
        }
    }
    
    //Metodos de Grid
    simular(delta_t, aceleracion_externa, colision_objetos, parametros){
        
        
    }
    
}