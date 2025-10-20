import {download, upload} from "./filemanager.js";

export function init() {
  let buttons = document.querySelectorAll("button.item");
  for(let bt of buttons){
    let html = bt.innerHTML;
    switch(html){
      case "File":
        initFile(bt);
        break
      case "Tools":
        initTools(bt);
        break;
      default:
        break;
    }
  }
}

function initFile(element){
  for ( let item of element.parentElement.children[1].children ){
    let action = item.children[0].innerHTML;
    console.log(action);

    switch(action){
      case "Download":
        item.addEventListener("click", (e)=>{
          download();
        });
        break;
      case "Upload":
        item.addEventListener("click", (e) => {
          upload();
        });
      break;
      default: 
        item.addEventListener("click", (e)=>{
          alert("Not implemented yet...");
        });
    }
  }
}

function initTools(element){
    for ( let actions of $(element).siblings().children() ){
	let tool = $(actions).children().html(); 
	let selectedTool = tool.split(" ").map(
	    (v) => { return v.charAt(0).toUpperCase() + v.slice(1) }).join("");

	actions.addEventListener("click", function(event){
	    window.layout.eventHub.emit("toolChanged", {newTool: selectedTool});
	});
    }
}
