"use strict";

import * as logging from "./logging.js"
console.log(logging)
logging.setLevel( logging.levels.DEBUG )

logging.debug("Starting stuff...")

import {ImpressiveCanvas} from "./impressiveCanvas.js";
import {
  PropertiesWindow,
  StepListWindow,
  ElementAnimationWindow,
  TransitionManagerWindow,
  AlignmentWindow,
  SettingsWindow,
} from "./windows.js";
import {Settings} from "./settings.js";

const Modes = {
  EDITOR: 0,
  PRESENTATION: 1,
};

import {init as menuInit} from "./filemenu.js";
import {init as toolbarInit} from "./toolbar.js";

// Main setup
logging.debug("Setting up impressive...");

// prompt the user before losing changes
window.onbeforeunload = (e)=>{
  return true;
};


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
    content: [
      {
	type: "column",
	content: [
	  {
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
	      type: "stack",
	      content: [
		{
		  type: 'component',
		  componentName: 'PropertiesWindow',
		  componentState: { label: 'Properties' },
		  title: "Properties",
		},
		{
		  type: 'component',
		  componentName: 'AlignmentWindow',
		  title: "Alignment",
		},{
		  type: 'component',
		  componentName: 'ElementAnimationWindow',
		  title: "Element Animation",
		}
	      ], // lateral stack
	    }
	    ] // main row
	  },{
	    type: 'component',
	    componentName: 'TransitionManagerWindow',
	    title: "Transition Manager",
	    size: "20%",
	  }
	], // main area and animation window
      }
    ]
      };
  document.querySelector("body").style.height = (window.innerHeight - document.querySelector("#menubar").offsetHeight)+"px";

  var myLayout = new GoldenLayout( config, document.querySelector("#mainArea") );
  window.layout = myLayout;

  myLayout.registerComponent(
    'testComponent', function (container, componentState) {
      container.innerHTML = "<h2>" + componentState.label + "</h2>";
    }
  );
  myLayout.registerComponentConstructor("ImpressiveCanvas", ImpressiveCanvas);
  myLayout.registerComponentConstructor("PropertiesWindow", PropertiesWindow);
  myLayout.registerComponentConstructor("StepListWindow", StepListWindow);
  myLayout.registerComponentConstructor("ElementAnimationWindow", ElementAnimationWindow);
  myLayout.registerComponentConstructor("TransitionManagerWindow", TransitionManagerWindow);
  myLayout.registerComponentConstructor("AlignmentWindow", AlignmentWindow);
  myLayout.registerComponentConstructor("SettingsWindow", SettingsWindow);

  myLayout.init();

    // resize the layout when the window changes
  window.addEventListener("resize", (e)=>{
    myLayout.updateSize(window.innerWidth, window.innerHeight-$("#menubar").height());
  })

  // init all the buttons
  menuInit();
  toolbarInit();

  // default settings 
  let set = new Settings();
  set.setShowRealSize(true);
  set.setShowScreenBorders(true);
}

window.impressive = {
  init: init,
  canvas: undefined,
}

impressive.init();
