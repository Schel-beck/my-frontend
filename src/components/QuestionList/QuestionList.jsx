import QuestionItem from '../QuestionItem/QuestionItem.jsx';
export default function QuestionList({questions,answeredQuestionIds,onSelectQuestion}){
  return <ol className="question-list">{questions.map((q,i)=><QuestionItem key={q.id} number={i+1} question={q}
    isAnswered={answeredQuestionIds.includes(q.id)} onSelect={()=>onSelectQuestion(q)}/>)}</ol>;
}