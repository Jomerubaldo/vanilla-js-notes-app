const noteTitleValue = document.querySelector('#modalInput');
const noteParagraphValue = document.querySelector('#textArea');
const noteTimeElement = document.querySelector('#noteTime');
const noteParagraphElement = document.querySelector('#noteParagraph');
const noteTitleElement = document.querySelector('#noteTitle');
const addNoteBtn = document.querySelector('#addButton');
const editModal = document.querySelector('#editModal');
const cancelEdit = document.querySelector('#cancelEdit');
const saveEdit = document.querySelector('#saveEdit');

// add
addNoteBtn.addEventListener('click', addFunction);

function addFunction() {
  editModal.style.display = 'flex'; // show modal
  // prevent background scrolling while open modal
  document.body.classList.add('modal-open');
}

// save
saveEdit.addEventListener('click', saveFunction);

function saveFunction() {
  // get user value
  const title = noteTitleValue.value.trim();
  console.log(title);

  const paragraph = noteParagraphValue.value.trim();
  console.log(paragraph);

  // gagawa na dito ng logic para ma display yung input ni user sa UI

  // remove prevent background scrolling so back to normal when modal is close
  document.body.classList.remove('modal-open');
  editModal.style.display = 'none';
}

// cancel
cancelEdit.addEventListener('click', cancelFunction);

function cancelFunction() {
  // remove prevent background scrolling so back to normal when modal is close
  document.body.classList.remove('modal-open');
  editModal.style.display = 'none';
}
