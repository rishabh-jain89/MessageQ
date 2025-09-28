import React, {useState} from "react";
import "./loginPage.css";

const  loginPage:React.FC = () => {
    const [formData, setFormData] = useState({userName: '',
    password: ''});
    const [errors, setErrors] = useState({userName: false,
    password: false});
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        let formIsValid = true;
        let tempErrors = {userName:false,  password:false};

        Object.keys(formData).forEach((key) => {
            if (formData[key as keyof typeof formData] === ''){
                tempErrors[key as keyof typeof formData] = true;
                formIsValid = false;
            }
        });

        setErrors(tempErrors);

        if(formIsValid){
            console.log("Form submitted successfully!");
            setFormData({userName:'', password:''});
        }

    };

    return (
        <div className="loginPageContainer">
            <form className="loginForm" onSubmit={handleSubmit} noValidate>
                <div className="material-input-group">
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        className={`material-input ${errors.userName ? 'material-input--error' : ''}`}
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="userName" className="material-label">
                        Username
                    </label>
                    <div className="material-input-bar"></div>
                </div>

                <div className="material-input-group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`material-input ${errors.password ? 'material-input--error' : ''}`}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="password" className="material-label">
                        Password
                    </label>
                    <div className="material-input-bar"></div>
                </div>

                <button type="submit" className="material-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default loginPage;