export class Canvas{
  constructor(container, componentState){
    container.getElement().html("<div id='impressiveCanvas' ></div>");
    this.element = $("#impressiveCanvas");
    this.dataset = this.element.dataset;
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
