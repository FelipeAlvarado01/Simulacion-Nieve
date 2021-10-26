function polar_R(F){
    //Jacobiano de F
    
}

function psi_derivada(mu_0,lambda_0,xi,particula){
    var J_p = particula.G_deformacion_P.determinant();
    var J_e = particula.F_hat_Ep.determinant();
    var R_E = polar_R(particula.F_hat_Ep);
    /*float J_p = determinant(particle->deformation_grad_P);
	float J_e = determinant(particle->F_hat_Ep);
	glm::mat3 R_E = polar_R(particle->F_hat_Ep);
	return 2 * lame_mu(mu_0, xi, J_p) * (particle->F_hat_Ep - R_E) + lame_lambda(lambda_0, xi, J_p) * (J_e - 1) * J_e * inverse(transpose(particle->F_hat_Ep));*/
}
    
    
