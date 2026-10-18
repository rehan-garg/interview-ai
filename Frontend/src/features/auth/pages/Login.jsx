export default function Login() {
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email adddress" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Email</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" />
                    </div>

                    <button className="button primary-button">Login</button>
                </form>
            </div>
        </main>
    )
}