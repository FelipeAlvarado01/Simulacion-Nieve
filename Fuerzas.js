function three_a_svdjs(F){
    var F_elemt = F.elements; 
    var F_svd =[
                [F_elemt[0],F_elemt[3],F_elemt[6]],
                [F_elemt[1],F_elemt[4],F_elemt[7]],
                [F_elemt[2],F_elemt[5],F_elemt[8]]
               ];
        
    return F_svd;
}

function svdjs_a_three(F){
    var F_three = new THREE.Matrix3();
    F_three.set(F[0][0],F[0][1],F[0][2],
                F[1][0],F[1][1],F[1][2],
                F[2][0],F[2][1],F[2][2]);
    
    return F_three;
    
}

function transpose_inverse(F){
    var F_svd = three_a_svdjs(F);
    var R = lightmatrix.inverse(lightmatrix.transpose(F_svd));
    return svdjs_a_three(R);
}

function polar_R(F){ //SVD de una matriz 3x3
    var F_svd = three_a_svdjs(F);
    var { u, v, q } = SVDJS.SVD(F_svd)
    //var R =  u * lightmatrix.adjoint(v);
    var R =  lightmatrix.product(u, lightmatrix.adjoint(v));
    
    return svdjs_a_three(R);  
}

function lame_mu(mu_0, xi, J_p){ 
    // mu_0*e^(1-J_p)
    return 2 * mu_0 * Math.exp(xi * (1-J_p));
}

function lame_lambda(lambda_0, xi, J_p){
    return lambda_0 * Math.exp(xi * (1 - J_p))* (J_e - 1) * J_e;
}

function psi_derivada(mu_0,lambda_0,xi,particula){
    var J_p = particula.G_deformacion_P.determinant();
    var J_e = particula.F_hat_Ep.determinant();
    var R_E = polar_R(particula.F_hat_Ep);
    restaVec3(particula.F_hat_Ep,R_E).multiplyScalar(lame_mu(mu_0, xi, J_p))//matriz 3x3
    + 
    
     transpose_inverse(F).multiplyScalar(lame_lambda(lambda_0, xi, J_p));
    return  
    /*float J_p = determinant(particle->deformation_grad_P);
	float J_e = determinant(particle->F_hat_Ep);
	glm::mat3 R_E = polar_R(particle->F_hat_Ep);
	return 2 * lame_mu(mu_0, xi, J_p) * (particle->F_hat_Ep - R_E) + lame_lambda(lambda_0, xi, J_p) * (J_e - 1) * J_e * inverse(transpose(particle->F_hat_Ep));*/
}
    
 






























