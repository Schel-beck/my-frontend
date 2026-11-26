import './Navbar.css';
export default function Navbar({activePage,onNavigate,loggedIn}){
  const links=[{id:'subjects',label:'Subjects'},{id:'chat',label:'AI Chat'},{id:'login',label:loggedIn?'Account':'Login'}];
  return <header className="site-header"><div className="header-inner">
    <button className="brand" type="button" onClick={()=>onNavigate('subjects')} aria-label="CodeLearn: go to subjects">
      <span className="brand-icon" aria-hidden="true">&lt;/&gt;</span><span>Code<span className="brand-accent">Learn</span></span>
    </button>
    <nav className="top-nav" aria-label="Main navigation">{links.map(link=><button type="button" key={link.id}
      className={'nav-link '+(activePage===link.id?'nav-link-active':'')}
      aria-current={activePage===link.id?'page':undefined} onClick={()=>onNavigate(link.id)}>{link.label}</button>)}</nav>
  </div></header>;
}