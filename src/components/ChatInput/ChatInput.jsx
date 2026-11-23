import {useState} from 'react';
import './ChatInput.css';
export default function ChatInput({onSend}){
  const [draft,setDraft]=useState('');
  function submit(e){e.preventDefault();if(!draft.trim())return;onSend(draft.trim());setDraft('');}
  return <form className="chat-input-area" onSubmit={submit}>
    <label className="sr-only" htmlFor="chat-answer">Your answer</label>
    <input id="chat-answer" value={draft} onChange={e=>setDraft(e.target.value)} maxLength={1000} placeholder="Write your answer..." autoComplete="off"/>
    <button className="send-button" type="submit" disabled={!draft.trim()} aria-label="Send answer">➤</button>
  </form>;
}