"use strict";

import * as logging from "./logging.js"
console.log(logging)
logging.setLevel( logging.levels.DEBUG )

logging.debug("Starting stuff...")

import {ImpressiveCanvas} from "./impressiveCanvas.js"
import {PropertiesWindow, StepListWindow} from "./windows.js"

const Modes = {
  EDITOR: 0,
  PRESENTATION: 1,
};

import {init as menuInit} from "./filemenu.js";
import {init as toolbarInit} from "./toolbar.js";

// Main setup
logging.debug("Setting up impressive...");


/* TODO:
 * - impress.js (to allow presentation mode) 
 * - You are missing an "animation" window!!!
 * - Save file (to save it in localstorage)
 * - Download (to export the html and actually download it)
 * - Open (to "upload" a file to visualize it and edit) 
 * - Add a resolution for the presentation ( same as impress.js - check how and why they do it!)
 * - Figure out a way to preview your presentation in the StepListWindow!!! (You need a resolution)
 * - Style 
 * - Webpack
  * */

function init() {
  console.log("Hi everybody!!!"); 


  var config = {
    dimensions: {
    },
    content: [{
      type: 'row',
      content:[{
        type: 'component',
        componentName: 'StepListWindow',
        componentState: { label: 'Steps' },
	size: "10%",
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
  myLayout.registerComponentConstructor("StepListWindow", StepListWindow);

  myLayout.init();
  window.layout = myLayout;

  window.addEventListener("resize", (e)=>{
    myLayout.updateSize(window.innerWidth, window.innerHeight-$("#menubar").height());
  })

  menuInit();
  toolbarInit();
}

window.impressive = {
  init: init,
  canvas: undefined,
}

impressive.init();
