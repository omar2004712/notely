const url = 'http://localhost:3000';

function switchPages() {
    document.querySelector('.register').classList.toggle('hidden');
    document.querySelector('.login').classList.toggle('hidden');
}
document
    .querySelectorAll('.sub-sign')
    .forEach((subSign) => subSign.addEventListener('click', switchPages));

document.querySelector('.login-submit').addEventListener('click', async () => {
    const form = document.querySelector('#login-form');
    const { data: res } = await axios.post(
        url + '/api/login',
        {
            name: form.querySelector('.name').value,
            password: form.querySelector('.password').value,
        },
        {
            'Content-Type': 'application/json',
        }
    );
    if (res === '/') {
        //incase of redirecting
        window.location = res;
        return;
    }

    for (let error in res) {
        const { msg } = res[error];
        document.querySelector(`#login-form .${error}-error`).innerText = msg;
    }
});

document
    .querySelector('.register-submit')
    .addEventListener('click', async () => {
        const form = document.querySelector('#register-form');
        const { data: res } = await axios.post(
            url + '/api/register',
            {
                name: form.querySelector('.name').value,
                password: form.querySelector('.password').value,
                confirmPassword: form.querySelector('.confirmPassword').value,
            },
            {
                'Content-Type': 'application/json',
            }
        );

        if (res === '/') {
            //incase of redirecting
            window.location = res;
            return;
        }

        for (let error in res) {
            const { msg } = res[error];
            document.querySelector(`#register-form .${error}-error`).innerText =
                msg;
        }
    });
