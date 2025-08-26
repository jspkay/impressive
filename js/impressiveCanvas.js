import * as logging from "./logging.js";

import {Mouse} from "./mouse.js";

import {Container} from "./element.js";

export class ImpressiveCanvas{
  constructor(container, componentState){
    this.containerElement = container.getElement();
    this.element = $("<div/>", {id: 'impressiveCanvas'});
    this.element.appendTo(container.getElement());

    this.dataset = this.element[0].dataset;

    this.dataset.x = 0;
    this.dataset.y = 0;

    this.mouseHandling = new ContainerTool(container.getElement(), this.element);

    container.layoutManager.eventHub.on("toolChanged", this.changeTool.bind(this));

  }
  changeTool(event){
    this.mouseHandling.destroy();
    delete this.mouseHandling;
    switch(event.newTool){
      case "Container":
        this.mouseHandling = new ContainerTool(this.containerElement, this.element);
        break;
      case "PanAndZoom":
        this.mouseHandling = new PanAndZoomTool(this.containerElement, this.element);
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
}

class Tool{
  constructor(trigger, element){
    this.trigger = trigger;
    this.element = element;
    this.mouse = new Mouse(trigger);
    logging.debug(this.mouse);
    this.newElement = null;
    this.trigger.addEventListener(
      "mousedown",
      this.mDown = this.mouseDown.bind(this)
    );
    this.trigger.addEventListener(
      "mousemove",
      this.mMove = this.mouseMove.bind(this)
    );
    this.trigger.addEventListener(
      "mouseup",
      this.mUp = this.mouseUp.bind(this)
    );
  }
  destroy(){
    this.trigger.removeEventListener("mousedown", this.mDown);
    this.trigger.removeEventListener("mouseup", this.mUp);
    this.trigger.removeEventListener("mousemove", this.mMove);
    
  }
}

class MainBody{
  constructor(element){
    this.element = document.querySelector(`#${element}`);
    this.speed = 0.1;
  }
  setPosition(x, y){
    console.log("setting Position to ", x, y);
    this.element.style.transform = `translate(${x}px, ${y}px)`;
    this.element.dataset.x = x;
    this.element.dataset.y = y;
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
  setPositionDelta(dx, dy){
    let [x, y] = this.getPosition();
    this.setPosition(x+dx*this.speed, y+dy*this.speed);
  }
}
class PanAndZoomTool extends Tool{
  mouseDown(e){
    this.mouse.mouseDown(e);
    this.active = new MainBody("impressiveCanvas");
    this.initialPos = this.active.getPosition();
  }
  mouseMove(e){
    this.mouse.mouseMove(e);
    if(this.mouse.clicking){
      let dx = this.mouse.currentCoord.x - this.mouse.clickStarted.x;
      let dy = this.mouse.currentCoord.y - this.mouse.clickStarted.y;
      console.log(dx, dy);
      // active.setPositionDelta(dx, dy);
      this.active.setPosition( this.initialPos[0] + dx , this.initialPos[1] + dy );
      let pdx = dx % 32;
      let pdy = dy % 32;
      this.trigger.style.backgroundPosition = `${pdx}px ${pdy}px` ;
    }
  }
  mouseUp(e){
    this.mouse.mouseUp(e);
    this.active = null;
  }
}

class ContainerTool extends Tool{
  mouseDown(e){
    this.mouse.mouseDown(e);
    this.newElement = Container.create(
      this.mouse.clickStarted.x,
      this.mouse.clickStarted.y,
      this.element.attr("id"), // from jquery to vanillajs 
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
    this.newElement = null;
  }
}
