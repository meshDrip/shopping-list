const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = document.querySelector("button");

let isEditState = false;

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

function displayItems() {
  const itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage.forEach((el) => {
    addItemToDOM(el);
  });
  checkUIState();
}

function onItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem === "") {
    alert("You haven't added an item!");
    return;
  } else {
    if (checkIfItemExists(newItem) && !isEditState) {
      alert("That item already exists.");
      itemInput.value = "";
      return;
    }
  }

  checkEditToggle();

  addItemToDOM(newItem);

  addItemToLocalStorage(newItem);

  itemInput.value = "";

  checkUIState();
}

function checkEditToggle() {
  const itemToEdit = itemList.querySelector(".edit-mode");
  if (isEditState) {
    removeItemFromLocalStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditState = false;
  }
}

function addItemToDOM(item) {
  const newListItem = document.createElement("li");

  newListItem.appendChild(document.createTextNode(item));
  newListItem.appendChild(createButton("remove-item btn-link text-red"));

  itemList.appendChild(newListItem);
}

function addItemToLocalStorage(item) {
  const localStorageItems = getItemsFromLocalStorage();

  localStorageItems.push(item);

  localStorage.setItem("items", JSON.stringify(localStorageItems));
}

function getItemsFromLocalStorage() {
  let localStorageItems;

  if (localStorage.getItem("items") === null) {
    localStorageItems = [];
  } else {
    localStorageItems = JSON.parse(localStorage.getItem("items"));
  }

  return localStorageItems;
}

function onItemClick(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    toggleItemEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromLocalStorage();

  return itemsFromStorage.includes(item);
}

function removeItem(item) {
  if (confirm("Are you sure you want to delete this item?")) {
    item.remove();
  }
  checkUIState();
  removeItemFromLocalStorage(item.textContent);
}

function toggleItemEdit(item) {
  isEditState = true;

  itemList
    .querySelectorAll("li")
    .forEach((el) => el.classList.remove("edit-mode"));

  item.classList.add("edit-mode");

  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228822";
  itemInput.value = item.textContent;
}

function removeItemFromLocalStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage = itemsFromStorage.filter((el) => el !== item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  // itemList.replaceChildren();
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem("items");
  checkUIState();
}

function checkUIState() {
  itemInput.value = "";

  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style = "visibility:hidden";
    itemFilter.style = "visibility:hidden";
  } else {
    clearBtn.style = "visibility:block";
    itemFilter.style = "visibility:block";
  }

  isEditState = false;
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

function filterInput() {
  const currentInput = itemFilter.value.toLowerCase();

  [...itemList.children].forEach((el) => {
    if (el.textContent.toLowerCase().indexOf(currentInput) === -1) {
      el.style = "display:none";
    } else {
      el.style = "display:flex";
    }
  });
}

function init() {
  itemForm.addEventListener("submit", onItemSubmit);
  itemList.addEventListener("click", onItemClick);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterInput);
  document.addEventListener("DOMContentLoaded", displayItems);
}

init();

checkUIState();
