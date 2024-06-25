import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shoppinglist-101-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shopList");
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const listaShopping = document.getElementById("shopList");
onValue(shoppingListInDB, function (snapshot) {

  if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val());
    clearList();
    itemsArray.forEach((item) => addList(item));
  }else{
    listaShopping.innerHTML = "Lista vacía..."
  }
 
});



addButtonEl.addEventListener("click", function () {
  let nombreItem = inputFieldEl.value;
  if (nombreItem.trim() !== "") {
    addList(nombreItem);
    push(shoppingListInDB, nombreItem);
    clearInput();
  }
});

function addList(item) {
  let idItem = item[0];
  let nombreItem = item[1];  

  let newEl = document.createElement("li");
  newEl.textContent = nombreItem;
  listaShopping.append(newEl);

  newEl.addEventListener("click", function () {
    
    let idLocation = ref(database, `shopList/${idItem}`);
    remove(idLocation);
  });
}

function clearList() {
  listaShopping.innerHTML = "";
}

function clearInput() {
  inputFieldEl.value = "";
}
