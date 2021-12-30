import React, { useEffect } from "react";
import { Button, Table, Form, ButtonGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, loadUser } from "../redux/actions";
import {useHistory} from "react-router-dom";



const Home = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    const { users } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadUser())
    }, []);


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you wanted to delete the user ?")) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center my-3">
                <Button
                    variant="primary"
                    onClick={() => history.push("/addUser")}
                >
                    Add Users
                </Button>
            </div>
            <Table striped bordered hover responsive className="my-5">
                <thead>
                    <tr>
                        <th className="text-center"> Name</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Contact</th>
                        <th className="text-center">Address</th>
                        <th className="text-center">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user) => (
                            <tr key={user.id}>
                                <td className="text-center">{user.name}</td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">{user.contact}</td>
                                <td className="text-center">{user.address}</td>
                                <td className="text-center">
                                    <ButtonGroup aria-label="Basic example">
                                        <Button
                                            variant="danger"
                                            className="me-3"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <i className="far fa-trash-alt"></i>
                                        </Button>
                                        <Button variant="warning" className="ms-2" onClick={() => history.push(`editUser/${user.id}`)}><i className="far fa-edit text-white"></i></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </Table>
        </>
    )
}

export default Home
