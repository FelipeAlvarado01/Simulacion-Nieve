function CrearEsferaParticulas(grid,num_particulas,radio){
    var centro_grid = Vec3DivEscalar(new THREE.Vector3(grid.dim_x,grid.dim_y,grid.dim_z),2);
        /*console.log("centro_grid x: "+ centro_grid.x );
        console.log("centro_grid y: "+ centro_grid.y );
        console.log("centro_grid z: "+ centro_grid.z );*/
    
    centro_grid.y += grid.dim_y * 0.15;
    
    for( var i=0;i<num_particulas;i++){
        var p = new Particula(sumaVec3(centro_grid,ballRand(radio)),10,new THREE.Vector3(grid.dim_x,grid.dim_y,grid.dim_z),grid.h);
        //var p = new Particula(sumaVec3(centro_grid,new THREE.Vector3(0.5,0,0)),10,new THREE.Vector3(grid.res_x,grid.res_y,grid.res_z),grid.h);
        
        /*console.log("pos x: "+ todas_particulas[i].posicion.x + " de la particula #"+i);
        console.log("pos y: "+ todas_particulas[i].posicion.y + " de la particula #"+i);
        console.log("pos z: "+ todas_particulas[i].posicion.z + " de la particula #"+i);*/
        
        p.velocidad = new THREE.Vector3();
        grid.todas_particulas.push(p);
    }
    grid.resetearGrid();
}