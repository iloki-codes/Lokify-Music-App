import { Fragment, useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";
import axiosGet from "../../redux/axiosGet.js";

import Playlists from "../../Components/Playlists";
// import dhhImg from "../../assets/dhhplylst.jfif";
import styles from "./styles.module.scss";
import axios from "axios";


// const playlists = [
//     {
//         _id: 1,
//         img: dhhImg,
//         name: "Today's Top Songs",
//         desc: "By Lokify"
//     }
// ];

const Home = () => {
    const [firstPlaylists, setFirstPlaylists] = useState([]);
    const [secondPlaylists, setSecondPlaylists] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getRandomPlaylists = async () => {
        try {
            setIsFetching(true);
            const url = process.env.API_URL + "/playlists/random";
            const {data} = await axiosGet.get(url);
            const array1 = data.data.splice(0,4);
            const array2 = data.data;
            setFirstPlaylists(array1);
            setSecondPlaylists(array2);
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getRandomPlaylists();
    }, []);

    return (
        <Fragment>
			{isFetching ? (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			) : (
				<div className={styles.container}>
					<h1>Good afternoon</h1>
					<div className={styles.playlists_container}>
						<Playlist playlists={firstPlaylists} />
					</div>
					<h1>Just the hits</h1>
					<div className={styles.playlists_container}>
						<Playlist playlists={secondPlaylists} />
					</div>
				</div>
			)}
		</Fragment>
    );
};

export default Home;