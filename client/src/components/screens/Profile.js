import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import userimage from "./../../images/profileImg.png"
const Profile = () => {
    const [myContacts, setContacts] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")

    useEffect(() => {
        fetch('/mycontacts', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setContacts(result.mypost)
            })
    }, [])

    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "Pocket-Phone")
            data.append("cloud_name", "cnpasdf")
            fetch("https://api.cloudinary.com/v1_1/cnpasdf/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {


                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                            //window.location.reload()
                        })

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])
    const updatePhoto = (file) => {
        setImage(file)
    }
    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>


                <div style={{
                    display: "flex",
                    justifyContent: "space-around",

                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={userimage}
                        />

                    </div>
                    <div style={{ marginTop: "50px", marginLeft: "-20px" }}>
                        <h4>{state ? "Welcome " + state.name : "loading"}</h4>
                        <h5>{state ? state.email : "loading"}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        </div>

                    </div>
                </div>

                <div className="file-field input-field" style={{ margin: "10px" }}>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>

            <h3 style={{ textAlign: "center", color: "#2E357E", fontSize: "40px" }}>My Contacts</h3>


        </div>
    )
}


export default Profile