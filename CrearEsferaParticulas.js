function CrearEsferaParticulas(grid,num_particulas,radio){
    var centro_grid = Vec3DivEscalar(new THREE.Vector3(grid.dim_x,grid.dim_y,grid.dim_z),2);
    
    centro_grid.y += grid.dim_y * 0.15;
    
    for( var i=0;i < num_particulas;i++){
        var p = new Particula(sumaVec3(centro_grid,ballRand(radio)),10,new THREE.Vector3(grid.res_x,grid.res_y,grid.res_z),grid.h);
        //var p = new Particula(sumaVec3(centro_grid,new THREE.Vector3(1,0,1)),10,new THREE.Vector3(grid.res_x,grid.res_y,grid.res_z),grid.h);
        
        p.velocidad = new THREE.Vector3();
        grid.todas_particulas.push(p);
        
        //console.log("tamaño arreglo de particulas: "+grid.todas_particulas.length);
    }
    grid.resetearGrid();
}