// Mouse interacts directly with the pointer of the uers and tracks 
// informations like the position and the keypressed.
export class Mouse{
  constructor(relativeElement = null){
    this.clicking = false;
    this.clickStarted = {x:0, y:0};
    this.currentCoord = {x:0, y:0};
    this.clickFinished = {x:0, y:0};
    this.relativeElement = relativeElement ;
    console.log(relativeElement);
  }
  getCoordinates(e){
    let x,y;
    if(this.relativeElement == null){
      x = e.pageX;
      y = e.pageY;
    }
    else{
      let gbcr = this.relativeElement.getBoundingClientRect();
      x = e.pageX - gbcr.x;
      y = e.pageY - gbcr.y;
    }
    return [x, y];
  }
  static getCoordinates(e, relativeElement){
    let x,y;
    if(relativeElement == null){
      x = e.pageX;
      y = e.pageY;
    }
    else{
      let gbcr = this.relativeElement.getBoundingClientRect();
      x = e.pageX - gbcr.x;
      y = e.pageY - gbcr.y;
    }
    return [x, y];
  }
  mouseDown(e){
    this.clicking = true;
    let [x, y] = this.getCoordinates(e);
    this.clickStarted = {x:x, y:y};
  }
  mouseMove(e){
    let [x, y] = this.getCoordinates(e);
    this.currentCoord = {x: x, y:y};
  }
  mouseUp(e){
    let [x, y] = this.getCoordinates(e);
    this.clickFinished = {x:x, y:y};
    this.clicking = false;
  }
}
