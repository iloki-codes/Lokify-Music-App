import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import axiosGet from "../../redux/axiosGet.js";
import { CircularProgress } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Song from "../../Components/Song";
import likeImg from "../../assets/like.jpg";
// import peaches from "../../assets/peaches.jpg";
import styles from "./styles.module.scss";


// const songs = [
// 	{ 
//         _id: 1,
//         img: peaches,
//         name: "Peaches",
//         artist: "Justin Bieber"
//     }
// ];

const LikedSongs = () => {

    const [songs, setSongs] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const { user } = useSelector((state) => state.user);

	const getLikedSongs = async () => {
		try {
			setIsFetching(true);
			const url = process.env.API_URL + `/songs/like`;
			const { data } = await axiosGet.get(url);
			setSongs(data.data);
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

	useEffect(() => {
		getLikedSongs();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.head_gradient}></div>
				<img src={likeImg} alt="like songs" />
				<div className={styles.playlist_info}>
					<p>Playlist</p>
					<h1>Liked Songs</h1>
					<span>By {user && user.name}</span>
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
				{isFetching ? (
					<div className={styles.progress_container}>
						<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
					</div>
				) : (
					<Fragment>
						{songs.map((song) => (
							<Fragment key={song._id}>
								{user.likedSongs.indexOf(song._id) !== -1 && (
									<Song song={song} />
								)}
							</Fragment>
						))}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default LikedSongs;