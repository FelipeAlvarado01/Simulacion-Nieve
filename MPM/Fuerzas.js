function three_a_svdjs(F){
    var F_elemt = F.elements; 
    var F_svd =[
                [F_elemt[0],F_elemt[1],F_elemt[2]],
                [F_elemt[3],F_elemt[4],F_elemt[5]],
                [F_elemt[6],F_elemt[7],F_elemt[8]]
               ];
        
    return F_svd;
}
function three_a_nd(F){
    var F_elemt = F.elements; 
    var F_svd = nd.array([
                [F_elemt[0],F_elemt[1],F_elemt[2]],
                [F_elemt[3],F_elemt[4],F_elemt[5]],
                [F_elemt[6],F_elemt[7],F_elemt[8]]
               ]);
        
    return F_svd;
}
function svdjs_a_three(F){
    var F_three = new THREE.Matrix3();
    F_three.set(F[0][0],F[1][0],F[2][0],
                F[0][1],F[1][1],F[2][1],
                F[0][2],F[1][2],F[2][2]);
    
    return F_three;
    
}

function nd_a_three(F){
    var F_three = new THREE.Matrix3();
    F_three.set(F(0,0),F(1,0),F(2,0),
                F(0,1),F(1,1),F(2,1),
                F(0,2),F(1,2),F(2,2));
    
    return F_three;
    
}

function svdjs_a_threeVector3(F){
    var F_three = new THREE.Vector3(F[0],F[1],F[2]);
    
    return F_three;
}

function nd_a_threeVector3(F){
    var F_three = new THREE.Vector3(F(0),F(1),F(2));
    
    return F_three;
}


function transponer_inversa(F){
    var F_svd = three_a_svdjs(F);
    var R = lightmatrix.inverse(lightmatrix.transpose(F_svd));

    return svdjs_a_three(R);
}

/*function polar_R(F){ //SVD de una matriz 3x3
    var F_svd = three_a_svdjs(F);
    var { u, v, q } = SVDJS.SVD(F_svd);
    //var R =  u * lightmatrix.adjoint(v);
    var R =  lightmatrix.product(lightmatrix.adjoint(v),u);
    
    return svdjs_a_three(R);  
}*/

function polar_R(F){ //SVD de una matriz 3x3
    var F_svd = three_a_nd(F);
    var [u, q, v]  = nd.la.svd_jac_classic(F_svd);
    
    var Uaux = nd_a_three(u);
    var Vaux = nd_a_three(v).transpose();
    
    var U = three_a_svdjs(Uaux);
    var V = three_a_svdjs(Vaux);
    
    var R =  lightmatrix.product(lightmatrix.adjoint(V),U);
    
    return svdjs_a_three(R);  
}

function lame_mu(mu_0, xi, J_p){ 
    // mu_0*e^(1-J_p)
    return 2 * (mu_0 * Math.exp(xi * (1-J_p)));
}

function lame_lambda(lambda_0, xi, J_p,J_e){
    return (lambda_0 * Math.exp(xi * (1 - J_p))) * (J_e - 1) * J_e;
}

function psi_derivada(mu_0,lambda_0,xi,particula){

    var J_p = determinateMat3(particula.G_deformacion_P);
    var J_e = determinateMat3(particula.F_hat_Ep);
    var R_E = polar_R(particula.F_hat_Ep);

    return sumMatriz3(restMatriz3(particula.F_hat_Ep,R_E).multiplyScalar(lame_mu(mu_0, xi, J_p)),transponer_inversa(particula.F_hat_Ep).multiplyScalar(lame_lambda(lambda_0, xi, J_p,J_e))); 
    
    //return 2 * lame_mu(mu_0, xi, J_p) * (particle->F_hat_Ep - R_E) + lame_lambda(lambda_0, xi, J_p) * (J_e - 1) * J_e * inverse(transpose(particle->F_hat_Ep));
    
}
    
 





























