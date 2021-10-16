import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import 'font-awesome/css/font-awesome.min.css';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const Edit = () => {
    const history = useHistory()
    const [contact_username, setUsername] = useState("")
    const [contact_email, setEmail] = useState("")
    const [contact_number, setNumber] = useState("")
    const [contact_favourite, setFavourite] = useState("false")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const { postid } = useParams()
    console.log(postid)
    useEffect(() => {
        if (url) {
            fetch(`/updatecontact/${postid}`, {

                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    contact_username,
                    contact_email,
                    contact_number,
                    contact_favourite,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {

                    if (data.error) {
                        M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    }
                    else {
                        M.toast({ html: "Contact Updated Successfully", classes: "#43a047 green darken-1" })
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [url])



    const postDetails = () => {
        // <EditContact/>
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


            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Add to favourites:-</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" onChange={(e) => setFavourite(true)} checked={contact_favourite === true} />
                        <FormControlLabel value="false" control={<Radio />} label="No" onChange={(e) => setFavourite(false)} checked={contact_favourite === false} />
                    </RadioGroup>
                </FormControl>
            </div>


            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => postDetails()}

            >
                Update Contact
            </button>

        </div>
    )
}

export default Edit
