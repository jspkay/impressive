import * as logging from "./logging.js";

import {Mouse} from "./mouse.js";

import {Container} from "./element.js";

export class ImpressiveCanvas{
  constructor(container, componentState){
    this.containerElement = container.getElement();
    this.element = document.createElement("div");
    this.element.setAttribute("id", "impressiveCanvas");
    this.containerElement.append(this.element);

    this.containerElement.style.backgroundPositionX = "0px";

    this.dataset = this.element.dataset;
    this.dataset.x = 0;
    this.dataset.y = 0;
    this.element.style.scale = 1;

    this.mouseHandling = new ContainerTool(this, container.getElement(), this.element);

    // Events 
    container.layoutManager.eventHub.on("toolChanged", this.changeTool.bind(this));

  }
  changeTool(event){
    this.mouseHandling.destroy();
    delete this.mouseHandling;
    switch(event.newTool){
      case "Container":
        this.mouseHandling = new ContainerTool(this, this.containerElement, this.element);
        break;
      case "PanAndZoom":
        this.mouseHandling = new PanAndZoomTool(this, this.containerElement, this.element);
        break;
      default:
        alert("Tool "+event.newTool+" not impremented yet...");
        this.mouseHandling = {
          destroy: function(){
           console.log("Destroying non-existant object");
          }
        };
        break;
    }
  }
  move(x, y, scale){
    let str = `translate(${x}px,${y}px) scale(${scale})`;
    this.element.style.transform = str; 
    console.log(str)
  }
  transition(smooth){
    if(smooth){
      this.element.style.transition = "all 0.3s linear";
    }else{
      this.element.style.transition = "";
    }
  }
  setPosition(x, y){
    console.log("setting Position to ", x, y);
    this.element.style.transform = `translate(${x}px,${y}px)`;
    this.element.dataset.x = x;
    this.element.dataset.y = y;
  }
  setScale(s){
    this.element.style.scale = String(s);
  }
  getScale(){
    return this.element.style.scale;
  }
  getPosition(){
    let style = window.getComputedStyle(this.element);
    let matrix = style.transform || style.webkitTransform || style.mozTransform;
    if(matrix == "none"){
      matrix = "matrix(1, 0, 0, 1, 0, 0)";
    }
    let values = matrix.replace(/\)/g, "").replace(/,/g, "").split(" ");
    // console.log(values);
    let x = Number(values[4]);
    let y = Number(values[5]);
    return [x, y];
  }
}

class Tool{
  constructor(canvas, trigger, element){
    this.canvas = canvas;
    this.trigger = trigger;
    this.element = element;
    this.mouse = new Mouse(trigger);
    logging.debug(this.mouse);
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
class PanAndZoomTool extends Tool{
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
      let pdx = dx % 32;
      let pdy = dy % 32;
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
    if(cs < 5 || cs > 100){
      cs = 32;
    }
    this.trigger.style.backgroundSize = `${cs}px`;
    // let currentBgPos = Number(this.trigger.backgroundPositionX.replace("px", ""));

    // TODO: Make it such the background is correclty proportioned to the scaling
    this.trigger.style.backgroundPositionX = `${0}px`;
  }
}

class ContainerTool extends Tool{
  mouseDown(e){
    this.mouse.mouseDown(e);
    this.newElement = Container.create(
      this.mouse.clickStarted.x,
      this.mouse.clickStarted.y,
      this.element.getAttribute("id"),
    );
    this.newElement.tooSmall = true;
    logging.debug(this.mouse);
    logging.debug(e);
  }
  mouseMove(e){
    this.mouse.mouseMove(e);
    logging.debug(this.mouse);
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
}
