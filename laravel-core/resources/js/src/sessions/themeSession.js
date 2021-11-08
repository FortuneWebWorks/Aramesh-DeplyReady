export default function themeSession() {

  function setSession(dark) {
    sessionStorage.setItem('light-theme', JSON.stringify(dark));
    setTheme();
  }
  
  function getSession() {
    if(sessionStorage.getItem('light-theme')) return JSON.parse(sessionStorage.getItem('light-theme'));
    else return null;
  }
  
  function setTheme() {
    let light = sessionStorage.getItem('light-theme') ? JSON.parse(sessionStorage.getItem('light-theme')) : true;
    const app = document.getElementById('app');
    if (!app.classList.contains(light ? 'light' : 'dark')) {
      app.classList.remove(light ? 'dark' : 'light');
      app.classList.add(light ? 'light' : 'dark');
    }
  }

  return {
    getSession,
    setSession,
    setTheme
  }
  
};