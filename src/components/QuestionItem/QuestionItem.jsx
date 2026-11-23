import './QuestionItem.css';
export default function QuestionItem({number,question,isAnswered,onSelect}){
  return <li className="question-item"><button type="button" className="question-button" onClick={onSelect}>
    <span className="question-number">{String(number).padStart(2,'0')}</span>
    <span className="question-title">{question.name}</span>
    {isAnswered?<span className="answered-icon" role="img" aria-label="Answered">✓</span>:
      <span className="unanswered-arrow" aria-hidden="true">→</span>}
  </button></li>;
}