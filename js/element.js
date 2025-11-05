import {pfx} from "./utils.js";

//
// The class element fives an api to put elements on the canvas.
// It takes care of constructing elements and adding them to the DOM.
// On top of that, it gives access to the basic properties of every element
// of which we compose our presentation
export class Element{
  constructor(element){
    //if(element.constructor == Element){
    //  throw new Error("Abstract class cannot be instantiated!");
    //}
    this.element = element;
    this.x = Number(element.dataset.x);
    this.y = Number(element.dataset.y);
    this.tooSmall = false; // Does this stay ?
  }
  destroy(){
    this.element.remove();
  }
  appendChild(element){
    this.element.appendChild(element);
  }
  css( prop, value ) {
    // TODO: implement this function properly using pfx
    // from impress.js (now it's defined in utils.js)
    this.element.cssText += `${prop}: ${value}`;
  }
  setPosition(x, y, sticky = false){
    if(sticky) {
      x = round(x, M); // Compute position 
      y = round(y, M);
    }
    this._setPosition(x, y);
  }
  getPropertiesList(){
    return {
      animationClass: "string",
      x: "number",
      y: "number",
    }
  }
  setProperty(prop, value){
    switch(prop){
      case "animationClass":
	this.setAnimationClass(value);
	break;
      case "x":
	let y = this.getPosition()[1];
	this.setPosition(value, y);
	break;
      case "y":
	let x = this.getPosition()[0];
	this.setPosition(x, value);
	break;
      default:
	console.log("Property "+ prop + " is not part of " + this);
	break;
    }
  }
  setAnimationClass(value){
    this.element.classList.add(value);
    this.element.dataset.animationClass = value;
  }
  getProperties(){
    return {
      animationClass: this.getAnimationClass(),
      x: this.getX(),
      y: this.getY(),
    }
  }
  getAnimationClass(){
    return this.element.dataset.animationClass;
  }
  getX(){
    return Number(this.element.dataset.x);
  }
  getY(){
    return Number(this.element.dataset.y);
  }
  getPosition(){
    return [this.x, this.y]
  }
  destroy(){
    this.element.remove();
    delete this.element;
  }
  id(str){
    if(str == null){
      // return the id 
      return this.element.getAttribute("id");
    }

    this.element.setAttribute("id", str);
  }
  _setPosition(x, y){
    this.element.style.transform = `translate(${x}px, ${y}px)`;
    this.element.dataset.x = x;
    this.element.dataset.y = y;
    this.x = x;
    this.y = y;
  }
}

