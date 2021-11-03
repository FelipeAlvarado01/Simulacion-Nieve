class Particula{
	//Constructor de la clase Particula. Se crean todos los atributos dentro
	constructor(posicion,velocidad,res, masa,h){
        //Creacion de atributos de la particula
        this.posicion = posicion; //Posicion, recibe un vector de que recibe x,y,z
        this.velocidad = velocidad; //Velocidad, recibe un vector de que recibe x,y,z
        this.res = res;
        this.masa = masa;	
        this.h = h;
        
        this.volumen;  
        this.cbrt_volumen;

        //Creacion de atributos para los calculos
        this.G_deformacion_E = new THREE.Matrix3();
        this.G_deformacion_P = new THREE.Matrix3();
        this.F_hat_Ep = new THREE.Matrix3(); //Fuerza eslastica de la particula
        
        //Creacion de atributos para la B-spline
        this.i_lo;
        this.i_hi;
        this.j_lo;
        this.j_hi;
        this.k_lo;
        this.k_hi;
        
        //En cuestion se crea un arreglo multidimensional que guarda valores flotantes.
        this.val_b_spline = new Array(4); //Se define array tridimensional
        //Vamos a recorrerlo para meter en cada posición un array de 4
        for(var i=0; i<this.val_b_spline.length; i++) {
            this.val_b_spline[i] = new Array(4);
        //Lo recorremos para meter en cada posición un array de 4
            for(var j=0; j<this.val_b_spline[i].length; j++) {
                this.val_b_spline[i][j] = new Array(4);
            }
        }  
        
        //Este nuevo array guardara vectores de 3 posiciones, Array se comportara como una matriz  que guardara vectores3
        this.val_grad_b_spline = new Array(4); //Se define array tridimensional
        //Vamos a recorrerlo para meter en cada posición un array de 4
        for(var i=0; i <this.val_grad_b_spline.length; i++) {
            this.val_grad_b_spline[i] = new Array(4);
        //Lo recorremos para meter en cada posición un array de 4
            for(var j=0; j<this.val_grad_b_spline[i].length; j++) {
                this.val_grad_b_spline[i][j] = new Array(4);
            }
        }      
	}
	/*
    Calculos para la interpolacion b-spline
    los valores de lo y hi se toman de la posicion de la particula
    */
    Calculos_limites_vencidad(){
       //round es para dejar el numero entero
       this.i_lo = Math.round(Math.max(Math.ceil(this.posicion.x/this.h-2),0));
       this.i_hi = Math.round(Math.min(Math.floor(this.posicion.x/this.h+2) + 1,this.res.x));
       this.j_lo = Math.round(Math.max(Math.ceil(this.posicion.y/this.h-2),0));
       this.j_hi = Math.round(Math.min(Math.floor(this.posicion.y/this.h+2) + 1,this.res.y));
       this.k_lo = Math.round(Math.max(Math.ceil(this.posicion.z/this.h-2),0));
       this.k_hi = Math.round(Math.min(Math.floor(this.posicion.z/this.h+2) + 1,this.res.z)); 
    }
    
    Calculos_gradiente_b_spline(){
        for( var dest_i=this.i_lo; dest_i<this.i_hi ; dest_i++){
            for(var dest_j=this.j_lo; dest_j<this.j_hi ; dest_j++){
                for(var dest_k=this.k_lo; dest_k<this.k_hi ; dest_k++){ 
                    //vector_particual/h-vector_des
                    //var scaled = this.posicion.divideScalar(this.h).sub(new THREE.Vector3(dest_i, dest_j, dest_k));
                    var scaled = Vec3SubVec3(Vec3DivEscalar(this.posicion,this.h),new THREE.Vector3(dest_i, dest_j, dest_k));
                    this.val_b_spline[dest_i - this.i_lo][dest_j - this.j_lo][dest_k - this.k_lo] = b_spline(scaled); //Funcion b_spline proviene de interpolacion.js
                    this.val_grad_b_spline[dest_i - this.i_lo][dest_j - this.j_lo][dest_k - this.k_lo] = b_spline_grad(scaled, this.h); //Funcion b_spline_grad proviene de interpolacion.js  
                }
            }
        }
    }
    
    B_spline_en(grid_i, grid_j, grid_k){
        return this.val_b_spline[grid_i - this.i_lo][grid_j - this.j_lo][grid_k - this.k_lo];
    }
    
    B_spline_gradiente_en(grid_i, grid_j, grid_k){
        return this.val_grad_b_spline[grid_i - this.i_lo][grid_j - this.j_lo][grid_k - this.k_lo];
    }
}

