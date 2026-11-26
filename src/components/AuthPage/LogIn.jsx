import { useState } from 'react';

export default function LogIn({login}) {
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);

  function onChange(event) {
    const {name, value} = event.target;
    setCredentials(previous => ({...previous, [name]: value}));
  }

  async function performLogin(event) {
    event.preventDefault();
    setPending(true);
    setNotice('');
    try {
      await login(credentials.username, credentials.password);
    } catch (error) {
      setNotice(error.message || 'Login failed.');
    } finally {
      setPending(false);
    }
  }

  return <>
    <form className="auth-form" onSubmit={performLogin}>
      <label>Username<input name="username" autoComplete="username" placeholder="Your username" value={credentials.username} onChange={onChange} disabled={pending} required/></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" placeholder="Your password" value={credentials.password} onChange={onChange} disabled={pending} required/></label>
      <button type="submit" className="primary-button" disabled={pending}>{pending ? 'Logging in…' : 'Log in'}</button>
    </form>
    {notice && <p className="auth-notice" role="alert">{notice}</p>}
  </>;
}
