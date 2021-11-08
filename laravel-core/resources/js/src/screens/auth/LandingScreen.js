import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Button from '../../components/Button';
import Card from '../../components/Card';
import RadioButton, { RadioButtonContainer } from '../../components/RadioButton';

const LandingScreen = () => {
  const [userChoice, setUserChoice] = useState();

  const clickHandler = (e) => {
    if (userChoice === 'login') {
      Inertia.visit('/login', {
        method: 'get'
      })
    } else {
      Inertia.visit('/register', {
        method: 'get'
      })
    }
  };

  return (
    <div className="bg-height-100 bg-dark landingPage">
      <Card>
        <div className="container landing-page">
          <section className="landing">
            <RadioButtonContainer>
              <h5>لطفا یک گزینه را انتخاب کنید</h5>
              <RadioButton
                text="میخواهم حساب کاربری جدید بسازم."
                value="register"
                name="login/signup"
                onClick={(e) => setUserChoice(e.target.value)}
                activeCondition={userChoice}
              />
              <RadioButton
                text="حساب کاربری دارم، خودم یا یکی از اعضای خانواده ام میخواهد تست را بدهد."
                value="login"
                name="login/signup"
                onClick={(e) => setUserChoice(e.target.value)}
                activeCondition={userChoice}
              />
            </RadioButtonContainer>

            <Button text="ادامه" onClick={clickHandler} secondary />
          </section>
        </div>
      </Card>
    </div>
  );
};

export default LandingScreen;
