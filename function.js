// DOM SECTION
const countTask = document.querySelector('#countTask');
const noteTitleValue = document.querySelector('#modalInput');
const noteTextAreaValue = document.querySelector('#textArea');
const addNoteBtn = document.querySelector('#addButton');
const editModal = document.querySelector('#editModal');
const cancelEdit = document.querySelector('#cancelEdit');
const saveAddNotes = document.querySelector('#saveAddNotes');
const containerNote = document.querySelector('#containerNote');
const closeViewModal = document.querySelector('#closeViewModal');
const headerCloseModal = document.querySelector('#headerCloseModal');

// STATE (DATA)
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentNoteIndex = null;

// STORAGE
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

let isEditing = false;

const editViewModal = document.querySelector('#editViewModal');

// UI FUNCTIONS
function createNote(title, textArea, index) {
  currentNoteIndex = index;

  const contentNote = document.createElement('div');
  contentNote.className = 'content-note';

  contentNote.addEventListener('click', function () {
    const viewModalContainer = document.querySelector('#viewModalContainer');
    const viewTitle = document.querySelector('#viewNoteTitle');
    const viewParagraph = document.querySelector('#viewNoteParagraph');

    viewTitle.textContent = title;
    viewParagraph.value = textArea;

    viewModalContainer.style.display = 'flex';
    document.body.classList.add('modal-open');

    editViewModal.addEventListener('click', () => {
      if (!isEditing) {
        isEditing = true;
        editViewModal.textContent = 'Save';
        viewParagraph.removeAttribute('readonly');
        viewParagraph.focus();
      } else {
        notes[currentNoteIndex].content = viewParagraph.value;
        saveEditNote();
        isEditing = false;
        editViewModal.textContent = 'Edit';
        viewParagraph.setAttribute('readonly', true);
      }
    });

    function saveEditNote() {
      textArea = viewParagraph.value;
      saveNotes();
    }
  });

  const noteTitleElement = document.createElement('h3');
  noteTitleElement.className = 'note-title';
  noteTitleElement.textContent = title;

  const noteTextAreaElement = document.createElement('p');
  noteTextAreaElement.className = 'note-text-area';
  noteTextAreaElement.textContent = textArea;

  const horizontalElement = document.createElement('hr');
  horizontalElement.className = 'horizontal-line';

  contentNote.appendChild(noteTitleElement);
  contentNote.appendChild(noteTextAreaElement);
  contentNote.appendChild(horizontalElement);

  containerNote.appendChild(contentNote);
}

// render saved notes
function renderNotes() {
  notes.forEach((note, index) => {
    createNote(note.text, note.content, index);
  });
}

// MODAL FUNCTIONS
function openModal() {
  editModal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeModal() {
  document.body.classList.remove('modal-open');
  editModal.style.display = 'none';
}

function closeModalView() {
  document.body.classList.remove('modal-open');
  viewModalContainer.style.display = 'none';
}

// LOGIC
function addNote() {
  const title = noteTitleValue.value;
  const textArea = noteTextAreaValue.value;

  if (!title.trim() || !textArea) {
    let message = '';

    if (!title.trim() && !textArea) {
      message = 'Please fill both Title and Note fields';
    } else if (!title.trim()) {
      message = 'Please fill Title';
    } else {
      message = 'Please fill Note';
    }

    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: message,
    });

    return;
  }

  const newNote = {
    text: title,
    content: textArea,
  };

  notes.push(newNote);

  saveNotes();

  createNote(title, textArea, notes.length - 1);

  noteTitleValue.value = '';
  noteTextAreaValue.value = '';

  closeModal();
}
lucide.createIcons();

// EVENTS
addNoteBtn.addEventListener('click', openModal);
saveAddNotes.addEventListener('click', addNote);
cancelEdit.addEventListener('click', closeModal);
closeViewModal.addEventListener('click', closeModalView);
headerCloseModal.addEventListener('click', closeModal);

// INIT APP
renderNotes();
