class Particula{
	
	//Constructor de la clase Particula. Se crean todos los atributos dentro
	constructor(posicion,velocidad,res, masa,h){
        
        //Creacion de atributos de la particula
        this.posicion = posicion; //Posicion, recibe un vector de que recibe x,y,z
        this.velocidad = velocidad; //Velocidad, recibe un vector de que recibe x,y,z
        this.res = res;
        this.masa = masa;	
        this.h = h;

        //Creacion de atributos para los calculos
        this.G_deformacion_E = new THREE.Matrix3();
        this.G_deformacion_P = new THREE.Matrix3();
        this.F_Ep = new THREE.Matrix3(); //Fuerza eslastica de la particula
        
        //Creacion de atributos para la B-spline
        this.i_lo;
        this.i_hi;
        this.j_lo;
        this.j_hi;
        this.z_lo;
        this.z_hi;
        
        //En cuestion es un arreglo multidimensional que guarda valores flotantes.
        this.val_b_spline = new Array(4); //Se define array tridimensional
        //Vamos a recorrerlo para meter en cada posición un array de 4
        for(var i=0; i<this.val_b_spline.length; i++) {
            this.val_b_spline[i] = new Array(4);
        //Lo recorremos para meter en cada posición un array de 4
            for(var j=0; j<this.val_b_spline[i].length; j++) {
                this.val_b_spline[i][j] = new Array(4);
            }
        }  
        
        //Este nuevo array guardara vectores de 3 posiciones
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
	
    //Calculos para la interpolacion b-spline
    Calculos_limites_vencidad(){
        
    }
    
    Calculos_gradiente_b_spline(){
        
    }
    
    B_spline_en(){
        
    }
    
     B_spline_gradiente_en(){
        
    }
}

