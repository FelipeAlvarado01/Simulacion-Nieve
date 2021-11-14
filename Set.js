function set(object,objectsArray){
    for(var i=0;i<objectsArray.length;i++){
        
        if(object.index.x == objectsArray[i].index.x){
            if(object.index.y == objectsArray[i].index.y){
                if(object.index.z == objectsArray[i].index.z){
                    if(object.masa == objectsArray[i].masa){
                        if(object.velocidad.x == objectsArray[i].velocidad.x){
                            if(object.velocidad.y == objectsArray[i].velocidad.y){
                                if(object.velocidad.z == objectsArray[i].velocidad.z){
                                    if(object.siguiente_velocidad.x == objectsArray[i].siguiente_velocidad.x){
                                        if(object.siguiente_velocidad.y == objectsArray[i].siguiente_velocidad.y){
                                            if(object.siguiente_velocidad.z == objectsArray[i].siguiente_velocidad.z){
                                                if(object.fuerza.x == objectsArray[i].fuerza.x){
                                                    if(object.fuerza.y == objectsArray[i].fuerza.y){
                                                        if(object.fuerza.z == objectsArray[i].fuerza.z){
                                                            
                                                            if(object.particulas.length == objectsArray[i].particulas.length){
                                                                for(var j=0;j<objectsArray[i].particulas.length;j++){
                                                                    console.log("Quee!");
                                                                }
                                                            }
                                                            else{
                                                                return objectsArray.push(object);
                                                                console.log("Llego hasta aqui");
                                                            }
                                                        } 
                                                        else{
                                                            return objectsArray.push(object);
                                                        }
                                                    }
                                                    else{
                                                        return objectsArray.push(object);
                                                    }
                                                }
                                                else{
                                                    return objectsArray.push(object);
                                                }
                                            }
                                            else{
                                                return objectsArray.push(object);
                                            }
                                        }
                                        else{
                                            return objectsArray.push(object);
                                        }
                                    }
                                    else{
                                        return objectsArray.push(object);
                                    }
                                }
                                else{
                                    return objectsArray.push(object);
                                }
                            }
                            else{
                                return objectsArray.push(object);
                            }
                        }
                        else{
                            return objectsArray.push(object);
                        }
                    }
                    else{
                        return objectsArray.push(object);
                    }
                }
                else{
                    return objectsArray.push(object);
                }
            }
            else{
                return objectsArray.push(object);
            }
        }
        else{
        return objectsArray.push(object);    
        }
    }
}