const addItemBtn = document.querySelector(".btn");
let itemInputValue = document.getElementById("item-input");

window.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target === addItemBtn) {
    if (itemInputValue.value !== "") {
      addInputToList(itemInputValue.value);

      itemInputValue.value = "";
    }
  }
});

function addInputToList(input) {
  const newItem = createNewListItem(input);
  const itemList = document.getElementById("item-list").appendChild(newItem);
}

function createNewListItem(input) {
  const newItem = document.createElement("li");
  const deleteBtn = createNewDeleteBtn();

  newItem.appendChild(document.createTextNode(input));
  newItem.appendChild(deleteBtn);
  return newItem;
}

function createNewDeleteBtn() {
  const deleteBtn = document.createElement("button");
  const btn = document.createElement("i");

  deleteBtn.className = "remove-item btn-link text-red";
  btn.className = "fa-solid fa-xmark";

  deleteBtn.appendChild(btn);

  return deleteBtn;
}
