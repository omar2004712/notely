const layout = require('./layout');

module.exports = ({ note, userId }) => {
    let title, creatorId, content, editors, _id;

    if (note) {
        title = note.title;
        content = note.content;
        creatorId = note.creatorId;
        editors = note.editors;
        _id = note._id;
    }

    // added the _id param in case of a delete we send a delete request with
    // the id of the note
    let message = 'New Note';
    if (title) {
        message = 'Edit Note';
    }

    function renderEditors(editors) {
        if (!editors) {
            return;
        }
        let result = '';
        for (let editor of editors) {
            result += `
          <div class="editor">
            <span>${editor.name}</span>
            <i class="fa-solid fa-trash delete-editor-button" id="${editor._id}"></i>
          </div>
        `;
        }

        return result;
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
        ${
            title || content
                ? `
        <div class="search-box hidden">
          <div class="close-container">
            <i class="fa-solid fa-xmark close"></i>
          </div>
          <div class="search-input-container">
            <input
              type="text"
              class="search-input"
              placeholder="Search for someone"
            />
            <i class="fa-solid fa-magnifying-glass search-button"></i>
          </div>
          <div class="results dropdown scrollbar-hidden"></div>
        </div>
        `
                : ''
        }
        <button class="show-users-button">
          <i class="fa-solid fa-angle-up"></i>
        </button>
        <div class="editors-wrapper hide">
            ${renderEditors(editors)}
        </div>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="${title || content ? 'edit.js' : 'save.js'}"></script>
        ${
            title || content
                ? `<script src="addSearchBox.js" /></script>
            <script src="addEditor.js"></script>`
                : ''
        }
        <script>
          const editorsWrapper = document.querySelector('.editors-wrapper');

          document.querySelector('.show-users-button').addEventListener('click', () => {
            const showIcon = document.querySelector('.show-users-button i');
            const isHidden = Array.from(editorsWrapper.classList).includes('hidden');
            
            editorsWrapper.classList.toggle('hide')
            showIcon.classList.toggle('flip')
          })

          editorsWrapper.querySelectorAll('.delete-editor-button').forEach((EDB) => {
            EDB.addEventListener('click', () => {
              axios.delete(\`/api/editor/\${EDB.id}/\${document.querySelector('.new-note-container').id}\`).then(() => {
                EDB.parentElement.remove()
              })
            })
          });
        </script>
        `,
    });
};
