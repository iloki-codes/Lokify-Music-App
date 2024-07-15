import {useSelector} from "react-redux";

import { Link } from "react-router-dom";
import Playlists from "../../Components/Playlists";
import playlistImg from "../../assets/rock.jpg";
import styles from "./styles.module.scss";


// const playlists = [
//     {
//         _id: 1,
//         img: playlistImg,
//         name: "Today's Top Songs",
//         desc: "By Lokify"
//     }
// ];

const Library = () => {
    const {playlists} = useSelector((state) => state.playlists);
    const {user} = useSelector((state) => state.user);
    
    return (
        <div className={styles.container}>
            
            <h1>Playlists</h1>
            <div className={styles.playlists_contaiber}>
                <Link to="/collection/tracks">
                    <div className={styles.liked_songs}>
                        <h1>Liked Songs</h1>
                        <p>{user.likedSongs.length} Liked Songs</p>
                    </div>
                </Link>
                <Playlists playlists={playlists} />
            </div>
        </div>

    );
};

export default Library;