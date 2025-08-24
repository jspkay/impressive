export function init() {
  for( let element of $("#menubar").children(".item")) {
    let name = $(element).html();
    let id="#"+name+"Menu"
    let menu = $(id).menu()
    menu.hide();
    menu.on("focusout", () => {menu.hide()} );

    $(element).on("click", (e)=>{
      menu.show();
    });
  }
}
