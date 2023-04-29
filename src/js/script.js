// DROPZONE
const dropzones = document.querySelectorAll(".dropzone");
const btnsAddNote = document.querySelectorAll(".addNote");
// CARD
let dragged;

// MODAL
const modalContainer = document.querySelector(".modal_gb");
const input = modalContainer.querySelector("input");
const btnsModal = document.querySelectorAll(".btns_flex button");

// DROPZONE FUNCTION
function openModal(e) {
  modalContainer.classList.add("show_modal");

  modalContainer.dataset.selectList = e.target.parentElement.parentElement.id;
}

function dragOver(e) {
  preventEventValidation(e);
}

function dropAction(e) {
  preventEventValidation(e);

  dropzones.forEach((zone) => {
    zone.classList.remove("movingElement");
  });
}

function preventEventValidation(event) {
  event.preventDefault();

  if (event.target.classList.contains("dropzone")) {
    event.target.appendChild(dragged);
  }
}

// CARD FUNCTIONS

function dragStart(e) {
  dragged = e.target;
  this.style.opacity = "0.4";

  dropzones.forEach((zone) => {
    zone.classList.add("movingElement");
  });
}

function deleteNote(e) {
  e.target.parentElement.parentElement.removeChild(e.target.parentElement);
}

function dragEnd(e) {
  e.target.style.opacity = "1";
}

// MODAL FUNCTION
function modalActions(e) {
  e.preventDefault();

  if (e.target.id === "close_modal") {
    modalContainer.classList.remove("show_modal");
  } else if (e.target.id === "add_note") {
    addNewNote(modalContainer.dataset.selectList);
  }
}

function addNewNote(id) {
  let list = document.querySelector(`#${id} .dropzone`);

  if (!input.value) return;
  list.appendChild(createNewNote(input.value));
  input.value = "";
  input.focus();
}

function createNewNote(text) {
  const div = document.createElement("div");
  const btn = document.createElement("button");
  const p = document.createElement("p");

  div.classList.add("dragElement");
  div.setAttribute("draggable", "true");

  p.textContent = text;

  div.appendChild(btn);
  div.appendChild(p);

  btn.addEventListener("click", deleteNote);
  div.addEventListener("dragstart", dragStart);
  div.addEventListener("dragend", dragEnd);

  return div;
}

// EVENTS
btnsAddNote.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnsModal.forEach((btn) => {
  btn.addEventListener("click", modalActions);
});

dropzones.forEach((zone) => {
  zone.addEventListener("dragover", dragOver, false);
  zone.addEventListener("drop", dropAction);
});
