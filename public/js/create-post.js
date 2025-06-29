// create-post.js
import { setupQuill } from './quill-setup.js';

const form = document.querySelector('form');
if (form) {
  const { syncEditorContent } = setupQuill('#editor', '#content');
  form.addEventListener('submit', syncEditorContent);
}
