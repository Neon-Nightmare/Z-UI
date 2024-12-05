import './styling/login.css'
import { Link, useNavigate, redirect } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { DetailsContext } from './App';

export default function Login(){

    const {details, setDetails} = useContext(DetailsContext)

    useEffect(() => {
        localStorage.setItem('details', JSON.stringify(details));
      }, [details]);

    const [warningSign, setWarningSign] = useState("");
    const [warningLogin, setWarningLogin] = useState("");
    
    const[signContainer, setSign] = useState('')
    const[loginContainer, setLogin] = useState('')

    const navigate = useNavigate();

    function sign(x){
        x.preventDefault();

        const form = x.target;

        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        const y = Object.assign(formJson)

        setDetails(y)

        fetch('http://localhost:3000/music?table=artists',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((data) => {
            return data.json()
        }).then((x) => {

            if(x.filter(x => x.name == y.name) == false){
                fetch(`http://localhost:3000/addItem?name=${y.name}&email=${y.email}&password=${y.password}`, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'table': 'artists'
                    }),
                    redirect: "follow"
                
                }).then((data) => {
                    return data.json()
                }).then((x) => {
                    setDetails(x)
                    return navigate("/profile");
                })
                
            } else {
                console.log('This username is already in use')
                setSign('sign')
                setWarningSign('This username is already in use!')
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
        }).then((x) => {
            if(x[0]){
                setDetails(x)
                setLogin()
                setWarningLogin()
                return navigate('/profile');
            } else {
                setLogin('sign')
                setWarningLogin('Submitted information is incorrect')
            }
        })
    }
    return(
        <>

        <div id='container'>
            <div id={signContainer}>
                <p>Sign-up</p>
                <form onSubmit={sign}>
                    <p id='warning'>{warningSign}</p>
                    <input type='text' name='name' placeholder='USERNAME'/><br></br>
                    <input type='text' name='email' placeholder='EMAIL'/><br></br>
                    <input type='text' name='password' placeholder='PASSWORD'/><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id={loginContainer}>
                <p>Login</p>
                <form onSubmit={login}>
                    <p id='warning'>{warningLogin}</p>
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