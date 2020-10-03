import {useState, useEffect} from "react";

const useInitialState = (elAPI) => {
    const [ videos, setVideos ] = useState([]);
    useEffect(() => {
        fetch(elAPI)
            .then(response => response.json())
            .then(data => setVideos(data));
    }, []);
    return videos
};

export default useInitialState;