//Determina a partir del vector resultante que vector es mayor 
function maximoVec3(vector1,vector2){
    var vector1Result = Math.sqrt(Math.pow(vector1.x,2) + Math.pow(vector1.y,2) + Math.pow(vector1.z,2));
    
    //console.log("Vcetore resultante 1 = "+ vector1Result);

    var vector2Result = Math.sqrt(Math.pow(vector2.x,2) + Math.pow(vector2.y,2) + Math.pow(vector2.z,2)); 
    
    //console.log("Vcetore resultante 2 = "+ vector2Result);
    
    if (vector1Result >= vector2Result){
        return vector1;
    }
    else{
        return vector2; 
    }
}
//Determina a partir del vector resultante que vector es menor 
function minimoVec3(vector1,vector2){
    var vector1Result = Math.sqrt(Math.pow(vector1.x,2) + Math.pow(vector1.y,2) + Math.pow(vector1.z,2));
    
    //console.log("Vcetore resultante 1 = "+ vector1Result);

    var vector2Result = Math.sqrt(Math.pow(vector2.x,2) + Math.pow(vector2.y,2) + Math.pow(vector2.z,2)); 
    
    //console.log("Vcetore resultante 2 = "+ vector2Result);
    
    if (vector1Result >= vector2Result){
        return vector2;
    }
    else{
        return vector1; 
    }
}