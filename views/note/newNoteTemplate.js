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
        //     content: `
        //     <div class="root">
        //       <header class="header">
        //         <span>${message}</span>
        //         <i class="fa-solid fa-floppy-disk save-button">
        //           <span class="hover-note">save</span>
        //         </i>
        //         ${
        //             title
        //                 ? `
        //                 <i class="fa-solid fa-trash delete-button"  id="${_id}">
        //                   <span class="hover-note">delete</span>
        //                 </i>`
        //                 : ''
        //         }
        //         <a href="/"><i class="fa-solid fa-backward back-button">
        //           <span class="hover-note">back</span>
        //         </i></a>
        //       </header>
        //       <main>
        //         <div class="new-note-container" id=${_id}>
        //           <input
        //             class="note-title"
        //             placeholder="Title" value="${title || ''}"/>
        //           <label class="error title-error"></label>
        //           <hr />
        //           <textarea spellcheck="true" class="note-content" placeholder="Content">${
        //               content || ''
        //           }</textarea>
        //           <label class="error content-error"></label>
        //         </div>
        //       </main>
        //     </div>
        //     <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        //     <script src="${title ? 'edit.js' : 'save.js'}"></script>
        // `,
        content: `
        <div class="new-note">
          <header>
            <h1>${title || content ? 'Edit Note' : 'New note'}</h1>
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
        `,
    });
};
