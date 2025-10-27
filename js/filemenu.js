import {download} from "./filemanager.js"

export function init() {
    let buttons = document.querySelectorAll("button.item");
    for(let bt of buttons){
	let html = bt.innerHTML;
	switch(html){
	    case "Tools":
		initTools(bt);
		break;
	    case "File":
		initFile(bt);
		break;
	    default:
		break;
	}
    }
}

function initFile(element){
    let options = element.parentElement.children[1].children;
    var actfn = () => {
	alert("Action not implemented yet!");
	return;
    }
    for(let action of options) {
	name = action.children[0].innerHTML;
	switch(name){
	    case "Download":
		actfn = () => {
		    download()
		};
	    case "New...":
	    default:
		break;
	}
	action.addEventListener("click", actfn);
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
