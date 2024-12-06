import { useForm } from "react-hook-form";

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styling/Create.css'
import { DetailsContext } from "./App";

export default function Create(){
    const navigate = useNavigate();
    const {details, setDetails} = useContext(DetailsContext);

    useEffect(() => {
        localStorage.setItem('details', JSON.stringify(details));
    }, [details]);

    const { register, handleSubmit } = useForm();

    return(
        <>
            <div id='container'>
                <form id='form' onSubmit={handleSubmit(async (data) => await fetch(`http://localhost:3000/addItem?album_name=${data.album_name}&artist=${details[0].name}&image=${data.image}&price=${data.price}&type=${data.type}&info=${data.info}&release=${data.release}&label=${data.label}&artists_id=${details[0].id}`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: new URLSearchParams({
                            'table': 'albums'
                        }),
                        redirect: "follow"
                    }).then(
                        fetch(`http://localhost:3000/select?artists_id=${details[0].id}`,
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
                        .then((x) => setDetails(x)),
                        navigate("/profile")
                    )
                    )}>
                    <input {...register("album_name", { required: true })} placeholder="Whats the albums name!"/> 
                    <input {...register("image", { required: true })} placeholder="Give a link to the album cover!"/>
                    <input {...register("price", { required: true })} placeholder="Set the price!"/>
                    <select {...register("type", { required: true })}>
                        <option value="">Is it an album or single?</option>
                        <option value="1">Album</option>
                        <option value="2">Single</option>
                    </select>
                    <textarea {...register("info", { required: true })} placeholder="Give a description about the album!" />
                    <input {...register("release", { required: true })} placeholder="Set the date!"/>
                    <input {...register("label", { required: true })} placeholder="What is the label!"/>
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}