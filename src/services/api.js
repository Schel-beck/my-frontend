// Reserved for later backend integration. The current app uses mock data.
const API_URL=import.meta.env.VITE_API_URL || 'https://learning.deployedcode.dk';
async function jsonRequest(path,options={}){
  const response=await fetch(API_URL+path,options);
  if(!response.ok)throw new Error('API request failed ('+response.status+')');
  return response.json();
}
export const fetchSubjects=()=>jsonRequest('/subjects');
export const fetchQuestions=()=>jsonRequest('/questions');
export const fetchSubject=id=>jsonRequest('/subjects/'+encodeURIComponent(id));
export const sendChatToApi=contents=>jsonRequest('/chat',{
  method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents})
});