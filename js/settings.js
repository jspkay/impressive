export class Settings{
  constructor(){
    let eventHub = window.layout.eventHub;

    eventHub.on("settingChanged", this.settingChanged.bind(this));

    this.canvas = window.impressiveCanvas;
  }
  availableSettings(){
    let [w, h] = this.getDocumentSize();
    return [
      ["showCenterGrid",    "bool",    false],
      ["showRealSize",      "bool",    false],
      ["showScreenBorders", "bool",    false],
      ["documentWidth",     "pnumber", w   ],
      ["documentHeight",    "pnumber", h   ],
    ];
  }
  settingChanged(e){
    let prop = Object.keys( e )[0];
    let value = e[prop];
    switch(prop){
      case "showCenterGrid":
	this.setCenterGrid(value);
	break;
      case "showRealSize":
	this.setRealSize(value);
	break;
      case "showScreenBorders":
	this.setScreenBorders(value);
	break;
      case "documentHeight":
	this.setDocumentSize(this.getDocumentSize()[0], value); 
	break;
      case "documentWidth":
	this.setDocumentSize(value, this.getDocumentSize()[1]); 
	break;
      default:
	alert(`Setting ${e} not implemented.`);
    }
  }
  getDocumentSize(){
    let canvas = window.impressiveCanvas.element;
    let w = Number(canvas.dataset.width);
    let h = Number(canvas.dataset.height);
    return [w, h];
  }
  setDocumentSize(w, h){
    let canvas = window.impressiveCanvas.element;
    canvas.dataset.width = w;
    canvas.dataset.height = h;
  }
  updateRealSize(){
    // viewport dimensions 
    let viewport = window.impressiveCanvas.containerElement;
    let ww = viewport.offsetWidth;
    let wh = viewport.offsetHeight;
    // document size
    let [width, height] = this.getDocumentSize();

    let hScale = wh / height,
      wScale = ww / width;

    let scale = hScale > wScale ? wScale : hScale;
    this.canvas.setRealScale(scale);
  }
  setRealSize(value){
    let scale;

    if(value){
      this.updateRealSize();
      this.updateScaleOnResize = new ResizeObserver(
	  this.updateRealSize.bind(this)
      ).observe(
	window.impressiveCanvas.containerElement
      );
    }
    else{
      scale = 1;
      delete this.updateScaleOnResize
    }
    this.canvas.setRealScale(scale);
  }
  updateScreenBorders(){
    let viewport = window.impressiveCanvas.containerElement;
    let ww = viewport.offsetWidth;
    let wh = viewport.offsetHeight;
    // document size
    let [width, height] = this.getDocumentSize();

    let hScale = wh / height,
      wScale = ww / width;

    let bands = document.querySelectorAll(".screenBorders");

    if (hScale > wScale){
      bands[0].style.width = "100%"; 
      bands[1].style.width = "100%"; 

      let mappedHeight = height * wScale;
      let rest = wh - mappedHeight;
      bands[0].style.height = `${rest/2}px`;
      bands[1].style.height = `${rest/2}px`; 

      bands[0].style.top = "0"; 
      bands[1].style.bottom = "0"; 
    }else{
      bands[0].style.height = "100%"; 
      bands[1].style.height = "100%"; 

      let mappedWidht = width * hScale;
      let rest = ww - mappedWidht;
      bands[0].style.width = `${rest/2}px`;
      bands[1].style.width = `${rest/2}px`; 

      bands[0].style.left = "0"; 
      bands[1].style.right = "0"; 

    }

  }
  setScreenBorders(value){
    if(value) {
      let screen = window.impressiveCanvas.containerElement;

      let b1 = document.createElement("div");
      let b2 = document.createElement("div");

      b1.classList.add("screenBorders");
      b2.classList.add("screenBorders");

      screen.appendChild(b1);
      screen.appendChild(b2);

      this.updateScreenBorders();
      this.updateBandsOnResize = new ResizeObserver(
	  this.updateScreenBorders.bind(this)
      ).observe(
	window.impressiveCanvas.containerElement
      );
    } else {

      let bands = document.querySelectorAll(".screenBorders");
      for(let el of bands){
	el.remove();
      }
      delete this.updateBandsOnResize;
    }
  }
  setCenterGrid(value){
    if(value){
      for(let el of document.querySelectorAll(".impressiveCenterGrid"))
	el.classList.remove("hidden");
    }
    else{
      for(let el of document.querySelectorAll(".impressiveCenterGrid"))
	el.classList.add("hidden");
    }
  }
}
