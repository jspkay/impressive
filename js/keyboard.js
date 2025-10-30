export class KeyboardManager{
  constructor(){
    this.actions = {}
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));
    this.ctrl = false;
    this.alt = false;
    this.pressed = [];
  }
  keyDown(e){
    e.preventDefault();
    
    if(e.key == "Control") this.ctrl = true;
    else if(e.key == "Alt") this.alt = true;
    else this.pressed.push( e.key );

    this.processCombination();
  }
  keyUp(e){
    e.preventDefault();
    
    if(e.key == "Control") this.ctrl = false;
    else if(e.key == "Alt") this.alt = false;
    else {
      let idx = this.pressed.indexOf( e.key );
      this.pressed.slice(idx, 1);
    }

    this.processCombination();
  }
  processCombination(){

    if(this.ctrl && this.pressed.indexOf("r") != -1){
      window.location.reload();
    }
    
    for(let key in this.actions ){
      if( this.pressed.indexOf(key) != -1 )
	this.actions[key]();
    }
  }
  addAction(combination, fn){
    this.actions[combination] = fn; 
  }

}
