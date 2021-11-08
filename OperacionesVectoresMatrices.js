//Determina a partir del vector resultante que vector es mayor 
//Operaciones de vectores
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

function Vec3MulEscalar(vector,escalar){ //vector dividido por un escalar
    var rDiv = new THREE.Vector3(vector.x,vector.y,vector.z);
    return rDiv.multiplyScalar(escalar);
}

function mulVector(vector_1,vector_2){
    var rMulVec = new THREE.Vector3(vector_1.x * vector_2.x,vector_1.y * vector_2.y, vector_1.z * vector_2.z)
    return rMulVec;
}

function Vec3DivEscalar(vector,escalar){ //vector dividido por un escalar
    var rDiv = new THREE.Vector3(vector.x,vector.y,vector.z);
    
    return rDiv. divideScalar(escalar);
}

function Vec3SubEscalar(vector,escalar){ //resta de un escarlar
    var rSub = new THREE.Vector3(vector.x,vector.y,vector.z);
    return rSub.subScalar(escalar);
}

function Vec3SubVec3(vector_1,vector_2){ //resta de un vector
    var rSub = new THREE.Vector3(vector_1.x,vector_1.y,vector_1.z);
    return rSub.sub(vector_2);
}

function Vec3Floor(vector_1){
    var rFloor = new THREE.Vector3(vector_1.x,vector_1.y,vector_1.z);
    return rFloor.floor();
}

function Vec3ClampScalar(vector_1,min,max){
    var rClampScalar = new THREE.Vector3(vector_1.x,vector_1.y,vector_1.z);
    return rClampScalar.clampScalar(min,max);
}

function productoPunto(vector_1,vector_2){
    var rDot= new THREE.Vector3(vector_1.x,vector_1.y,vector_1.z);
    return rDot.dot(vector_2);
}

function productoCruz(vector_1,vector_2){
    var rCross = new THREE.Vector3(vector_1.x,vector_1.y,vector_1.z);
    return rCross.cross(vector_2);
}

function normalizacion(vector_1){ //Conevtir un vector en un vector unitario
    var rNorm = new THREE.Vector3(vector_1.x,vector_1.y,vector_1.z);
    return rNorm.normalize();
}

function length(vector_1){
    var rLength = Math.sqrt(Math.pow(vector_1.x,2) + Math.pow(vector_1.y,2) + Math.pow(vector_1.z,2));
    return rLength;
}

function length2(vector_1){
    var rLength2 = Math.pow(vector_1.x,2) + Math.pow(vector_1.y,2) + Math.pow(vector_1.z,2);
    return rLength2;
}

function scale(matriz, vector){
    var mat_1 = new THREE.Matrix4();
    var mat_2 = new THREE.Matrix4();
    var mat_2E = matriz.elements;
    var matResult = new THREE.Matrix4();
    
    mat_1.set(vector.x,0,0,0,
              0,vector.y,0,0,
              0,0,vector.z,0,
                     0,0,0,1);
    
    mat_2.set(mat_2E[0],mat_2E[4],mat_2E[8],mat_2E[12],
              mat_2E[1],mat_2E[5],mat_2E[9],mat_2E[13],
              mat_2E[2],mat_2E[6],mat_2E[10],mat_2E[14],
              mat_2E[3],mat_2E[7],mat_2E[11],mat_2E[15],);
    
    
    return mat_1.multiply(mat_2);  
}


