const layout = require('./layout');

module.exports = () =>
    layout({
        title: 'Notely',
        content: `
          <header class="top-bar">
          <span class="web-title">My Notes</span>
          <button>
            <i class="fa-solid fa-ellipsis-vertical options-icon"></i>
            <ul class="dropdown hidden">
              <li>
                <a href="/new-note">
                  <div>New Note</div>
                  <i class="fa-solid fa-plus"></i>
                </a>
              </li>
              <li>
                <a href="/api/logout">
                  <div>Log out</div>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </a>
              </li>
            </ul>
          </button>
          </header>
          <div class="top-bar-placeholder"></div>
          <div class="center">
            <main class="notes-container"></main>
          </div>

          <script>
            document.querySelector(".options-icon").addEventListener("click", () => {
              document.querySelector(".dropdown").classList.toggle("hidden");
            });

            document.addEventListener("scroll", () => {
              if (window.scrollY === 0) {
                document.querySelector("header").style.boxShadow =
                  "0 0 0 transparent";
                return;
              }

              document.querySelector("header").style.boxShadow =
                "0 0 10px rgba(0, 0, 0, 0.3)";
            });
            document.addEventListener('click', (event) => {
              const dropdown = document.querySelector('.dropdown')
              if(event.target === dropdown || event.target === document.querySelector('.options-icon')) {
                return;
              }

              dropdown.classList.add('hidden')
            })
          </script>
          <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
          <script src="home.js"></script>
          <script src="initial.js"></script>
          `,
    });
