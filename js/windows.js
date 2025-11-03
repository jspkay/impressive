"use strict";

import {Mouse} from "./mouse.js";
import {makeField, makeFieldBool, makeFieldNumber, makeFieldTextArea, makeContextMenu} from "./bootstrapHelpers.js";
import {StepManager} from "./stepmanager.js";
import {Alignment} from "./alignment.js";
import {Settings} from "./settings.js";

export class PropertiesWindow{
  constructor(container, state){
    this.containerElement = container.getElement();
    this.containerElement.addEventListener("mouseenter", (e) => {impressive.focus = "PropertiesWindow"});

    console.log(container);
    this.id = "PropertiesWindow";
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


    if(this.selected != null){
	// document.querySelector("#selectionHandles").remove();
    }
    this.selected = e.element;

    if(e.element.length == 0){
      return;	
    } else {
      console.log("WARNING!!! Multi selection is not implemented yet!!!");
    }

    // this.selected.createHandles();

    if(e.element.constructor == Array){
      e.element = e.element[0];
      this.selected = e.element;
    }

    let list = e.element.getProperties();
    let types = e.element.getPropertiesList();
    for( const [property, value] of Object.entries(list)){
      let element;
      switch(types[property]){
        case "bool":
          element = makeFieldBool(property, value);
          break;
        case "number":
          element = makeFieldNumber(property, value, "propertyChanged", false);
          break;
        case "pnumber":
          element = makeFieldNumber(property, value, "propertyChanged", true);
          break;
        case "numberD1":
          element = makeFieldNumber(property, value, "propertyChanged", false, 1);
          break;
        case "pnumberD1":
          element = makeFieldNumber(property, value, "propertyChanged", true, 1);
	  break;
        case "longString":
          element = makeFieldTextArea(property, value);
          break;
        default:
          element = makeField(property, value, "propertyChanged");
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
    this.containerElement = container.getElement();
    this.containerElement.addEventListener("mouseenter", (e) => {impressive.focus = "StepListWindow"});

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

    this.stepManager = new StepManager(plusButton);
    plusButton.addEventListener(
      "click",
      this.stepManager.createStep.bind(this.stepManager)
    );
    window.impressive.stepManager = this.stepManager;

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
    window.sortable(
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
        this.stepManager.goto(n);
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
          this.stepManager.deleteStep(e.target);
        }.bind(this),
        Rename: function(event){
          this.stepManager.renameStep(e.target);
        }.bind(this),
        "Redefine Position...": function(event){
          alert("not implemented yet");
        },
      });
      this.menu.style = `position: fixed; left: ${e.pageX}px; top: ${e.pageY}px`;
      document.body.appendChild(this.menu);
    }
  }
}

export class ElementAnimationWindow{
    constructor(container, state){

    }
}
export class TransitionManagerWindow{
    constructor(container, state){
    }
}
export class AlignmentWindow{
    constructor(container, state){
	let basicStructure = `
<button id="impressiveAlignLeft" type="button" class="btn btn-primary"> <i class="bi bi-align-start"></i></button>
<button id="impressiveAlignCenter" type="button" class="btn btn-primary"> <i class="bi bi-align-center"></i></button>
<button id="impressiveAlignRight" type="button" class="btn btn-primary"> <i class="bi bi-align-end"></i></button>
<button id="impressiveAlignTop" type="button" class="btn btn-primary"> <i class="bi bi-align-top"></i></button>
<button id="impressiveAlignMiddle" type="button" class="btn btn-primary"> <i class="bi bi-align-middle"></i></button>
<button id="impressiveAlignBottom" type="button" class="btn btn-primary"> <i class="bi bi-align-bottom"></i></button>
	`
	container.getElement().innerHTML = basicStructure;
	this.containerElement = container.getElement();

	this.alignment = new Alignment();

	// Horizontal
	this.containerElement.querySelector("#impressiveAlignLeft").addEventListener(
	    "click",
	    (e) => {
		window.layout.eventHub.emit("alignLeft");
	    }
	);
	this.containerElement.querySelector("#impressiveAlignCenter").addEventListener(
	    "click",
	    (e) => {
		window.layout.eventHub.emit("alignCenter");
	    }
	);
	this.containerElement.querySelector("#impressiveAlignRight").addEventListener(
	    "click",
	    (e) => {
		window.layout.eventHub.emit("alignRight");
	    }
	);



	this.containerElement.querySelector("#impressiveAlignTop").addEventListener(
	    "click",
	    (e) => {
		window.layout.eventHub.emit("alignTop");
	    }
	);
	this.containerElement.querySelector("#impressiveAlignCenter").addEventListener(
	    "click",
	    (e) => {
		window.layout.eventHub.emit("alignCenter");
	    }
	);
	this.containerElement.querySelector("#impressiveAlignMiddle").addEventListener(
	    "click",
	    (e) => {
		window.layout.eventHub.emit("alignMiddle");
	    }
	);
	this.containerElement.querySelector("#impressiveAlignBottom").addEventListener(
	    "click",
	    (e) => {
		window.layout.eventHub.emit("alignBottom");
	    }
	);
    }
}

export class CanvasPositionWindow{
    constructor(container, state){

	let canvas = window.impressiveCanvas;
	let containerElement = container.getElement();
	let [x, y] = canvas.getPosition();
	let props = [
	    ["x", "number", x],
	    ["y", "number", y],
	    ["scale", "numberD001", canvas.getScale()],
	];

      containerElement.innerHTML = `
<button type="button" class="btn btn-primary"> <i class="bi bi-house"></i></button>
      `
      containerElement.querySelector("button").addEventListener(
      "click",
	(e) => {
	  window.layout.eventHub.emit("moveCanvas", {
	    x: 0, y: 0, scale: 1
	  });
	}
      );

	let element;
	for(let [prop, type, value] of props){
	  switch(type){
	    case "number":
	      element = makeFieldNumber(prop, value, "moveCanvas");
	      break;
	    case "numberD001":
	      element = makeFieldNumber(prop, value, "moveCanvas", 0, 0.01);
	      break;
	    default:
	      element = makeField(prop, value, "moveCanvas");
	  }
	  containerElement.appendChild( element );

	}


    }
}

export class SettingsWindow{
    constructor(container, state){

	this.settings = new Settings();

	let element;
	this.containerElement = container.getElement();
	let avail = this.settings.availableSettings();
	for(const [prop, type, value] of avail){
	    switch(type){
		case "bool":
		    element = makeFieldBool(prop, value, "settingChanged");
		    break;
		case "pnumber":
		    element = makeFieldNumber(prop, value, "settingChanged", true);
		    break;
	    }
	    this.containerElement.appendChild( element );
	}
    }
}
