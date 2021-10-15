import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import Profile from './Profile';
import { div } from 'prelude-ls';
import "./../../css/contactsHome.css"

const ContactsHome = () => {

    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/mycontacts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                // console.log(result.contact[0].contact_username)
                setData(result.contact)
            })
    }, [])

    const deleteContact = (postid) => {
        // console.log(postid)
        fetch(`/deletecontact/${postid}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }
    return (
        <div>
            <Profile />
            <div className="home">
                {

                    data.map(item => {
                        return (
                            <div class="container mt-5 d-flex justify-content-center" >
                                <div class="card p-3" style={{ width: 500 }}>
                                    <div class="d-flex align-items-center" style={{ padding: "2%" }}>
                                        <div class="image"> <img src={item.photo} class="rounded" width="130" /> </div>
                                        <div class="ml-3 w-100">
                                            <h4 class="mb-0 mt-0" style={{ marginLeft: "25px" }}>{item.contact_username}</h4>
                                            <span style={{ color: "grey", marginLeft: "25px" }}>{item.contact_number}</span>
                                            <p style={{ color: "grey", marginLeft: "25px" }}>{item.contact_email}</p>
                                            <div class="button mt-2 d-flex flex-row align-items-center" style={{ marginLeft: "25px" }} >
                                                <button class="btn btn-danger" onClick={() => deleteContact(item._id)}><i className="fa fa-trash fa-2x"></i></button>

                                                <button class="btn btn-success" style={{ marginLeft: "15px" }}><Link to={"/updatecontact/" + item._id} style={{ textDecoration: "none" }}><i class="fa fa-pencil fa-2x" style={{ color: "white" }}></i></Link> </button>
                                                <button class="btn btn-dark" style={{ marginLeft: "15px" }}><i className={item.contact_favourite ? 'fa fa-star favourite fa-2x' : 'fa fa-star nonFavourite fa-2x'} style={{ display: "inline-block" }}></i></button>

                                                {/* <i className="fa fa-trash fa-2x" style={{ color: "#D54C4C", paddingLeft: "20px", float: "left", display: "inline-block", marginRight:"10px"}} onClick={() => deleteContact(item._id)}></i>
                                                <button class="btn btn-light" style={{marginLeft:"15px"}}><i className={item.contact_favourite ? 'fa fa-star favourite fa-2x' : 'fa fa-star fa-2x'} ></i></button>
                                                <Link to={"/updatecontact/" + item._id} style={{ textDecoration: "none" }}><i class="fa fa-pencil fa-2x" style={{color:"green"}}></i></Link> */}
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div>




                        )
                    })
                }



            </div>
        </div>
    )
}



export default ContactsHome