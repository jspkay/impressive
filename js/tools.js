import {Mouse} from "./mouse.js";
import {Container} from "./element.js";

class Tool{
  constructor(canvas, trigger, element){
    this.canvas = canvas;
    this.trigger = trigger;
    this.element = element;
    this.mouse = new Mouse(trigger);
    this.newElement = null;
    this.trigger.addEventListener( "mousedown", this.mDown = this.mouseDown.bind(this));
    this.trigger.addEventListener( "mousemove", this.mMove = this.mouseMove.bind(this));
    this.trigger.addEventListener( "mouseup", this.mUp = this.mouseUp.bind(this));
    this.trigger.addEventListener( "wheel", this.wheel = this.wheel.bind(this));
  }
  destroy(){
    this.trigger.removeEventListener("mousedown", this.mDown);
    this.trigger.removeEventListener("mouseup", this.mUp);
    this.trigger.removeEventListener("mousemove", this.mMove);
    this.trigger.removeEventListener("wheel", this.wheel);
  }
  mDown(e){
    console.log("event not implemented", e);
  }
  mUp(e){
    console.log("event not implemented", e);
  }
  mMove(e){
    console.log("event not implemented", e);
  }
  wheel(e){
    console.log("event not implemented", e);
  }
}
export class PanAndZoomTool extends Tool{
  mouseDown(e){
    this.mouse.mouseDown(e);
    this.initialPos = this.canvas.getPosition();
  }
  mouseMove(e){
  this.mouse.mouseMove(e);
    if(this.mouse.clicking){
      let scale = this.canvas.getScale();
      let dx = this.mouse.currentCoord.x - this.mouse.clickStarted.x;
      let dy = this.mouse.currentCoord.y - this.mouse.clickStarted.y;
      console.log(dx, dy);
      // active.setPositionDelta(dx, dy);
      this.canvas.setPosition( this.initialPos[0] + dx / scale , this.initialPos[1] + dy / scale );
      scale = Math.round(scale*32); // 32 is the pixels of the image of backgound
      let pdx = dx % scale;
      let pdy = dy % scale;
      this.trigger.style.backgroundPosition = `${pdx}px ${pdy}px` ;
    }
  }
  mouseUp(e){
    this.mouse.mouseUp(e);
  }
  wheel(e){
    let s = this.canvas.getScale();
    let ds = (1 - e.deltaY / 300);
    this.canvas.setScale(s * ds );
    let cs = Number(this.trigger.style.backgroundSize.replace("px", "")) * ds;
    console.log(cs);
    if(cs < 10) cs = 100
    if(cs > 100) cs = 10;
    this.trigger.style.backgroundSize = `${cs}px`;
    // let currentBgPos = Number(this.trigger.backgroundPositionX.replace("px", ""));

    // TODO: Make it such the background is correclty proportioned to the scaling
    this.trigger.style.backgroundPositionX = `${0}px`;
  }
}

export class ContainerTool extends Tool{
  mouseDown(e){
    this.mouse.mouseDown(e);
    this.newElement = Container.create(
      this.mouse.clickStarted.x,
      this.mouse.clickStarted.y,
      this.element.getAttribute("id"),
    );
    this.newElement.tooSmall = true;
  }
  mouseMove(e){
    this.mouse.mouseMove(e);
    if(this.mouse.clicking){
      this.newElement.setSizeFromPos(
        this.mouse.currentCoord.x,
        this.mouse.currentCoord.y
      );
    }
  }
  mouseUp(e){
    this.mouse.mouseUp(e);
    this.newElement.finish();
    if(! this.newElement.tooSmall) {
      window.layout.eventHub.emit(
        "selectElement", {element:this.newElement});
      }
    this.newElement = null;
  }
  wheel(e){
  }
}

export class SelectTool extends Tool{
  mouseDown(e){

    if(this.selected === e.target) return;

    if(this.selected != null){
      interact(this.selected).draggable(false);
    }
    this.selected = e.target;
    let container = new Container(e.target);
    window.layout.eventHub.emit(
      "selectElement", {element: container});

    let move = function(e){
          let [x, y] = container.getPosition();
          container.setPosition(x+e.dx, y+e.dy);
        }
    let int = interact(e.target);
    int.draggable({
        onmove: move,
    })
    int.resizable({
      edges:{
        top: true, bottom:true, left:true, right:true,
      },
      onmove: (e)=>{
          let [w, h] = container.getSize();
          console.log(e.rect);
          console.log(e.deltaRect);
          
          let dx = (e.deltaRect.right != 0 || e.deltaRect.left != 0);
          let dy = (e.deltaRect.top != 0 || e.deltaRect.bottom != 0);

          container.setSize(dx ? w+e.dx : w, dy ? h+e.dy : h);
        }
    });
  }
  mouseUp(e){}
  mouseMove(e){}
  wheel(e){}
}
