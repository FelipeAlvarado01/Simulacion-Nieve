function set(nodo, nodos_en_uso){
    if(nodos_en_uso.length > 0){
        for(var i=0;i < nodos_en_uso.length; i++){
            if(nodo.index.x == nodos_en_uso[i].index.x  && nodo.index.y == nodos_en_uso[i].index.y && nodo.index.z == nodos_en_uso[i].index.z){
               consolo.log("igual"); 
            }
            else{
                return nodos_en_uso.push(nodo);
            }
        }
    }
    else{
        return nodos_en_uso.push(nodo);
    }
}