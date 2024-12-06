import { useEffect, useContext, useState } from "react";
import { DetailsContext } from './App';
import { SelectedInfo } from './App';
import './styling/browse.css'

export default function Browse(){

    const {details, setDetails} = useContext(DetailsContext);
    const {info, setInfo} = useContext(SelectedInfo);

    const [music, setMusic] = useState([])
        
    useEffect(()=>{
        fetch(`http://localhost:3000/music?table=albums`)
            .then((x) => x.json())
            .then((data) => setMusic(data))
    },[details])

    function Display(){
        return music.map(x => { return(
            <div id='Browse_card'>
                <img id='card_pic' src={x.image} />
                <p id='card_title'>{x.album_name}</p>
                <p id='card_title' >${x.price}</p>
                <div id='hidden'>
                    <p>Artist: {x.artist}</p>
                    <p>{x.info}</p>
                </div>
            </div>   
        )})
    }

    return(
        <>
            <div id='card_container'>
                <Display/>
            </div>
        </>
    )
};