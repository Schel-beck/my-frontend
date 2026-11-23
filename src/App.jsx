import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import SubjectList from './components/SubjectList/SubjectList.jsx';
import ChatPage from './components/ChatPage/ChatPage.jsx';
import AuthPage from './components/AuthPage/AuthPage.jsx';
import './App.css';

// Step 3: dummy data in App, passed down with props. API-compatible names and IDs.
const subjects = [
  {id:1,name:'Java',icon:'☕',description:'Object-oriented programming',questions:[
    {id:101,name:'What is a variable in Java?'},{id:102,name:'What is a class in Java?'},
    {id:103,name:'What is inheritance?'},{id:104,name:'What is the difference between an interface and a class?'}]},
  {id:2,name:'SQL',icon:'▤',description:'Databases and queries',questions:[
    {id:201,name:'What is a primary key?'},{id:202,name:'What is the difference between INNER JOIN and LEFT JOIN?'},
    {id:203,name:'What is database normalization?'}]},
  {id:3,name:'Web Development',icon:'⌘',description:'HTML, CSS and HTTP',questions:[
    {id:301,name:'What is semantic HTML?'},{id:302,name:'What is the CSS box model?'},
    {id:303,name:'What does a REST API do?'}]},
  {id:4,name:'JavaScript',icon:'JS',description:'Fundamentals of web scripting',questions:[
    {id:401,name:'What is the difference between let and const?'},{id:402,name:'What is a JavaScript function?'},
    {id:403,name:'What is an event handler?'}]}
];
const STORAGE_KEY='codelearn-demo-answered-v1';
function readProgress(){
  try {
    const data=JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(data) ? data.filter(Number.isInteger) : [];
  } catch { return []; }
}
export default function App(){
  const [page,setPage]=useState('subjects');
  const [openSubjectId,setOpenSubjectId]=useState(1);
  const [question,setQuestion]=useState(null);
  const [answeredIds,setAnsweredIds]=useState(readProgress);
  const [conversations,setConversations]=useState({});
  const [query,setQuery]=useState('');
  useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(answeredIds));},[answeredIds]);
  const total=subjects.reduce((n,s)=>n+s.questions.length,0);
  const done=subjects.reduce((n,s)=>n+s.questions.filter(q=>answeredIds.includes(q.id)).length,0);
  function selectQuestion(q,s){
    setQuestion({...q,subjectName:s.name,subjectId:s.id});
    setOpenSubjectId(s.id);
    setPage('chat');
  }
  function sendAnswer(message){
    const answer=message.trim();
    if(!answer || !question) return;
    const id=question.id;
    // Step 4: Answered on first sent reply. No AI correctness check.
    setAnsweredIds(prev=>prev.includes(id)?prev:[...prev,id]);
    setConversations(prev=>({...prev,[id]:[
      ...(prev[id]||[]),
      {id:id+'-u-'+Date.now(),role:'user',text:answer},
      {id:id+'-demo-'+Date.now(),role:'assistant',text:'Thanks for your answer! ✓ This question is now marked as answered. AI feedback will appear here when the API is connected.'}
    ]}));
  }
  function resetProgress(){setAnsweredIds([]);setConversations({});}
  return <div className="app-shell">
    <Navbar activePage={page} onNavigate={setPage}/>
    <main className="main-content">
      {page==='subjects' && <section aria-labelledby="subjects-heading">
        <div className="intro-panel">
          <div><span className="eyebrow">YOUR LEARNING SPACE</span><h1 id="subjects-heading">Programming Subjects</h1>
            <p>All your programming topics in one place. Pick a question and practice with your AI tutor.</p>
            <div className="summary-pills"><span className="summary-pill">◫ &nbsp;{subjects.length} subjects</span><span className="summary-pill">☑ &nbsp;{done} / {total} answered</span></div>
          </div>
          <div className="hero-illustration" aria-hidden="true"><div className="hero-orb"/><div className="hero-screen"><span>&lt;/&gt;</span></div><div className="hero-book hero-book-one"/><div className="hero-book hero-book-two"/><div className="hero-plant">✦</div></div>
        </div>
        <div className="subjects-toolbar"><div><h2>Choose a subject</h2><p>Open a subject to see all of its practice questions.</p></div><button className="text-button" type="button" onClick={resetProgress}>Reset demo progress</button></div>
        <SubjectList subjects={subjects} openSubjectId={openSubjectId} answeredQuestionIds={answeredIds}
          onToggleSubject={id=>setOpenSubjectId(prev=>prev===id?null:id)}
          onSelectQuestion={selectQuestion} query={query} onQueryChange={setQuery}/>
      </section>}
      {page==='chat' && <ChatPage question={question} messages={question?(conversations[question.id]||[]):[]}
        isAnswered={question?answeredIds.includes(question.id):false} onSend={sendAnswer} onBack={()=>setPage('subjects')}/>}
      {page==='login' && <AuthPage/>}
    </main>
    <footer className="site-footer"><span>CodeLearn · React frontend prototype</span><span>Demo data · Backend unchanged</span></footer>
  </div>;
}