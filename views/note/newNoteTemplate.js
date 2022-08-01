const layout = require('./layout');

module.exports = ({ title, content }) => {
    let message = 'New Note';
    if (title) {
        message = 'Edit Note';
    }
    return layout({
        title: 'Notely - New',
        content: `
        <div class="root">
          <header class="header">
            <span>${message}</span>
            <i class="fa-solid fa-floppy-disk save-button">
              <span class="hover-note">save</span>
            </i>
            ${
                title
                    ? `  <i class="fa-solid fa-trash delete-button">
                <span class="hover-note">delete</span>
              </i>`
                    : ''
            }
            <a href="/"><i class="fa-solid fa-backward back-button">
              <span class="hover-note">back</span>
            </i></a>
          </header>
          <main>
            <div class="new-note-container">
              <input class="note-title" placeholder="Title" value="${
                  title || ''
              }"/>
              <hr />
              <textarea spellcheck="true" class="note-content" placeholder="Content">${
                  content || ''
              }</textarea>
            </div>
          </main>
        </div>
        <script src="note.js"></script>
    `,
    });
};
