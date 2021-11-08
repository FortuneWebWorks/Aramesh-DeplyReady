export default function loaderSession() {
  function getLoader() {
    if(sessionStorage.getItem('loader')) return JSON.parse(sessionStorage.getItem('loader'));
    else return null;
  }

  function setLoader(loader) {
    sessionStorage.setItem('loader', JSON.stringify(loader))
  }

  return {
    getLoader,
    setLoader
  }
  
}