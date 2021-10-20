class Grid{
    constructor(res_x,res_y,res_z,h){
       this.res_x = res_x;
       this.res_y = res_y;
       this.res_z = res_z;
       
        
       this.dim_x = res_x * h;
       this.dim_y = res_y * h;
       this.dim_z = res_z * h;
        
       this.first_step = true;
        
    }
}