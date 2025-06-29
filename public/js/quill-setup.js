// quill-setup.js
export function setupQuill(editorSelector, hiddenInputSelector) {
  const quill = new Quill(editorSelector, {
    theme: 'snow'
  });

  function syncEditorContent() {
    document.querySelector(hiddenInputSelector).value = quill.root.innerHTML;
    return true;
  }

  return { quill, syncEditorContent };
}
