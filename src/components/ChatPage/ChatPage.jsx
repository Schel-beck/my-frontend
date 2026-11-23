import ChatMessage from '../ChatMessage/ChatMessage.jsx';
import ChatInput from '../ChatInput/ChatInput.jsx';
import './ChatPage.css';
export default function ChatPage({question,messages,isAnswered,onSend,onBack}){
  if(!question)return <section className="chat-empty"><span className="chat-empty-icon" aria-hidden="true">✦</span>
    <h1>AI Tutor</h1><p>Choose a programming question from the subject list to start practicing.</p>
    <button type="button" className="primary-button" onClick={onBack}>Browse subjects →</button></section>;
  return <section className="chat-page" aria-label="Question and AI tutor chat">
    <button className="back-link" type="button" onClick={onBack}>← Back to subjects</button>
    <div className="chat-question-header"><div className="chat-question-icon">✦</div>
      <div className="chat-question-text"><span className="eyebrow">{question.subjectName} · QUESTION {question.id}</span><h1>{question.name}</h1></div>
      <div className={'status-chip '+(isAnswered?'status-complete':'')}><span aria-hidden="true">{isAnswered?'✓':'○'}</span><span>{isAnswered?'Answered':'Not answered yet'}</span></div>
    </div>
    <div className="chat-panel">
      <div className="chat-panel-top"><div className="tutor-heading"><span className="tutor-heading-icon">✦</span><div><strong>AI Programming Tutor</strong><small>Practice mode · frontend demo</small></div></div><span className="demo-pill">Demo</span></div>
      <div className="chat-history" aria-live="polite" aria-relevant="additions text">
        <div className="chat-day-label">Your practice conversation</div><ChatMessage role="assistant" text={question.name}/>
        {messages.map(m=><ChatMessage key={m.id} role={m.role} text={m.text}/>)}
        {!isAnswered&&<p className="chat-instruction">Your question gets a green checkmark as soon as you send your first answer.</p>}
      </div>
      <ChatInput key={question.id} onSend={onSend}/>
    </div>
  </section>;
}