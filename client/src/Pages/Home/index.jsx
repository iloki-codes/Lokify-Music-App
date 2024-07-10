import { Fragment } from "react";
import Playlists from "../../Components/Playlists";
import playlistImg from "../../assets/rock.jpg";
import styles from "./styles.module.scss";


const playlists = [
    {
        _id: 1,
        img: playlistImg,
        name: "Today's Top Songs",
        desc: "By Lokify"
    }
];

const Home = () => {
    return (
        <Fragment>
            <div className={styles.container}>
                <h1>Having a nice day ? Yes ? No ? Listen to calming music on our app.</h1>
                <div className={styles.playlists_container}>
                    <Playlists playlists={playlists} />
                </div>

                <h1>Just the hits</h1>
                <div className={styles.playlists_container}>
                    <Playlists playlists={playlists} />
                </div>
            </div>
        </Fragment>
    );
};

export default Home;