// The class container is similar to inkscape Rectangles. 
// In short, it makes an element which works as a container, 
// providing an api to modify its appearance
export class Container extends Element{
  constructor(element){
    super(element);
  }
  static tranfromWrtRoot(x, y){
    let dataset = document.querySelector(`#${this.rootId}`).dataset;
    let scale = window.impressiveCanvas.getScale();
    x = x - Number( dataset.x );
    y = y - Number( dataset.y );
    return [x, y];
  }
  static create(x, y, rootId, father){
    if(rootId == null)
      rootId = this.rootId = "impressiveCanvas";
    if(father == null)
      father = new Element(document.querySelector(`#${rootId}`));

    this.rootId = rootId;
    let element = document.createElement("div"); // creating container
    element.classList.add("impressiveContainer"); // appropriate style
    element.style.position = "absolute"; // prevents overlapping
    // [x, y] = Container.tranfromWrtRoot(x, y);
    element.dataset.x = x; // position is redundant, for easy retrival
    element.dataset.y = y;
    element.style.transform = `translate(${x}px, ${y}px)`; // position the element on display
    father.appendChild(element); // put it on the display

    this.children = [];

    let res = new Container(element);

    // initial settings 
    res.setFillColor("#000");

    return res;
  }
  static fromElement(element){
    let x = Number(element.dataset.x);
    let y = Number(element.dataset.y);
    return new Container(x, y, element);
  }
  getPropertiesList(){
    let parentList = super.getPropertiesList();
    let list = {
      zindex: "numberD1",
      width: "pnumber",
      height: "pnumber",
      fillColor: "color",
      borderColor: "color",
      borderThickness: "pnumberD1",
      borderRadius: "pnumberD1",
    };
    return Object.assign({}, parentList, list);
  }
  setProperty(prop, value){
    switch(prop){
      case "zindex":
        this.setZIndex(value);
        break;
      case "height": 
	let w = this.getWidth();
	this.setSize(w, value);
	break;
      case "width": 
	let h = this.getHeight();
	this.setSize(value, h);
	break;
      case "fillColor":
	this.setFillColor(value);
	break;
      case "borderColor":
	this.setBorderColor(value);
	break;
      case "borderThickness":
	this.setBorderThickness(value);
	break;
      case "borderRadius":
	this.setBorderRadius(value);
	break;
      default:
	super.setProperty(prop, value);
	break;
    }
  }
  setZIndex(value){
    this.element.style.zIndex = String(value);
  }
  getZIndex(){
   return Number(this.element.style.zIndex);
  }
  getSize(){
    let w = this.getWidth();
    let h = this.getHeight();
    return [w, h];
  }
  setSize(w, h){
    this.element.style.height = `${h}px`;
    this.element.style.width = `${w}px`;
  }
  setSizeFromPos(px, py){
    // [px, py] = Container.tranfromWrtRoot(px, py);
    let w = px - this.x;
    let h = py - this.y;
    this.tooSmall = h < 0 || w < 0;
    this.setSize(w,h);
  }
  setFillColor(color){
    this.element.style.backgroundColor = color;
  }
  setBorderColor(color){
    this.element.style.borderColor = color;
  }
  setBorderThickness(t){
    let old = Number( this.element.style.borderWidth.replace("px", "") )
    let displacement = t - old;
    console.log(displacement);
    // this._setPosition( this.x - displacement, this.y - displacement);
    this.element.style.borderWidth = `${t}px`;
    this.element.style.borderStyle = "solid";
  }
  setBorderRadius(r){
    let str = `${r}px`;
    this.setBorderRadiusStr(str);
  }
  setBorderRadiusStr(str){
    this.element.style.borderRadius = str;
  }
  getProperties(){
    let element = this.element;
    return Object.assign(
      {},
      super.getProperties(), 
      {
        zindex: this.getZIndex(),
	width: Number( element.style.width.replace("px", "") ),
	height: Number( element.style.height.replace("px", "") ),
	fillColor: element.style.backgroundColor,
	borderColor: element.style.borderColor,
	borderThickness: this.getBorderThickness(),
	borderRadius: Number( element.style.borderRadius.replace("px", "") ),
      }
    )
  }
  getBorderThickness(){
    let res = this.element.style.borderThickness;
    return res == undefined ? 0 : Number( res.replace("px", "") );
  }
  getHeight(){
    return Number( this.element.style.height.replace("px", "") );
  }
  getWidth(){
    return Number( this.element.style.width.replace("px", "") );
  }
  finish(){
    if( this.tooSmall )
      this.destroy()
  }
  createHandles(){
    let [x, y] = this.getPosition();    
    let [w, h] = this.getSize();
    let M = (h+w)/2;
    let wog = 10 / window.impressiveCanvas.getScale() ;
    let hog = 10 / window.impressiveCanvas.getScale() ;

    let W = w + wog;
    let H = h + hog;
    let X = x-wog/2;
    let Y = y-hog/2;

    let handles = Container.create(X, Y, "impressiveCanvas");
    handles.id("impressiveHandles");
    handles.setSize(W, H);
    handles.setFillColor("rgba(0,0,0,0)");
    handles.setBorderColor("#000");
    handles.setBorderThickness(3 / window.impressiveCanvas.getScale() );



    /*
    let ctop = Circle.create(X + W/2, Y    );
    let cbot = Circle.create(X + W/2, Y+H  );
    let crig = Circle.create(X      , Y+H/2);
    let clef = Circle.create(X + W  , Y+H/2);

    let circles = [ctop, cbot, crig, clef];
    for(let c of circles){
      c.setSize(0.03*M, 0.03*M);
      c.setFillColor("#000");

      let [x, y] = c.getPosition();
      let [w, h] = c.getSize();
      c.setPosition(x-w/2, y-h/2);
    }
    */
  }
}

export class Circle extends Container{
  constructor(element){
    super(element)
  } 
  static create(x, y, father){
    let circle = Container.create(x, y, "impressiveCanvas", father);
    circle.setBorderRadiusStr("100%");
    return circle;
  }
}

export class Image extends Container{
  constructor(element){
    super(element);
  }
  static create(x, y, father){
    let rootId = "impressiveCanvas";
    this.rootId = rootId;
    let element = document.createElement("div"); // creating container
    element.classList.add("impressiveImage", "impressiveContainer"); // appropriate style
    element.style.position = "absolute"; // prevents overlapping
    element.dataset.x = x; // position is redundant, for easy retrival
    element.dataset.y = y;
    element.style.transform = `translate(${x}px, ${y}px)`; // position the element on display
    element.style.backgroundSize  = "contain";
    if(father == null){
    father = document.querySelector(`#${rootId}`)
    }
    father.appendChild(element); // put it on the display

    let res = new Image(element);
    res.setFillColor("blue");

    return res;
  }
  getPropertiesList(){
    let parentList = super.getPropertiesList();
    let list = {
      image: "longString",
      repeat: "bool",
      offsetX: "numberD1",
      offsetY: "numberD1",
    }
    return Object.assign({}, parentList, list);
  }
  getProperties(){
    let element = this.element;
    return Object.assign(
      {},
      super.getProperties(), 
      {
	image: this.getImage(),
        repeat: this.getRepeat(),
	offsetX: this.getPositionX(),
	offsetY: this.getPositionY()
      }
    )
  }
  getImage(){
    return this.element.style.backgroundImage;
  }
  getRepeat(){
    return this.element.style.backgroundRepeat == "repeat";
  }
  getPositionX(){
    return Number(this.element.style.backgroundPositionX.replace("px", ""));
  }
  getPositionY(){
    return Number(this.element.style.backgroundPositionY.replace("px", ""));
  }
  setImage(str){
    this.element.style.backgroundImage = `url(${str})`;
  }
  setRepeat(value){
    if(value) this.element.style.backgroundRepeat = "repeat";
    else this.element.style.backgroundRepeat = "no-repeat";
  }
  setPositionX(value){
    this.element.style.backgroundPositionX = `${value}px`;
  }
  setPositionY(value){
    this.element.style.backgroundPositionY = `${value}px`;
  }
  setProperty(prop, value){
    switch(prop){
      case "image":
        this.setImage(value);
        break;
      case "repeat":
        this.setRepeat(value);
        break;
      case "offsetX":
        this.setPositionX(value);
        break;
      case "offsetY":
        this.setPositionY(value);
        break;
      default:
        super.setProperty(prop, value);
        break;
    }
  }
}

