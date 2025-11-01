export class Settings{
  constructor(){
    let eventHub = window.layout.eventHub;

    eventHub.on("settingChanged", this.settingChanged.bind(this));

    this.canvas = window.impressiveCanvas;
    window.impressiveSettings = this;

    if(window.impressive.settings == undefined)
      window.impressive.settings = {};
  }
  availableSettings(){
    let [w, h] = this.getDocumentSize();
    return [
      ["showCenterGrid",    "bool",    this.getCenterGrid()],
      ["showRealSize",      "bool",    this.getShowRealSize()],
      ["showScreenBorders", "bool",    this.getShowScreenBorders()],
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
	this.setShowRealSize(value);
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
  getShowRealSize(){
    return this.canvas.getVisualScale() != 1;
  }
  setShowRealSize(value){
    let scale;

    if(value){
      updateRealSize();
      let resizeObserver = window.impressive.settings.updateScaleOnResize;
      if (resizeObserver == undefined){
	resizeObserver = new ResizeObserver(
	    updateRealSize
	);
	window.impressive.settings.updateScaleOnResize = resizeObserver;
      }
      resizeObserver.observe(
	window.impressiveCanvas.containerElement
      );
    }
    else{
      scale = 1;
      window.impressive.settings.updateScaleOnResize.unobserve(
	window.impressiveCanvas.containerElement
      );
    }
    this.canvas.setRealScale(scale);
  }
  getShowScreenBorders(){
    return document.querySelectorAll(".screenBorders").length != 0;
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

      updateScreenBorders();
      let resizeObserver = window.impressive.settings.updateBandsOnResize;
      if(resizeObserver == undefined){
	resizeObserver = new ResizeObserver(
	    updateScreenBorders
	);
	window.impressive.settings.updateBandsOnResize = resizeObserver;
      }
      resizeObserver.observe(
	window.impressiveCanvas.containerElement
      );
    } else {

      let bands = document.querySelectorAll(".screenBorders");
      for(let el of bands){
	el.remove();
      }
      window.impressive.settings.updateBandsOnResize.unobserve(
	window.impressiveCanvas.containerElement
      );
    }
  }
  getCenterGrid(){
      return !document.querySelector(".impressiveCenterGrid").classList.contains("hidden");
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

function updateRealSize(){
    // viewport dimensions 
    let viewport = window.impressiveCanvas.containerElement;
    let ww = viewport.offsetWidth;
    let wh = viewport.offsetHeight;
    // document size
    let [width, height] = new Settings().getDocumentSize();

    let hScale = wh / height,
      wScale = ww / width;

    let scale = hScale > wScale ? wScale : hScale;
    window.impressiveCanvas.setRealScale(scale);
  }
function updateScreenBorders(){
    let viewport = window.impressiveCanvas.containerElement;
    let ww = viewport.offsetWidth;
    let wh = viewport.offsetHeight;
    // document size
    let [width, height] = new Settings().getDocumentSize();

    let hScale = wh / height,
      wScale = ww / width;

    let bands = document.querySelectorAll(".screenBorders");

    if (hScale > wScale){
      bands[0].style.width = "100%"; 
      bands[1].style.width = "100%"; 

      let mappedHeight = height * wScale;
      let rest = (wh - mappedHeight)/2;
      bands[0].style.height = `${rest}px`;
      bands[1].style.height = `${rest}px`; 

      bands[0].style.top = "0"; 
      bands[1].style.bottom = "0"; 

      // horizontal
      return ["hor", rest];
    }else{
      bands[0].style.height = "100%"; 
      bands[1].style.height = "100%"; 

      let mappedWidht = width * hScale;
      let rest = ww - mappedWidht;
      bands[0].style.width = `${rest/2}px`;
      bands[1].style.width = `${rest/2}px`; 

      bands[0].style.left = "0"; 
      bands[1].style.right = "0"; 

      // vertical 
      return ["ver", rest];
    }
  }

