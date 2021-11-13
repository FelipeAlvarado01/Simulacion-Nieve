//Funciones de B-spline
//Variables de interpolacion
var NFUNCRESOLUTION = 10000;
var NFUNCSPACING = 4.0/NFUNCRESOLUTION;
//var n_func[NFUNCRESOLUTION] = {0};
var n_func = new Array(NFUNCRESOLUTION);
//n_func[0]=0;
    for(var i = 0;i<n_func.length;i++){
       n_func[i] = 0; 
    }

var n_func_derivative = new Array(NFUNCRESOLUTION);
//n_func_derivative[0] = 0;

    for(var i = 0;i<n_func_derivative.length;i++){
       n_func_derivative[i] = 0; 
    }

//funciones para interpolacion
function sgn(x) { 
    if(x > 0){
        var r = 1;
    }
    else
        if(x < 0){
          var r = -1;  
        }
        else{
          var r = 0;  
        }
	return r;
}

function N_func(x) {//Funcion N(x)
	var abs_x = Math.abs(x);
	if (abs_x < 1) {
		return 0.5 * abs_x * abs_x * abs_x - x * x + 2.0 / 3.0;
	} else if (abs_x < 2) {
		return -1.0 / 6.0 * abs_x * abs_x * abs_x + x * x - 2.0 * abs_x + 4.0 / 3.0;
	} else {
		return 0;
	}
}

function N_func_derivative(x) { //Funcion derivada N(x)
	var abs_x = Math.abs(x);
	var sign = sgn(x);
	if (abs_x < 1) {
		return 1.5 * x * x * sign - 2 * x;
	} else 
       if (abs_x < 2) {
		return -0.5 * x * x * sign + 2 * x - 2 * sign;
	   } 
       else {
		return 0;
	   }
}

function n_func_init() {
	//precompute nfunc
	for (var i = 0; i < NFUNCRESOLUTION; i++) {
		n_func[i] = N_func(((i+0.5) * NFUNCSPACING) - 2);
	}
}

function n_func_memoized(x) {
	if (x < -2 || x > 2) {
		return 0;
	}
	var idx = Math.round(Math.floor((x+2)/NFUNCSPACING)); //devuelve el numero menor entre a y b floor(x) redondea valor x el hacia abajo
	return n_func[idx]; //devuelve el valor que se encuentra en la posicion idx, creo devuelve el nodo o su posicion
}

function n_func_derivative_init() {
	//precompute nfunc
	for (var i = 0; i < NFUNCRESOLUTION; i++) {
		n_func_derivative[i] = N_func_derivative(((i+0.5) * NFUNCSPACING) - 2);
	}
}

function n_func_derivative_memoized(x) {
	if (x < -2 || x > 2) {
		return 0;
	}
	var idx = Math.round(Math.floor((x+2)/NFUNCSPACING)); //devuelve el numero menor entre a y b floor(x) redondea valor x el hacia abajo
	return n_func_derivative[idx];
}


function b_spline(scaled) {
	return n_func_memoized(scaled.x) * n_func_memoized(scaled.y) * n_func_memoized(scaled.z);
}

function b_spline_components(scaled) {
	return new THREE.Vector3(n_func_memoized(scaled.x), n_func_memoized(scaled.y), n_func_memoized(scaled.z));
}

function b_spline_grad(scaled,h) {
	var components = b_spline_components(scaled);
	var dx = components.y * components.z * n_func_derivative_memoized(scaled.x) / h;
	var dy = components.x * components.z * n_func_derivative_memoized(scaled.y) / h;
	var dz = components.x * components.y * n_func_derivative_memoized(scaled.z) / h;
	return new THREE.Vector3(dx, dy , dz);
}




