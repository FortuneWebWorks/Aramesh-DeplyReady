import React, { useEffect, useState, useCallback } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';
import Alert, {alertsUpdate} from '../../components/Alert';
import Header from '../../components/Header';
import PhoneNumber from '../../components/PhoneNumber';
import Card from '../../components/Card';
import alertSession from '../../sessions/alertSession';
import Button from '../../components/Button';

const LoginScreen = (props) => {
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber ? props.phoneNumber : '');
  const alerts = alertSession().getSession()
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if(sessionStorage.getItem('register-form')) sessionStorage.removeItem('register-form');
  })

  const onChangeHandler = (e) => {
    if(e.target.value.length >= 0 && e.target.value.length <= 10) {
      setPhoneNumber(e.target.value);
    } else {
      alertSession().addAlert("شماره تلفن وارد شده نمی تواند از 10 رقم بیشتر باشد");
      alertsUpdate(forceUpdate);
      e.target.value = phoneNumber;
    }
  };

  const validator = () => {
    if (!phoneNumber) {
      alertSession().addAlert('لطفا شماره تماس خود را وارد کنید');
      forceUpdate()
      setTimeout(() => forceUpdate(), 5100)
      return false;
    } else if (phoneNumber.length !== 10) {
        alertSession().addAlert('شماره تلفن وارد شده معتبر نمی باشد');
        alertsUpdate(forceUpdate);
        return false;
    } else {
      return true;
    }
  };

  const redirect = async () => {
    const userExist = await fetch(`http://localhost:8000/api/user-exists/${phoneNumber}`);
    if(!await userExist.json()) {
        alertSession().addAlert('حساب کاربری با این شماره تلفن موجود نیست');
        alertsUpdate(forceUpdate);
    } else {
      Inertia.visit(`/user-confirm/${phoneNumber}`, {
          method: 'get',
          data: {
              nextRoute: '/dashboard',
          }
      })
      }
  };

  return (
    <>
      <Head>
        <title>وبسایت آرامش | ورود</title>
        <meta name="description" content="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان"/>
        <meta name="keywords" content="آرامش, aramesh, aramesh.org, aramesh.ir, aramesh_login, ورود, آرامش_ورود"/>
      </Head>
      <div
        className="bg-height-100 bg-dark login-page-container"
      >
        <Card>
          <Header title="ورود" backTo="/" />
          <div className="container login-page" style={{ marginBottom: '5vw' }}>

            {props.message && <p style={{color: 'var(--success)', marginBottom: '10%', lineHeight: '140%'}}>{props.message}</p>}
            <PhoneNumber
              onChange={(e) => onChangeHandler(e)}
              value={phoneNumber}
            />
            <Button
              text="ادامه"
              onClick={() => {
                if (validator()) redirect();
              }}
              secondary
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
    </>
  );
};

export default LoginScreen;
