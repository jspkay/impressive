// The class element fives an api to put elements on the canvas.
// It takes care of constructing elements and adding them to the DOM.
// On top of that, it gives access to the basic properties of every element
// of which we compose our presentation
class Element{
  constructor(element){
    if(this.constructor == Element){
      throw new Error("Abstract class cannot be instantiated!");
    }
    this.element = element;
    this.x = Number(element.dataset.x);
    this.y = Number(element.dataset.y);
    this.tooSmall = false; // Does this stay ?
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
      x: "number",
      y: "number",
    }
  }
  setProperty(prop, value){
    switch(prop){
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
  getProperties(){
    return {
      x: this.x,
      y: this.y,
    }
  }
  getPosition(){
    return [this.x, this.y]
  }
  destroy(){
    this.element.remove();
    delete this.element;
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
    x = x - Number( dataset.x );
    y = y - Number( dataset.y );
    return [x, y];
  }
  static create(x, y, rootId){
    this.rootId = rootId;
    let element = document.createElement("div"); // creating container
    element.classList.add("impressiveContainer"); // appropriate style
    element.style.position = "absolute"; // prevents overlapping
    [x, y] = Container.tranfromWrtRoot(x, y);
    element.dataset.x = x; // position is redundant, for easy retrival
    element.dataset.y = y;
    element.style.transform = `translate(${x}px, ${y}px)`; // position the element on display
    document.querySelector(`#${rootId}`).appendChild(element); // put it on the display
    return new Container(element);
  }
  static fromElement(element){
    let x = Number(element.dataset.x);
    let y = Number(element.dataset.y);
    return new Container(x, y, element);
  }
  getPropertiesList(){
    let parentList = super.getPropertiesList();
    let list = {
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
      case "height": 
        let w = this.getWidth();
        this.setSize(w, value);
        break;
      case "width": 
        let h = this.getHeight();
        this.setSize(value, h);
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
    [px, py] = Container.tranfromWrtRoot(px, py);
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
    this._setPosition( this.x - displacement, this.y - displacement);
    this.element.style.borderWidth = `${t}px`;
    this.element.style.borderStyle = "solid";
  }
  setBorderRadius(r){
    this.element.style.borderRadius = `${r}px`;
  }
  getProperties(){
    let element = this.element;
    return Object.assign(
      {},
      super.getProperties(), 
      {
        height: Number( element.style.height.replace("px", "") ),
        width: Number( element.style.width.replace("px", "") ),
        fillColor: element.style.backgroundColor,
        borderColor: element.style.borderColor,
        borderThickness: element.style.borderThickness,
        borderRadius: Number( element.style.borderRadius.replace("px", "") ),
      }
    )
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
}

