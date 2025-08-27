"use strict";

import {makeValueField} from "./bootstrapHelpers.js";

export class PropertiesWindow{
  constructor(container, state){
    console.log(container);
    this.element = container.getElement();
    this.element.style.background = "blue";
    console.log(this.element);
    console.log(state);

    // Events 
    container.layoutManager.eventHub.on("selectElement", this.selectElement.bind(this));
  }
  selectElement(e){
    let list = e.element.getProperties();
    console.log(list);
    for( const [property, value] of Object.entries(list)){
      let element = makeValueField(property, value);
      this.element.appendChild(element);
    }

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
