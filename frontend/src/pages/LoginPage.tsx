import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./LoginPage.css";

const  LoginPage:React.FC = () => {
    const navigate = useNavigate();
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
            navigate('/');
        }

    };

    const handleRegister = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/register");
    };


    return (
        <div className="loginPageContainer">
            <form className="loginForm" onSubmit={handleSubmit} noValidate>
                <div className="loginInputGroup">
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        className={`inputField ${errors.userName ? 'inputFieldError' : ''}`}
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="userName" className="InputLabel">
                        Username
                    </label>
                    <div className="inputFieldBar"></div>
                </div>

                <div className="loginInputGroup">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`inputField ${errors.password ? 'inputFieldError' : ''}`}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="password" className="InputLabel">
                        Password
                    </label>
                    <div className="inputFieldBar"></div>
                </div>

                <button type="submit" className="loginButton">
                    Login
                </button>
            </form>
            <p>
                New User?
            </p>
            <button className="RegisterButton loginButton" onClick={handleRegister}>
                Register
            </button>
        </div>
    );
};

export default LoginPage;