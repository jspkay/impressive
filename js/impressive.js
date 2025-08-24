"use strict";

import * as logging from "./logging.js"
console.log(logging)
logging.setLevel( logging.levels.DEBUG )

logging.debug("Starting stuff...")

import {Canvas} from "./impressiveCanvas.js"

const Modes = {
  EDITOR: 0,
  PRESENTATION: 1,
};

import {init as menuInit} from "./filemenu.js";

// Main setup
logging.debug("Setting up impressive...");

function init() {
  console.log("Hi everybody!!!"); 

  menuInit();

  var config = {
    dimensions: {
    },
    content: [{
      type: 'row',
      content:[{
        type: 'component',
        componentName: 'testComponent',
        componentState: { label: 'B' }
      },{
        type: 'component',
        componentName: 'Canvas',
        width: 60,
        isClosable: false,
      },{
        type: 'component',
        componentName: 'testComponent',
        componentState: { label: 'C' }
      }]
    }]
  };
  $("body").css("height", (window.innerHeight-$("#menubar").height())+"px");

  var myLayout = new GoldenLayout( config, $("#mainArea") );

  myLayout.registerComponent(
    'testComponent', function (container, componentState) {
      container.getElement().html("<h2>" + componentState.label + "</h2>" )
    }
  );
  myLayout.registerComponent("Canvas", Canvas);

  myLayout.init();
  window.layout = myLayout;

  window.addEventListener("resize", (e)=>{
    myLayout.updateSize(window.innerWidth, window.innerHeight-$("#menubar").height());
  })
}

window.impressive = {
  init: init,
}

impressive.init();
