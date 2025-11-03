export class KeyboardManager{
  constructor(target){
    this.actions = {}
    target.addEventListener("keydown", this.keyDown.bind(this));
    target.addEventListener("keyup", this.keyUp.bind(this));
    this.ctrl = false;
    this.alt = false;
    this.pressed = [];
  }
  keyDown(e){
    if(e.key == "Control") this.ctrl = true;
    else if(e.key == "Alt") this.alt = true;
    else if(e.key == "Shift") this.shift = true;
    else{ 
	if (this.pressed.indexOf(e.key == -1))
	    this.pressed.push( e.key );
    }

    this.processCombination();
  }
  keyUp(e){
    console.log(e.key);
    if(e.key == "Control") this.ctrl = false;
    else if(e.key == "Alt") this.alt = false;
    else if(e.key == "Shift") this.shift = false;
    else {
      this.pressed = this.pressed.filter( i => i != e.key );
    }

    this.processCombination();
  }
  processCombination(){
      console.log(this.pressed);

    if(this.ctrl && this.pressed.indexOf("r") != -1){
      window.location.reload();
    }
    
    for(let key in this.actions ){
      if(
	   this.pressed.indexOf(key) != -1 &&
	  (this.actions[key][1] == "*" || this.actions[key][1] == window.impressive.focus)
      ){
	this.actions[key][0]();
      }
    }
  }
  addAction(combination, fn, focus){
    if(focus == undefined) focus = "*";
    this.actions[combination] = [fn, focus]; 
  }

}
