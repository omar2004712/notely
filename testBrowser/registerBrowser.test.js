describe('Browser test', () => {
    it('Switch between Register and log in forms', () => {
        const registerForm = document.querySelector('.register');
        const loginForm = document.querySelector('.login');

        const [loginSubSign] = document.querySelectorAll('.sub-sign');

        loginSubSign.dispatchEvent(new Event('click'));
        assert(!Array.from(loginForm.classList).includes('hidden'));
        assert(Array.from(registerForm.classList).includes('hidden'));
        loginSubSign.dispatchEvent(new Event('click'));
    });

    it('shows error messages', (done) => {
        const registerForm = document.querySelector('.register');
        registerForm.querySelector('.name').value = '';
        registerForm.querySelector('.password').value = 'passw';
        registerForm.querySelector('.confirmPassword').value = 'password';
        registerForm
            .querySelector('.register-submit')
            .dispatchEvent(new Event('click'));
        setTimeout(() => {
            // fix: delayed the assertion because the assertion will happen
            // before the request is resolved and handled
            // the 500ms delay is arbitrary in case of any errors try increasing
            // the delay 1000ms
            const nameLabel = registerForm.querySelector('.name-error');
            const passwordLabel = registerForm.querySelector('.password-error');
            const confirmPasswordLabel = registerForm.querySelector(
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
        }, 500);
    });
});
