import './styling/homepage.css'

import { Link } from "react-router-dom";
import { useContext } from "react";
import { SelectedInfo } from './App';

export default function Homepage(){
    const {info, setInfo} = useContext(SelectedInfo);

    function setting(){
        fetch(`http://localhost:3000/select?album_id=3`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'table': 'tracks'
            }),
            redirect: "follow"
        }).then((x) => x.json())
        .then((results) => setInfo(results))
    }
    return(
        <><div>
            <div id="buttons">
                <div>
                    <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/login'>
                        Artist
                    </Link>
                </div>
                <div>
                    <Link onClick={setting} style={{ color: 'inherit', textDecoration: 'none' }} to='/browse'>
                        Listener
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}