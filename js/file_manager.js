import {Window} from "./elements.js"

// The component FileManager has two main scopes:
// - create a json file with the information of the current presentation, 
// - load a json file and reconstruct the presentation as described.
export class FileManager{
  constructor(){}
  static getChildren(element){
    if( element.children.lenght == 0 ){
      return [];
    }

    let res = [];
    for(let child of element.children){
      res.push({
        type: child.tagName, 
        x: child.dataset.x, 
        y: child.dataset.y,
        children: this.getChildren(child),
      })
    }

    return res;
  }
  static exportFile(){
    // This function makes a json of the whole presentation. 
    // It contains a list of steps which relate the space 
    // movement in time. On top of this, the animations are 
    // encoded with each step.
    // Finally, the elements of the canvas are all laid out together
    // to make a canvas which exists outside of the steps.

    let exported = {
      version: "alpha",
      stepList: null,
      elementList: null,
      stepsHtml: null, 
      canvasHtml: null,
    }

    // gather all the steps 
    let stepList = new Array();
    for(let step of document.querySelectorAll("#step")){
      let x = step.dataset.x;
      let y = step.dataset.y;
      let scale = step.dataset.scale;
      stepList.push({
        x: x, y: y, scale: scale,
      });
    }
    exported.stepList = stepList;

    // gather all the elements on the canvas 
    let elementList = this.getChildren( document.querySelector("#scene") );
    exported.elementList = elementList;

    // have simple HTML easy to import
    exported.canvasHtml = document.querySelector("#scene").innerHTML;
    exported.stepsHtml = document.querySelector("#stepList").innerHTML;
    
    console.log(exported);
    let jsonString = JSON.stringify(exported);
    console.log(jsonString);
    let blob = new Blob(
      [ jsonString ],
      {type: "application/json"}
    );
    let url = URL.createObjectURL(
      blob
    );

    // return;
    let link = document.createElement("a");
    link.href = url;
    link.download = "document.json";
    link.click();

    console.log(blob);
    console.log(url);
  } 
  static importFile(){
    // TODO: Implement the import file shit
    let importElement = document.createElement("input");

    let win = new jBox('Modal', {
      width: 100,
      heigth: 100, 
      title: 'Upload here!',
      content: 'Hi all',
      draggable: true,
      overlay: false,
    });
    win.open();

  }
}

