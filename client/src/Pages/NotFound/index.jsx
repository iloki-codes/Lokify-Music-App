import { useNavigate } from "react-router-dom";
import record from "../../assets/record.svg";
import recordArm from "../../assets/record-arm.svg";
import logo from "../../assets/loki.png";
import styles from "./styles.module.scss";


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.main}>
                    <img src={logo} alt="logo" className={styles.logo} />
                    <h1>404s and Heartbreaks</h1>
                    <p>We couldn't find the page you were looking for.
                        Maybe our FAQ or Community can help ?
                    </p>
                    <span onClick={() => navigate.push("/home")}>Go Back Home</span>
                </div>
            </div>

            <div className={styles.right}>
                <img src={record} alt="record" className={styles.record} />
                <img src={recordArm} alt="recordArm" className={styles.recordArm} />
            </div>
        </div>
    );
};

export default NotFound;