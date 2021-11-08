import React, { useEffect, useState } from 'react';
import Alert, { alertsUpdate } from '../../components/Alert';
import Header from '../../components/Header';
import PhoneNumber from '../../components/PhoneNumber';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Inertia } from '@inertiajs/inertia';
import { useCallback } from 'react/cjs/react.development';
import alertSession from '../../sessions/alertSession';
import registerSession from '../../sessions/registerSession'

const RegisterScreen = () => {

  useEffect(() => {
    registerSession().setRegister({});
  })

  const alerts = alertSession().getSession();
  const [name, setName] = useState(registerSession().getRegister().name);
  const [phoneNumber, setPhoneNumber] = useState(registerSession().getRegister().phoneNumber);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const validator = async () => {
    if (!name) {
      alertSession().addAlert('لطفا نام و نام خانوادگی خود را وارد کنید');
      alertsUpdate(forceUpdate);
      return false;
    } else if (!phoneNumber) {
      alertSession().addAlert('لطفا شماره تماس خود را وارد کنید');
      alertsUpdate(forceUpdate);
      return false;
    } else if (phoneNumber.length !== 10) {
      alertSession().addAlert('شماره تلفن وارد شده معتبر نمی باشد');
      alertsUpdate(forceUpdate);
      return false;
    } else {
      registerSession().setRegister({
        name: name,
        phoneNumber: phoneNumber,
      })
      return true;
    }
  };

  const phoneNumberSet = (value) => {
    if(value.length >= 0 && value.length <= 10) {
      setPhoneNumber(value)
    } else {
      alertSession().addAlert("شماره تلفن وارد شده نمی تواند از 10 رقم بیشتر باشد");
      alertsUpdate(forceUpdate);
    }
  }

  const redirect = async () => {
      const userExist = await fetch(`http://localhost:8000/api/user-exists/${phoneNumber}`);
      if(await userExist.json()) {
          alertSession().addAlert('حساب کاربری با این شماره تلفن موجود است');
          alertsUpdate(forceUpdate);
      } else {
          Inertia.visit(`/register/form-1`)
      }

  };

  return (
    <div className="bg-height-100 bg-dark register-page-container">
      <Card>
        <Header title="ثبت نام" backTo="/start" />
        <div
          className="container register-page"
          style={{ marginBottom: '5vw' }}
        >
          <Input
            title="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <PhoneNumber
            value={phoneNumber}
            onChange={(e) => phoneNumberSet(e.target.value)}
          />

          <Button
            text="ادامه"
            secondary
            onClick={() => {
              if (validator()) redirect();
            }}
          />
        </div>
        {/* Alert */}
        {alerts && alerts.length > 0 ? (
          <Alert text={alerts[alerts.length - 1]} />
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default RegisterScreen;
