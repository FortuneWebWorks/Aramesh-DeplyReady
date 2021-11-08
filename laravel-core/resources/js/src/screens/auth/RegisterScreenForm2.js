import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useCallback } from "react/cjs/react.development";
import Alert, { alertsUpdate } from "../../components/Alert";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import alertSession from "../../sessions/alertSession";
import registerSession from "../../sessions/registerSession";

const RegisterScreenForm2 = () => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const alerts = alertSession().getSession();
    const [familyNum, setFamilyNum] = useState(
        registerSession().getRegister().familyNum
    );
    const [sonsNum, setSonsNum] = useState(
        registerSession().getRegister().sonsNum
    );
    const [daughterNum, setDaughterNum] = useState(
        registerSession().getRegister().daughterNum
    );

    const validator = () => {
        if (!familyNum) {
            alertSession().addAlert("لطفا تعداد اعضای خانواده را وارد کنید");
            alertsUpdate(forceUpdate);
            return false;
        } else if (!sonsNum) {
            alertSession().addAlert(
                "لطفا تعداد فرزندان پسر خانواده را وارد کنید"
            );
            alertsUpdate(forceUpdate);
            return false;
        } else if (!daughterNum) {
            alertSession().addAlert(
                "لطفا تعداد فرزندان دختر خانواده را وارد کنید"
            );
            alertsUpdate(forceUpdate);
            return false;
        } else if (Number(familyNum) <= Number(sonsNum) + Number(daughterNum)) {
            alertSession().addAlert(
                "مجموع تعداد فرزندان نمی تواند مساوی یا بیشتر از تعداد اعضای خانواده باشد"
            );
            alertsUpdate(forceUpdate);
            return false;
        } else {
            registerSession().setRegister({
                familyNum: familyNum,
                sonsNum: sonsNum,
                daughterNum: daughterNum,
            });
            return true;
        }
    };

    const redirect = () => {
        if (validator()) {
            Inertia.visit("/register/dob");
        }
    };

    return (
        <div className="bg-height-100 bg-dark register-page-2">
            <Card>
                <Header title="ثبت نام" backTo="/register/form-1" />
                <p className="guide">
                    لطفا تعداد کل خانواده و سپس فرزندان را وارد کنید.
                </p>
                <div className="container" style={{ marginBottom: "5vw" }}>
                    <Input
                        title="تعداد اعضای خانواده"
                        type="number"
                        value={familyNum}
                        onChange={(e) => setFamilyNum(e.target.value)}
                    />

                    <Input
                        title="تعداد فرزندان پسر خانواده"
                        type="number"
                        value={sonsNum}
                        onChange={(e) => setSonsNum(e.target.value)}
                    />

                    <Input
                        title="تعداد فرزندان دختر خانواده"
                        className="mb-3"
                        type="number"
                        value={daughterNum}
                        onChange={(e) => setDaughterNum(e.target.value)}
                    />

                    <Button text="ادامه" onClick={redirect} secondary />
                </div>
                {/* Alert */}
                {alerts && alerts.length > 0 ? (
                    <Alert text={alerts[alerts.length - 1]} />
                ) : (
                    ""
                )}
            </Card>
        </div>
    );
};

export default RegisterScreenForm2;
