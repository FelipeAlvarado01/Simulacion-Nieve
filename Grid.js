
class GridNode{
    //Atributos del nodo
    constructor(){
        this.index;	// the {i, j, k} index of the grid node es un vector
        this.masa;			// interpolated mass
        this.velocidad;		// interpolated velocity
        this.siguiente_velocidad; // for part 4, 5, 6
        this.fuerza;
        /*
            Aquí es donde se guardaran los objetos pariculas
            Array de tamaño dinamico (no definido);
        */
        this.particulas = new Array();    
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
       this.reset_time = 0.1; 
        
       this.todas_particulas = new Array();
       this.nodos_en_uso = new Array();
       //this.nodos_en_uso = new Map();
        
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
    
    resetearGrid(){
        for(var i=0;i<this.nodos_en_uso.length;i++){
           this.nodos_en_uso[i].masa = 0
           this.nodos_en_uso[i].velocidad = new THREE.Vector3();
           this.nodos_en_uso[i].siguiente_velocidad = new THREE.Vector3();
           this.nodos_en_uso[i].fuerza = new THREE.Vector3();
           this.nodos_en_uso[i].particulas.length = 0 //Se limpia el array de particula
        } 
        
        for(var i=0;i<this.todas_particulas.length;i++){
            this.todas_particulas.posicion[i] = maximoVec3(new THREE.Vector3(), minimoVec3(this.todas_particulas.posicion,new THREE.Vector3(this.dim_x,this.dim_y,this.dim_z).subScalar(1e-5)));
            
        /*particle->position = glm::max(vec3(0.0), glm::min(particle->position, vec3(dim_x, dim_y, dim_z) - vec3(1e-5)));
        ivec3 index = glm::floor(particle->position / h);

        // We need to compute the new neighborhood bounds before we try instantiating needed GridNodes in the interpolation radius.
        particle->compute_neighborhood_bounds();
        particle->compute_b_spline_grad();*/
        }
    }
    
    //Elimina los nodos no usados
    pruneUnusedNodes() { 
        for (var i=0;i<this.nodos_en_uso.length;i++) {
            var index = this.nodos_en_uso[i].index;
            this.nodos[index.x][index.y][index.z] = null;
            this.nodos_en_uso[i] = null; //Elimina los elementos del array 
        }
        this.nodos_en_uso.length = 0; //Se limpia el array
    }

    //Metodos de Grid
    simular(delta_t, aceleracion_externa, colision_objetos, parametros){
       this.steps_since_node_reset++; 
        
        if (this.steps_since_node_reset > this.reset_time / delta_t) {
            pruneUnusedNodes();
            this.steps_since_node_reset = 0;
        }
    }   
}






