//Operaciones de vectores y matrices
/*
    A partir de un dos vectores multiplicarlos, 
    cambiando el primer vector fila por un vector columna
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

function mulVector3Matriz3(vector,matriz){
    var matE = matriz.elements;
    var comp_x = vector.x * matE[0] + vector.y * matE[1] + vector.z * matE[2];
    var comp_y = vector.x * matE[3] + vector.y * matE[4] + vector.z * matE[5];
    var comp_z = vector.x * matE[6] + vector.y * matE[7] + vector.z * matE[8];
    return new THREE.Vector3(comp_x,comp_y,comp_z);
    
}


//Operaciones de matrices
function sumMatriz3(matriz_1,matriz_2){
    var matE_1 = matriz_1.elements;
    var matE_2 = matriz_2.elements;
    var matResult = new THREE.Matrix3();
    
    return matResult.set(matE_1[0]+matE_2[0],matE_1[3]+matE_2[3],matE_1[6]+matE_2[6],
                     matE_1[1]+matE_2[1],matE_1[4]+matE_2[4],matE_1[7]+matE_2[7],
                     matE_1[2]+matE_2[2],matE_1[5]+matE_2[5],matE_1[8]+matE_2[8]);
}

function restMatriz3(matriz_1,matriz_2){
    var matE_1 = matriz_1.elements;
    var matE_2 = matriz_2.elements;
    var matResult = new THREE.Matrix3();
    
    return matResult.set(matE_1[0]-matE_2[0],matE_1[3]-matE_2[3],matE_1[6]-matE_2[6],
                         matE_1[1]-matE_2[1],matE_1[4]-matE_2[4],matE_1[7]-matE_2[7],
                         matE_1[2]-matE_2[2],matE_1[5]-matE_2[5],matE_1[8]-matE_2[8]);
}

function mulMatriz3(matriz_1,matriz_2){
    var matE_1 = matriz_1.elements;
    var matResult = new THREE.Matrix3();
    matResult.set(matE_1[0],matE_1[3],matE_1[6],
                  matE_1[1],matE_1[4],matE_1[7],
                  matE_1[2],matE_1[5],matE_1[8]);
    
    return matResult.multiply(matriz_2);

}

function Mat3MulEscalar(matriz_1,escalar){
    var matE_1 = matriz_1.elements;
    var matResult = new THREE.Matrix3();
    matResult.set(matE_1[0],matE_1[3],matE_1[6],
                  matE_1[1],matE_1[4],matE_1[7],
                  matE_1[2],matE_1[5],matE_1[8]);
    
    return matResult.multiplyScalar(escalar);
}

function transpuestaMat3(matriz_1){
    var matE_1 = matriz_1.elements;
    var matResult = new THREE.Matrix3();
    matResult.set(matE_1[0],matE_1[3],matE_1[6],
                  matE_1[1],matE_1[4],matE_1[7],
                  matE_1[2],matE_1[5],matE_1[8]);
    
    return matResult.transpose();
}


function clamp(vector,minVal,maxVal){
    //min(max(vector,minVal),maxVal)
    
    //comparacion para el primer componenete del vector
    if(vector.x>minVal){
      var result_x = vector.x;
    }
    else{
      var result_x = minVal;
    }
    
    if(result_x < maxVal){
        var result_x = result_x;
    }
    else{
        var result_x = maxVal;
    }
    
    //comparacion para el segundo componenete del vector
    if(vector.y>minVal){
      var result_y = vector.y;
    }
    else{
      var result_y = minVal;
    }
    
    if(result_y < maxVal){
        var result_y = result_y;
    }
    else{
        var result_y = maxVal;
    }
    
    //comparacion para el segundo componenete del vector
    if(vector.z>minVal){
      var result_z = vector.z;
    }
    else{
      var result_z = minVal;
    }
    
    if(result_z < maxVal){
        var result_z = result_z;
    }
    else{
        var result_z = maxVal;
    }
    
    return new THREE.Vector3(result_x,result_y,result_z);
}

//Operaciones de matrices 4x4

function mulMatriz4(matriz_1,matriz_2){
    var matE_1 = matriz_1.elements;
    var matResult = new THREE.Matrix4();
    matResult.set(matE_1[0],matE_1[4],matE_1[8],matE_1[12],
                  matE_1[1],matE_1[5],matE_1[9],matE_1[13],
                  matE_1[2],matE_1[6],matE_1[10],matE_1[14],
                  matE_1[3],matE_1[7],matE_1[11],matE_1[15]);
    
    return matResult.multiply(matriz_2);
}

function trasladarMat4(matriz_1,vector){
    var matE_1 = matriz_1.elements;
    var matResult = new THREE.Matrix4();
    matResult.set(matE_1[0],matE_1[4],matE_1[8],matE_1[12],
                  matE_1[1],matE_1[5],matE_1[9],matE_1[13],
                  matE_1[2],matE_1[6],matE_1[10],matE_1[14],
                  matE_1[3],matE_1[7],matE_1[11],matE_1[15]);
    
    return matResult.makeTranslation(vector.x,vector.y,vector.z);
}

function mulVector4Matriz4(vector,matriz){
    var matE = matriz.elements;
    var comp_x = vector.x * matE[0] + vector.y * matE[1] + vector.z * matE[2] + 1 * matE[3];
    var comp_y = vector.x * matE[4] + vector.y * matE[5] + vector.z * matE[6] + 1 * matE[7];
    var comp_z = vector.x * matE[8] + vector.y * matE[9] + vector.z * matE[10] + 1 * matE[11];
    var comp_w = vector.x * matE[12] + vector.y * matE[13] + vector.z * matE[14] + 1 * matE[15];
    return new THREE.Vector3(comp_x,comp_y,comp_z);
}

//numeros ramdom para una esfera
function ballRand(radio){
    if(radio <= 1){
        var comp_x = Math.random();
        var comp_y = Math.random();
        var comp_z = Math.random();
        
        //console.log("comp_x: " +comp_x);
        if(comp_x > 0.5){
            var x = comp_x * radio; 
            //console.log("Si 1 ");
        }else if(comp_x < 0.5){
                var x = comp_x * -radio; 
                //console.log("Si 2 ");
            }else{
                    var x = 0;
                }
        //console.log("x " +x);
        
        if(comp_y > 0.5){
            var y = comp_y * radio;     
        }else if(comp_y < 0.5){
                var y = comp_y * -radio;  
            }else{
                    var y = 0;
                }
        
        if(comp_z > 0.5){
            var z = comp_z * radio;     
        }else if(comp_z < 0.5){
                var z = comp_z * -radio;  
            }else{
                    var z = 0;
                }

    }
    else{
        var x = Math.random() * (radio + radio) - radio;
        var y = Math.random() * (radio + radio) - radio;
        var z = Math.random() * (radio + radio) - radio;  
    }
    //console.log("x " +x);
    return new THREE.Vector3(x,y,z);
}




