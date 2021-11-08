import React, { useState, useCallback } from "react";
import { Inertia } from '@inertiajs/inertia';
import Button from "../components/Button";
import RadioButton, { RadioButtonContainer } from "../components/RadioButton";
import Card from "../components/Card";
import Header from "../components/Header";
import Alert, { alertsUpdate } from "../components/Alert";
import alertSession from "../sessions/alertSession";
import testQuestionsSession from "../sessions/testQuestionsSession";

const UserPanel = (props) => {
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
        // document.documentElement.style.setProperty(
        //     "--primary-bg-color",
        //     "green"
        // );
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
        <div className="bg-height-100 bg-dark user-panel-container dark">
            <Card>
                <Header title="پنل کاربری" noBack />
                <div className="container">
                    <h5 className="tested-people-title">
                        افرادی که تست را داده اند
                    </h5>
                    <RadioButtonContainer>
                        {props.family.map((member, index) => {
                            return member.tested === true && <RadioButton key={index} text={member.role} disabled />
                        })}
                    </RadioButtonContainer>

                
                    <h5 className="tested-people-title">
                        افرادی که هنوز تست را نداده اند
                    </h5>

                    <RadioButtonContainer>

                        {props.family.map((member, index) => {
                            return (
                                member.tested === false &&
                                <RadioButton
                                    key={index}
                                    text={member.role}
                                    value={member.role}
                                    name="not-tested-person"
                                    onClick={selected}
                                    activeCondition={testMember === member.role}
                                />
                            )
                        })}
                    </RadioButtonContainer>
                    <h4 className="user-panel-footer-text">
                        عضو هایی که تست را نداده اند اکنون میتوانند تست را
                        بدهند:
                    </h4>
                    <Button text=" شروع تست" onClick={startTest} />
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

export default UserPanel;
