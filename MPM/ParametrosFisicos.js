class ParametrosFisicos{
    constructor(E_0,nu,xi,theta_c,theta_s,alpha){
        this.E_0 = E_0;                                                  //Modulo de Young
        this.nu = nu;                                                    //Radio de poison
        this.xi = xi;                                                    //Coeficiente de endurecimiento
        this.theta_c = theta_c;                                          //Compresion critica
        this.theta_s = theta_s;                                          //Estiramiento critico
        this.alpha = alpha;                                              //FLIP/PIC ratio
        this.mu_0 = E_0 / (2 * (1 + nu));                                //Lame parameter
        this.lambda_0 = E_0 * nu / ((1. + nu) * (1. - 2. * nu));         //Lame paramter
        
        
        /*
        var E_0 = 1.4e5;            // Young's modulus
        var nu = 0.2;               // Poisson's ratio
        var xi = 10;                // Hardening coefficient
        var theta_c = 2.5e-2;       // Critical compression
        var theta_s = 7.5e-3;       // Critical stretch
        var alpha = 0.95;           // FLIP/PIC ratio

        var mu = 1.0; // static friction
        */
    }
}