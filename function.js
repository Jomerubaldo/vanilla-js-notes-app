const addNoteBtn = document.querySelector('#addButton');
const editModal = document.querySelector('#editModal');
const cancelEdit = document.querySelector('#cancelEdit');
const saveEdit = document.querySelector('#saveEdit');

addNoteBtn.addEventListener('click', addFunction);

function addFunction() {
  editModal.style.display = 'flex'; // show modal
  // prevent background scrolling while open modal
  document.body.classList.add('modal-open');
}

saveEdit.addEventListener('click', saveFunction);

function saveFunction() {
  // remove prevent background scrolling so back to normal when modal is close
  document.body.classList.remove('modal-open');
  editModal.style.display = 'none';
}

cancelEdit.addEventListener('click', cancelFunction);

function cancelFunction() {
  // remove prevent background scrolling so back to normal when modal is close
  document.body.classList.remove('modal-open');
  editModal.style.display = 'none';
}
