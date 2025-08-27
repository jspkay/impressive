export function makeValueField(prop, value){
  let root = document.createElement("div");
  root.classList.add("input-group", "mb-3");

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", prop);
  input.classList.add("form-control");
  root.appendChild(input);
  input.value = value;

  let button = document.createElement("button");
  button.classList.add("btn", "btn-outline-secondary");
  button.setAttribute("type", "button");
  root.appendChild(button);

  return root;
}
