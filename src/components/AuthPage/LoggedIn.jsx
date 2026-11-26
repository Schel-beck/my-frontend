import facade from '../../apiFacade.js';
import './AuthPage.css';

export default function LoggedIn({logout}) {
  const tokenData = facade.getTokenData();
  const username = tokenData?.username || tokenData?.sub;

  return <section className="auth-page" aria-label="Account">
    <div className="auth-card">
      <span className="auth-logo" aria-hidden="true">&lt;/&gt;</span>
      <span className="eyebrow">WELCOME TO CODELEARN</span>
      <h1>{username ? 'Welcome, ' + username : 'You are logged in'}</h1>
      <p>Your login session is active.</p>
      <button type="button" className="primary-button" onClick={logout}>Logout</button>
    </div>
  </section>;
}
