var NFUNCRESOLUTION = 10000;
var NFUNCSPACING = 4.0/NFUNCRESOLUTION;
//var n_func[NFUNCRESOLUTION] = {0};
var n_func = new Array(NFUNCRESOLUTION);

for(var i = 0;i<n_func.length;i++){
   n_func[i] = 0; 
}

//var n_func_derivative[NFUNCRESOLUTION] = {0};
var n_func_derivative = new Array(NFUNCRESOLUTION);
