import React from 'react'
import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../redux/actions';
import { useEffect } from 'react';

const EditUser = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    })
    const [error, setError] = useState("")
    const { name, email, contact, address } = state;
    let history = useHistory();
    let {id} = useParams();
    const {user} = useSelector((state) => state.data)
    console.log("user Chacking", user);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(id))
    }, [])

    useEffect(() => {
        if(user) {
            setState({...user})
        }
    }, [user])
    const inputHandleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact || !address) {
            setError("Please Input all the input field")
        }
        else {
            dispatch(updateUser(state, id))
            history.push("/")
            setError("")
        }
    }
    return (
        <div>

            <div className="d-flex justify-content-center my-4">
                <Button variant="danger" onClick={() => history.push("/")} >
                    Go Back
                </Button>
            </div>


            <h4 className='text-center my-4'>Update User</h4>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-9 col-11 mx-auto">
                    {error && <Alert variant="danger">
                            {error}
                        </Alert>
                    
                     }
                        
                        <Form className='mb-5' onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name || ""}
                                    name="name"
                                    onChange={inputHandleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email || ""}
                                    name="email"
                                    onChange={inputHandleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Contact"
                                    value={contact || ""}
                                    name="contact"
                                    onChange={inputHandleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Address"
                                    value={address || ""}
                                    name="address"
                                    onChange={inputHandleChange}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default EditUser;
