// StepManager is responsible to:
// - creating new steps 
// - deleting steps
// - reordering steps 
// - moving among the steps 
export class StepManager {
  // This object manages the steps of our presentation 
  constructor(){
    // logic handling 
    this.currentStep = null;
    this.stepCount = 0;
    // UI updates
    this.root = document.querySelector("#stepList");
    this.last = document.querySelector("#addStep");
    let addButton = document.querySelector("#addStep");
    addButton.addEventListener(
      "click", (event ) => {
        console.log(this);
        let scene = new Canvas();
        let x = Number(scene.dataset.x);
        let y = Number(scene.dataset.y);
        let scale = 1;
        this.createStep(Array(x,y,scale));
        console.log("New step!");
      }
    )
  }
  createStep(pos){
    let step = document.createElement("div");

    step.innerHTML = String(this.stepCount);
    this.stepCount++;

    step.classList.add("step");
    step.dataset.x = pos[0];
    step.dataset.y = pos[1];
    step.dataset.scale = pos[2];
    step.addEventListener(
      "click", 
      (e) => {
        let el = e.target;
        let scene = new Canvas();

        let x = el.dataset.x;
        let y = el.dataset.y;
        let scale = el.dataset.scale;

        scene.transition(true);
        scene.move(x, y, scale);
        setTimeout(() => {
          let scene = new Canvas();
          scene.transition(false)
        }, 300);
      }
    )
    this.last.insertAdjacentElement("beforebegin", step);
    console.log(pos);
  }
  goto(step){
    // step is the index of the step we need 
    steps = document.querySelectorAll(".step");
    if( step >= steps.length ){
      alert("This step does not exsits.")
      return
    }
    wanted = steps[step];
    this.transition(wanted.dataset.x, wanted.dataset.y, wanted.dataset.scale);
  }
  transition(x, y, scale){
    scene.transition(true);
    scene.move(x, y, scale);
    setTimeout(() => {
      let scene = new Canvas();
      scene.transition(false);
    }, 300);
  }
}
