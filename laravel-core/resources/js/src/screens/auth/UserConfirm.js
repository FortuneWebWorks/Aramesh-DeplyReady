import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Input from '../../components/Input';
import PhoneNumber from '../../components/PhoneNumber';
import alertSession from '../../sessions/alertSession';

const UserConfirm = (props) => {
  const { phoneNumber } = props;
  const [counter, setCounter] = useState();
  const [code, setCode] = useState();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const alerts = alertSession().getSession();
  const refs = useRef([]);

  useEffect(() => {
    if (counter === 0) clearInterval(refs.current.hello || '');
    if (props.errors && props.errors[0]) {
      setTimeout(() => {
        delete props.errors[0];
        forceUpdate();
      }, 5100);
    }
  });

  const counterHandler = async () => {
    if (counter === 0 || counter === undefined) {
      let codeRequest;
      try {
        codeRequest = await fetch('http://localhost:3000/api/user-confirm', {
          method: 'POST',
          body: JSON.stringify({ 'phone-number': phoneNumber }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        codeRequest = await fetch('https://localhost:3000/api/user-confirm', {
          method: 'POST',
          body: JSON.stringify({ 'phone-number': phoneNumber }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      const codeResponse = await codeRequest.json();
      if (codeResponse.success) {
        alertSession().addAlert(codeResponse.message);
        alertsUpdate();
        setCounter(60);

        refs.current.hello = setInterval(() => {
          setCounter((prevCounter) => {
            if (prevCounter > 0) return prevCounter - 1;
          });
        }, 1000);
      } else {
        alertSession().addAlert(codeResponse.message);
        alertsUpdate();
      }
    }
  };

  const validator = () => {
    if (!code) {
      alertSession().addAlert('لطفا کد را وارد کنید');
      alertsUpdate();
      return false;
    } else {
      return true;
    }
  };

  const alertsUpdate = () => {
    forceUpdate();
    setTimeout(() => forceUpdate(), 5100);
  };

  const redirect = async () => {
    Inertia.post('/login', {
      'phone-number': phoneNumber,
      password: '',
      code: code,
    });
  };

  return (
    <div className="bg-height-100 bg-dark user-confirm-container">
      <Card errors={props.errors}>
        <div className="container user-confirm">
          <Header title="ورود کاربران" backTo="/login" />

          <PhoneNumber
            title="کد ارسال شده به شماره"
            value={phoneNumber}
            disabled
          />

          <Input
            title="را وارد کنید"
            type="number"
            onChange={(e) => setCode(e.target.value)}
          />

          <p className="user-confirm-links" onClick={counterHandler}>
            دوباره برایم بفرست {counter > 0 ? `(${counter})` : ''}
          </p>
          <Link href="/login" className="user-confirm-links secondary-color">
            شماره ام را اشتباه وارد کرده ام{' '}
          </Link>
          <Button
            text="ادامه"
            onClick={() => {
              if (validator()) redirect();
            }}
            secondary
          />
        </div>

        {/* Alert */}
        {(alerts && alerts.length > 0) || (props.errors && props.errors[0]) ? (
          <Alert text={props.errors[0] || alerts[alerts.length - 1]} />
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default UserConfirm;