export class Text extends Container{
  static create(x, y, father){
    let rootId = this.rootId = "impressiveCanvas";
    let element = document.createElement("div"); // creating container
    element.classList.add("impressiveText", "impressiveContainer"); // appropriate style
    element.style.position = "absolute"; // prevents overlapping
    element.dataset.x = x; // position is redundant, for easy retrival
    element.dataset.y = y;
    element.style.transform = `translate(${x}px, ${y}px)`; // position the element on display
    element.style.whiteSpace = "pre-line";
    element.style.fontSize  = "10pt";
    if(father == null){
      father = document.querySelector(`#${rootId}`)
    }
    father.appendChild(element); // put it on the display


    let M = 3 / window.impressiveCanvas.getScale();

    let res = new Text(element);
    res.setFillColor("rgba(0,0,0,0)");
    res.setBorderColor("#000");
    res.setBorderThickness(3 * M);
    res.setBorderStyle("dashed");
    res.setLineHeight( 20 );

    return res;
  }
  getPropertiesList(){
    let parentList = super.getPropertiesList();
    let list = {
      text: "longString",
      color: "color",
      padding: "pnumberD1", 
      textAlign: "string",
      alignContent: "string",
      fontSize: "pnumberD1",
      bold: "bool",
    }
    return Object.assign({}, parentList, list);
  }
  getProperties(){
    let element = this.element;
    return Object.assign(
      {},
      super.getProperties(), 
      {
        text: this.getText(),
        color: this.getColor(),
        padding: this.getPadding(),
        textAlign: this.getTextAlign(),
        alignContent: this.getAlignContent(),
        fontSize: this.getFontSize(),
        bold: this.getBold(),
      }
    )
  }
  setProperty(prop, value){
    switch(prop){
      case "text":
        this.setText(value);
        break;
      case "color":
        this.setColor(value);
        break;
      case "padding":
        this.setPadding(value);
        break;
      case "textAlign":
        this.setTextAlign(value);
        break;
      case "alignContent":
        this.setAlignContent(value);
        break;
      case "fontSize": 
        this.setFontSize(value);
        break;
      case "bold":
        this.setBold(value);
        break;
      default:
        super.setProperty(prop, value);
        break;
    }
  }
  setText(text){
    this.element.innerHTML = text;
  }
  getText(){
    return this.element.innerHTML;
  }
  setColor(col){
    this.element.style.color = col;
  }
  getColor(){
    return this.element.style.color;
  }
  setPadding(padding){
    this.element.style.padding = `${padding}px`;
  }
  getPadding(){
    return Number(this.element.style.padding.replace("px", ""));
  }
  setTextAlign(str){
    this.element.style.textAlign = str;
  }
  getTextAlign(){
    return this.element.style.textAlign;
  }
  getFontSize(){
    return Number(this.element.style.fontSize.replace("px", "").replace("pt", ""));
  }
  setFontSize(value){
    this.setFontSizeStr(`${value}pt`);
    this.setLineHeight(2*value);
  }
  setFontSizeStr(value){
    this.element.style.fontSize = value;
  }
  setBorderStyle(value){
    this.element.style.borderStyle = value;
  }
  getBorderStyle(value){
    return this.element.style.borderStyle;
  }
  getBold(){
    return this.element.style.fontWeight == "bold";
  }
  setBold(value){
    if(value) this.element.style.fontWeight = "bold";
    else this.element.style.fontWeight = "normal";
  }
  getAlignContent(){
    return this.element.style.alignContent;
  }
  setAlignContent(value){
    this.element.style.alignContent = value;
  }
  getLineHeight(){
    return window.getComputedStyle(this.element).lineHeight;
  }
  setLineHeight(value){
    this.element.style.lineHeight = `${value}px`;
  }
}
