import { useEffect, useState } from 'react';
import './Stud.css';

const Students = () => {
    const demoClasses = [
        [
            { firstName: "", lastName: "", gender: "" }
        ]
    ]
    const [myClass, setMyClass] = useState(demoClasses);
    const [checkValidations, setCheckValidations] = useState(false);

    const addClass = () => {
        setMyClass([...myClass,[]])
    }

    const addStudent = (classIndex) => {
        let tempClasses = [...myClass];
        tempClasses[classIndex].push({ firstName: "", lastName: "", gender: "" });
        setMyClass(tempClasses);
    }

    const studentsHandler = (e,classIndex,studIndex) => {
        let name = e.target.name.split("_")[0];
        console.log("name::: ", name, " value::: ", e.target.value, " classIndex:::: ", classIndex, "studIndex:::: ", studIndex)
        let tempClasses = [...myClass];
        tempClasses[classIndex][studIndex][name] = e.target.value;
        setMyClass(tempClasses)
    }

    const checkClassValidation = () => {
        for(let i=0;i<myClass.length;i++){
            for(let j=0;j<myClass[i].length;j++){
                if(myClass[i][j].firstName === "" || myClass[i][j].lastName === "" || myClass[i][j].gender === ""){
                    return "invalid"
                }
            }
        }
        return "valid"
    }

    const submit = () => {
        // console.log(myClass);
        let validation = checkClassValidation();
        if(validation === "invalid"){
            setCheckValidations(true);
        }else{
            setCheckValidations(false);
            localStorage.setItem("classes",JSON.stringify(myClass));
            alert("data stored in localstorage")
        }
    }

    useEffect(()=>{
        let myClassesData = localStorage.getItem("classes");
        if(myClassesData){
            setMyClass(JSON.parse(myClassesData));
        }
    },[])

    return (
        <>
            <div className="main">
                <div className="add-class-button">
                    <button type="button" onClick={addClass}>+ Add Class</button>
                </div>
                {myClass.map((myclass, i) => {
                    return (
                        <>
                            <div className="main-class-box">
                                <h2>Class - {i + 1}</h2>
                                <div className="class-box">
                                    {myclass.map((student, i2) => {
                                        return (
                                            <>
                                                <div className="student-box">
                                                    <h3>Student - {i2+1}</h3>
                                                    <div className="class-box-content">
                                                        <div className="form-input">
                                                            <label for="">First Name</label>
                                                            <input type="text" name={`firstName_${i2}`} onChange={(e) => studentsHandler(e,i,i2)} value={student.firstName} placeholder="First Name " />
                                                            {checkValidations && student.firstName === "" && <small>Required *</small>}
                                                        </div>
                                                        <div className="form-input">
                                                            <label for="">Last Name</label>
                                                            <input type="text" name={`lastName_${i2}`} onChange={(e) => studentsHandler(e,i,i2)} value={student.lastName} placeholder="Last Name " />
                                                            {checkValidations && student.lastName === "" && <small>Required *</small>}
                                                        </div>
                                                        <div className="form-input ">
                                                            <label for="">Gender</label>
                                                            <div className="radio-input">
                                                                <div className="form-input-radio">
                                                                    <input name={`gender_${i}_${i2}`} onChange={(e) => studentsHandler(e,i,i2)} value="male" checked={student.gender === "male"} type="radio" />
                                                                    <label>Male</label>
                                                                </div>
                                                                <div className="form-input-radio">
                                                                    <input name={`gender_${i}_${i2}`} onChange={(e) => studentsHandler(e,i,i2)} value="female" checked={student.gender === "female"} type="radio" />
                                                                    <label>Female</label>
                                                                </div>
                                                                <div className="form-input-radio">
                                                                    <input name={`gender_${i}_${i2}`} onChange={(e) => studentsHandler(e,i,i2)} value="other" checked={student.gender === "other"} type="radio" />
                                                                    <label>Other</label>
                                                                </div>
                                                            </div>
                                                            {checkValidations && student.gender === "" && <small>Required *</small>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}

                                    <div className="add-student-button">
                                        <button onClick={()=>addStudent(i)} type="button">+ Add Student</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                })}


                <div className="submit-btn">
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
        </>
    );
}

export default Students;
