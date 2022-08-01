const layout = require('./layout');

module.exports = ({ title, content, _id }) => {
    // added the _id param in case of a delete we send a delete request with
    // the id of the note
    let message = 'New Note';
    if (title) {
        message = 'Edit Note';
    }
    return layout({
        title: title ? 'Notely - Edit' : 'Notely - New',
        content: `
        <div class="root">
          <header class="header">
            <span>${message}</span>
            <i class="fa-solid fa-floppy-disk save-button">
              <span class="hover-note">save</span>
            </i>
            ${
                title
                    ? `  
                    <i class="fa-solid fa-trash delete-button">
                      <span id="${_id}" class="hover-note">delete</span>
                    </i>`
                    : ''
            }
            <a href="/"><i class="fa-solid fa-backward back-button">
              <span class="hover-note">back</span>
            </i></a>
          </header>
          <main>
            <div class="new-note-container" id=${_id}>
              <input 
                class="note-title" 
                placeholder="Title" value="${title || ''}"/>
              <hr />
              <textarea spellcheck="true" class="note-content" placeholder="Content">${
                  content || ''
              }
              </textarea>
            </div>
          </main>
        </div>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="${title ? 'edit.js' : 'save.js'}"></script>
    `,
    });
};
