describe('Browser test', () => {
    it('Switch between Register and log in forms', () => {
        const registerForm = document.querySelector('.register');
        const loginForm = document.querySelector('.login');

        const [loginSubSign, registerSubSign] =
            document.querySelectorAll('.sub-sign');

        console.log(loginSubSign);
        loginSubSign.dispatchEvent(new Event('click'));
        assert(!Array.from(loginForm.classList).includes('hidden'));
        assert(Array.from(registerForm.classList).includes('hidden'));
        loginSubSign.dispatchEvent(new Event('click'));
    });

    it('shows error messages', (done) => {
        document.querySelector('.name').value = '';
        document.querySelector('.password').value = 'passw';
        document.querySelector('.confirmPassword').value = 'password';
        document
            .querySelector('.register-submit')
            .dispatchEvent(new Event('click'));

        const nameLabel = document.querySelector('.name-error');
        const passwordLabel = document.querySelector('.password-error');
        const confirmPasswordLabel = document.querySelector(
            '.confirmPassword-error'
        );
        assert.strictEqual(
            nameLabel.innerText,
            'Name must be between 30 and 0 characters'
        );
        assert.strictEqual(
            passwordLabel.innerText,
            'password must be longer than 8 characters'
        );
        assert.strictEqual(
            confirmPasswordLabel.innerText,
            'passwords must match'
        );
        done();
    });
});
