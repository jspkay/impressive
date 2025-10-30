import {PanAndZoomTool, ContainerTool, SelectTool, ImageTool, TextTool} from "./tools.js";
import {KeyboardManager} from "./keyboard.js";

export class ImpressiveCanvas{
  constructor(container, componentState){
    // take the root 
    window.impressive.canvas = this;
    this.containerElement = container.getElement();

      // create the canvas
    this.element = document.createElement("div");
    this.element.setAttribute("id", "impressiveCanvas");
    this.containerElement.append(this.element);
    
    // create an origin for reference
    this.origin = document.createElement("div");
    this.origin.setAttribute("id", "origin");
    this.element.append(this.origin);

    // visual effects
    this.containerElement.style.backgroundPositionX = "0px";

    // prepare the initial position 
    this.dataset = this.element.dataset;
    this.dataset.x = 0;
    this.dataset.y = 0;
    this.element.style.scale = 1;
    this.selectElement = null;

    // initialize the active tool
    this.mouseHandling = new ContainerTool(this, container.getElement(), this.element);
    this.keyboardHandling = new KeyboardManager();
    this.keyboardHandling.addAction("Delete", ()=>{window.impressiveCanvas.selectedElement.destroy()})
    this.keyboardHandling.addAction("Backspace", ()=>{window.impressiveCanvas.selectedElement.destroy()})

    window.impressiveCanvas = this;

    // Events management
    container.layoutManager.eventHub.on("toolChanged", this.changeTool.bind(this));
    container.layoutManager.eventHub.on("selectElement", function (e){
      this.selectedElement = e.element;
    }.bind(this));

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
      case "Select":
        this.mouseHandling = new SelectTool(this, this.containerElement, this.element);
        break;
      case "Image":
        this.mouseHandling = new ImageTool(this, this.containerElement, this.element);
	break;
      case "Text":
        this.mouseHandling = new TextTool(this, this.containerElement, this.element);
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
    let str = `translate(${x}px,${y}px)`;
    this.element.style.transform = str;
    this.element.dataset.x = x;
    this.element.dataset.y = y;
  }
  setScale(s){
    let res = true;
    if(s < 0.00002){
      s = 0.00002;
      res = false;
    }
    if(s > 16556){
      s = 16556;
      res = false;
    }
    this.element.style.scale = String(s);
    this.origin.style.scale = String(1/s);
    return res;
  }
  getScale(){
    return Number(this.element.style.scale);
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
  triggerCoordinateToCanvas(x, y){
    /* This function takes a coordinate (x,y)
     * from the trigger (which is made by the 
     * mousedown event) and translates its coordinate 
     * to the canvas. 
     * The way it works is easy:
     *  - the initial coordinate x has to be amplified by
     *      1/scale, to match the scale.
     *  - then this coordinate is offset-ted by offX: 
     *    it corresponds to the total size of the scaled
     *    canvas this.element.offsetWidth/scale, from which 
     *    we remove the size of the original canvas and then we 
     *    divide by two. Basically, the canvas is 1/scale bigger 
     *    than the original. The extra contour width/scale - width 
     *    is equally spaced to the right and left, thus we divide by 2.
     * */
    let scale = this.getScale();
    // static offest (due to the fact that the canvSe is positioned with top:50%
    // and width: 50%)
    let offStatX = this.element.offsetWidth / 2; 
    let offStatY = this.element.offsetHeight / 2;
    // dynamic offset transforms the point from the coordinate of the trigger to
    // the canvas
    let offX = this.element.offsetWidth * (1/scale - 1) / 2; // dynamic offset
    let offY = this.element.offsetHeight * (1/scale - 1) / 2;
    // finally, we have a component dictated by the relative displacement of the
    // canvas
    let disX = Number(this.element.dataset.x);
    let disY = Number(this.element.dataset.y);

    return [ 
      x / scale - offX - offStatX - disX,
      y / scale - offY - offStatY - disY,
    ]
  }
  // All the other methods are needed to interact with the elements 
  // The methods are needed here since this object has all the knowledge
  // of positioning, scale and stuff like that.
  setContainerPositionDelta(container, dx, dy){
    let [x, y] = container.getPosition();
    let scale = this.getScale();
    container.setPosition(x+dx/scale, y+dy/scale);
  }
  setContainerSizeInteract(container, rect, deltaRect){
    let scale = this.getScale();
    console.log(rect);
    container.setSize(rect.width/scale, rect.height/scale);
    let [x,y] = container.getPosition();
    console.log(deltaRect.top);
    container.setPosition(x + deltaRect.left/scale, y + deltaRect.top / scale);
  }
  setSmoothTransition(smooth){
    if(smooth){
      this.element.style.transition = "all 0.3s linear";
    }else{
      this.element.style.transition = "";
    }
  }
}

