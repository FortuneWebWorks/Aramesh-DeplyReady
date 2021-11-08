export default function alertSession() {

  function addAlert(alert) {
    let alerts;
    if(sessionStorage.getItem('alerts')) {
      alerts = JSON.parse(sessionStorage.getItem('alerts'));
    } else {
      alerts = [];
    }

    alerts.push(alert);
    setSession(alerts);
  }

  function setSession(alerts) {
    sessionStorage.setItem('alerts', JSON.stringify(alerts));
  }
  
  function getSession() {
    if(sessionStorage.getItem('alerts')) return JSON.parse(sessionStorage.getItem('alerts'));
    else return null;
  }

  return {
    addAlert,
    setSession,
    getSession
  }

}