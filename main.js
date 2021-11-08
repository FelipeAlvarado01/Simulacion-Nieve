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

    var num_particulas = 10;



    var res_x = 30;
    var res_y = 30;
    var res_z = 30;
    var dim = new THREE.Vector3(res_x, res_y, res_z);
    var h = 5 / res_y;

    //Creacion de objetos    
    var grid = new Grid(res_x, res_y, res_z, h);
    var parametros = new ParametrosFisicos(E_0, nu, xi, theta_c, theta_s, alpha);
    var nievesim = new Simulacion(frames_per_second, delta_t, parametros);   
    //nievesim.cargarGrid(grid);

    var mundoalmodelo = new THREE.Matrix4();
    mundoalmodelo = trasladarMat4(mundoalmodelo,new THREE.Vector3(grid.dim_x / 2, grid.dim_y / 2, grid.dim_z / 2));    
    var modeloalmundo = new THREE.Matrix4();
    modeloalmundo = trasladarMat4(modeloalmundo,new THREE.Vector3(-grid.dim_x / 2, -grid.dim_y / 2, -grid.dim_z / 2))
    
    
    //Se crean las particulas de la simulacion
    var primer_term = 3 * num_particulas / (16 * Math.pi);
    var radio = Math.pow(primer_term, 1/3) * h;
    CrearEsferaParticulas(grid,num_particulas,radio);
    
    var objetos = new Array();
    
    //Construccion de la caja que contendra la simulacion
        //Suelo
    var mu =0.2;
    var color_suelo = new THREE.Color(0x544F4F); //Color del suelo
    var origen = new THREE.Vector3(-1 * grid.dim_x/2.0, -1 * grid.dim_y/2.0, -1 * grid.dim_z/2.0);
    var eje_x = new THREE.Vector3(grid.dim_x,0,0);
    var eje_y = new THREE.Vector3(0,grid.dim_y,0);
    var eje_z = new THREE.Vector3(0,0,grid.dim_z);
    var suelo = new Planos(origen,eje_x,eje_z,mu,modeloalmundo,mundoalmodelo,color_suelo);
        //Caras
    var color_caras = new THREE.Color("hsl(0, 100%, 50%)");
    var o_eje_x = sumaVec3(origen,eje_x);
    var o_eje_z = sumaVec3(origen,eje_z);
    var cara_1 = new Planos(origen,eje_x,eje_y,mu,modeloalmundo,mundoalmodelo,color_caras);
    var cara_2 = new Planos(origen,eje_y,eje_z,mu,modeloalmundo,mundoalmodelo,color_caras);
    var cara_3 = new Planos(o_eje_x,eje_y,eje_z,mu,modeloalmundo,mundoalmodelo,color_caras);
    var cara_4 = new Planos(o_eje_z,eje_x,eje_y,mu,modeloalmundo,mundoalmodelo,color_caras);
    
    //cargamos los objetos en el array 
    objetos.push(suelo);
    objetos.push(cara_1);
    objetos.push(cara_2);
    objetos.push(cara_3);
    objetos.push(cara_4);
    
    //Construccion de la cuña
    var color_cunia = new THREE.Color('skyblue');
    var esquina =  new THREE.Vector3(0,-0.05*grid.dim_y,-grid.dim_z/2);
    var borde_superior = new THREE.Vector3(0, 0, 0.8 * grid.dim_z);
    var borde1 = new THREE.Vector3(0.15*grid.dim_x, -0.15*grid.dim_y, 0);
    var borde2 = new THREE.Vector3(-0.15*grid.dim_x, -0.15*grid.dim_y, 0);
    var cunia_1 = new Planos(esquina,borde_superior,borde1,mu,modeloalmundo,mundoalmodelo,color_cunia);
    var cunia_2 = new Planos(esquina,borde_superior,borde2,mu,modeloalmundo,mundoalmodelo,color_cunia);
    
    //cunia_2.set_velocidad(new THREE.Vector3(0, 0.10, 0));
    
    //cargamos las cuñas al array 
    objetos.push(cunia_1);
    objetos.push(cunia_2);
    
    
    //nievesim.cargarColisionObjeto(objetos);
    
}