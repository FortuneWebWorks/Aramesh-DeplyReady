import React from 'react';
import Card from '../components/Card';

const UserTestCompleted = () => {
  return (
    <div className="bg-height-100 bg-dark test-completed-container">
      <Card>
        <div className="container">
          <section className="test-completed">
            <h2>تمام اعضای خانواده شما تست را داده اند</h2>
            <h2>
              نتایج تست شما بررسی خواهد شد و توسط کلینیک اطلاعات بیشتر در اختیار
              شما قرار خواهد گرفت
            </h2>
            <h2>با تشکر</h2>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default UserTestCompleted;
