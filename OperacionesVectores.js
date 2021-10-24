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

function sumaVec3(vector1,vector2){
    var sum_x = vector1.x + vector2.x;
    var sum_y = vector1.y + vector2.y;
    var sum_z = vector1.z + vector2.z;
    
    return new THREE.Vector3(sum_x,sum_y,sum_z);  
}

function restaVec3(vector1,vector2){
    var res_x = vector1.x - vector2.x;
    var res_y = vector1.y - vector2.y;
    var res_z = vector1.z - vector2.z;
    
    return new THREE.Vector3(res_x,res_y,res_z); 
}