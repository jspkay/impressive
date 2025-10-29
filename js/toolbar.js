export function init() {
    let buttons = document.querySelectorAll("#Toolbar button");
    for(let bt of buttons){
	let id = bt.id;
	console.log(id);
	let fn = (e) => {
	    alert("not implemented yet...");
	};
        let callback = function(newTool){
	  return function(e){
	    let active = document.querySelector(".impressiveActiveTool");
	    active.classList.remove("btn-success");
	    active.classList.add("btn-primary");
	    active.classList.remove("impressiveActiveTool");

	    e.currentTarget.classList.add("btn-success", "impressiveActiveTool");
	    e.currentTarget.classList.remove("btn-primary");
	    window.layout.eventHub.emit(
	      "toolChanged",
	      {newTool: newTool});
	  }
	};
	switch(id){
	    case "tb-select":
		fn = callback("Select");
		break;
	    case "tb-move":
		fn = callback("PanAndZoom");
		break;
	    case "tb-rect":
		fn = callback("Container");
		break;
	    case "tb-image":
		fn = callback("Image");
		break;
	    case "tb-text":
	      fn = callback("Text");
	      break;
	    default:
		break;
	}
	bt.addEventListener("click", fn);
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
		    alert("Download");
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
