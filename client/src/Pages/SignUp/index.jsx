import { useState } from "react";
import Joi from "joi";

import axios from "axios";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import passwordComplexity from "joi-password-complexity";

import TextField from "../../Components/Inputs/TextField";
import Select from "../../Components/Inputs/Select";
import Radio from "../../Components/Inputs/Radio";
import Checkbox from "../../Components/Inputs/Checkbox";
import Button from "../../Components/Button";

import logo from "../../assets/black_logo.svg";
import styles from "./styles.module.scss";

const months = [
    {name: "January", value: "01" },
    {name: "February", value: "02" },
    {name: "March", value: "03" },
    {name: "April", value: "04" },
    {name: "May", value: "05" },
    {name: "June", value: "06" },
    {name: "July", value: "07" },
    {name: "August", value: "08" },
    {name: "September", value: "09" },
    {name: "October", value: "10" },
    {name: "November", value: "11" },
    {name: "December", value: "12" }
];

const genders = ["male", "female", "non-binary"];

const SignUp = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        date: "",
        month: "",
        year: "",
        gender: ""
    });

    const [errors, setErrors] = useState({});

    const [isFetching, setIsFetching] = useState(false);

    const navigate = useNavigate();

    const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};

    const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors(() => ({ ...errors, [name]: value }));
	};

    const schema = {
        email: Joi.string().email({ tlds: false }).required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        name: Joi.string().min(5).max(10).required().label("Name")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            console.log(data);
            try {
				setIsFetching(true);
				const url = process.env.API_URL + "/users";
				await axios.post(url, data);
				setIsFetching(false);
				toast.success("Account created successfully");
				history.push("/login");
			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.error(error.response.data);
				} else {
					console.log(error);
					toast.error("Something went wrong!");
				}
			}
        } else {
            console.log("Please fill out the details properly !")
        }
    };

    return (
        <div className={styles.container}>

            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>

            <h1 className={styles.heading}>Sign up for free to start listening.</h1>
            <Button
                label="Sign up with Facebook"
                style={{ background: "#1877f2", color: "white"}}
            />
            
            <p className={styles.or_container}>or</p>
            
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <h2 className={styles.form_heading}>Sign up with your email address</h2>
                <div className={styles.input_container}>
                    <TextField
                        label="What's your email ?"
                        placeholder="Enter your email"
                        name="email"
                        handleInputState={handleInputState}
                        schema={schema.email}
                        handleErrorState={handleErrorState}
                        value={data.email}
                        error={errors.email}
                        required={true}
                    />
                </div>
                <div className={styles.input_container}>
                    <TextField
                        label="Create a password"
                        placeholder="Enter a strong password"
                        name="password"
                        handleInputState={handleInputState}
                        schema={schema.password}
                        handleErrorState={handleErrorState}
                        value={data.password}
                        error={errors.password}
                        type="password"
                        required={true}
                    />
                </div>
                <div className={styles.input_container}>
                    <TextField
                        label="What should we call you ?"
                        placeholder="Enter a profile name"
                        name="name"
                        handleInputState={handleInputState}
                        schema={schema.name}
                        handleErrorState={handleErrorState}
                        value={data.name}
                        error={errors.name}
                        required={true}
                    />
                </div>
                <div className={styles.dob_container}>
                    <p>What's your date of birth ?</p>
                    <div className={styles.dob}>
                        <div className={styles.month}>
                            <Select
                                name="month"
                                handleInputState={handleInputState}
                                label="Month"
                                placeholder="MM"
                                options={months}
                                value={data.month}
                                required={true}
                            />
                        </div>
                        <div className={styles.date}>
                            <TextField
                                name="date"
                                handleInputState={handleInputState}
                                label="Date"
                                placeholder="DD"
                                value={data.date}
                                required={true}
                            />
                        </div>
                        <div className={styles.year}>
                            <TextField
                                name="year"
                                handleInputState={handleInputState}
                                label="Year"
                                placeholder="YYYY"
                                value={data.year}
                                required={true}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.input_container}>
                    <Radio
                        name="gender"
                        label="You identify yourself as a"
                        options={genders}
                        handleInputState={handleInputState}
                        required={true}
                    />
                </div>

                <div className={styles.checkbox_container}>
                    <Checkbox
                        required={true}
                        label="Share my data with Lokify to listen for free."
                    />
                </div>

                <p className={styles.tnc}>
                    By clicking on sign-up, you agree to Lokify's{""}
                    <a href="/#">Terms & Conditions.</a>
                </p>
                <p className={styles.tnc}>
                    To learn more about how Lokify collects, uses, protects your personal data, please refer to{""}
                    <a href="/#">Lokify's Privacy Policy.</a>
                </p>
                <div className={styles.submit_btn}>
                    <Button label="Sign Up" type="submit" />
                </div>
                <p className={styles.tnc} style={{ fontSize: "1.6rem"}}>
                    Already have an account ? <Link to="/login">Log In</Link>
                </p>
            </form>
        
        </div>
    );
};

export default SignUp;
