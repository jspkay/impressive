"use strict";

import {makeField, makeFieldNumber} from "./bootstrapHelpers.js";

export class PropertiesWindow{
  constructor(container, state){
    console.log(container);
    this.element = container.getElement();
    this.element.classList.add("PropertiesWindow");
    console.log(this.element);
    console.log(state);

  
    this.selected = null;

    // Events 
    container.layoutManager.eventHub.on("selectElement", this.selectElement.bind(this));
    container.layoutManager.eventHub.on("propertyChanged", this.updateSelected.bind(this));
  }
  selectElement(e){
    this.element.innerHTML = ""; // reset the element

    this.selected = e.element;

    let list = e.element.getProperties();
    let types = e.element.getPropertiesList();
    console.log(list);
    for( const [property, value] of Object.entries(list)){
      let element;
      switch(types[property]){
        case "number":
          element = makeFieldNumber(property, value);
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
  updateSelected(e){
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
