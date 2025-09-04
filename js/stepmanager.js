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

    step.classList.add("step");

    step.dataset.x = currentPos[0];
    step.dataset.y = currentPos[1];
    step.dataset.scale = currentScale;

    let goto = this.gotoFactory(this.stepCount)
    step.addEventListener(
      "click",
      goto
    );
    this.gotos.push(goto);

    this.last.insertAdjacentElement("beforebegin", step);
    this.stepCount++;
  }
  deleteStep(stepElement){
    console.log(stepElement);

    let steps = document.querySelectorAll(".step");
    let index = 0;
    let found = false;
    for(let i = 0; i<steps.length; i++){
      if(found){
        // TODO: This workaround doesn't work.
        // We might need to 
        let oldListener = this.gotoFactory(i);
        steps[i].removeEventListener(
          "click", this.gotos[i]
        );
        this.gotos.splice(i, 1);
        steps[i].addEventListener(
          "click", this.gotoFactory(i-1)
        );
      }
      if(steps[i] === stepElement) found = true;
    }

    stepElement.remove();
    this.stepCount--;
  }
}
