import * as logging from "./logging.js"
import {Container} from "./elements.js"

//
// Mouse interacts directly with the pointer of the uers and tracks 
// informations like the position and the keypressed.
class Mouse{
  constructor(){
    this.clicking = false;
    this.clickStarted = {x:0, y:0};
    this.currentCoord = {x:0, y:0};
    this.clickFinished = {x:0, y:0};
  }
  mouseDown(e){
    this.clicking = true;
    let x = e.pageX;
    let y = e.pageY;
    this.clickStarted = {x:x, y:y};
  }
  mouseMove(e){
    let x = e.pageX;
    let y = e.pageY;
    this.currentCoord = {x: x, y:y};
  }
  mouseUp(e){
    let x = e.pageX;
    let y = e.pageY;
    this.clickFinished = {x:x, y:y};
    this.clicking = false;
  }
}
// The class RectangleTool is able to place Rectagle in the canvas 
// specified as root.
export class RectangleTool{
  constructor(){
    document.querySelector("#containerTool").classList.add("active");

    this.mouse = new Mouse();
    this.active = null;
    this.root="scene";

    logging.debug(this);

    this.mouseDown = (e) => {
      logging.debug("Mouse pressed!");
      this.mouse.mouseDown(e);
      this.active = Container.create(
        this.mouse.clickStarted.x,
        this.mouse.clickStarted.y, 
        this.root
      );
      this.active.tooSmall = true;
    };
    this.mouseUp = (e) => {
      logging.debug("mouse released!!!");
      this.mouse.mouseUp(e);
      this.active.finish();
      this.active = null;
    };
    this.mouseMove = (e) => {
      this.mouse.mouseMove(e);
      if(this.mouse.clicking){
        this.active.setSizeFromPos(
          this.mouse.currentCoord.x,
          this.mouse.currentCoord.y
        );
      }
    };

    document.addEventListener("mousedown", this.mouseDown );
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
    logging.debug("preparing RectangleTool");
  }
  destroy(){
    document.removeEventListener("mousedown", this.mouseDown );
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
  }
}
