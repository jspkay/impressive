import {Element} from "./element.js"

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
    console.log(active.getPosition());
    let [w, h] = canvas.getTriggerSize();
    let [sx, sy] = canvas.triggerCoordinateToCanvas(0, 0); // start coordinates
    let [ex, ey] = canvas.triggerCoordinateToCanvas(w,h); // end coordinates

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

    let [x, y] = active.getPosition();
    [w, h] = active.getSize();

    let newY = sy + (ey-sy)/2 - h/2;
    active.setPosition(x, newY);
  }
  static alignLeft(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active.getPosition());
    let [sx, sy] = canvas.triggerCoordinateToCanvas(0, 0); // start coordinates

    let [x, y] = active.getPosition();

    active.setPosition(sx, y);
  }
  static alignRight(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active.getPosition());
    let [sx, sy] = canvas.triggerCoordinateToCanvas(0, 0); // start coordinates
    let [w, h] = canvas.getTriggerSize();
    let [ex, ey] = canvas.triggerCoordinateToCanvas(w,h); // end coordinates

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
    let [sx, sy] = canvas.triggerCoordinateToCanvas(0, 0); // start coordinates

    let [x, y] = active.getPosition();

    active.setPosition(x, sy);
  }
  static alignBottom(e){
    let canvas = window.impressiveCanvas;
   let active = canvas.selectedElement;
    console.log(active.getPosition());
    let [sx, sy] = canvas.triggerCoordinateToCanvas(0, 0); // start coordinates
    let [w, h] = canvas.getTriggerSize();
    let [ex, ey] = canvas.triggerCoordinateToCanvas(w,h); // end coordinates

    let [x, y] = active.getPosition();
    [w, h] = active.getSize();

    let newY = ey - h;
    console.log(newY);
    active.setPosition(x, newY);

  }

}
