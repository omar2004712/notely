const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const results = document.querySelector('.results');

searchButton.addEventListener('click', async () => {
    const { data: users } = await axios.get(
        `/api/users?name=${searchInput.value}`
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

    if (users.length === 0) {
        results.innerHTML =
            '<span class="not-found-msg">Found no users :(</span>';
        return;
    } else {
        results.innerHTML = '';
    }

    for (let user of users) {
        const userEl = renderUserOption(user);
        results.append(userEl);

        userEl
            .querySelector('.add-user-button')
            .addEventListener('click', async () => {
                await axios.put(
                    '/api/users',
                    {
                        userId: userEl.id,
                        noteId: new URLSearchParams(window.location.search).get(
                            'id'
                        ),
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
            });
    }
});
