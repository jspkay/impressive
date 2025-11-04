import {Element, Container} from "./element.js"
import {Settings, updateScreenBorders} from "./settings.js"

export class Alignment{
  constructor(){
    this.canvas = window.impressiveCanvas;
    window.layout.eventHub.on(
      "alignLeft", Alignment.alignLeft.bind(this)
    );
    window.layout.eventHub.on(
      "alignCenter", Alignment.alignCenter.bind(this)
    );
    window.layout.eventHub.on(
      "alignRight", Alignment.alignRight.bind(this)
    );

    window.layout.eventHub.on(
      "alignTop", Alignment.alignTop.bind(this)
    );
    window.layout.eventHub.on(
      "alignMiddle", Alignment.alignMiddle.bind(this)
    );
    window.layout.eventHub.on(
      "alignBottom", Alignment.alignBottom.bind(this)
    );
  }
  static alignCenter(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active);
    console.log(active.getPosition());
    let [w, h] = canvas.getTriggerSize();
    let [sx, sy] = canvas.triggerCoordinateToCanvas(0, 0); // start coordinates
    let [ex, ey] = canvas.triggerCoordinateToCanvas(w,h); // end coordinates

    let father = new Container(active.element.parentElement);
    [sx, sy] = canvas.canvasCoordinateToFather(sx, sy, father);
    [ex, ey] = canvas.canvasCoordinateToFather(ex, ey, father);

    let [x, y] = active.getPosition();
    [w, h] = active.getSize();

    let newX = sx + (ex-sx)/2 - w/2;
    console.log(newX);
    active.setPosition(newX, y);

  }
  static alignMiddle(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active.getPosition());
    let [sx, sy] = canvas.triggerCoordinateToCanvas(0, 0); // start coordinates
    let [w, h] = canvas.getTriggerSize();
    let [ex, ey] = canvas.triggerCoordinateToCanvas(w,h); // end coordinates

    let father = new Container(active.element.parentElement);
    [sx, sy] = canvas.canvasCoordinateToFather(sx, sy, father);
    [ex, ey] = canvas.canvasCoordinateToFather(ex, ey, father);

    let [x, y] = active.getPosition();
    [w, h] = active.getSize();

    let newY = sy + (ey-sy)/2 - h/2;
    active.setPosition(x, newY);
  }
  static alignLeft(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active.getPosition());

    let x0 = 0, y0 = 0;
    let set = new Settings();
    if(set.getShowScreenBorders()){
      let [type,size] = updateScreenBorders();
      if(type=="ver") x0=size;
      if(type=="hor") y0=size;
    }
    let [sx, sy] = canvas.triggerCoordinateToCanvas(x0, y0); // start coordinates

    let father = new Container(active.element.parentElement);
    [sx, sy] = canvas.canvasCoordinateToFather(sx, sy, father);

    let [x, y] = active.getPosition();

    active.setPosition(sx, y);
  }
  static alignRight(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active.getPosition());

    let [w, h] = canvas.getTriggerSize();

    let x0 = w, y0 = h;
    let set = new Settings();
    if(set.getShowScreenBorders()){
      let [type,size] = updateScreenBorders();
      if(type=="ver") x0=w-size;
      if(type=="hor") y0=h-size;
    }
      
    let [ex, ey] = canvas.triggerCoordinateToCanvas(x0, y0); // end coordinates

    let father = new Container(active.element.parentElement);
    [ex, ey] = canvas.canvasCoordinateToFather(ex, ey, father);

    let [x, y] = active.getPosition();
    [w, h] = active.getSize();

    let newX = ex - w;
    console.log(newX);
    active.setPosition(newX, y);
  }

  static alignTop(e){
    let canvas = window.impressiveCanvas;
    let active = canvas.selectedElement;
    console.log(active.getPosition());

    let x0 = 0, y0 = 0;
    let set = new Settings();
    if(set.getShowScreenBorders()){
      let [type,size] = updateScreenBorders();
      if(type=="ver") x0=size;
      if(type=="hor") y0=size;
    }

    let [sx, sy] = canvas.triggerCoordinateToCanvas(x0, y0); // start coordinates

    let father = new Container(active.element.parentElement);
    [sx, sy] = canvas.canvasCoordinateToFather(sx, sy, father);

    let [x, y] = active.getPosition();

    active.setPosition(x, sy);
  }
  static alignBottom(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active.getPosition());

    let [w, h] = canvas.getTriggerSize();

    let x0 = w, y0 = h;
    let set = new Settings();
    if(set.getShowScreenBorders()){
      let [type,size] = updateScreenBorders();
      if(type=="ver") x0=w-size;
      if(type=="hor") y0=h-size;
    }
    let [ex, ey] = canvas.triggerCoordinateToCanvas(x0,y0); // end coordinates

    let father = new Container(active.element.parentElement);
    [ex, ey] = canvas.canvasCoordinateToFather(ex, ey, father);

    let [x, y] = active.getPosition();
    [w, h] = active.getSize();

    let newY = ey - h;
    console.log(newY);
    active.setPosition(x, newY);

  }

}
