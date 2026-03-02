const countTask = document.querySelector('#countTask');
const noteTitleValue = document.querySelector('#modalInput');
const noteTextAreaValue = document.querySelector('#textArea');
// const noteTitleElement = document.querySelector('#noteTitle');
// const noteParagraphElement = document.querySelector('#noteParagraph');
// const noteTimeElement = document.querySelector('#noteTime');
const addNoteBtn = document.querySelector('#addButton');
const editModal = document.querySelector('#editModal');
const cancelEdit = document.querySelector('#cancelEdit');
const saveNotes = document.querySelector('#saveNotes');

// save to localStorage
// const notes = JSON.parse(localStorage.setItem('notes')) || [];

// function saveLocalStorageNotes() {
//   localStorage.setItem('notes', JSON.stringify(notes));
// }

addNoteBtn.addEventListener('click', addFunction);

function addFunction() {
  editModal.style.display = 'flex'; // show modal
  // prevent background scrolling while open modal
  document.body.classList.add('modal-open');
}

saveNotes.addEventListener('click', saveFunction);

const notes = [];

function saveFunction() {
  const title = noteTitleValue.value;
  const textArea = noteTextAreaValue.value;

  notes.push({
    text: title,
    content: textArea,
  });

  // countTask.textContent = notes.length;

  // structure
  const contentNote = document.createElement('div');
  contentNote.className = 'content-note';

  const noteTitleElement = document.createElement('h3');
  noteTitleElement.className = 'note-title';
  noteTitleElement.textContent = title;

  const noteTextAreaElement = document.createElement('p');
  noteTextAreaElement.className = 'note-text-area';
  noteTextAreaElement.textContent = textArea;

  // const noteTimeElement = document.createElement('p');
  // noteTimeElement.className = 'note-time';

  // building
  contentNote.appendChild(noteTitleElement);
  contentNote.appendChild(noteTextAreaElement);
  // containerNote.appendChild(noteTimeElement);

  // final stage
  const containerNote = document.querySelector('#containerNote');
  containerNote.appendChild(contentNote);

  // value clear
  noteTitleValue.value = '';
  noteTextAreaValue.value = '';

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
