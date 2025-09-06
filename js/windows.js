"use strict";

import {Mouse} from "./mouse.js";
import {makeField, makeFieldNumber, makeContextMenu} from "./bootstrapHelpers.js";
import {StepManager} from "./stepmanager.js";

export class PropertiesWindow{
  constructor(container, state){
    console.log(container);
    this.element = container.getElement();
    this.element.setAttribute("id", "PropertiesWindow");
    console.log(this.element);
    console.log(state);


    this.selected = null;

    // Events 
    container.layoutManager.eventHub.on("selectElement", this.selectElement.bind(this));
    container.layoutManager.eventHub.on("propertyChanged", this.updateProperty.bind(this));
  }
  selectElement(e){
    this.element.innerHTML = ""; // reset the element

    this.selected = e.element;


    let list = e.element.getProperties();
    let types = e.element.getPropertiesList();
    for( const [property, value] of Object.entries(list)){
      let element;
      switch(types[property]){
        case "number":
          element = makeFieldNumber(property, value, false);
          break;
        case "pnumber":
          element = makeFieldNumber(property, value, true);
          break;
        default:
          element = makeField(property, value);
          break;
      }
      this.element.appendChild(element);
    }


  }
  updateProperty(e){
    let prop = Object.keys( e )[0];
    console.log(this.selected);
    this.selected.setProperty(prop, e[prop]);
  }
  displayProperties(properties){
    for(let key in properties){
      let prop = document.createElement("div");
      let label = document.createElement("label");
      let value = document.createElement("input")
      value.type = "text";

      prop.appendChild(label);
      prop.appendChild(value);

      label.innerText = key;
      value.value = properties[key];
      this.element.appendChild(prop);
    }
  }
}

export class StepListWindow{
  constructor(container, state){
    console.log(container);
    this.element = container.getElement();
    this.element.setAttribute("id", "StepListWindow");
    console.log(this.element);
    console.log(state);

    let plusButton = document.createElement("div");
    plusButton.setAttribute("id", "AddStep");
    plusButton.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    </svg>`
    this.element.appendChild(plusButton);

    this.StepManager = new StepManager(plusButton);
    plusButton.addEventListener(
      "click",
      this.StepManager.createStep.bind(this.StepManager)
    );

    container.layoutManager.eventHub.on(
      "stepCreated", this.stepCreated.bind(this)
    );
    this.element.addEventListener(
      "click", this.handleClick.bind(this)
    )
    this.element.addEventListener(
      "contextmenu", this.contextMenu.bind(this)
    );
  }
  stepCreated(e){
    // NOTE: The documentation says that you can just 
    // reload the sortable, but apparently it doesn't work.
    // So, the ugly hack is to destroy it and make it again.
    // sortable("#StepListWindow", "destroy");
    sortable(
      "#StepListWindow",
      {
        items: '.step',
        forcePlaceholderSize: true,
        placeholderClass: "sortable-ph",
      }
    );
  }
  handleClick(e){
    if( 
      e.target.classList.contains("step") || 
      e.target.parentElement.classList.contains("step")
    ){
      let element = e.target.classList.contains("step") ? e.target : e.target.parentElement;
        let steps = document.querySelectorAll(".step");
        let n = 0;
        for(n = 0; n<steps.length; n++){
          if( steps[n] === element ) break;
        }
        this.StepManager.goto(n);
    }
  }
  contextMenu(e){
    e.preventDefault();
    if(this.menu != undefined){
      this.menu.remove();
      this.menu = undefined;
    }
    if(e.target.classList.contains("step")){
      this.menu = makeContextMenu({
        Delete: function(event){
          this.StepManager.deleteStep(e.target);
        }.bind(this)
      });
      this.menu.style = `position: fixed; left: ${e.pageX}px; top: ${e.pageY}px`;
      document.body.appendChild(this.menu);
    }
  }
}
