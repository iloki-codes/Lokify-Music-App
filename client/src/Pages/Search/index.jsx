import {Fragment, useState} from "react";
import axiosGet from "../../redux/axiosGet";

import {IconButton, CircularProgress} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import peaches from "../../assets/peaches.jpg";
import playlistImg from "../../assets/rock.jpg";
import Song from "../../Components/Song";
import Playlists from "../../Components/Playlists";

import styles from "./styles.module.scss";


// const playlists = [
//     {
//         _id: 1,
//         img: playlistImg,
//         name: "Today's Top Songs",
//         desc: "By Lokify"
//     }
// ];

// const songs = [
//     {
//         _id: 1,
//         img: peaches,
//         name: "Today's Top Songs",
//         desc: "By Lokify"
//     }
// ];

const Search = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({});
	const [isFetching, setIsFetching] = useState(false);

    const handleSearch = async ({currentTarget: input}) => {
        setSearch(input.value);
        setSearch(input.value);
		setResults({});
		try {
			setIsFetching(true);
			const url = process.env.API_URL + `/?search=${input.value}`;
			const { data } = await axiosGet.get(url);
			setResults(data);
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
    };

    return (
        <div className={styles.container}>
			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder="Search for songs and playlists"
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={() => setSearch("")}>
					<ClearIcon />
				</IconButton>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}
			{Object.keys(results).length !== 0 && (
				<div className={styles.results_container}>
					{results.songs.length !== 0 && (
						<div className={styles.songs_container}>
							{results.songs.map((song) => (
								<Fragment key={song._id}>
									<Song song={song} />
								</Fragment>
							))}
						</div>
					)}
					{results.playlists.length !== 0 && (
						<div className={styles.playlists_container}>
							<Playlists playlists={results.playlists} />
						</div>
					)}
				</div>
			)}
		</div>
    );
};

export default Search;