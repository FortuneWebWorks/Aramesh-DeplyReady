import React, { useState, useCallback } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Alert, { alertsUpdate } from '../../components/Alert';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Input from '../../components/Input';
import DropDown from "../../components/DropDown";
import alertSession from '../../sessions/alertSession';
import registerSession from '../../sessions/registerSession';

const RegisterScreenForm1 = (props) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const alerts = alertSession().getSession();
  const [city, setCity] = useState(registerSession().getRegister().city);
  const [clinic, setClinic] = useState(registerSession().getRegister().clinic);
  const [clinics, setClinics] = useState();
  const [practitioners, setPractitioners] = useState();
  const [advisor, setAdvisor] = useState(registerSession().getRegister().advisor);

  const validator = () => {
    forceUpdate();
    if (!city) {
      alertSession().addAlert('لطفا شهر خود را وارد کنید');
      alertsUpdate(forceUpdate);
      return false;
    } else if (!clinic) {

      alertSession().addAlert('لطفا کلینیک سرویس دهنده خود را انتخاب کنید');
      alertsUpdate(forceUpdate);
      return false;
    } else if (!advisor) {

      alertSession().addAlert('لطفا نام مشاور خود را وارد کنید');
      alertsUpdate(forceUpdate);
      return false;
    } else {
      registerSession().setRegister({
        city: city,
        clinic: clinic,
        advisor: advisor
      })
      return true;
    }
  };

  const changeCity = async (e) => {
    setCity(e.name)
    let clinics;
    try {
      clinics = await fetch(`http://localhost:8000/api/cities/${e.id}`);
    } catch (error) {
      clinics = await fetch(`https://localhost:8000/api/cities/${e.id}`);
    }
    setClinics(await clinics.json());
  }

  const changeClinic = async (e) => {
    setClinic(e.name)
    let practitioners;
    try {
      practitioners = await fetch(`http://localhost:8000/api/clinics/${e.id}`);
    } catch (error) {
      practitioners = await fetch(`https://localhost:8000/api/clinics/${e.id}`);
    }
    setPractitioners(await practitioners.json())
  }

  const changePractitioners = async (e) => {
    setAdvisor(e.name);
  }

  return (
    <div className="bg-height-100 bg-dark register-page-1">
      <Card>
        <Header title="ثبت نام" backTo="/register" />
        <div className="container" style={{ marginBottom: '5vw' }}>

          <div className="register-dropdown-container">
            <DropDown
              data={props.cities}
              title="شهر خود را انتخاب کنید"
              onChange={changeCity}
            />
          </div>

          <div className="register-dropdown-container">
            {clinics && 
              <DropDown
                data={clinics}
                title="کلینیک سرویس دهنده خود را انتخاب کنید"
                onChange={changeClinic}
              />
            }
          </div>

          <div className="register-dropdown-container">
            {practitioners && 
              <DropDown
                data={practitioners}
                title="مشاور خود را انتخاب کنید"
                onChange={changePractitioners}
              />
            }
          </div>
          
          <Button
            text="ادامه"
            secondary
            onClick={() => {
              if (validator()) Inertia.visit('/register/form-2');
            }}
          />
        </div>
        {/* Alert */}
        {alerts && alerts.length > 0 ? (
          <Alert text={alerts[alerts.length - 1]}/>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default RegisterScreenForm1;
