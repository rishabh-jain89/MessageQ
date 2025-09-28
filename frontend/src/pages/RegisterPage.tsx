import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./RegisterPage.css"

const RegisterPage:React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name: '', email:'', userName:'', password:'', confirmPassword:''});
    const [errors, setErrors] = useState({name:false, email:false, userName:false, password:false, confirmPassword:false});
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
        let tempErrors = {name:false, email:false, userName:false, password:false, confirmPassword:false};

        Object.keys(formData).forEach((key) => {
            if(formData[key as keyof typeof formData] === ''){
                tempErrors[key as keyof typeof formData] = true;
                formIsValid = false;
            }
        });

        setErrors(tempErrors);

        if (formIsValid) {
            console.log("Form submitted successfully!");
            setFormData({name: '', email: '', userName: '', password: '', confirmPassword: ''});
        }
    };

    const handleLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="loginPageContainer">
            <form className="loginForm" onSubmit={handleSubmit} noValidate>
                <div className="loginInputGroup">
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

                <div className="loginInputGroup">
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

                <div className="loginInputGroup">
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

                <div className="loginInputGroup">
                    <input
                        type="confirmPassword"
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

                <button type="submit" className="loginButton">
                    Register
                </button>
            </form>
            <p>
                already have an account?
            </p>
            <button className="RegisterButton loginButton" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default RegisterPage;