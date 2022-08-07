// eslint-disable-next-line no-unused-vars
function createPage() {
    return `
    <div class="root">
        <h1>Notely</h1>
        <div class="forms">
            <div class="register">
                <header class="register-sign">
                    <div class="main-sign">Register</div>
                    <div class="sub-sign">Log In</div>
                </header>
                <main class="register-form-container">
                    <form id="register-form">
                        <input placeholder="name" class="name" />
                        <label class="error name-error"></label>
                        <input
                            type="password"
                            placeholder="password"
                            class="password"
                        />
                        <label class="error password-error"></label>
                        <input
                            type="password"
                            placeholder="confirm password"
                            class="confirmPassword"
                        />
                        <label
                            class="error confirmPassword-error"
                        ></label>
                    </form>
                    <button class="register-submit">Register</button>
                </main>
            </div>
            <div class="login hidden">
                <header class="register-sign">
                    <div class="sub-sign">Register</div>
                    <div class="main-sign">Log In</div>
                </header>
                <main class="register-form-container">
                    <form id="login-form">
                        <input placeholder="name" class="name" />
                        <label class="error name-error"></label>
                        <input
                            type="password"
                            placeholder="password"
                            class="password"
                        />
                        <label class="error password-error"></label>
                    </form>
                    <button class="login-submit">Log In</button>
                </main>
            </div>
        </div>
    </div>
    `;
}
