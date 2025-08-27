"use strict";

import * as logging from "./logging.js"
console.log(logging)
logging.setLevel( logging.levels.DEBUG )

logging.debug("Starting stuff...")

import {ImpressiveCanvas} from "./impressiveCanvas.js"
import {PropertiesWindow} from "./windows.js"

const Modes = {
  EDITOR: 0,
  PRESENTATION: 1,
};

import {init as menuInit} from "./filemenu.js";

// Main setup
logging.debug("Setting up impressive...");

function init() {
  console.log("Hi everybody!!!"); 


  var config = {
    dimensions: {
    },
    content: [{
      type: 'row',
      content:[{
        type: 'component',
        componentName: 'testComponent',
        componentState: { label: 'Steps' },
        title: "Step list",
      },{
        type: 'component',
        componentName: 'ImpressiveCanvas',
        componentState: {activeTool: 'PanAndZoom'},
        size: "60%",
        isClosable: false,
      },{
        type: 'component',
        componentName: 'PropertiesWindow',
        componentState: { label: 'Properties' },
        title: "Properties",
      }]
    }]
  };
  document.querySelector("body").style.height = (window.innerHeight - document.querySelector("#menubar").offsetHeight)+"px";

  var myLayout = new GoldenLayout( config, document.querySelector("#mainArea") );

  myLayout.registerComponent(
    'testComponent', function (container, componentState) {
      container.innerHTML = "<h2>" + componentState.label + "</h2>";
    }
  );
  myLayout.registerComponentConstructor("ImpressiveCanvas", ImpressiveCanvas);
  myLayout.registerComponentConstructor("PropertiesWindow", PropertiesWindow);

  myLayout.init();
  window.layout = myLayout;

  window.addEventListener("resize", (e)=>{
    myLayout.updateSize(window.innerWidth, window.innerHeight-$("#menubar").height());
  })

  menuInit();
}

window.impressive = {
  init: init,
}

impressive.init();
