export default function testQuestionsSession() {
  function getQuestions() {
    if(sessionStorage.getItem('questions')) return JSON.parse(sessionStorage.getItem('questions'));
    else return null;
  }

  function setQuestions(questions) {
    sessionStorage.setItem('questions', JSON.stringify(questions));
  }

  return {
    getQuestions,
    setQuestions
  }
  
}