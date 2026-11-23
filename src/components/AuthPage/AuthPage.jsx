import {useState} from 'react';
import './AuthPage.css';
export default function AuthPage(){
  const [mode,setMode]=useState('login');
  const [notice,setNotice]=useState('');
  function change(next){setMode(next);setNotice('');}
  function submit(e){e.preventDefault();setNotice('This is a frontend-only demo. Authentication will be connected to /auth/'+mode+' later.');}
  return <section className="auth-page" aria-label="Authentication demo"><div className="auth-card">
    <span className="auth-logo" aria-hidden="true">&lt;/&gt;</span><span className="eyebrow">WELCOME TO CODELEARN</span>
    <h1>{mode==='login'?'Sign in to continue':'Create an account'}</h1><p>Keep track of your programming practice.</p>
    <div className="auth-tabs" role="group" aria-label="Choose form">
      <button type="button" className={mode==='login'?'auth-tab-active':''} onClick={()=>change('login')}>Login</button>
      <button type="button" className={mode==='register'?'auth-tab-active':''} onClick={()=>change('register')}>Register</button>
    </div>
    <form className="auth-form" onSubmit={submit}>
      <label>Username<input name="username" autoComplete="username" placeholder="Your username" minLength={2} required/></label>
      {mode==='register'&&<label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label>}
      <label>Password<input name="password" type="password" autoComplete={mode==='register'?'new-password':'current-password'} minLength={6} placeholder="Your password" required/></label>
      <button type="submit" className="primary-button">{mode==='login'?'Log in':'Create account'}</button>
    </form>
    {notice&&<p className="auth-notice" role="status">{notice}</p>}
    <p className="auth-footnote">Demo UI only — no credentials are sent or stored.</p>
  </div></section>;
}