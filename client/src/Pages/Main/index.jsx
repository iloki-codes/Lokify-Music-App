import {Link} from "react-router-dom";
import Button from "../../Components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";

import yyhs from "../../assets/yyhs.jfif";
import raftaar from "../../assets/raftaar.jfif";
import badshah from "../../assets/badshah.jfif";
import ikka from "../../assets/ikka.jfif";
import lilgolu from "../../assets/lilgolu.jfif";
import bohemia from "../../assets/bohemia.jfif";
import sidhu from "../../assets/sidhu.jfif";
import logo from "../../assets/loki.png";

import styles from "./styles.module.scss";

// import { ClassNames } from "@emotion/react";

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
                    <img src={logo} alt="logo" /><span>LOKIFY</span> 
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
                    <p>Millions of songs and podcatss. No credit card needed.</p>

                    <Link to="/signup">
                        <Button
                            label="GET LOKIFY FOR FREE"
                            style={{ color: "#2941ab", width: "18rem", fontSize: "1.4rem", height: "100px" }}
                        />
                    </Link>

                    <div className={styles.singers}>
                        <a href="">
                            <img src={yyhs} alt="yyhs" />
                            <button className={styles.b_one}>Play</button>
                            <span>Radio<br/>Yo Yo Honey <br/>Singh</span>
                        </a>
                        <a href="">
                            <img src={raftaar} alt="raftaar" />
                            <button className={styles.b_two}>Play</button>
                            <span>Radio<br/>Raftaar</span>
                        </a>
                        <a href="">
                            <img src={badshah} alt="badshah" />
                            <button className={styles.b_three}>Play</button>
                            <span>Radio<br/>Badshah</span>
                        </a>
                        <a href="">
                            <img src={ikka} alt="ikka" />
                            <button className={styles.b_four}>Play</button>
                            <span>Radio<br/>Ikka</span>
                        </a>
                        <a href="">
                            <img src={lilgolu} alt="lilgolu" />
                            <button className={styles.b_five}>Play</button>
                            <span>Radio<br/>Lil Golu</span>
                        </a>
                        <a href="">
                            <img src={bohemia} alt="bohemia" />
                            <button className={styles.b_six}>Play</button>
                            <span>Radio<br/>Bohemia</span>
                        </a>
                        <a href="">
                            <img src={sidhu} alt="sidhu" />
                            <button className={styles.b_seven}>Play</button>
                            <span>Radio<br/>Sidhu Moosewala</span>
                        </a>
                    </div>
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
                        <span>2024 Lokify</span>
                    </div>
                
                </div>
            
            </footer>
    
        </div>
    );
};

export default Main;