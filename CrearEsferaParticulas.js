function CrearEsferaParticulas(grid,num_particulas,radio){
    var centro_grid = Vec3DivEscalar(new THREE.Vector3(grid.dim_x,grid.dim_y,grid.dim_z),2);
    centro_grid.y += grid.dim_y * 0.15;
    for( var i=0;i<num_particulas;i++){
        var p = new Particula(sumaVec3(centro_grid,ballRand(radio)),10,new THREE.Vector3(grid.dim_x,grid.dim_y,grid.dim_z),grid.h);
        
        /*console.log("pos x: "+ p.posicion.x + " de la particula #"+i);
        console.log("pos y: "+ p.posicion.y + " de la particula #"+i);
        console.log("pos z: "+ p.posicion.z + " de la particula #"+i);*/
        
        p.velocidad = new THREE.Vector3();
        grid.todas_particulas.push(p);
    }
    grid.resetearGrid();
}