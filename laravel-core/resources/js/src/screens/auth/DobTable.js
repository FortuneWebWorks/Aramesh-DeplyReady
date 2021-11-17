import React, { useState, useCallback, useEffect } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import DropDown from "../../components/DropDown";
import Button from "../../components/Button";
import { Inertia } from "@inertiajs/inertia";
import Alert, { alertsUpdate } from "../../components/Alert";
import alertSession from "../../sessions/alertSession";
import registerSession from "../../sessions/registerSession";

const DobTable = () => {
    const [parents, setParents] = useState([]);
    const [children, setChildren] = useState([]);
    const [parentsNodes, setParentsNodes] = useState([]);
    const [childrenNodes, setChildrenNodes] = useState([]);
    const { familyNum, sonsNum, daughterNum } = registerSession().getRegister();
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState([]);
    const alerts = alertSession().getSession();
    const [inputs, setInputs] = useState({});
    const ordinalNums = [
        "فرزند اول",
        "فرزند دوم",
        "فرزند سوم",
        "فرزند چهارم",
        "فرزند پنجم",
        "فرزند ششم",
        "فرزند هفتم",
        "فرزند هشتم",
        "فرزند نهم",
        "فرزند دهم",
        "فرزند یازدهم",
        "فرزند دوازدهم",
        "فرزند سیزدهم",
        "فرزند چهاردهم",
        "فرزند پانزدهم",
        "فرزند شانزدهم",
        "فرزند هفدهم",
        "فرزند هجدهم",
        "فرزند نوزدهم",
        "فرزند بیستم",
    ];

    useEffect(() => {
        if(Number(familyNum) - (Number(sonsNum) + Number(daughterNum)) === 1) {
            registerSession().setRegister({bothParents: 'false'})
        } else {
            registerSession().setRegister({bothParents: 'true'})
        }
        if (childrenNodes.length === 0 || childrenNodes.length === undefined) {
            setFamily();
            setFamilyNodes();
        }
        if (formData.length > 0) {
            setFormData([]);
        }
    });

    const inputsValidator = (e) => {
        if (e.target.value.length >= 0 && e.target.value.length <= 2) {
            setInputs((prevInput) => {
                prevInput[
                    e.target.parentNode.parentNode.nextSibling.getAttribute(
                        "value"
                    )
                ] = e.target.value;
                return prevInput;
            });
        } else {
            forceUpdate();
            e.target.value =
                inputs[
                    e.target.parentNode.parentNode.nextSibling.getAttribute(
                        "value"
                    )
                ];
            alertSession().addAlert("عدد وارد شده باید بین 00 تا 99 باشد");
            alertsUpdate(forceUpdate);
        }
        forceUpdate();
    };

    const setFamily = () => {
        if (parents.length === 0) {
            setParents((prevParents) => {
                prevParents.push(`پدر`);
                prevParents.push(`مادر`);
                return prevParents;
            });
        }

        if (children.length === 0) {
            setChildren((prevChildren) => {
                for (let son = 0; son < Number(sonsNum); son++) {
                    prevChildren.push(`پسر`);
                }
                for (
                    let daughter = 0;
                    daughter < Number(daughterNum);
                    daughter++
                ) {
                    prevChildren.push(`دختر`);
                }
                return prevChildren;
            });
        }
    };

    const focusHandler = (e) => {
        e.target.parentElement.nextElementSibling.classList.add("focus");
    };

    const blurHandler = (e) => {
        if (e.target.value === "") {
            if (e.target.parentElement.nextElementSibling) {
                e.target.parentElement.nextElementSibling.classList.remove(
                    "focus"
                );
            }
        }
    };

    const setFamilyNodes = () => {
        if (parentsNodes.length === 0) {
            if (
                Number(familyNum) - (Number(sonsNum) + Number(daughterNum)) ===
                1
            ) {
                setParentsNodes((prevParents) => {
                    prevParents.push(
                        <tr key={Math.random()}>
                            <td className="age-container">
                                <Input
                                    min="1300"
                                    max="1395"
                                    type="number"
                                    onChange={inputsValidator}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                    placeholder="سال"
                                />
                                <div className="befNum">
                                    <p>13</p>
                                </div>
                            </td>
                            <td>
                                <DropDown
                                    data={parents}
                                    title="والد را انتخاب کنید"
                                />
                            </td>
                        </tr>
                    );
                    return prevParents;
                });
                forceUpdate();
            } else {
                setParentsNodes((prevParents) => {
                    prevParents.push(
                        <tr key={Math.random()}>
                            <td className="age-container">
                                <Input
                                    type="number"
                                    min="1300"
                                    max="1395"
                                    onChange={inputsValidator}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                    placeholder="سال"
                                />
                                <div className="befNum">
                                    <p>13</p>
                                </div>
                            </td>
                            <td value="پدر">پدر</td>
                        </tr>
                    );
                    prevParents.push(
                        <tr key={Math.random()}>
                            <td className="age-container">
                                <Input
                                    min="1300"
                                    max="1395"
                                    type="number"
                                    onChange={inputsValidator}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                    placeholder="سال"
                                />
                                <div className="befNum">
                                    <p>13</p>
                                </div>
                            </td>
                            <td value="مادر">مادر</td>
                        </tr>
                    );
                    return prevParents;
                });
                forceUpdate();
            }
        }
        if (childrenNodes.length === 0) {
            setChildrenNodes((prevChildren) => {
                for (let son = 0; son < Number(sonsNum); son++) {
                    prevChildren.push(
                        <tr key={`son${son}`}>
                            <td className="age-container">
                                <Input
                                    min="1300"
                                    max="1395"
                                    type="number"
                                    onChange={inputsValidator}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                    placeholder="سال"
                                />
                                <div className="befNum">
                                    <p>13</p>
                                </div>
                            </td>
                            <td>پسر</td>
                        </tr>
                    );
                }

                for (
                    let daughter = 0;
                    daughter < Number(daughterNum);
                    daughter++
                ) {
                    prevChildren.push(
                        <tr key={`daughter${daughter}`}>
                            <td className="age-container">
                                <Input
                                    min="1300"
                                    max="1395"
                                    type="number"
                                    onChange={inputsValidator}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                    placeholder="سال"
                                />
                                <div className="befNum">
                                    <p>13</p>
                                </div>
                            </td>
                            <td>دختر</td>
                        </tr>
                    );
                }
                return prevChildren;
            });
        }
    };

    const formSubmit = () => {
        saveData();
        sortData();
        parentsFirst();

        setTimeout(() => {
            labelChildren();
            if(Number(familyNum) - (Number(sonsNum) + Number(daughterNum)) !== 1) {
                if (emptyInputs()) {
                    registerSession().setRegister({ familyData: formData });
                    Inertia.visit("/register", {
                        method: 'post',
                        data: {
                            'data': registerSession().getRegister()
                        }
                    });
                } else {
                    alertSession().addAlert('لطفا سن تمام اعضای خانواده را وارد کنید');
                    alertsUpdate(forceUpdate);
                }
            } else {
                const formRows = document.querySelectorAll("tr");
                if(!formRows[1].childNodes[1].childNodes[0].childNodes[0].getAttribute("value").includes('پدر') && !formRows[1].childNodes[1].childNodes[0].childNodes[0].getAttribute("value").includes('مادر')) {
                    alertSession().addAlert('لطفا والد خانواده را انتخاب نمایید');
                    alertsUpdate(forceUpdate);
                } else {
                    if (emptyInputs()) {
                        registerSession().setRegister({ familyData: formData });
                        Inertia.visit("/register", {
                            method: 'post',
                            data: {
                                'data': registerSession().getRegister()
                            }
                        });
                    } else {
                        alertSession().addAlert('لطفا سن تمام اعضای خانواده را وارد کنید');
                        alertsUpdate(forceUpdate);
                    }
                }
            }
        }, 100);
    };

    const emptyInputs = () => {
        const ageOfBirths = document.querySelectorAll(".input");
        for (let i = 0; i < ageOfBirths.length; i++) {
            if (ageOfBirths[i].value === "") {
                return false;
            } else if (
                i === ageOfBirths.length - 1 &&
                ageOfBirths[i].value !== ""
            ) {
                return true;
            }
        }
        return true;
    };

    const saveData = () => {
        const formRows = document.querySelectorAll("tr");
        if (Number(familyNum) - (Number(sonsNum) + Number(daughterNum)) > 1) {
            setFormData((prevData) => {
                for (let i = 1; i < formRows.length; i++) {
                    prevData.push({
                        role: formRows[i].childNodes[1].childNodes[0].data,
                        birthDate:
                            Number(
                                formRows[i].childNodes[0].childNodes[0]
                                    .childNodes[1].value
                            ) + 1300,
                    });
                }
                return prevData;
            });
        } else {
            setFormData((prevData) => {
                for (let i = 1; i < formRows.length; i++) {
                    prevData.push({
                        role:
                            i === 1
                                ? formRows[1].childNodes[1].childNodes[0].childNodes[0].getAttribute(
                                      "value"
                                  )
                                : formRows[i].childNodes[1].childNodes[0].data,
                        birthDate:
                            Number(
                                formRows[i].childNodes[0].childNodes[0]
                                    .childNodes[1].value
                            ) + 1300,
                    });
                }
                return prevData;
            });
        }
    };

    const sortData = () => {
        setFormData((prevData) => {
            prevData.sort((el1, el2) =>
                !el1.role.includes("مادر") ? el1.birthDate - el2.birthDate : ""
            );
            return prevData;
        });
    };

    const labelChildren = () => {
        if (Number(familyNum) - Number(sonsNum) - Number(daughterNum) > 1) {
            setFormData((prevData) => {
                for (let i = 2; i < prevData.length; i++) {
                    prevData[i].role = prevData[i].role.concat(
                        " - ",
                        ordinalNums[i - 2]
                    );
                }
                return prevData;
            });
        } else {
            setFormData((prevData) => {
                for (let i = 1; i < prevData.length; i++) {
                    prevData[i].role = prevData[i].role.concat(
                        " - ",
                        ordinalNums[i - 1]
                    );
                }
                return prevData;
            });
        }
    };

    const parentsFirst = () => {
        const orderedParents = [];
        setFormData((prevData) => {
            
            for (let i = 0; i < prevData.length; i++) {
                if (prevData[i].role.includes("پدر")) {
                    orderedParents.push(prevData[i]);
                    prevData.splice(i, 1);
                }
            }
            for (let i = 0; i < prevData.length; i++) {
                if (prevData[i].role.includes("مادر")) {
                    orderedParents.push(prevData[i]);
                    prevData.splice(i, 1);
                }
            }
            const newData = orderedParents.concat(prevData)
            prevData.length = 0;
            prevData.push.apply(prevData, newData);
            return prevData;
        });
        setTimeout(() => {
            forceUpdate()
        }, 100)
    };

    return (
        <div className="bg-height-100 bg-dark signup-table">
            <Card>
                <Header title="ثبت نام" backTo="/register/form-2" />
                <p className="guide">
                    لطفا سال تولد هر عضو خانواده را وارد کنید
                </p>
                <div className="container">
                    <div className="table-container">
                        <table className="table" bordercollapse="collapse">
                            <thead>
                                <tr>
                                    <th>سال تولد</th>
                                    <th>عضو خانواده</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parentsNodes.map((parentNode) => parentNode)}
                                {childrenNodes.map(
                                    (childrenNode) => childrenNode
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Button text="ادامه" onClick={formSubmit} />
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

export default DobTable;
