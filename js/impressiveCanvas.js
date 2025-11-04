import {PanAndZoomTool, ContainerTool, SelectTool, ImageTool, TextTool} from "./tools.js";
import {KeyboardManager} from "./keyboard.js";
import {Container} from "./element.js";

export class ImpressiveCanvas{
  constructor(container, componentState){
    // take the root 
    window.impressive.canvas = this;
    this.containerElement = container.getElement();
    this.containerElement.style.overflow = "hidden";
    this.containerElement.addEventListener("mouseenter", (e) => {impressive.focus = "ImpressiveCanvas"});

    // this element is created for setting up the scale properly when the canvas
    // window is not big enough. It ensure that all the elements ar properly
    // visible always
    this.scaleElement = document.createElement("div");
    this.scaleElement.setAttribute("id", "impressiveCanvasRealSize");
    this.scaleElement.style.width = "100%";
    this.scaleElement.style.height = "100%";
    this.scaleElement.style.scale = "1";
    this.scaleElement.style.transition = "1s scale ease-in-out";
    this.containerElement.appendChild(this.scaleElement);

      // create the canvas
    this.element = document.createElement("div");
    this.element.setAttribute("id", "impressiveCanvas");
    this.element.dataset.width = 1920;
    this.element.dataset.height = 1080;
    this.scaleElement.append(this.element);
    
    // create an origin for reference
    this.origin = document.createElement("div");
    this.origin.setAttribute("id", "origin");
    this.element.append(this.origin);
    let centerGrid = document.createElement("div");
    centerGrid.innerHTML = `
<div class="impressiveCenterGrid hidden" style="width: 0.3em; position: absolute; height: 100%; background:rgba(0, 0, 0, 0.5); left:50%; top:0; translate: -50%" ></div>
<div class="impressiveCenterGrid hidden" style="height: 0.3em; position: absolute; width: 100%; background:rgba(0, 0, 0, 0.5); left:0; top:50%; translate: 0 -50%"></div>`;
    this.containerElement.appendChild(centerGrid);

    // visual effects
    this.containerElement.style.backgroundPositionX = "0px";

    // prepare the initial position 
    this.dataset = this.element.dataset;
    this.dataset.x = 0;
    this.dataset.y = 0;
    this.element.style.scale = 1;
    this.selectedElement = null;

    // initialize the active tool
    this.mouseHandling = new ContainerTool(this, container.getElement(), this.element);
    this.keyboardHandling = new KeyboardManager(document);

    // keyboard shortcut 
    let destroyElement = function(){
      let del = confirm("Delete selected element?");
      if(del){
        window.impressiveCanvas.selectedElement.destroy();
        window.layout.eventHub.emit("selectElement", {element: []});
      }
    }
    this.keyboardHandling.addAction("Delete", destroyElement, "ImpressiveCanvas")
    this.keyboardHandling.addAction("Backspace", destroyElement, "ImpressiveCanvas")
    let duplicateElement = function(){
      let sel = window.impressiveCanvas.selectedElement;
      if(sel.constructor == Array) sel = sel[0];
      let props = sel.getProperties();
      let type = sel.constructor;
      let x = props["x"];
      let y = props["y"];
      let newE = type.create(x+50, y+50);
      for( const [p, value] of Object.entries(props) ){
        newE.setProperty(p, value);
      }
      newE.setPosition(x+50, y+50);
      window.layout.eventHub.emit(
        "selectElement",
        {element: [newE]}
      );
    }
    this.keyboardHandling.addAction("d", duplicateElement, "ImpressiveCanvas")

    window.impressiveCanvas = this;

    // Events management
    let eventHub = container.layoutManager.eventHub;
    eventHub.on("toolChanged", this.changeTool.bind(this));
    eventHub.on("selectElement", function (e){
      this.selectedElement = e.element;
    }.bind(this));
    eventHub.on("moveCanvas", this.moveCanvas.bind(this));
  }
  replaceContents(content){
    this.element.innerHTML = content;
  }
  moveCanvas(e){
    for( let movement in e ){
      let value = e[movement];
      let [x, y] = this.getPosition();
      switch( movement ){
	case "x":
	  this.setPosition(value, y);
	  break;
	case "y":
	  this.setPosition(x, value);
	  break;
	case "scale":
	  this.setScale(value);
	  break;
      }
    }

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
  setRealScale(s){
    this.scaleElement.style.scale = String(s);
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
  getVisualScale(){
    return Number(this.scaleElement.style.scale);
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
  getTriggerSize(){
    let w, h;
    w = this.containerElement.offsetWidth;
    h = this.containerElement.offsetHeight;
    return [w, h];
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
    let scale = this.getScale() * this.getVisualScale();
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
  canvasCoordinateToFather(x, y, father){
    let el = new Container(father.element);
    let [fx, fy] = father.getPosition();
    return [x-fx, y-fy];
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
    let scale = this.getScale() * this.getVisualScale();
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

