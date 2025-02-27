import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice/apiCalls.js";

import Joi from "joi";
import TextField from "../../Components/Inputs/TextField";
import Select from "../../Components/Inputs/Select";
import Radio from "../../Components/Inputs/Radio";
import Button from "../../Components/Button";
import styles from "./styles.module.scss";


const months = [
	{ name: "January", value: "01" },
	{ name: "February", value: "02" },
	{ name: "March", value: "03" },
	{ name: "Apirl", value: "04" },
	{ name: "May", value: "05" },
	{ name: "June", value: "06" },
	{ name: "July", value: "07" },
	{ name: "Augest", value: "08" },
	{ name: "September", value: "09" },
	{ name: "October", value: "10" },
	{ name: "November", value: "11" },
	{ name: "December", value: "12" }
];

const genders = ["male", "female", "non-binary"];

const Profile = () => {

    const [data, setData] = useState({
		email: "",
		name: "",
		month: "",
		year: "",
		date: "",
		gender: "",
	});
	
    const [errors, setErrors] = useState({});
	const { user, updateUserProgress } = useSelector((state) => state.user);
	const dispatch = useDispatch();
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
		name: Joi.string().min(5).max(10).required().label("Name"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(data);
		const payload = { data, id: user._id };
		const res = await updateUser(payload, dispatch);
		res && navigate.push("/home");
	};

	useEffect(() => {
		if (user) {
			const dk = {
				name: user.name,
				month: user.month,
				year: user.year,
				date: user.date,
				gender: user.gender,
			};
			setData(dk);
		}
	}, [user]);


	return (

		<div className={styles.container}>
			<h1>Profile</h1>
			<form onSubmit={handleSubmit} className={styles.form_container}>
				<div className={styles.input_container}>
					<TextField
						label="What's your email?"
						placeholder="Enter your email"
						value={user ? user.email : ""}
						required={true}
						disabled={true}
						style={{ color: "white" }}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="What should we call you?"
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
				<div className={styles.date_of_birth_container}>
					<p>What's your date of birth?</p>
					<div className={styles.date_of_birth}>
						<div className={styles.month}>
							<Select
								name="month"
								handleInputState={handleInputState}
								label="Month"
								placeholder="Months"
								options={months}
								value={data.month}
								required={true}
							/>
						</div>
						<div className={styles.date}>
							<TextField
								label="Date"
								placeholder="DD"
								name="date"
								value={data.date}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
						<div className={styles.year}>
							<TextField
								label="Year"
								placeholder="YYYY"
								name="year"
								value={data.year}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
					</div>
				</div>
				<div className={styles.input_container}>
					<Radio
						label="What's your gender?"
						name="gender"
						handleInputState={handleInputState}
						options={genders}
						value={data.gender}
						required={true}
					/>
				</div>
				<div className={styles.submit_btn_wrapper}>
					<Button
						label="Update"
						type="submit"
						isFetching={updateUserProgress}
					/>
				</div>
			</form>
		</div>
	
    );

};

export default Profile;