"use strict";

// DOM Management 
(function(document, window){ 
  "use strict";
  console.log("Started");

  var impressive = window.impressive = function(rootId){

    var init = function(){
      let ct = containerTool("scene");
    }

    var addElement = function(){
      console.log("Well, that's a new element now");
    }

    return ({
      init: init,
      addElement: addElement
    });
  }


})(document, window);

class Mouse{
  constructor(){
    this.clicking = false;
    this.clickStarted = [0, 0];
    this.currentCoord = [0, 0];
    this.clickFinished = [0, 0];
  }
  mouseDown(e){
    this.clicking = true;
    let x = e.pageX;
    let y = e.pageY;
    this.clickStarted = [x, y];
    console.log(e.target)
  }
  mouseMove(e){
    let x = e.pageX;
    let y = e.pageY;
    this.currentCoord = [x, y];
  }
  mouseUp(e){
    let x = e.pageX;
    let y = e.pageY;
    this.clickFinished = [x, y];
    this.clicking = false;
  }
}

// Tools 
(function(document, window){
  "use strict";

  var containerTool = function(rootId){

    class Container{
      constructor(x, y){
        let container = document.createElement("div");
        container.classList.add("container");
        container.style.position = "absolute"; // prevents overlapping
        document.querySelector(`#${rootId}`).appendChild(container);
        this.container = container;
        this.x = x;
        this.y = y;
        container.style.transform = `translate(${x}px, ${y}px)`;
        console.log(`creating container at pos ${x} - ${y}`);
      }
      setSize(w, h){
        this.container.style.height = `${h}px`;
        this.container.style.width = `${w}px`;
      }
      setSizeFromPos(px, py){
        let w = px - this.x;
        let h = py - this.y;
        this.setSize(w,h);
      }
    }

    var active = null;
    var mouse = new Mouse();
    document.addEventListener("mousedown", (e) => {
      mouse.mouseDown(e);
      create(mouse.clickStarted[0], mouse.clickStarted[1]);
    });
    document.addEventListener("mousemove", (e) => {
      mouse.mouseMove(e);
      if(mouse.clicking) setSize(mouse.currentCoord[0], mouse.currentCoord[1]);
    });
    document.addEventListener("mouseup", (e) => {
      mouse.mouseUp(e);
      finalize();
    });



    var create = function(x,y){
      active = new Container(x, y);
    }

    var setSize = function(x, y){
      active.setSizeFromPos(x, y);
    }

    var finalize = function(){
      active = null;
    }

    return {
      create: create,
      setSize: setSize
    }
  }

  window.containerTool = containerTool;

})(document, window);

