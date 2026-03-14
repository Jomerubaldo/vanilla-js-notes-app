/* ═══════════════════════════════════════════════════
   NOTES APP  —  main.js
   Original logic merged into the responsive two-panel layout.
════════════════════════════════════════════════════ */

// ── DOM ──────────────────────────────────────────────────────────
const countTask = document.querySelector('#countTask');
const noteTitleValue = document.querySelector('#modalInput');
const noteTextAreaValue = document.querySelector('#textArea');
const addNoteBtn = document.querySelector('#addButton');
const fabBtn = document.querySelector('#fabBtn');
const emptyAddBtn = document.querySelector('#emptyAddBtn');
const editModal = document.querySelector('#editModal');
const cancelEdit = document.querySelector('#cancelEdit');
const saveAddNotes = document.querySelector('#saveAddNotes');
const headerCloseModal = document.querySelector('#headerCloseModal');
const containerNote = document.querySelector('#containerNote');
const modalHeading = document.querySelector('#modalHeading');

const appShell = document.querySelector('.app-shell');
const emptyState = document.querySelector('#emptyState');
const noteViewer = document.querySelector('#noteViewer');
const viewNoteTitle = document.querySelector('#viewNoteTitle');
const viewNoteDate = document.querySelector('#viewNoteDate');
const viewNoteParagraph = document.querySelector('#viewNoteParagraph');
const editViewModal = document.querySelector('#editViewModal');
const deleteViewModal = document.querySelector('#deleteViewModal');
const mobileBack = document.querySelector('#mobileBack');
const searchInput = document.querySelector('#searchInput');

// ── STATE ────────────────────────────────────────────────────────
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentNoteIndex = null;
let isEditing = false;
let searchQuery = '';

// ── STORAGE ──────────────────────────────────────────────────────
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// ── HELPERS ──────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function filteredNotes() {
  if (!searchQuery.trim()) return notes.map((n, i) => ({ ...n, _idx: i }));
  const q = searchQuery.toLowerCase();
  return notes
    .map((n, i) => ({ ...n, _idx: i }))
    .filter(
      (n) =>
        n.text.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
}

// ── RENDER LIST ──────────────────────────────────────────────────
function renderNotes() {
  const list = filteredNotes();
  countTask.textContent = notes.length;

  if (list.length === 0) {
    containerNote.innerHTML = `
      <div class="list-empty">
        <strong>${searchQuery ? 'No results found' : 'No notes yet'}</strong>
        ${searchQuery ? 'Try a different search term.' : 'Tap + to create your first note.'}
      </div>`;
    return;
  }

  containerNote.innerHTML = list
    .map(
      (note) => `
    <div class="note-card ${note._idx === currentNoteIndex ? 'active' : ''}"
         data-index="${note._idx}"
         role="button"
         tabindex="0"
         aria-label="Open note: ${escHtml(note.text)}">
      <div class="note-card-title">${escHtml(note.text) || 'Untitled'}</div>
      <div class="note-card-snippet">${escHtml(note.content.slice(0, 80)) || '—'}</div>
      <div class="note-card-date">${formatDate(note.createdAt)}</div>
    </div>`
    )
    .join('');

  containerNote.querySelectorAll('.note-card').forEach((card) => {
    card.addEventListener('click', () => openNote(Number(card.dataset.index)));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ')
        openNote(Number(card.dataset.index));
    });
  });
}

// ── OPEN / VIEW A NOTE ───────────────────────────────────────────
function openNote(index) {
  const note = notes[index];
  if (!note) return;

  if (isEditing) exitEditMode();

  currentNoteIndex = index;
  renderNotes();

  viewNoteTitle.textContent = note.text || 'Untitled';
  viewNoteDate.textContent = note.createdAt ? formatDate(note.createdAt) : '';
  viewNoteParagraph.value = note.content;

  emptyState.style.display = 'none';
  noteViewer.style.display = 'flex';
  appShell.classList.add('detail-open');
}

function closeDetail() {
  if (isEditing) exitEditMode();
  currentNoteIndex = null;
  renderNotes();
  emptyState.style.display = 'flex';
  noteViewer.style.display = 'none';
  appShell.classList.remove('detail-open');
}

// ── IN-VIEWER EDIT MODE ──────────────────────────────────────────
function enterEditMode() {
  isEditing = true;
  editViewModal.textContent = 'Save';
  viewNoteParagraph.removeAttribute('readonly');
  viewNoteParagraph.classList.add('editing');
  viewNoteParagraph.focus();
}

function exitEditMode() {
  isEditing = false;
  editViewModal.textContent = 'Edit';
  viewNoteParagraph.setAttribute('readonly', true);
  viewNoteParagraph.classList.remove('editing');
}

function saveViewerEdit() {
  if (currentNoteIndex === null) return;
  notes[currentNoteIndex].content = viewNoteParagraph.value;
  saveNotes();
  renderNotes();
}

editViewModal.addEventListener('click', () => {
  if (!isEditing) {
    enterEditMode();
  } else {
    saveViewerEdit();
    exitEditMode();
  }
});

// ── DELETE NOTE ──────────────────────────────────────────────────
deleteViewModal.addEventListener('click', () => {
  if (currentNoteIndex === null) return;
  const noteTitle = notes[currentNoteIndex].text || 'this note';

  Swal.fire({
    title: `Delete "${noteTitle}"?`,
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      notes.splice(currentNoteIndex, 1);
      saveNotes();
      closeDetail();
    }
  });
});

// ── ADD NOTE MODAL ───────────────────────────────────────────────
function openModal() {
  modalHeading.textContent = 'New Note';
  noteTitleValue.value = '';
  noteTextAreaValue.value = '';
  editModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => noteTitleValue.focus(), 80);
}

function closeModal() {
  editModal.classList.remove('open');
  document.body.style.overflow = '';
}

function addNote() {
  const title = noteTitleValue.value.trim();
  const content = noteTextAreaValue.value.trim();

  if (!title || !content) {
    let message = '';
    if (!title && !content) {
      message = 'Please fill both Title and Note fields';
    } else if (!title) {
      message = 'Please fill Title';
    } else {
      message = 'Please fill Note';
    }
    Swal.fire({ icon: 'warning', title: 'Oops…', text: message });
    return;
  }

  const newNote = {
    text: title,
    content: content,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  saveNotes();

  noteTitleValue.value = '';
  noteTextAreaValue.value = '';
  closeModal();

  openNote(notes.length - 1);
}

// ── SEARCH ───────────────────────────────────────────────────────
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderNotes();
});

// ── EVENTS ───────────────────────────────────────────────────────
addNoteBtn.addEventListener('click', openModal);
fabBtn.addEventListener('click', openModal);
emptyAddBtn.addEventListener('click', openModal);

saveAddNotes.addEventListener('click', addNote);
cancelEdit.addEventListener('click', closeModal);
headerCloseModal.addEventListener('click', closeModal);

editModal.addEventListener('click', (e) => {
  if (e.target === editModal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (editModal.classList.contains('open')) closeModal();
    else if (isEditing) exitEditMode();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (editModal.classList.contains('open')) addNote();
    else if (isEditing) {
      saveViewerEdit();
      exitEditMode();
    }
  }
});

mobileBack.addEventListener('click', closeDetail);

// Init lucide icons
lucide.createIcons();

// ── INIT ─────────────────────────────────────────────────────────
renderNotes();
