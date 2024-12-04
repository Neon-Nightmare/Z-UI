import './styling/login.css'

import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Login(){
    const [warning, setWarning] = useState("");
    const [username, setUsername] = useState("");
    const[red, setRed] = useState('')

    function sign(x){
        x.preventDefault();

        const form = x.target;

        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        const y = Object.assign(formJson)

        console.log(y.name)

        fetch('http://localhost:3000/music?table=artists',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((data) => {
            return data.json()
        }).then((x) => {

            if(x.filter(x => x.name = y.name) == false){
                fetch(`http://localhost:3000/addItem?name=${y.name}&email=${y.email}&password=${y.password}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'table': 'artists',
                    }),
                    redirect: "follow"
                
                }).then((data) => {
                    console.log(data)
                })
                setUsername(y.name)
            } else {
                console.log('This username is already in use')
                setRed('sign')
                setWarning('This username is already in use!')
            }
        })
      
    };
    function login(x){
        x.preventDefault();

        const form = x.target;

        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        const y = Object.assign(formJson)

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: y.name,
                email: y.email,
                password: y.password
            })
        }).then((data) => {
            return data.json()
        }).then((x) => console.log(x[0].name))
    }
    return(
        <>
        <div id='container'>
            <div id={red}>
                <p>Sign-up</p>
                <form onSubmit={sign}>
                    <p id='warning'>{warning}</p>
                    <input type='text' name='name' placeholder='USERNAME'/><br></br>
                    <input type='text' name='email' placeholder='EMAIL'/><br></br>
                    <input type='text' name='password' placeholder='PASSWORD'/><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <p>Login</p>
                <form onSubmit={login}>
                    <input type='text' name='name' placeholder='USERNAME'/><br></br>
                    <input type='text' name='email' placeholder='EMAIL'/><br></br>
                    <input type='text' name='password' placeholder='PASSWORD'/><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
            
        </div>
        </>
    )
}