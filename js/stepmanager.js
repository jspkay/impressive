// const html2canvas = await import(
// '../npm-modules/node_modules/html2canvas/dist/html2canvas.js'
// );

import {Modal, makeForm} from "./bootstrapHelpers.js";

export class StepManager{
  constructor(addStepElement){
    setTimeout(() => {
      this.canvas = window.impressive.canvas;
    }, 300);

    this.stepCount = 0;
    this.last = addStepElement;
    this.gotos = [];
  }
  goto(step){
    console.log(`goto step ${step}`);
    let steps = document.querySelectorAll(".step");
    console.assert(step < steps.length, "The step selected is out of range...");

    let targetStep = steps[step];

    let x = targetStep.dataset.x;
    let y = targetStep.dataset.y;
    let scale = targetStep.dataset.scale;

    this.canvas.setSmoothTransition(true);
    this.canvas.setPosition(x, y);
    this.canvas.setScale(scale);
    setTimeout(() => {
      this.canvas.setSmoothTransition(false);
    }, 300);
  }
  gotoFactory(step){
    return function(e){
      this.goto(step);
    }.bind(this);
  }
  newStep(x, y, scale, name, id){
    let step = document.createElement("div");

    if (name == undefined) name = `step${this.stepCount}`;
    step.innerHTML = String(name);
    // window.html2canvas(this.canvas.containerElement).then((canvas) => {
    // canvas.style.width = `${step.offsetWidth}px`;
    // canvas.style.height = `${step.offsetHeight}px`;
    // step.appendChild(canvas); 
    // });

    step.classList.add("step");
    if (id == undefined) id = name; //`impDef${Math.floor( Math.random() * 1e5 )}`;
    step.setAttribute("id", `${id}`)

    step.dataset.x = x;
    step.dataset.y = y;
    step.dataset.scale = scale;


    this.last.insertAdjacentElement("beforebegin", step);
    this.stepCount++;
  }
  createStep(){
    let currentPos = this.canvas.getPosition();
    let currentScale = this.canvas.getScale();

    this.newStep(currentPos[0], currentPos[1], currentScale);

    window.layout.eventHub.emit("stepCreated",{});
  }
  findStepIndexFromId(id){
    let steps = document.querySelectorAll(".step");
    steps = Array.from(steps);
    let ids = steps.map( (e)=>{return e.getAttribute("id");} );
    return ids.indexOf(id);
  }
  findStepIndex(stepElement){
    let steps = document.querySelectorAll(".step");
    for(let i = 0; i<steps.length; i++)
      if(steps[i] === stepElement) return i;

    throw new Error("Couldn't find step with element", stepElement);
  }
  async renameStep(stepElement){
    let index = this.findStepIndex(stepElement);
    let form = makeForm({
      "New Name:": {type: "text", id:"renewStep"},
    });
    let modal = new Modal("Rename Step", form, "Save");
    modal.show();

    let value = await modal.takeResult( 
      (e) => {
        return form.querySelector("#renewStep").value;
      }
    )
    modal.dispose();

    if(value.cancelled) return;

    let newId = value.value.replaceAll(" ", "_");
    let idx = this.findStepIndexFromId(value.value);
    if ( idx != -1 ){
      alert(`Name is not unique! Found at position ${idx}`);
      return;
    }

    stepElement.innerHTML = value.value;
    stepElement.setAttribute(
      "id", newId
    );
  }
  async changePosition(stepElement, newPos){
    let form = makeForm({
      "New Position:": {type: "text", id:"newPos"},
    });
    let modal = new Modal("New Position", form, "Change");
    modal.show();

    let value = await modal.takeResult( 
      (e) => {
        return form.querySelector("#newPos").value;
      }
    )
    modal.dispose();

    if(value.cancelled) return;

    newPos = Number(value.value);
    if( window.isNaN(newPos) ){
      alert("write an actual number!!!");
      return;
    }

    // we are dealing with humans, so wi start counting from 1.
    // in which case, we need to subtract 1 from the current position, 
    // to convert it into machine-compatible numbers.
    // There is a catch: if we want to move the step later (that is,
    // the currentPos < newPos), we need to take into account that currentPos 
    // is not presently empty! So, in that case, we do not need to decrement
    // newPos, since we will remove the element at currentPos.
    let currentPos = this.findStepIndex(stepElement);
    if(newPos < currentPos)
      newPos--; 


    // duplicate the step
    let steps = document.querySelectorAll(".step");
    let newStep = stepElement.cloneNode();
    newStep.innerHTML = stepElement.innerHTML;

    // insert in the DOM
    if(newPos > steps.length){ 
      alert(`Number not valid! There is only ${steps.length} steps!`);
      return;
    }
    else if(newPos == steps.length){
      // if we want it as the last, we insert it after the last
      steps[newPos-1].insertAdjacentElement("afterend", newStep);
    }
    else{ // otherwise, we insert it before the selected, giving it its position
      steps[newPos].insertAdjacentElement("beforebegin", newStep);
    }

    stepElement.remove();
    }
    deleteStep(stepElement){
      console.log(stepElement);
      let index = this.findStepIndex(stepElement);
    let steps = document.querySelectorAll(".step");

    stepElement.remove();
    this.stepCount--;
  }
  clearAllSteps(){
    let steps = document.querySelectorAll(".step");
    for(let step of steps){
      step.remove();
    }
  }
}
