const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const results = document.querySelector('.results');
const closeButton = document.querySelector('.search-box .close');

let page = 0;

searchInput.addEventListener('input', () => {
    page = 0;
    results.innerHTML = '';
});

const loadUsers = async () => {
    // Added the id of the note to execlude all the already added editors
    const { data: users } = await axios.get(
        `/api/users?name=${searchInput.value}&note=${new URLSearchParams(
            window.location.search
        ).get('id')}&page=${page}`
    );

    function renderUserOption(user) {
        const userElement = document.createElement('div');
        userElement.id = user._id;
        userElement.classList.add('dropdown-item');
        userElement.innerHTML = `
        <span>${user.name}</span>
        <i class="fa-solid fa-plus add-editor add-user-button"></i>
      `;

        return userElement;
    }

    if (users.length === 0 && page === 0) {
        results.innerHTML =
            '<span class="not-found-msg">Found no users :(</span>';
        return;
    }

    for (let user of users) {
        const userEl = renderUserOption(user);
        results.append(userEl);

        userEl
            .querySelector('.add-user-button')
            .addEventListener('click', async function () {
                axios
                    .put(
                        '/api/users',
                        {
                            userId: userEl.id,
                            noteId: new URLSearchParams(
                                window.location.search
                            ).get('id'),
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                    .then((res) => {
                        this.parentElement.remove();
                    });
            });
    }

    page++;
};

searchButton.addEventListener('click', loadUsers);

results.addEventListener('scroll', () => {
    if (results.scrollTop + results.offsetHeight >= results.scrollHeight) {
        loadUsers();
    }
});
