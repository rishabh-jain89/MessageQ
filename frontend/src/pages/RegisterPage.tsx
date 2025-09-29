import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./RegisterPage.css"

const RegisterPage:React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name: '', email:'', userName:'', password:'', confirmPassword:''});
    const [errors, setErrors] = useState({name:false, email:false, userName:false, password:false, confirmPassword:false, passwordMismatch: false, passwordInvalid:false});
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:value,
        }));
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        let formIsValid = true;
        let tempErrors = {name:false, email:false, userName:false, password:false, confirmPassword:false, passwordMismatch:false, passwordInvalid:false};
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


        (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
            if (formData[key].trim() === '') {
                tempErrors[key] = true;
                formIsValid = false;
            }
        });

        if(!passwordPattern.test(formData.password)) {
            tempErrors.passwordInvalid = true;
            formIsValid = false;
        }

        if (
            formData.password.trim() !== '' &&
            formData.confirmPassword.trim() !== '' &&
            formData.password !== formData.confirmPassword
        ) {
            tempErrors.passwordMismatch = true;
            formIsValid = false;
        }

        setErrors(tempErrors);

        if (formIsValid) {
            console.log("Form submitted successfully!");
            setFormData({name: '', email: '', userName: '', password: '', confirmPassword: ''});
            navigate('/');
        }
    };

    const handleLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="registerPageContainer">
            <form className="registerForm" onSubmit={handleSubmit} noValidate>
                <div className="registerInputGroup">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`inputField ${errors.name ? 'inputFieldError' : ''}`}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="name" className="InputLabel">
                        Name
                    </label>
                    <div className="inputFieldBar"></div>
                </div>

                <div className="registerInputGroup">
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        className={`inputField ${errors.userName? 'inputFieldError' : ''}`}
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="userName" className="InputLabel">
                        Username(Unique)
                    </label>
                    <div className="inputFieldBar"></div>
                </div>

                <div className="registerInputGroup">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className={`inputField ${errors.email? 'inputFieldError' : ''}`}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="email" className="InputLabel">
                        Email
                    </label>
                    <div className="inputFieldBar"></div>
                </div>

                <div className="registerInputGroup">
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
                {errors.passwordInvalid && (
                    <p className="errorTextPassword">
                        Password must contain:<br/>
                        &#x2022;digit from 0-9<br/>
                        &#x2022;small letter (a-z)<br/>
                        &#x2022;Capital letter (A-Z)<br/>
                        &#x2022;special character (!, @, #, $, %, ^, &, *)<br/>
                    </p>
                )}

                <div className="registerInputGroup">
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`inputField ${errors.confirmPassword ? 'inputFieldError' : ''}`}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="confirmPassword" className="InputLabel">
                        Confirm Password
                    </label>
                    <div className="inputFieldBar"></div>
                </div>
                {
                    errors.passwordMismatch && (<p className="errorText">
                    Passwords do not match.
                    </p>)
                }

                <button type="submit" className="registerButton">
                    Register
                </button>
            </form>
            <p>
                already have an account?
            </p>
            <button className="loginButton registerButton" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default RegisterPage;