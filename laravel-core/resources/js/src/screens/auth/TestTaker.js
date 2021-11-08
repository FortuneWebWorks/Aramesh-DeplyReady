import React, { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import RadioButton, {
    RadioButtonContainer,
} from "../../components/RadioButton";
import registerSession from "../../sessions/registerSession";

const TestTaker = () => {
    const [memberSelected, setMemberSelected] = useState();

    const { familyData } = registerSession().getRegister();

    return (
        <div className="bg-height-100 bg-dark family-supervisor">
            <Card>
                <Header title="شروع تست" backTo="/register/signup-table" />

                <div className="container supervisor-container">
                    <div className="supervisor-name-container">
                        <p>من</p>
                        <Input value={memberSelected} disabled />
                        <p>خانواده ام</p>
                    </div>
                    <div className="container radio-container">
                        <RadioButtonContainer>
                            {familyData.map((member, index) => {
                                return (
                                    <RadioButton
                                        text={member.role}
                                        value={member.role}
                                        name="family-member"
                                        onClick={(e) => {
                                            setMemberSelected(member.role);
                                        }}
                                        key={index}
                                    />
                                );
                            })}
                        </RadioButtonContainer>
                        <Button text="شروع تست" secondary />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TestTaker;
