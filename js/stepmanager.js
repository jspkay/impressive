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
  createStep(){
    let currentPos = this.canvas.getPosition();
    let currentScale = this.canvas.getScale();

    let step = document.createElement("div");

    step.innerHTML = String(this.stepCount);
    // window.html2canvas(this.canvas.containerElement).then((canvas) => {
    // canvas.style.width = `${step.offsetWidth}px`;
    // canvas.style.height = `${step.offsetHeight}px`;
    // step.appendChild(canvas); 
    // });

    step.classList.add("step");
    let id = Math.floor( Math.random() * 1e5 );
    step.setAttribute("id", `impDef${id}`)

    step.dataset.x = currentPos[0];
    step.dataset.y = currentPos[1];
    step.dataset.scale = currentScale;


    this.last.insertAdjacentElement("beforebegin", step);
    this.stepCount++;

    window.layout.eventHub.emit("stepCreated",{});
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
    if( !value.cancelled)
      stepElement.innerHTML = value.value;
    modal.dispose();
  }
  deleteStep(stepElement){
    console.log(stepElement);
    let index = this.findStepIndex(stepElement);
    let steps = document.querySelectorAll(".step");

    stepElement.remove();
    this.stepCount--;
  }
}
