/**
 * This is customer class similar to car class.
 * However,, It is just used to store the 
 * details of customer.
 */
export default class Customer{
    constructor(x,y,screenX,screenY,v){
        this.x = x;
        this.y = y;
        this.screenX = screenX;
        this.screenY = screenY;
        this.instance = v;
    }
}