
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
        Guardara valores del objeto GridNode
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
            
            //var index = this.todas_particulas[i].posicion.divideScalar(this.h).floor();
            var index = Vec3DivEscalar(this.todas_particulas[i].posicion,this.h).floor();
            
            this.todas_particulas[i].Calculos_limites_vencidad();
            this.todas_particulas[i].Calculos_gradiente_b_spline();
            
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                        var nodo = this.nodos[dest_i][dest_j][dest_k];
                        if(nodo == null){
                           nodo =  new GridNode();
                           nodo.index = new THREE.Vector3(dest_i,dest_j,dest_k).floor ();
                           this.nodos[dest_i][dest_j][dest_k] = nodo;
                        }
                        this.nodos_en_uso.push(nodo);
                    }
                }
            }
            var nodo = this.nodos[index.x][index.y][index.z]; //Es una variable que almacenara el objeto NodoGrid
            nodo.particulas.push(this.todas_particulas[i]); //Ingresa a su atributo particulas
        }
    }
    
    //Elimina los nodos no usados
    eliminarNodosNoUsados() { 
        for (var i=0;i<this.nodos_en_uso.length;i++) {
            //var index = this.nodos_en_uso[i].index.floor();
            var index = Vec3Floor(this.nodos_en_uso[i].index);
            this.nodos[index.x][index.y][index.z] = null;
            this.nodos_en_uso[i] = null; //Elimina los elementos del array 
        }
        this.nodos_en_uso.length = 0; //Se limpia el array
    }

    //Se llaman los demas metodo de la clase Grid
    simular(delta_t, aceleracion_externa, colision_objetos, parametros){
       this.steps_since_node_reset++; 
        if (this.steps_since_node_reset > this.reset_time / delta_t) {
            eliminarNodosNoUsados();
            this.steps_since_node_reset = 0;
        }
        
        resetearGrid();
        
        particulaAlaGrid()  //Paso 1
        
        if (primer_paso) {
            calcular_Volumenes_Densidad_de_particula();           // Paso 2.
            primer_paso = false;
        }
        
        calcular_F_hat_Ep(delta_t);           // Paso 3.
        calculos_fuerza_grid(parametros.mu_0,parametros.lambda_0, parametros.xi);           // Paso 3.
        //aplicar_aceleracion_ext(aceleracion_externa);
        
        calcular_velocidades_grid(delta_t,colision_objetos);           // Paso 4-5.
        
        
        actualizar_gradiente_deformacion(parametros.theta_c, parametros.theta_s, delta_t);           // Paso 7.
        
        actualizar_velocidad_particula(parametros.alpha);           // Paso 8.
        
        var total_acc = new THREE.Vector3();
        for(var i=0;i<aceleracion_externa.length;i++){
            total_acc = sumaVec3(total_acc,aceleracion_externa[i]);
        }
        for(var i=0;i<this.todas_particulas.length;i++){
            this.todas_particulas[i].velocidad = sumaVec3(this.todas_particulas[i].velocidad,total_acc.multiplyScalar(delta_t));       
        }
        
        calcular_colision_particula(delta_t,colision_objetos);           // Paso 9.
        
        actulizar_posicion_particula(delta_t);           // Paso 10.
    }   
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Primer paso - Tranferir masa y velocidad a la grid
    particulaAlaGrid(){ 
        for(var i=0;i<this.todas_particulas.length;i++){
            
            var pos = this.todas_particulas[i].posicion;
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                        var peso = this.todas_particulas[i].B_spline_en(dest_i, dest_j, dest_k);//Es un valor flotante
                        this.nodos[dest_i][dest_j][dest_k].masa += peso * this.todas_particulas[i].masa; //m = sumatoria mi*Wi
                        
                        //var resultMul = this.todas_particulas[i].velocidad.multiplyScalar(peso * this.todas_particulas[i].masa);  
                        var resultMul = Vec3MulEscalar(this.todas_particulas[i].velocidad, peso * this.todas_particulas[i].masa); 
                        this.nodos[dest_i][dest_j][dest_k].velocidad = sumaVec3(this.nodos[dest_i][dest_j][dest_k].velocidad,resultMul);  //v=sumatoria mp*Wi/mi
                        
                    }
                }
            }
        }
        
        for (var i=0;i<this.nodos_en_uso.length;i++) {
            if (this.nodos_en_uso[i].masa > 0) {
                //this.nodos_en_uso[i].velocidad = this.nodos_en_uso[i].velocidad.divideScalar(this.nodos_en_uso[i].masa);
                this.nodos_en_uso[i].velocidad = Vec3DivEscalar(this.nodos_en_uso[i].velocidad,this.nodos_en_uso[i].masa);
            }
        }       
    } 
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Segundo paso - Calculo del volumen y velocidad de la particula
    
    calcular_Volumenes_Densidad_de_particula(){ 
        
        var h3 = Math.pow(this.h,3);
        
        for(var i=0;i<this.todas_particulas.length;i++){
            
            var densidad = 0;
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                        var peso = this.todas_particulas[i].B_spline_en(dest_i, dest_j, dest_k);   //Valores flotates
                        densidad += peso * this.nodos[dest_i][dest_j][dest_k].masa; //mi*Wi 
                        
                    }
                }
            }
            
        densidad/=h3;//ρ0p = sumatoria mi*Wi/h^3
        this.todas_particulas[i].volumen = this.todas_particulas[i].masa/densidad; //V0p = mp/ρ0p.
        this.todas_particulas[i].cbrt_volumen = Math.cbrt(this.todas_particulas[i].volumen);    
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Tecer paso - Calculos de fuerza sobre la particula
    calcular_F_hat_Ep(delta_t){ //Calculos de fuerza
        
        //var h3 = Math.pow(this.h,3);
        
        for(var i=0;i<this.todas_particulas.length;i++){
            
            var sum = new THREE.Matrix3();
            sum.set(0,0,0,0,0,0,0,0,0);
                
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                        var grad_peso = this.todas_particulas[i].B_spline_gradiente_en(dest_i, dest_j, dest_k); //Es un vector3
                        var velocidad = this.nodos[dest_i][dest_j][dest_k].velocidad;
                        
                        //mulMatrizOfVectores3 = outerProduct en glm (c++)   
                        sum = sumMatriz3(sum,mulMatrizOfVectores3(velocidad,grad_peso).multiplyScalar(delta_t)); //Bien
                    }
                }
            }
            
            var identidad = new THREE.Matrix3(); //Se inicializa como una matriz identidad (unos en su diagonal)
            //this.todas_particulas[i].F_hat_Ep = this.todas_particulas[i].G_deformacion_E.multiply(sumMatriz3(identidad,sum)); //matriz3x3
            this.todas_particulas[i].F_hat_Ep = mulMatriz3(this.todas_particulas[i].G_deformacion_E,sumMatriz3(identidad,sum));//matriz3x3
        } 
    }
    
    calculos_fuerza_grid(mu_0, lambda_0, xi){
        
        for(var i=0;i<this.todas_particulas.length;i++){
            
            var volumen = this.todas_particulas[i].volumen;
            //var sigma_p =  this.todas_particulas[i].G_deformacion_E.transpose().multiply(psi_derivada(mu_0,lambda_0,xi,this.todas_particulas[i]));
            var sigma_p = mulMatriz3(transpuestaMat3(this.todas_particulas[i].G_deformacion_E), psi_derivada(mu_0,lambda_0,xi,this.todas_particulas[i]));
            //var neg_fuerza_noPonderada = sigma_p.multiplyScalar(volumen);
            var neg_fuerza_noPonderada = Mat3MulEscalar(sigma_p,volumen);
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                       var peso_grad = this.todas_particulas[i].B_spline_gradiente_en(dest_i, dest_j, dest_k);
                       this.nodos[dest_i][dest_j][dest_k].fuerza = restaVec3(this.nodos[dest_i][dest_j][dest_k].fuerza,mulVector3Matriz3(peso_grad,neg_fuerza_noPonderada));    
                        
                    }
                }
            }
        }   
    }
    
    //Aplicar fuerzas externas
    aplicar_aceleracion_ext(aceleraciones_externa){
        for(var i=0;i<this.nodos_en_uso.length;i++){
            for(var j=0; j<aceleraciones_externa.length;j++){
                //this.nodos_en_uso[i].fuerza = sumaVec3(this.nodos_en_uso[i].fuerza,aceleraciones_externa[j].multiplyScalar(this.nodos_en_uso[i].masa));
                this.nodos_en_uso[i].fuerza = sumaVec3(this.nodos_en_uso[i].fuerza,Vec3MulEscalar(aceleraciones_externa[j],this.nodos_en_uso[i].masa));
            }
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Cuarto y quinto paso - Actualizar las velocidades de los nodos de la cuadrícula y hacer colisiones
    
    calcular_velocidades_grid(delta_t,collision_objecto){
        for(var i=0;i<this.nodos_en_uso.length;i++){
            this.nodos_en_uso[i].siguiente_velocidad = this.nodos_en_uso[i].velocidad;
            
            if(this.nodos_en_uso[i].masa > 0){
                //this.nodos_en_uso[i].siguiente_velocidad = sumaVec3(this.nodos_en_uso[i].siguiente_velocidad,this.nodos_en_uso[i].fuerza.multiplyScalar(delta_t/this.nodos_en_uso[i].masa)); 
                this.nodos_en_uso[i].siguiente_velocidad = sumaVec3(this.nodos_en_uso[i].siguiente_velocidad,Vec3MulEscalar(this.nodos_en_uso[i].fuerza,delta_t/this.nodos_en_uso[i].masa)); 
            }
            
            //var posicion = this.nodos_en_uso[i].index.multiplyScalar(this.h);
            var posicion = Vec3MulEscalar(this.nodos_en_uso[i].index,this.h);
            
            for(var j=0;j< collision_objecto.length;j++){
                this.nodos_en_uso[i].siguiente_velocidad = collision_objecto[j].choque(posicion, this.nodos_en_uso[i].siguiente_velocidad, delta_t);
            }
        }
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Sexto paso - Resolver el sistema lineal
    
     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Septimo paso - Actualizar los gradientes de deformación para cada partícula
    
    actualizar_gradiente_deformacion(theta_c, theta_s, delta_t){
       for(var i=0;i<this.todas_particulas.length;i++){
           var grad_vp = new THREE.Matrix3();
           grad_vp.set(0,0,0,0,0,0,0,0,0);
           
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                       var peso_grad = this.todas_particulas[i].B_spline_gradiente_en(dest_i, dest_j, dest_k);
                       var velocidad = this.nodos[dest_i][dest_j][dest_k].siguiente_velocidad;
                       grad_vp = sumMatriz3(grad_vp,mulMatrizOfVectores3(velocidad,peso_grad));    
                    
                    }
                }
            }
           
           var identidad = new THREE.Matrix3();
           //var dgrad_E_siguiente = this.todas_particulas[i].G_deformacion_E.multiply(sumMatriz3(identidad, grad_vp.multiplyScalar(delta_t)));
           var dgrad_E_siguiente = mulMatriz3(this.todas_particulas[i].G_deformacion_E,sumMatriz3(identidad, Mat3MulEscalar(grad_vp,delta_t)));
           //var F_siguiente = this.todas_particulas[i].G_deformacion_P.multiply(dgrad_E_siguiente);
           var F_siguiente = mulMatriz3(this.todas_particulas[i].G_deformacion_P,dgrad_E_siguiente);
           
           var dgrad_E_svd = three_a_svdjs(dgrad_E_siguiente);
           var { u, v, q } = SVDJS.SVD(dgrad_E_svd);
           var U = svdjs_a_three(u);
           var V = svdjs_a_three(v);
           var S_hat_vec = svdjs_a_threeVector3(q);
           
           //var S_vec = S_hat_vec.clampScalar(1-theta_c, 1+theta_s);
           var S_vec = Vec3ClampScalar(S_hat_vec,1 - theta_c, 1 + theta_s);
           
           var S = new THREE.Matrix3();
           S.set(S_vec.x,0,0,
                 0,S_vec.y,0,
                 0,0,S_vec.z);
           
           var S_inv = new THREE.Matrix3();
           S_inv.set(1/S_vec.x,0,0,
                     0,1/S_vec.y,0,
                     0,0,1/S_vec.z);
           
           //this.todas_particulas[i].G_deformacion_E = V.transpose().multiply(S).multiply(U);
           this.todas_particulas[i].G_deformacion_E = mulMatriz3(mulMatriz3(transpuestaMat3(V),S),U);
           //this.todas_particulas[i].G_deformacion_P = F_siguiente.multiply(U.transpose()).multiply(S_inv).multiply(V);
           this.todas_particulas[i].G_deformacion_P = mulMatriz3(mulMatriz3(mulMatriz3(F_siguiente,transpuestaMat3(U)),S_inv),V);
        } 
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Octavo paso - Actualizar la velocidad de la particula
    
    actualizar_velocidad_particula(alpha){
        for(var i=0;i<this.todas_particulas.length;i++){
            
            var v_pic = new THREE.Vector3();
            var v_flip = this.todas_particulas[i].velocidad;
            
            for(var dest_i=this.todas_particulas[i].i_lo; dest_i<this.todas_particulas[i].i_hi; dest_i++){
                for(var dest_j=this.todas_particulas[i].j_lo;dest_j<this.todas_particulas[i].j_hi;dest_j++){
                    for(var dest_k=this.todas_particulas[i].k_lo;dest_k<this.todas_particulas[i].k_hi;dest_k++){
                        
                        var dest = this.nodos[dest_i][dest_j][dest_k];
                        var peso = this.todas_particulas[i].B_spline_en(dest_i, dest_j, dest_k);
                        //v_pic = sumaVec3(v_pic,dest.siguiente_velocidad.multiplyScalar(peso));
                        v_pic = sumaVec3(Vec3MulEscalar(v_pic,dest.siguiente_velocidad,peso));
                        v_flip = sumaVec3(v_flip,restaVec3(dest.siguiente_velocidad,dest.velocidad).multiplyScalar(peso));
                    
                    }
                }
            }
            
            //this.todas_particulas[i].velocidad = sumaVec3(v_pic.multiplyScalar(1 - alpha), v_flip.multiplyScalar(alpha));
            this.todas_particulas[i].velocidad = sumaVec3(Vec3MulEscalar(v_pic,1 - alpha), Vec3MulEscalar(v_flip,alpha));
            
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Noveno paso - Actualizar la velocidad de la particula.
    
    calcular_colision_particula(delta_t,collision_objecto){
      for (var i=0;i<this.todas_particulas.length;i++) {
        for (var j=0;j<collision_objecto.length;j++) {
          this.todas_particulas[i].velocidad = collision_objecto[j].choque(this.todas_particulas[i].posicion,this.todas_particulas[i].velocidad, delta_t);
        }
      } 
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Decimo paso - Actualizar posicion de la particula
    
    actulizar_posicion_particula(delta_t){
        for( var i=0;i<this.todas_particulas.length;i++){
            //this.todas_particulas[i].posicion = sumaVec3(this.todas_particulas[i].posicion,this.todas_particulas[i].velocidad.multiplyScalar(delta_t));
            this.todas_particulas[i].posicion = sumaVec3(this.todas_particulas[i].posicion,Vec3MulEscalar(this.todas_particulas[i].velocidad,delta_t));
        }
    }
}




















