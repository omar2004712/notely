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
        <div class="new-note">
          <header>
            <h1>${title || content ? 'Edit Note' : 'New note'}</h1>
            ${
                title || content
                    ? `
              <button>
                <i class="fa-solid fa-share share-button"></i>
                <label class="hover-note">share</label>
              </button>
              `
                    : ''
            }
            <button>
              <i class="fa-solid fa-floppy-disk save-button"></i>
              <label class="hover-note">save</label>
            </button>
            ${
                title || content
                    ? `
            <button>
              <i class="fa-solid fa-trash delete-button" id="${_id}"></i>
              <label class="hover-note">delete</label>
            </button>
            `
                    : ''
            }
            <a href="/">
              <button>
                <i class="fa-solid fa-xmark close"></i>
                <label class="hover-note">back</label>
              </button>
            </a>
          </header>
          <main class="new-note-container" id=${_id}>
            <label>
              <input class="title-input" required type="text" placeholder="Title" value="${
                  title || ''
              }"/>
              <hr class="focus-underline" />
              <hr class="underline" />
            </label>
            <label class="error title-error"></label>
            <textarea
              class="content-input"
              required
              placeholder="Content"
            >${content || ''}</textarea>
            <label class="error content-error"></label>
          </main>
        </div>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="${title ? 'edit.js' : 'save.js'}"></script>
        <script src="addSearchBox.js" /></script>
        `,
    });
};
