
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
            this.todas_particulas[i].posicion = maximoVec3(new THREE.Vector3(), minimoVec3(this.todas_particulas.posicion,new THREE.Vector3(this.dim_x,this.dim_y,this.dim_z).subScalar(1e-5)));
            
            var index = this.todas_particulas[i].posicion.divideScalar(this.h).floor();
            
            this.todas_particulas[i].Calculos_limites_vencidad();
            this.todas_particulas[i].Calculos_gradiente_b_spline();
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        var nodo = this.nodos[dest_i][dest_j][dest_k];
                        if(nodo == null){
                            nodo =  new GridNode();
                            nodo.index = new THREE.Vector3(dest_i,dest_j,dest_k);
                            this.nodos[dest_i][dest_j][dest_k] ]= nodo;
                        }
                    }
                }
                
            }
            
            /*for (int dest_i = particle->i_lo; dest_i < particle->i_hi; ++dest_i) {
                for (int dest_j = particle->j_lo; dest_j < particle->j_hi; ++dest_j) {
                    for (int dest_k = particle->k_lo; dest_k < particle->k_hi; ++dest_k) {
                        GridNode* node = nodes[dest_i][dest_j][dest_k];
                        if (node == NULL) {
                            node = new GridNode();
                            node->index = ivec3(dest_i, dest_j, dest_k);
                            nodes[dest_i][dest_j][dest_k] = node;
                        }
                        nodes_in_use.insert(node);
                    }
                }
            }*/
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






























