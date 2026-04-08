import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 900px;
    min-height: 560px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .panel-left {
    background: linear-gradient(135deg, #1a0533 0%, #0d1a40 50%, #001a1a 100%);
    padding: 60px 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .panel-left::before {
    content: '';
    position: absolute;
    top: -80px; left: -80px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(120,40,200,0.35) 0%, transparent 70%);
    pointer-events: none;
  }

  .panel-left::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -60px;
    width: 250px; height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,180,160,0.25) 0%, transparent 70%);
    pointer-events: none;
  }

  .brand {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .brand span { color: #7b4fd4; }

  .left-copy { position: relative; z-index: 1; }

  .left-copy h2 {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.15;
    color: #fff;
    margin-bottom: 16px;
  }

  .left-copy h2 em {
    font-style: italic;
    color: #a78bfa;
  }

  .left-copy p {
    color: rgba(255,255,255,0.5);
    font-size: 14px;
    line-height: 1.7;
    font-weight: 300;
  }

  .decorative-line {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, #7b4fd4, #00b4a0);
    margin-bottom: 20px;
  }

  .panel-right {
    background: #f7f5f0;
    padding: 60px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-header {
    margin-bottom: 36px;
  }

  .form-header h3 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: #111;
    margin-bottom: 6px;
  }

  .form-header p {
    font-size: 13px;
    color: #888;
    font-weight: 300;
  }

  .field {
    margin-bottom: 20px;
    position: relative;
  }

  .field label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 8px;
  }

  .field input {
    width: 100%;
    padding: 13px 16px;
    background: #fff;
    border: 1.5px solid #e0dcd5;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #111;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field input:focus {
    border-color: #7b4fd4;
    box-shadow: 0 0 0 3px rgba(123,79,212,0.12);
  }

  .field input.error { border-color: #e05252; }

  .error-msg {
    font-size: 11px;
    color: #e05252;
    margin-top: 5px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .remember {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    user-select: none;
  }

  .remember input { accent-color: #7b4fd4; cursor: pointer; }

  .forgot {
    font-size: 12px;
    color: #7b4fd4;
    text-decoration: none;
    cursor: pointer;
  }

  .forgot:hover { text-decoration: underline; }

  .btn-submit {
    width: 100%;
    padding: 15px;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    position: relative;
    overflow: hidden;
  }

  .btn-submit:hover { background: #7b4fd4; }
  .btn-submit:active { transform: scale(0.99); }
  .btn-submit.loading { pointer-events: none; opacity: 0.7; }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    color: #bbb;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ddd;
  }

  .btn-google {
    width: 100%;
    padding: 13px;
    background: #fff;
    border: 1.5px solid #e0dcd5;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .btn-google:hover { border-color: #7b4fd4; box-shadow: 0 0 0 3px rgba(123,79,212,0.08); }

  .signup-link {
    margin-top: 24px;
    text-align: center;
    font-size: 12px;
    color: #888;
  }

  .signup-link a { color: #7b4fd4; text-decoration: none; font-weight: 500; cursor: pointer; }
  .signup-link a:hover { text-decoration: underline; }

  .success-banner {
    background: #e8f5e9;
    border: 1px solid #a5d6a7;
    border-radius: 3px;
    padding: 12px 16px;
    font-size: 13px;
    color: #2e7d32;
    margin-bottom: 20px;
    animation: fadeIn 0.3s ease;
  }

  .error-banner {
    background: #fdecea;
    border: 1px solid #f5c6cb;
    border-radius: 3px;
    padding: 12px 16px;
    font-size: 13px;
    color: #c0392b;
    margin-bottom: 20px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .modal {
    background: #f7f5f0;
    padding: 40px;
    border-radius: 8px;
    width: 420px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }

  .modal h3 {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: #111;
    margin-bottom: 24px;
  }

  .modal-field {
    margin-bottom: 14px;
  }

  .modal-field label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 6px;
  }

  .modal-field input {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid #e0dcd5;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #111;
    outline: none;
    transition: border-color 0.2s;
  }

  .modal-field input:focus {
    border-color: #7b4fd4;
    box-shadow: 0 0 0 3px rgba(123,79,212,0.12);
  }

  .btn-register {
    width: 100%;
    padding: 14px;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s;
  }

  .btn-register:hover { background: #7b4fd4; }

  .btn-cancel {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 1.5px solid #ddd;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    margin-top: 10px;
    color: #666;
    transition: border-color 0.2s;
  }

  .btn-cancel:hover { border-color: #7b4fd4; color: #7b4fd4; }

  @media (max-width: 700px) {
    .container { grid-template-columns: 1fr; width: 100%; min-height: auto; border-radius: 0; }
    .panel-left { padding: 40px 32px; }
    .left-copy h2 { font-size: 30px; }
    .panel-right { padding: 40px 32px; }
    .modal { width: 90%; padding: 28px; }
  }
`;

export default function LoginPage() {
    // ─── Login State ───────────────────────────────────────────
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState("");

    // ─── Register State ────────────────────────────────────────
    const [isRegister, setIsRegister] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        name: "", email: "", password: "", phone: "", address: ""
    });
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState("");
    const [registerError, setRegisterError] = useState("");

    // ─── Login Validation ──────────────────────────────────────
    const validate = () => {
        const e = {};
        if (!form.email) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 6) e.password = "Minimum 6 characters";
        return e;
    };

    // ─── Login Submit → calls Spring Boot /api/auth/login ──────
    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setLoginError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                setLoginError("Invalid email or password. Please try again.");
            }
        } catch (err) {
            setLoginError("Cannot connect to server. Make sure backend is running.");
        }

        setLoading(false);
    };

    const handleChange = (field, value) => {
        setForm(f => ({ ...f, [field]: value }));
        if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
    };

    // ─── Register Submit → calls Spring Boot /api/auth/register ─
    const handleRegister = async () => {
        if (!registerForm.name || !registerForm.email || !registerForm.password) {
            setRegisterError("Name, Email and Password are required.");
            return;
        }
        setRegisterError("");
        setRegisterLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: registerForm.name,
                    email: registerForm.email,
                    password: registerForm.password,
                    phone: registerForm.phone,
                    address: registerForm.address
                }),
            });

            if (response.ok) {
                setRegisterSuccess("Account created! Please sign in.");
                setRegisterForm({ name: "", email: "", password: "", phone: "", address: "" });
                setTimeout(() => {
                    setIsRegister(false);
                    setRegisterSuccess("");
                }, 2000);
            } else {
                setRegisterError("Registration failed. Email may already exist.");
            }
        } catch (err) {
            setRegisterError("Cannot connect to server. Make sure backend is running.");
        }

        setRegisterLoading(false);
    };

    const handleRegisterChange = (field, value) => {
        setRegisterForm(f => ({ ...f, [field]: value }));
    };

    // ─── UI ────────────────────────────────────────────────────
    return (
        <>
            <style>{styles}</style>
            <div className="container">

                {/* ── Left Panel ── */}
                <div className="panel-left">
                    <div className="brand">Arc<span>.</span></div>
                    <div className="left-copy">
                        <div className="decorative-line" />
                        <h2>Welcome<br />back to<br /><em>your space.</em></h2>
                        <p>Sign in to continue building,<br />creating, and exploring.</p>
                    </div>
                </div>

                {/* ── Right Panel (Login Form) ── */}
                <div className="panel-right">
                    <div className="form-header">
                        <h3>Sign in</h3>
                        <p>Enter your credentials to access your account</p>
                    </div>

                    {/* Success Banner */}
                    {success && (
                        <div className="success-banner">✓ Login successful! Redirecting…</div>
                    )}

                    {/* Error Banner */}
                    {loginError && (
                        <div className="error-banner">✗ {loginError}</div>
                    )}

                    {/* Email Field */}
                    <div className="field">
                        <label>Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            className={errors.email ? "error" : ""}
                            onChange={e => handleChange("email", e.target.value)}
                        />
                        {errors.email && <div className="error-msg">{errors.email}</div>}
                    </div>

                    {/* Password Field */}
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            className={errors.password ? "error" : ""}
                            onChange={e => handleChange("password", e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                        {errors.password && <div className="error-msg">{errors.password}</div>}
                    </div>

                    <div className="row">
                        <label className="remember">
                            <input
                                type="checkbox"
                                checked={form.remember}
                                onChange={e => handleChange("remember", e.target.checked)}
                            />
                            Remember me
                        </label>
                        <span className="forgot">Forgot password?</span>
                    </div>

                    {/* Login Button */}
                    <button
                        className={`btn-submit${loading ? " loading" : ""}`}
                        onClick={handleSubmit}
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>

                    <div className="divider">or</div>

                    {/* Google Button */}
                    <button className="btn-google">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Switch to Register */}
                    <div className="signup-link">
                        Don't have an account?{" "}
                        <a onClick={() => { setIsRegister(true); setRegisterError(""); setRegisterSuccess(""); }}>
                            Create one
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Register Modal ── */}
            {isRegister && (
                <div className="overlay">
                    <div className="modal">
                        <h3>Create Account</h3>

                        {registerSuccess && (
                            <div className="success-banner">✓ {registerSuccess}</div>
                        )}
                        {registerError && (
                            <div className="error-banner">✗ {registerError}</div>
                        )}

                        {[
                            { field: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                            { field: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                            { field: "password", label: "Password", type: "password", placeholder: "••••••••" },
                            { field: "phone", label: "Phone Number", type: "text", placeholder: "+1 234 567 8900" },
                            { field: "address", label: "Address", type: "text", placeholder: "123 Main St, City" },
                        ].map(({ field, label, type, placeholder }) => (
                            <div className="modal-field" key={field}>
                                <label>{label}</label>
                                <input
                                    type={type}
                                    placeholder={placeholder}
                                    value={registerForm[field]}
                                    onChange={e => handleRegisterChange(field, e.target.value)}
                                />
                            </div>
                        ))}

                        <button
                            className="btn-register"
                            onClick={handleRegister}
                            disabled={registerLoading}
                        >
                            {registerLoading ? "Creating Account…" : "Create Account"}
                        </button>

                        <button
                            className="btn-cancel"
                            onClick={() => setIsRegister(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
