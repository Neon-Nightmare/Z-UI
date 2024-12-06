import { SelectedInfo } from './App';
import { DetailsContext } from './App';
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import './styling/Create.css'

export default function Info(){
    
    const {info, setInfo} = useContext(SelectedInfo);
    const {details, setDetails} = useContext(DetailsContext);
    const [edit, setEdit] = useState(false);
    const [tracks, setTracks] = useState(['No tracks']);
    const [adding, setAdd] = useState(false)

    const { register, handleSubmit } = useForm();
    var album_type;

    useEffect(() => {
        localStorage.setItem('details', JSON.stringify(details));
    }, [details]);

    localStorage.setItem('tracks', JSON.stringify(tracks));
    const tracklist = JSON.parse(localStorage.getItem("tracks"));
    

    function editing(){
        if(edit){
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    function add(){
        if(adding){
            setAdd(false)
        } else {
            setAdd(true)
        }
    }

    function deleteAlbum(){
        fetch(`http://localhost:3000/delete?`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'table': 'albums',
                'id': info.album_id
            }),
            redirect: "follow"
        }).then(
            fetch(`http://localhost:3000/select?artists_id=${info.id}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'table': 'albums'
                    }),
                    redirect: 'follow'
                }
            ).then((x) => x.json())
            .then(res => setDetails(res))
        )
        
    }
    function Trackslist(){
        return tracklist.map(x => { return( <p>{x.song_name}</p>)})
    }

    
    function TracksAdd(){
        return( 
            <>
            <div id='container'>
                <form id='form' onSubmit={handleSubmit(async (data) => await fetch(`http://localhost:3000/addItem?song_name=${data.song_name}&explicit=${data.explicit}&artist=${info.name}&album_id=${info.album_id}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'table': 'tracks',
                    }),
                    redirect: "follow"
                }).then(
                    fetch(`http://localhost:3000/select?album_id=${info.album_id}`,
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: new URLSearchParams({
                                'table': 'tracks'
                            }),
                            redirect: 'follow'
                        }
                    )
                    .then((data) => data.json())
                    .then((x) => setTracks(x))
                )
                )}>
                    <input {...register("song_name", { required: true })}placeholder="Track Name"/>
                    <select {...register("explicit", { required: true })}>
                        <option value="">Explicit Lyrics?</option>
                        <option value="1">Explicit</option>
                        <option value="0">Safe for work</option>
                    </select>
                    <input  {...register("featured", { required: false })} placeholder="Featured Artists?"/>
                    <input type="submit" />
                </form>
            </div>
            </>
        )
    }

    function TrackDisplay(props){
        const isGoal = props.isGoal

        if(isGoal){
            return <TracksAdd/>
        } else{
            return <Trackslist/>
        }
    }
    

    if(info.type == 1){
        album_type = 'Album'
    } else {
        album_type ='Single'
    }

    useEffect(() => {

        fetch(`http://localhost:3000/select?album_id=${info.album_id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },body: new URLSearchParams({
                    'table': 'tracks',
                }),redirect: "follow"
            }
        ).then((data) => data.json())
        .then((x) => setTracks(x))
        
    },[]);
    
    if(edit){
        return(
        <>
        <div id='container'>
        <form id='form' onSubmit={handleSubmit(async (data) => await fetch(`http://localhost:3000/update?album_name=${data.album_name}&artist=${info.name}&image=${data.image}&price=${data.price}&type=${data.type}&info=${data.info}&release=${data.release}&label=${data.label}&artists_id=${info.id}`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'table': 'albums',
                    'id': info.album_id
                }),
                redirect: "follow"
            }).then(
                fetch(`http://localhost:3000/select?artists_id=${info.id}`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: new URLSearchParams({
                            'table': 'albums'
                        }),
                        redirect: 'follow'
                    }
                )
                .then((data) => data.json())
                .then((x) => setDetails(x))
            )
            )}>
            <input {...register("album_name", { required: true })} defaultValue={info.album_name} placeholder="Whats the albums name!"/> 
            <input {...register("image", { required: true })} defaultValue={info.image} placeholder="Give a link to the album cover!"/>
            <input {...register("price", { required: true })} defaultValue={info.price} placeholder="Set the price!"/>
            <select {...register("type", { required: true })}>
                <option value="">Is it an album or single?</option>
                <option value="1">Album</option>
                <option value="2">Single</option>
            </select>
            <textarea {...register("info", { required: true })} defaultValue={info.info} placeholder="Give a description about the album!" />
            <input {...register("release", { required: true })} defaultValue={info.release} placeholder="Set the date!"/>
            <input {...register("label", { required: true })} defaultValue={info.label} placeholder="What is the label!"/>
            <input type="submit" />
            <button onClick={editing}>BACK</button>
        </form>
        </div>
        </>
        )
    } else {
        return(
            <> 
                <div id='container'>
                    <div id='card1'>
                        <p>ALBUM NAME: {info.album_name}</p>
                        <p id='image_link'>IMAGE LINK: {info.image}</p>
                        <img src={info.image}/>
                        <p>PRICE: {info.price}</p>
                        <p>ALBUM TYPE: {album_type}</p>
                        <p>DESCRIPTION: {info.info}</p>
                        <p>RELEASE DATE: {info.release}</p>
                        <p>LABEL: {info.label}</p>
                        <button onClick={editing} id='button'>EDIT ALBUM</button>
                        <button onClick={deleteAlbum} id='button'>DELETE ALBUM</button>
                    </div>
                    <div id='card1'>
                        <TrackDisplay isGoal={adding}/>
                        <button id='button' onClick={add}>ADD TRACKS</button>
                    </div>
                </div>
            </>
        )
    }
}