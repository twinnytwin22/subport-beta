export const selectSong = (song: any) => {
    return {
        type: "SONG_SELECTED",
        payload: song,
    };
};

export const selectSongById = (id: any) => {
    return {
        type: "SONG_SELECTED_BY_ID",
        payload: id,
    };
};

export const setPlayerState = (val: any) => {
    return {
        type: "PLAYER_STATE_SELECTED",
        payload: val,
    };
};

export const setVolume = (val: any) => {
    return {
        type: "SET_VOLUME",
        payload: val,
    };
};

export const setDuration = (val: any) => {
    return {
        type: "SET_DURATION",
        payload: val,
    };
};

export const setCurrentLocation = (val: any) => {
    return {
        type: "SET_CURRENT_LOCATION",
        payload: val,
    };
};