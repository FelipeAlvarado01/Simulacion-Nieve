
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

/////////////////////////////////////////////////////////////////////////////////////////


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
        
       this.todas_particulas = new Array(); //Guardar objetos particulas
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
            this.todas_particulas[i].posicion = maximoVec3(new THREE.Vector3(), minimoVec3(this.todas_particulas.posicion,new THREE.Vector3(this.dim_x,this.dim_y,this.dim_z).subScalar(1e-5))); //subScalar resta un escalar a un vector
            
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
                            this.nodos[dest_i][dest_j][dest_k] = nodo;
                        }
                        this.nodos_en_uso.push(nodo);
                    }
                }
            }
            var nodo = this.nodos[index.x][index.y][index.z];
            nodo.particulas.push(this.todas_particulas[i]);
        }
    }
    
    //Elimina los nodos no usados
    eliminarNodosNoUsados() { 
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
            eliminarNodosNoUsados();
            this.steps_since_node_reset = 0;
        }
        resetearGrid();
        
        particulaAlaGrid()  //Paso 1
    }   
    
    particulaAlaGrid(){ //Primer paso - Tranferir masa y velocidad a la grid
        for(var i=0;i<this.todas_particulas.length;i++){
            
            var pos = this.todas_particulas[i].posicion;
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                        var peso = this.todas_particulas[i].B_spline_en(dest_i, dest_j, dest_k);
                        this.nodos[dest_i][dest_j][dest_k].masa += peso * this.todas_particulas[i].masa; //m = sumatoria mi*Wi
                        
                        var resultMul = this.todas_particulas[i].velocidad.multiplyScalar(peso * this.todas_particulas[i].masa);  
                        this.nodos[dest_i][dest_j][dest_k].velocidad = sumaVec3(this.nodos[dest_i][dest_j][dest_k].velocidad,resultMul);  //v=sumatoria mp*Wi/mi
                        
                    }
                }
            }
        }
        
        for (var i=0;i<this.nodos_en_uso.length;i++) {
            if (this.nodos_en_uso[i].masa > 0) {
               this.nodos_en_uso[i].velocidad = this.nodos_en_uso[i].velocidad.divideScalar(this.nodos_en_uso[i].masa);
            }
        }       
    } 
    
    calcular_Volumenes_Densidad_de_particula(){
        var h3 = Math.pow(this.h,3);
        
        for(var i=0;i<this.todas_particulas.length;i++){
            
            var densidad = 0;
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                        var peso = this.todas_particulas[i].B_spline_en(dest_i, dest_j, dest_k);   
                        densidad = peso * this.nodos[dest_i][dest_j][dest_k].masa; //mi*Wi
                        
                    }
                }
            }
            
        densidad/=h3;//ρ0p = sumatoria mi*Wi/h^3
        this.todas_particulas[i].volumen = this.todas_particulas[i].masa/densidad; //V0p = mp/ρ0p.
        this.todas_particulas[i].cbrt_volumen = Math.cbrt(this.todas_particulas[i].volumen); 
            
        }
    }
    
    calcular_F_hat_Ep(){
        
    }
}






























