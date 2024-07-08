import {Link} from "react-router-dom";
import Button from "../../components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../assets/white_logo.svg";
import styles from "./styles.module.scss";
import { ClassNames } from "@emotion/react";

const navLinks = [
    {
        name: "Premium",
        link: "#"
    },
    {
        name: "Support",
        link: "#"
    },
    {
        name: "Download",
        link: "#"
    },
    {
        name: "Sign up",
        link: "/signup"
    },
    {
        name: "Log in",
        link: "/login"
    }
];

const companyLinks = ["About", "Jobs", "For the record"];

const communitiesLinks = [
    "For Artists",
    "Develpoers",
    "Advertising",
    "Investors",
    "Vendors"
];

const usefulLinks = ["Support", "Web Player", "Free Mobile App"];

const footerLinks = [
    "legal",
    "privacy center",
    "privacy policy",
    "cookies",
    "about ads"
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
    return (
        <div className={styles.container}>
            
            <nav className={styles.navbar_container}>
                
                <Link to="/" className={styles.nav_logo}>
                    <img src={logo} alt="logo" />    
                </Link>

                <div className={styles.nav_links}>
                    {navLinks.map((link, index) => (
                        <Link key={index} to={link.link} className={styles.links}>
                            {link.name}
                        </Link>
                    ))}
                </div>

            </nav>

            <main className={styles.main_container}>

                <div className={styles.main}>

                    <h1>Listening is everything</h1>
                    <p>Millions of songs and podcatst. No credit card needed.</p>

                    <Link to="/signup">
                        <Button
                            label="GET SPOTIFY FREE"
                            style={{ color: "#2941ab", width: "18rem", fontSize: "1.4rem" }}
                        />
                    </Link>

                </div>
            
            </main>

            <footer className={styles.footer_container}>

                <div className={styles.footer_1}>
                    
                    <Link to="/" className={styles.footer_logo}>
                        <img src={logo} alt="logo" />
                    </Link>

                    <div className={styles.footer_1_links}>
                        <div className={styles.footer_heading}>Company</div>
                        {companyLinks.map((link, index) => (
                            <div className={styles.links} key={index}>
                                {link}
                            </div>
                        ))}
                    </div>
                
                    <div className={styles.footer_1_links}>
                        <div className={styles.footer_heading}>Communities</div>
                        {communitiesLinks.map((link, index) => (
                            <div className={styles.links} key={index}>
                                {link}
                            </div>
                        ))}
                    </div>

                    <div className={styles.footer_1_links}>
                        <div className={styles.footer_heading}>Useful links</div>
                        {usefulLinks.map((link, index) => (
                            <div className={styles.links} key={index}>
                                {link}
                            </div>
                        ))}
                    </div>

                    <div className={styles.footer_icons}>
                        {footerIcons.map((icon, index) => (
                            <div className={styles.icon} key={index}>
                                {icon}
                            </div>
                        ))}
                    </div>
                
                </div>

                <div className={styles.footer_2}>

                    <div className={styles.footer_2_links}>
                        {footerLinks.map((link, index) => (
                            <div className={styles.links} key={index}>
                                {link}
                            </div>
                        ))}
                    </div>

                    <div className={styles.copyright}>
                        <CopyrightIcon />
                        <span>2024 Spotify</span>
                    </div>
                
                </div>
            
            </footer>
    
        </div>
    );
};

export default Main;