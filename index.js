let inputElement = document.getElementById("inputElement");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");
let saveBtn = document.getElementById("saveBtn");

let getLocalItems = () => {
	let LocalItemsValues = JSON.parse(localStorage.getItem("LocalItems"));
	if (LocalItemsValues === null) {
		return [];
	} else {
		return LocalItemsValues;
	}
	console.log(LocalItemsValues);
};

let todoItemsArray = getLocalItems();

let todoItemsArrayLength = todoItemsArray.length;

let addNewTodoItem = () => {
	let inputElementvalue = inputElement.value;
	let sliceLetter = inputElementvalue.slice(0, 1).toUpperCase();
	let joinText = sliceLetter + inputElementvalue.slice(1);

	todoItemsArrayLength += 1;

	if (inputElementvalue === "") {
		alert("Please Enter Valid Text");
	} else {
		let newTodoItem = {
			title: joinText,
			id: todoItemsArrayLength,
			isChecked: false,
		};
		createAndAppendNewTodo(newTodoItem);
		todoItemsArray.push(newTodoItem);
		// inputElement.value = "";
	}
};

let onSaveItems = () => {
	localStorage.setItem("LocalItems", JSON.stringify(todoItemsArray));
};

saveBtn.addEventListener("click", onSaveItems);

addBtn.addEventListener("click", addNewTodoItem);

let onDeleteTodoItem = (todoId) => {
	let todoIdElement = document.getElementById(todoId);
	todoList.removeChild(todoIdElement);

	let indexvalue = todoItemsArray.findIndex((eachItem) => {
		let itemId = "todo" + eachItem.id;
		if (itemId === todoId) {
			return true;
		} else {
			return false;
		}
	});

	todoItemsArray.splice(indexvalue, 1);
};

let onTodoStrikeOff = (labelId) => {
	const labelElementId = document.getElementById(labelId);
	labelElementId.classList.toggle("isCheck");

	let indexvalue = todoItemsArray.findIndex((eachItem) => {
		let id = "label" + eachItem.id;
		if (id === labelId) {
			return true;
		} else {
			return false;
		}
	});
	let itemIndex = todoItemsArray[indexvalue];
	if (itemIndex.isChecked === true) {
		itemIndex.isChecked = false;
	} else {
		itemIndex.isChecked = true;
	}
};

let createAndAppendNewTodo = (eachItem) => {
	let checkboxId = "checkbox" + eachItem.id;
	let labelId = "label" + eachItem.id;
	let todoId = "todo" + eachItem.id;
	let textValue = eachItem.title;

	let liElement = document.createElement("li");
	liElement.className = "todo-li";
	liElement.id = todoId;

	let checkBoxInputElement = document.createElement("input");
	checkBoxInputElement.id = checkboxId;
	checkBoxInputElement.checked = eachItem.isChecked;
	checkBoxInputElement.type = "checkbox";
	checkBoxInputElement.className = "checkbox";
	checkBoxInputElement.addEventListener("click", () => {
		onTodoStrikeOff(labelId);
	});
	liElement.appendChild(checkBoxInputElement);
	todoList.appendChild(liElement);

	let eachTodoItemContainer = document.createElement("div");
	eachTodoItemContainer.className = "todo-li-container";

	let labelElement = document.createElement("label");
	labelElement.id = labelId;
	labelElement.className = "todo-label";
	labelElement.setAttribute("for", checkboxId);
	labelElement.textContent = textValue;
	if (eachItem.isChecked) {
		labelElement.classList.add("isCheck");
	}
	eachTodoItemContainer.appendChild(labelElement);
	liElement.appendChild(eachTodoItemContainer);

	let deleteIcon = document.createElement("i");
	deleteIcon.classList.add("fa-solid", "fa-trash", "delete");
	deleteIcon.addEventListener("click", () => {
		onDeleteTodoItem(todoId);
	});
	eachTodoItemContainer.appendChild(deleteIcon);
};

for (let eachItem of todoItemsArray) {
	createAndAppendNewTodo(eachItem);
}
