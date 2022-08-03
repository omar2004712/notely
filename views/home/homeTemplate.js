const layout = require('./layout');

module.exports = () => {
    return layout({
        title: 'Notely',
        content: `
          <div class="root">
            <header class="top-bar">
              <h1><a href="/">MY NOTES</a></h1>
              <button>
                <a href="/new-note">
                  <i class="fa-solid fa-circle-plus new-note-button"></i>
                  <span class="new-note-hover">New Note</span>
                </a>
              </button>
              <button>
                <a href="/api/logout">
                <i class="fa-solid fa-right-from-bracket new-note-button"></i>
                <span class="new-note-hover">Log out</span>
                </a>
              </button>
            </header>
            <main class="notes-container">
              <section class="notes-column"></section>
              <section class="notes-column"></section>
              <section class="notes-column"></section>
            </main>
          </div>
          <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
          <script src="home.js"></script>
          <script src="initial.js"></script>
          `,
    });
};
