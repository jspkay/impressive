import {Modal, makeForm} from "./bootstrapHelpers.js";
// import {impress} from "./impress.text.js";
var impress = "<script src='impress.js/js/impress.new.js'></script>"

export function download(){
  // gather all the elements on the canvas 
  let canvas = document.querySelector("#impressiveCanvas").cloneNode(true);
  // remove all the current scale and position, so that it doesn't mess with impress
  delete canvas.dataset.x;
  delete canvas.dataset.y;
  delete canvas.dataset.scale;
  canvas.style = "position: absolute; top: 50%; left: 50%";

  // remove the add button
  let steps = document.querySelector("#StepListWindow").cloneNode(true);
  steps.children[ steps.children.length - 1 ].remove();

  // we set the scale as the current scale
  let W = document.querySelector("#impressiveCanvas").parentElement.offsetWidth,
      H = document.querySelector("#impressiveCanvas").parentElement.offsetHeight;

  // The scale as intended in impressive is different than impress:
  // in impressive the scale is the "zoom of the camera"
  // in impress the scale is intended as the scale of the element, effectively the inverse of the other one.
  let stepsElements = steps.querySelectorAll(".step");
  for(let i=0; i<stepsElements.length; i++){
    let scale = stepsElements[i].dataset.scale;
    let x = stepsElements[i].dataset.x;
    let y = stepsElements[i].dataset.y
    stepsElements[i].dataset.scale = scale;
    stepsElements[i].dataset.x = x;
    stepsElements[i].dataset.y = y;
  }


  let wrap = `
<!doctype html>
<html>
  <head> </head>
  <body>
    <div id="impress" 
      data-width="${W}"
      data-height="${H}"
      data-transition-duration="250"
    >

    ${canvas.outerHTML}
    ${steps.outerHTML}


    <!-- <script>${impress}</script> -->
    ${impress}
    <script>impress().init();</script>
  </body>
</html>
  `;

  console.log(wrap);
  let blob = new Blob(
    [ wrap ],
    {type: "text/html"}
  );
  let url = URL.createObjectURL(
    blob
  );

  // return;
  let link = document.createElement("a");
  link.href = url;
  link.download = "impressive-presentation.html";
  link.click();

  console.log(blob);
  console.log(url);
}

export function upload(){

  let form = makeForm({
    "File name": {
      type: "file",
      id: "fileUpload"
    }
  });

  let modal = new Modal(
    "Upload",
    form,
    "Upload",
  );
  modal.show();

 let fileField = form.querySelector("#fileUpload");
  fileField.addEventListener(
    "change", (e) => {
      let file = fileField.files[0];
      console.log(file);
      let fr = new FileReader();
      fr.addEventListener("load", (e)=>{
        let content = e.target.result;
        console.log(`File name is ${file.name}`);
        console.log(content);
      });
      fr.readAsText(file);
    });
}
