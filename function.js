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

  countTask.textContent = notes.length;

  notes.forEach((note) => {
    const noteTitleElement = document.createElement('h3');
    noteTitleElement.className = 'note-title';
    noteTitleElement.textContent = note.text; // very important to render a forEach

    const noteTextAreaElement = document.createElement('p');
    noteTextAreaElement.className = 'note-text-area';
    noteTextAreaElement.textContent = note.content; // very important to render a forEach

    // const noteTimeElement = document.createElement('p');
    // noteTimeElement.className = 'note-time';

    const containerNote = document.querySelector('#containerNote');

    containerNote.appendChild(noteTitleElement);
    containerNote.appendChild(noteTextAreaElement);
    // containerNote.appendChild(noteTimeElement);
  });

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
