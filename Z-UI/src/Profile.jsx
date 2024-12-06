import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import './styling/profile.css'
import Info from './info'


import { SelectedInfo } from './App';
import { DetailsContext } from './App';

export default function Profile(){

    const {info, setInfo} = useContext(SelectedInfo);

    const {details, setDetails} = useContext(DetailsContext);

    const data = JSON.parse(localStorage.getItem("details"));
    
    return(
        <>
        <div>
            <p id='text'> Welcome back! {data[0].name}</p>
            <Link to='/create'>
                <button id='addbutton'>Add Album</button>
            </Link>
        </div>
        <div id='container'>
            {
                data.map(x => {
                    return(
                        <div id='card'>
                            <Link to='/info'>
                                <img id='pic' src={x.image} onClick={() => {setInfo(x)}}/>
                            </Link>
                            <p id='title'>{x.album_name}</p>
                            <p id='title' >${x.price}</p>
                        </div>   
                    )
                })
            }
        </div>
        </>
    )
}