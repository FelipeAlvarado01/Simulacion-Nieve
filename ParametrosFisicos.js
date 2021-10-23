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
    }
}