import QuestionList from '../QuestionList/QuestionList.jsx';
import './SubjectItem.css';
export default function SubjectItem({subject,isOpen,answeredQuestionIds,onToggle,onSelectQuestion}){
  const completed=subject.questions.filter(q=>answeredQuestionIds.includes(q.id)).length;
  const panelId='subject-panel-'+subject.id;
  return <article className={'subject-card '+(isOpen?'subject-card-open':'')}>
    <h3 className="subject-card-heading"><button type="button" className="subject-toggle" onClick={onToggle} aria-expanded={isOpen} aria-controls={panelId}>
      <span className={'subject-symbol '+(subject.name==='JavaScript'?'subject-symbol-js':'')} aria-hidden="true">{subject.icon}</span>
      <span className="subject-description-group"><span className="subject-name">{subject.name}</span><span className="subject-description">{subject.description}</span></span>
      <span className="subject-meta">{completed}/{subject.questions.length} answered</span>
      <span className={'toggle-chevron '+(isOpen?'toggle-chevron-up':'')} aria-hidden="true">⌄</span>
    </button></h3>
    {isOpen&&<div className="subject-panel" id={panelId}><div className="question-list-intro"><span>Practice questions</span><span>Click a question to open AI Tutor</span></div>
      <QuestionList questions={subject.questions} answeredQuestionIds={answeredQuestionIds} onSelectQuestion={onSelectQuestion}/></div>}
  </article>;
}