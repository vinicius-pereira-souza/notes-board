// dropzones e cards
const dropzones = document.querySelectorAll(".dropzone");
const btnsAddNote = document.querySelectorAll(".addNote");
let dragged;

// modal
const modalContainer = document.querySelector(".modal_gb");
const input = modalContainer.querySelector("input");
const btnsModal = document.querySelectorAll(".btns_flex button");

// abre o modal e passa o id da lista para o elemento criado ser adicionar na lista correta
function openModal(e) {
  modalContainer.classList.add("show_modal");

  modalContainer.dataset.selectList = e.target.parentElement.parentElement.id;
}

function dragOver(e) {
  preventEventValidation(e);
}

// remove a classe das lista ao soltar o elemento arrastado
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

// coloca na dragged o elemento que esta sendo arrastado
function dragStart(e) {
  dragged = e.target;
  this.style.opacity = "0.4";

  dropzones.forEach((zone) => {
    zone.classList.add("movingElement");
  });
}

// delete do html o seu respectivo
function deleteNote(e) {
  e.target.parentElement.parentElement.removeChild(e.target.parentElement);
}

// altera a opacidade do elemento ao final do evento de soltar
function dragEnd(e) {
  e.target.style.opacity = "1";
}

// checa qual botão dentro do modal esta sendo clicado
function modalActions(e) {
  e.preventDefault();

  if (e.target.id === "close_modal") {
    modalContainer.classList.remove("show_modal");
  } else if (e.target.id === "add_note") {
    addNewNote(modalContainer.dataset.selectList);
  }
}

// checa se o input tem valor e adicionar a sua respectiva lista
// o elementos criado com o valor do input
function addNewNote(id) {
  let list = document.querySelector(`#${id} .dropzone`);

  if (!input.value) return;
  list.appendChild(createNewNote(input.value));
  input.value = "";
  input.focus();
}

// cria o card com os elementos dentro e adiciona os eventos aos elementos
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

// inicializa os evento de abrir o modal
btnsAddNote.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

// inicializa os eventos dos botões do modal
btnsModal.forEach((btn) => {
  btn.addEventListener("click", modalActions);
});

// inicializa os eventos de dragover e drop
dropzones.forEach((zone) => {
  zone.addEventListener("dragover", dragOver, false);
  zone.addEventListener("drop", dropAction);
});
