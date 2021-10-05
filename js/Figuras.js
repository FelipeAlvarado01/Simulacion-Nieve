function esfera(radio){
	
	var geoEsfera = new THREE.Geometry();
            var resEsfera = 10;
            for( var i = 0; i < resEsfera; i++){
                for( var j = 0; j < resEsfera; j++){
                    var punto = new THREE.Vector3();
                    punto.x = radio * Math.cos( ( j * 2 * Math.PI )/resEsfera) * Math.sin( ( i * Math.PI )/resEsfera) ;
                    punto.y = radio * Math.sin( ( j * 2 * Math.PI )/resEsfera) * Math.sin( ( i * Math.PI )/resEsfera) ;
                    punto.z = radio * Math.cos( ( i * Math.PI )/resEsfera) ;
                    geoEsfera.vertices.push( punto );
                }
            }
    return geoEsfera;
}

function cubo(ancho,largo,profundo){
	var geoCubo= new THREE.Geometry();
            
            for( var i = 0; i < ancho; i++){
                for( var j = 0; j < largo; j++){
					for(var k=0;k<profundo;k++){
                    var punto = new THREE.Vector3();
                     punto.x =   k;
                     punto.y =   j;
                     punto.z =   i;
                     geoCubo.vertices.push( punto );
					}
                }
            }
	return geoCubo;
}
function cilindro(radio,alto){
	 var geoCilindro = new THREE.Geometry();
            var resCilindro  =10;
              for( var i = 0; i < resCilindro ; i++){
                for( var j = 0; j < resCilindro ; j++){
                    var punto = new THREE.Vector3();
                    punto.x = radio * Math.cos( ( j * 2 * Math.PI )/resCilindro ) ;
                    punto.y = i/alto;
                    punto.z = radio * Math.sin( ( j * 2* Math.PI )/resCilindro);
                    geoCilindro .vertices.push( punto );
                }
            }
	
	return geoCilindro;
}

/*if(rotC){
		c = Math.cos(0.01);
		s = Math.sin(0.01);
		tx = origenC.position.x;
		ty = origenC.position.y;
		tz = origenC.position.z;
		
		var rotarC = new THREE.Matrix4();
		rotarC.set(c,0,s,tx*(1-c)-s*tz,
				  0,1,0,0,
				  -s,0,c,tz*(1-c)+s*tx,
				  0,0,0,1);
		origenC.applyMatrix(rotarC);							
		origenC.elementsNeedUpdate = true;	
		}
		
		if(rotT){
		c = Math.cos(0.01);
		s = Math.sin(0.01);
		tx = origenT.position.x;
		ty = origenT.position.y;
		tz = origenT.position.z;
		
		
		var rotarT = new THREE.Matrix4();
		rotarT.set(c,0,s,tx*(1-c)-s*tz,
				  0,1,0,0,
				  -s,0,c,tz*(1-c)+s*tx,
				  0,0,0,1);
		origenT.applyMatrix(rotarT);
		origenT.elementsNeedUpdate = true;	
		}
			
		
		
		
		if(rotH_D){
		c = Math.cos(0.01);
		s = Math.sin(0.01);
		tx = origenB_D.position.x;
		ty = origenB_D.position.y;
		tz = origenB_D.position.z;
			
		var rotarB_D = new THREE.Matrix4();
		rotarB_D.set(c,-s,0,tx*(1-c)+s*ty,
				  s,c,0,ty*(1-c)-s*tx,
				  0,0,1,0,
				  0,0,0,1);
		origenB_D.applyMatrix(rotarB_D);
		origenB_D.elementsNeedUpdate = true;	
		}*/
