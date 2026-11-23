import './ChatMessage.css';
export default function ChatMessage({role,text}){
  const isUser=role==='user';
  return <div className={'message-row '+(isUser?'message-row-user':'')}>
    <span className={'message-avatar '+(isUser?'message-avatar-user':'')} aria-hidden="true">{isUser?'◉':'✦'}</span>
    <div className="message-content"><span className="message-author">{isUser?'You':'AI Tutor'}</span>
      <div className={'message-bubble '+(isUser?'message-bubble-user':'')}>{text}</div></div>
  </div>;
}