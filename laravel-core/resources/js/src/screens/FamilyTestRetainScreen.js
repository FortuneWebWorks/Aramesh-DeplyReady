import React, { useCallback, useState } from 'react'
import RadioButton, { RadioButtonContainer }  from '../components/RadioButton';
import Button from '../components/Button';
import { Inertia } from '@inertiajs/inertia';
import Card from '../components/Card';
import alertSession from '../sessions/alertSession';
import testQuestionsSession from '../sessions/testQuestionsSession';

const FamilyTestRetained = (props) => {

  const [testMember, setTestMember] = useState();
  const [memberType, setMemberType] = useState();
  const [data, setData] = useState(props.data.children);
  const [questions, setQuestions] = useState(props.data);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const alerts = alertSession().getSession();


  const selected = (e) => {
    setTestMember(e.target.value)
    if (
        e.target.value.includes("فرزند")
    ) {
        setMemberType("children");
    } else {
        setMemberType("parent");
    }
  };

  const startTest = (e) => {
    if (memberType) {
      if (memberType === 'parent') {
        changeQuestions()
      } else {
        setData(questions.children)
      }
      forceUpdate()
      setTimeout(() => {
        testQuestionsSession().setQuestions(data)
      }, 100)
      Inertia.visit(`/test/${memberType}/${testMember}`, { method: 'get' })
    } else {

      alertSession().addAlert('لطفا فردی که مایل به شروع تست است را انتخاب نمایید');
      alertsUpdate(forceUpdate);
      setTimeout(() => {
        forceUpdate()
      }, 5100)
    }
  };

  const changeQuestions = () => {
      for (let i = 0; i < questions.parents.length; i++) {
          for (let j = 0; j < data.length; j++) {
              if (questions.parents[i].id === data[j].id) {
                  setData((prevData) => {
                      prevData[j].question = questions.parents[i].question;
                      return prevData;
                  });
              }
          }
      }
  };

  return (
    <div className="bg-height-100 bg-dark test-retain-container">
      <Card>
        <div className="container">
          <h2>لطفا هرچه زودتر اقدام به تکمیل تست خود کنید.</h2>
          <h2>تا زمانی که همه افراد تست را تکمیل نکرده اند، تست ناقص است</h2>
          <div className="tested-people-section">
            <h5 className="tested-people-title">افرادی که هنوز تست را نداده اند</h5>

            <RadioButtonContainer>
              {
                props.family.map((member, index) => {
                  return (
                    member.tested == false &&
                    <RadioButton
                        key={index}
                        text={member.role}
                        value={member.role}
                        onClick={selected}
                        name="not-tested-person"
                    />
                  )
                })
              }
            </RadioButtonContainer>
          </div>
          <Button 
          text="شروع تست"
          onClick={startTest}
          secondary/>
        </div>
        {/* Alert */}
        {alerts && alerts.length > 0 ? (
          <Alert text={alerts[alerts.length - 1]}/>
        ) : (
            ''
        )}
      </Card>
    </div>
  )
}

export default FamilyTestRetained;
