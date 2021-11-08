export default function registerSession() {

  function getRegister() {
    if(sessionStorage.getItem('register-form')) return JSON.parse(sessionStorage.getItem('register-form'));
    else return {
      name: '',
      city: '',
      clinic: '',
      advisor: '',
      familyNum: '',
      sonsNum: '',
      daughterNum: '',
      phoneNumber: '',
      familyData: [],
      bothParents: true
    };
  }

  function setRegister(data) {
    let newData;
    if(sessionStorage.getItem('register-form')) {
      let prevData = JSON.parse(sessionStorage.getItem('register-form'));
      newData = {
        name: data.name ? data.name : prevData.name,
        city: data.city ? data.city : prevData.city,
        clinic: data.clinic ? data.clinic : prevData.clinic,
        advisor: data.advisor ? data.advisor : prevData.advisor,
        familyNum: data.familyNum ? data.familyNum : prevData.familyNum,
        sonsNum: data.sonsNum ? data.sonsNum : prevData.sonsNum,
        daughterNum: data.daughterNum ? data.daughterNum : prevData.daughterNum,
        phoneNumber: data.phoneNumber ? data.phoneNumber : prevData.phoneNumber,
        familyData: data.familyData ? data.familyData : prevData.familyData,
        bothParents: data.bothParents ? data.bothParents : prevData.bothParents
      }
    } else {
      newData = {
        name: data.name ? data.name : '',
        city: data.city ? data.city : '',
        clinic: data.clinic ? data.clinic : '',
        advisor: data.advisor ? data.advisor : '',
        familyNum: data.familyNum ? data.familyNum : '',
        sonsNum: data.sonsNum ? data.sonsNum : '',
        daughterNum: data.daughterNum ? data.daughterNum : '',
        phoneNumber: data.phoneNumber ? data.phoneNumber : '',
        familyData: data.familyData ? data.familyData : [],
        bothParents: data.bothParents ? data.bothParents : true
      }
    }

    sessionStorage.setItem('register-form', JSON.stringify(newData));
  }

  return {
    getRegister,
    setRegister
  }
  
}