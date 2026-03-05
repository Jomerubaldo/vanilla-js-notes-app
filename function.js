// DOM SECTION
const countTask = document.querySelector('#countTask');
const noteTitleValue = document.querySelector('#modalInput');
const noteTextAreaValue = document.querySelector('#textArea');
const addNoteBtn = document.querySelector('#addButton');
const editModal = document.querySelector('#editModal');
const cancelEdit = document.querySelector('#cancelEdit');
const saveAddNotes = document.querySelector('#saveAddNotes');
const containerNote = document.querySelector('#containerNote');

// save to localStorage
// const notes = JSON.parse(localStorage.setItem('notes')) || [];

// function saveLocalStorageNotes() {
//   localStorage.setItem('notes', JSON.stringify(notes));
// }

// STATE SECTION
const notes = [];

// EVENT SECTION
addNoteBtn.addEventListener('click', addFunction);
saveAddNotes.addEventListener('click', saveAddFunction);
cancelEdit.addEventListener('click', cancelFunction);

// LOGIC SECTION
function addFunction() {
  editModal.style.display = 'flex'; // show modal
  // prevent background scrolling while open modal
  document.body.classList.add('modal-open');
}

// reusable close modal
function closeModal() {
  document.body.classList.remove('modal-open');
  editModal.style.display = 'none';
}

function saveAddFunction() {
  const title = noteTitleValue.value;
  const textArea = noteTextAreaValue.value;

  if (!title.trim() || !textArea.trim()) {
    let message = '';

    if (!title.trim() && !textArea.trim()) {
      message = 'Please enter both a title and a note fields';
    } else if (!title.trim()) {
      message = 'Please enter a title';
    } else {
      message = 'Please enter a note';
    }

    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message, //called variable
    });

    return; //last call return to back the logic dalidation at a top
  }

  notes.push({
    text: title,
    content: textArea,
  });

  // countTask.textContent = notes.length;

  const contentNote = document.createElement('div');
  contentNote.className = 'content-note';

  const noteTitleElement = document.createElement('h3');
  noteTitleElement.className = 'note-title';
  noteTitleElement.textContent = title;

  const noteTextAreaElement = document.createElement('p');
  noteTextAreaElement.className = 'note-text-area';
  noteTextAreaElement.textContent = textArea;

  contentNote.addEventListener('click', function () {
    // DOM FOR VIEW-MODAL-NOTES
    const viewModalContainer = document.querySelector('#viewModalContainer');
    const viewTitle = document.querySelector('#viewNoteTitle');
    const viewParagraph = document.querySelector('#viewNoteParagraph');

    viewTitle.textContent = title;
    viewParagraph.textContent = textArea;

    viewModalContainer.style.display = 'flex';
    document.body.classList.add('modal-open');

    // close modal in view note
    const closeViewModal = document.querySelector('#closeViewModal');

    closeViewModal.addEventListener('click', function () {
      document.body.classList.remove('modal-open');
      viewModalContainer.style.display = 'none';
    });
  });

  // const noteTimeElement = document.createElement('p');
  // noteTimeElement.className = 'note-time';

  // building structure
  contentNote.appendChild(noteTitleElement);
  contentNote.appendChild(noteTextAreaElement);
  // containerNote.appendChild(noteTimeElement);
  containerNote.appendChild(contentNote);

  noteTitleValue.value = '';
  noteTextAreaValue.value = '';

  closeModal();
}

function cancelFunction() {
  closeModal();
}

//need refactor to clean code DRY principle
