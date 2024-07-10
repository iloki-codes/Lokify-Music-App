import { Fragment } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Song from "../../Components/Song";
import likeImg from "../../assets/like.jpg";
import peaches from "../../assets/peaches.jpg";
import styles from "./styles.module.scss";


const songs = [
	{ 
        _id: 1,
        img: peaches,
        name: "Peaches",
        artist: "Justin Bieber"
    }
];

const LikedSongs = () => {

    return (
    
        <div className={styles.container}>

            <div className={styles.head}>

                <div className={styles.head_gradient}>
                    <img src={likeImg} alt="liked songs" />
                </div>

                <div className={styles.playlist.info}>
                    <p>Playlist</p>
                    <h1>Liked Songs</h1>
                    <span>By Lokify</span>
                </div>
            
            </div>

            <div className={styles.body}>
                
                <div className={styles.body_nav}>

                    <div className={styles.left}>
                        <span>#</span>
                        <p>Title</p>
                    </div>

                    <div className={styles.center}>
                        <p>Artist</p>
                    </div>

                    <div className={styles.right}>
                        <AccessTimeIcon />
                    </div>

                </div>

                {songs.map((song) => (
                    <Fragment key={song._id}>
                        <Song song={song} />
                    </Fragment>
                ))}
        
            </div>
        
        </div>
    
    );

};

export default LikedSongs;