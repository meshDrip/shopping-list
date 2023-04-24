const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function createButton(classes) {
  const button = document.createElement("button");
  const icon = createIcon("fa-solid fa-xmark");
  button.className = classes;
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }

  checkUIState();
}

function clearItems() {
  // itemList.replaceChildren();
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUIState();
}

function checkUIState() {
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style = "visibility:hidden";
    itemFilter.style = "visibility:hidden";
  } else {
    clearBtn.style = "visibility:block";
    itemFilter.style = "visibility:block";
  }
}

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem !== "") {
    const newTodoItem = document.createElement("li");

    newTodoItem.appendChild(document.createTextNode(newItem));
    newTodoItem.appendChild(createButton("remove-item btn-link text-red"));

    const itemList = document
      .getElementById("item-list")
      .appendChild(newTodoItem);

    itemInput.value = "";
  } else {
    alert("You haven't added an item!");
    return;
  }

  checkUIState();
});
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
filter

checkUIState();
