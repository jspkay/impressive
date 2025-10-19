export function init() {
    let buttons = document.querySelectorAll("#Toolbar button");
    for(let bt of buttons){
	let id = bt.id;
	console.log(id);
	let fn = (e) => {
	    alert("not implemented yet...");
	};
	switch(id){
	    case "tb-select":
		fn = () => {window.layout.eventHub.emit("toolChanged", {newTool: "Select"});}
		break;
	    case "tb-move":
		fn = () => {window.layout.eventHub.emit("toolChanged", {newTool: "PanAndZoom"});}
		break;
	    case "tb-rect":
		fn = () => {window.layout.eventHub.emit("toolChanged", {newTool: "Container"});}
		break;
	    case "tb-text":
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
