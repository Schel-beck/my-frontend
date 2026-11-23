import SubjectItem from '../SubjectItem/SubjectItem.jsx';
import './SubjectList.css';
export default function SubjectList({subjects,openSubjectId,answeredQuestionIds,onToggleSubject,onSelectQuestion,query,onQueryChange}){
  const term=query.trim().toLowerCase();
  const filtered=subjects.filter(s=>s.name.toLowerCase().includes(term)||s.questions.some(q=>q.name.toLowerCase().includes(term)));
  return <div className="subjects-list-area">
    <label className="search-field"><span className="search-icon" aria-hidden="true">⌕</span>
      <span className="sr-only">Search subjects or questions</span>
      <input type="search" value={query} onChange={e=>onQueryChange(e.target.value)} placeholder="Search subjects or questions..."/>
      {query&&<button type="button" onClick={()=>onQueryChange('')} aria-label="Clear search">×</button>}
    </label>
    <div className="subject-stack">{filtered.length?filtered.map(s=><SubjectItem key={s.id} subject={s}
      isOpen={openSubjectId===s.id} answeredQuestionIds={answeredQuestionIds}
      onToggle={()=>onToggleSubject(s.id)} onSelectQuestion={q=>onSelectQuestion(q,s)}/>):
      <div className="empty-search">No subjects found. Try another search.</div>}</div>
  </div>;
}