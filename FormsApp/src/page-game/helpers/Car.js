
export default class Car{
    constructor(x,y,screenX, screenY, v){
        this.x = x;
        this.y = y;
        this.instance = v;
        this.screenX = screenX;
        this.screenY = screenY;
        this.paths = [];
        this.customerId = [];
    }


    changefeature(temp){
        temp.visible = false;
        // temp.displayHeight = 20;
        temp.setLineWidth(10,20);
        temp.isFilled = true;
        // temp.setInteractive();
    }

    drawpaths(scene){
        this.path_sprites = []
        let len = this.paths.length;
        let bias = (len - len%2)/2;
        let ct = bias;
        let depth = scene.dimX/(2*(ct+1));
        let fs = 1;
        let sc = 1;
        let preX = scene.dimX/2;
        let preY = scene.dimY/2;
        let dimX = scene.dimX;
        let dimY = scene.dimY;
        for(let i=0; i<this.paths.length; i++){
            let sprites = [];
            let prevX = null;
            let prevY = null;
            for(let j=0; j<this.paths[i].length-1; j++){
                if(bias > 0){
                    let horizontal = (this.paths[i][j][0]==this.paths[i][j+1][0]);
                    if(horizontal){
                        let x1 = preX + this.paths[i][j][0]*dimX;
                        let y1 = preY + this.paths[i][j][1]*dimY;
                        let x2 = preX + this.paths[i][j+1][0]*dimX;
                        let y2 = preY + this.paths[i][j+1][1]*dimY;
                        if(prevX!=null && prevY!=null){
                            if(prevX!=x1 && prevY!=y1){
                                let temp = scene.add.line(0,0,prevX,prevY,x1,y1,0xff0000)
                                this.changefeature(temp);
                                sprites.push(temp);
                            }
                        }
                        prevX = x2;
                        prevY = y2;
                        console.log(x1,y1,x2,y2);
                        let temp = scene.add.line(0,preY,x1,y1,x2,y2,0xff0000)
                        this.changefeature(temp);
                        sprites.push(temp);
                    }else{
                        let x1 = preX + this.paths[i][j][0]*dimX;
                        let y1 = preY + this.paths[i][j][1]*dimY;
                        let x2 = preX + this.paths[i][j+1][0]*dimX;
                        let y2 = preY + this.paths[i][j+1][1]*dimY;
                        if(prevX!=null && prevY!=null){
                            if(prevX!=x1 && prevY!=y1){
                                let temp = scene.add.line(0,0,prevX,prevY,x1,y1,0xff0000)
                                sprites.push(temp);
                                this.changefeature(temp);
                            }
                        }
                        prevX = x2;
                        prevY = y2;
                        let temp = scene.add.line(preX,0,x1,y1,x2,y2,0xff0000)
                        this.changefeature(temp);
                        sprites.push(temp);
                    }
                }else if(bias == 0){

                    let horizontal = (this.paths[i][j][0]==this.paths[i][j+1][0]);
                    if(horizontal){
                        let x1 = preX + this.paths[i][j][0]*dimX;
                        let y1 = preY + this.paths[i][j][1]*dimY;
                        let x2 = preX + this.paths[i][j+1][0]*dimX;
                        let y2 = preY + this.paths[i][j+1][1]*dimY;
                        if(prevX!=null && prevY!=null){
                            if(prevX!=x1 && prevY!=y1){
                                let temp = scene.add.line(0,0,prevX,prevY,x1,y1,0xff0000)
                                this.changefeature(temp);
                                sprites.push(temp);
                            }
                        }
                        let temp = scene.add.line(0,preY,x1,y1,x2,y2,0xff0000)
                        temp.visible = false;
                        this.changefeature(temp);
                        sprites.push(temp);
                    }else{
                        let x1 = preX + this.paths[i][j][0]*dimX;
                        let y1 = preY + this.paths[i][j][1]*dimY;
                        let x2 = preX + this.paths[i][j+1][0]*dimX;
                        let y2 = preY + this.paths[i][j+1][1]*dimY;
                        if(prevX!=null && prevY!=null){
                            if(prevX!=x1 && prevY!=y1){
                                let temp = scene.add.line(0,0,prevX,prevY,x1,y1,0xff0000)
                                this.changefeature(temp);
                                sprites.push(temp);
                            }
                        }
                        let temp = scene.add.line(preX,0,x1,y1,x2,y2,0xff0000)
                        this.changefeature(temp);
                        sprites.push(temp);
                    }
                }else{
                    let horizontal = (this.paths[i][j][0]==this.paths[i][j+1][0]);
                    if(horizontal){
                        let x1 = preX + this.paths[i][j][0]*dimX;
                        let y1 = preY + this.paths[i][j][1]*dimY;
                        let x2 = preX + this.paths[i][j+1][0]*dimX;
                        let y2 = preY + this.paths[i][j+1][1]*dimY//-sc*depth;
                        if(prevX!=null && prevY!=null){
                            if(prevX!=x1 && prevY!=y1){
                                let temp = scene.add.line(0,0,prevX,prevY,x1,y1,0xff0000)
                                this.changefeature(temp);
                                sprites.push(temp);
                            }
                        }
                        prevX = x2;
                        prevY = y2;
                        let temp = scene.add.line(0,preY,x1,y1,x2,y2,0xff0000)
                        this.changefeature(temp);
                        sprites.push(temp);
                    }else{
                        let x1 = preX + this.paths[i][j][0]*dimX//+sc*depth;
                        let y1 = preY + this.paths[i][j][1]*dimY;
                        let x2 = preX + this.paths[i][j+1][0]*dimX//+sc*depth;
                        let y2 = preY + this.paths[i][j+1][1]*dimY;
                        if(prevX!=null && prevY!=null){
                            if(prevX!=x1 && prevY!=y1){
                                let temp = scene.add.line(0,0,prevX,prevY,x1,y1,0xff0000)
                                this.changefeature(temp);
                                sprites.push(temp);
                            }
                        }
                        prevX = x2;
                        prevY = y2;
                        let temp = scene.add.line(preX,0,x1,y1,x2,y2,0xff0000)
                        this.changefeature(temp);
                        sprites.push(temp);
                    }
                }
            }  
            fs++;
            sc++;
            bias--;
            if(len%2==0 && bias==0){
                bias--;
            }
            this.path_sprites.push(sprites);
        }
    }


    drawIndividualPath(id){
        console.log('Drawing Path', id);
        console.log(this.customerId.length);
        for(let i=0; i<this.customerId.length; i++){
            if(this.customerId[i]==id){
                console.log(i);
                for(let j=0; j<this.path_sprites[i].length; j++){
                    // this.path_sprites[i][j].setInteractive();
                    this.path_sprites[i][j].visible = true;
                }
                break;
            }
        }
    }

    drawAssignedPath(id){
        console.log('Drawing Path', id);
        console.log(this.customerId.length);
        for(let i=0; i<this.customerId.length; i++){
            if(this.customerId[i]==id){
                console.log(i);
                for(let j=0; j<this.path_sprites[i].length; j++){
                    /**
                     * Need to change stroke coloe in hideAllPaths() as well
                     */
                    this.path_sprites[i][j].strokeColor = 0x808080;
                    this.path_sprites[i][j].visible = true;
                }
                break;
            }
        }
    }

    hideAllPaths(){
        for(let i=0; i<this.path_sprites.length; i++){
            for(let j=0; j<this.path_sprites[i].length; j++){
                if(this.path_sprites[i][j].strokeColor != 0x808080){
                    this.path_sprites[i][j].visible = false;
                }
            }
        }
    }

    
}