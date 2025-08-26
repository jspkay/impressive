export function init() {
  $("button.item").each(function (){
    switch( $(this).html() ){
      case "Tools":
        initTools(this);
        break;
      default:
      break;
    }
  });
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
