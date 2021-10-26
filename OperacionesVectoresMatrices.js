//Determina a partir del vector resultante que vector es mayor 
function maximoVec3(vector_1,vector_2){
    var vector_1Result = Math.sqrt(Math.pow(vector_1.x,2) + Math.pow(vector_1.y,2) + Math.pow(vector_1.z,2));
    
    //console.log("Vcetore resultante 1 = "+ vector1Result);

    var vector_2Result = Math.sqrt(Math.pow(vector_2.x,2) + Math.pow(vector_2.y,2) + Math.pow(vector_2.z,2)); 
    
    //console.log("Vcetore resultante 2 = "+ vector2Result);
    
    if (vector_1Result >= vector_2Result){
        return vector_1;
    }
    else{
        return vector_2; 
    }
}
//Determina a partir del vector resultante que vector es menor 
function minimoVec3(vector_1,vector_2){
    var vector_1Result = Math.sqrt(Math.pow(vector_1.x,2) + Math.pow(vector_1.y,2) + Math.pow(vector_1.z,2));
    
    //console.log("Vcetore resultante 1 = "+ vector1Result);

    var vector_2Result = Math.sqrt(Math.pow(vector_2.x,2) + Math.pow(vector_2.y,2) + Math.pow(vector_2.z,2)); 
    
    //console.log("Vcetore resultante 2 = "+ vector2Result);
    
    if (vector_1Result >= vector_2Result){
        return vector_2;
    }
    else{
        return vector_1; 
    }
}

function sumaVec3(vector_1,vector_2){
    var sum_x = vector_1.x + vector_2.x;
    var sum_y = vector_1.y + vector_2.y;
    var sum_z = vector_1.z + vector_2.z;
    
    return new THREE.Vector3(sum_x,sum_y,sum_z);  
}

function restaVec3(vector_1,vector_2){
    var res_x = vector_1.x - vector_2.x;
    var res_y = vector_1.y - vector_2.y;
    var res_z = vector_1.z - vector_2.z;
    
    return new THREE.Vector3(res_x,res_y,res_z); 
}

//Operaciones entre matrices

/*
    A partir de un dos vectores multiplicarlos, 
    cambiando un vector fila por un vector columna 
*/
function mulMatrizOfVectores3(vector_1,vector_2){ 
    var mat_1 = new THREE.Matrix3();
    var mat_2 = new THREE.Matrix3();
    var matResult = new THREE.Matrix3();
    

    mat_1.set(vector_1.x,0,0,
              vector_1.y,0,0,
              vector_1.z,0,0);
    
    mat_2.set(vector_2.x,vector_2.y,vector_2.z,
              0,0,0,
              0,0,0);
    
    return matResult.multiplyMatrices(mat_1,mat_2);  
}

function sumMatriz3(matriz_1,matriz_2){
    var matE_1 = matriz_1.elements;
    var matE_2 = matriz_2.elements;
    var matResult = new THREE.Matrix3();
    
    return matResult(matE_1[0]+matE_2[0],matE_1[3]+matE_2[3],matE_1[6]+matE_2[6],
                     matE_1[1]+matE_2[1],matE_1[4]+matE_2[4],matE_1[7]+matE_2[7],
                     matE_1[2]+matE_2[2],matE_1[5]+matE_2[5],matE_1[8]+matE_2[8]);
}






