class Particula{
	
	//Constructor de la clase Particula
	constructor(p,vp,res, m,h){
        //Creacion de atributos de la particula
        this.p = p; //Posicion, recibe un vector de que recibe x,y,z
        this.vp = vp; //Velocidad, recibe un vector de que recibe x,y,z
        this.res = res;
        this.m = m;	
        this.h = h;

        //Creacion de atributos para los calculos
        this.G_deformacion_E = new THREE.Matrix3();
        this.G_deformacion_P = new THREE.Matrix3();
        this.F_Ep = new THREE.Matrix3();
        
        //Creacion de atributos para la B-spline
        
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

