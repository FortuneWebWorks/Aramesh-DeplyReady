import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Button from '../components/Button';
import Card from '../components/Card';

const UserTestIncompleted = () => {

  const handleClick = (e) => {
    Inertia.visit('/')
  }

  return (
    <div className="bg-height-100 bg-dark test-incomplete-container">
      <Card>
        <div className="container">
          <section className="user-test-left">
            <h2>آیا عضو دیگری از خانواده میخواهد اکنون تست را بدهد؟</h2>
            <Button 
            text=" &rarr; شروع تست"
            onClick={handleClick}/>
            
            <h5>خیر امکان تست دادن بقیه اعضا اکنون وجود ندارد</h5>
          </section>
        </div>
      </Card>
    </div>
  )
}

export default UserTestIncompleted;
