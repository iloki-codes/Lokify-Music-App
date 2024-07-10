import {Fragment, useState} from "react";

import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import peaches from "../../assets/peaches.jpg";
import playlistImg from "../../assets/rock.jpg";
import Song from "../../Components/Song";
import Playlists from "../../Components/Playlists";

import styles from "./styles.module.scss";


const playlists = [
    {
        _id: 1,
        img: playlistImg,
        name: "Today's Top Songs",
        desc: "By Lokify"
    }
];

const songs = [
    {
        _id: 1,
        img: peaches,
        name: "Today's Top Songs",
        desc: "By Lokify"
    }
];

const Search = () => {
    const [search, setSearch] = useState("");
    const handleSearch = async ({currentTarget: input}) => {
        setSearch(input.value);
    };

    return (
        <div className={styles.container}>

            <div className={styles.search_input_container}>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input 
                    type="text"
                    placeholder="Search for songs"
                    onChange={handleSearch}
                    value={search}
                />
                <IconButton onClick={() => setSearch("")}>
                    <ClearIcon />
                </IconButton>
            </div>
            <div className={styles.results_container}>
                <div className={styles.songs_container}>
                    {songs.map((song) => (
                        <Fragment key={song._id}>
                            <Song song={song} />
                        </Fragment>
                    ))}
                </div>
                <div className={styles.playlists_container}>
                    <Playlists playlists={playlists} />
                </div>  
            </div>
        
        </div>
    );
};

export default Search;