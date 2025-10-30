import {download, upload} from "./filemanager.js"

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
      case "Windows":
	initWindows(bt);
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
        break;
      case "Upload":
        actfn = () =>{
          upload()
        };
        break;
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

function initWindows(element){
  let options = element.parentElement.children[1].children;
  var actfn = () => {
    alert("Action not implemented yet!");
    return;
  }
  for(let action of options) {
    name = action.children[0].innerHTML;
    switch(name){
      case "Properties":
	actfn = () => {

	  let open = window.layout.rootItem.contentItems;
	  for(let el of open){
	    console.log(el);
	    console.log(el.id);
	  }

	  let config = {
	    type: 'component',
	    componentName: 'PropertiesWindow',
	    componentState: { label: 'Properties' },
	    title: "Properties",
	  }
	  window.layout.rootItem.addItem( config );
	};
      case "New...":
      default:
	break;
    }
    action.addEventListener("click", actfn);
  }
}
