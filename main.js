function iniciar(){
    // fps wanted
    var frames_per_second = 30;
    var delta_t = 1e-3;

    // Parametros fisicos
    var E_0 = 1.4e5;            // Young's modulus
    var nu = 0.2;               // Poisson's ratio
    var xi = 10;                // Hardening coefficient
    var theta_c = 2.5e-2;       // Critical compression
    var theta_s = 7.5e-3;       // Critical stretch
    var alpha = 0.95;           // FLIP/PIC ratio

    var mu = 1.0; // static friction

    var num_particles = 1000;



    var res_x = 30;
    var res_y = 30;
    var res_z = 30;
    var dim = new THREE.Vector3(res_x, res_y, res_z);
    var h = 5. / res_y;

    //Creacion de objetos    
    var grid = new Grid(res_x, res_y, res_z, h);
    var parametros = new ParametrosFisicos(E_0, nu, xi, theta_c, theta_s, alpha);
    var nievesim = new Simulacion(frames_per_second, delta_t, parametros);   
    nievesim.cargarGrid(grid);

    var mundoalmodelo = new THREE.Matrix4();
    mundoalmodelo = trasladarMat4(mundoalmodelo,new THREE.Vector3(grid.dim_x / 2, grid.dim_y / 2, grid.dim_z / 2));    
    var modeloalmundo = new THREE.Matrix4();
    
      
      
  /*
  Grid* grid = new Grid(res_x, res_y, res_z, h);
  PhysicsParams* params = new PhysicsParams(E_0, nu, xi, theta_c, theta_s, alpha);
  snowsim = new SnowSimulator(frames_per_second, length, delta_t, params);
  snowsim->loadGrid(grid);

  glm::mat4 worldtomodel;
  worldtomodel = glm::translate(worldtomodel, glm::vec3(grid->dim_x / 2, grid->dim_y / 2, grid->dim_z / 2));
  glm::mat4 modeltoworld;
  modeltoworld = glm::translate(modeltoworld, glm::vec3(-grid->dim_x / 2, -grid->dim_y / 2, -grid->dim_z / 2));
  */    
}