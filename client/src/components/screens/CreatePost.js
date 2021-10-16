import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

const CreatePost = () => {
    const history = useHistory()
    const [contact_username, setUsername] = useState("")
    const [contact_email, setEmail] = useState("")
    const [contact_number, setNumber] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            fetch("/createcontact", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    contact_username,
                    contact_email,
                    contact_number,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {

                    if (data.error) {
                        M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    }
                    else {
                        M.toast({ html: "Created Contact Successfully", classes: "#43a047 green darken-1" })
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [url])


    const postDetails = () => {
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
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <h3 style={{ textAlign: "center", color: "#2E357E", marginTop: "50px", fontSize: "40px" }}>Create new contact</h3>
            <div className="card input-filed"
                style={{
                    margin: "30px auto",
                    maxWidth: "500px",
                    padding: "20px",
                    textAlign: "center"
                }}
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={contact_username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={contact_email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={contact_number}
                    onChange={(e) => setNumber(e.target.value)}
                />


                <div className="file-field input-field">
                    <div className="btn btn-primary #64b5f6 darken-1">
                        <span>Upload Image</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn btn-primary waves-effect waves-light #64b5f6  darken-1"
                    onClick={() => postDetails()}

                >
                    Create Contact
                </button>

            </div>
        </div>
    )
}


export default CreatePost
