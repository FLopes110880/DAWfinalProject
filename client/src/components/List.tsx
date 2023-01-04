import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Table from 'react-bootstrap/Table';
import {myList} from "../../../server/src/Mylist"
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

/**
 * BaseLayout.
 */
function MyList() {
    /**
     * Render().
     */

    const [list, setList] = useState([])
    let i = 1

    async function setMyList() {
        const response = await fetch("http://localhost:8080/listMylist")
        const json = await response.json()
        setList(json);
    }

    async function incrementItem(item: myList) {
        await fetch("http://localhost:8080/incrementQuantity", {
            body: JSON.stringify({
                item
            }),
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT"
        })
        setMyList();
    }

    async function decrementItem(item: myList, ID: string) {
        await fetch("http://localhost:8080/decrementQuantity", {
            body: JSON.stringify({
                item
            }),
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT"
        })
        if (item.quantidade-1 <= 0) {
            await fetch("http://localhost:8080/deleteItemList/"+ID, {
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "DELETE"
                })
            }
        setMyList();
    }

    async function deleteDB () {
        await fetch("http://localhost:8080/deleteDB", {
            headers: {
                "Content-type": "application/json"
            },
            method: "DELETE"
        })
        setMyList()
    }

    async function delet () {
        await deleteDB()
        alert("List Cancelled, please go to Home Page to add new Items")
    }

    async function addFinalized (items: myList[]) {
        await fetch("http://localhost:8080/addFinal", {
            body: JSON.stringify({
                items
            }),
            headers: {
                "Content-type": "application/json"
            },
            method: "POST"
        })
        deleteDB()
        setMyList()
        alert("Compra Finalizada")
    }

    useEffect(() => {
        setMyList()
    }, []);

    return (
        <div className="appContainer">
            <NavBar />

            <div>
                <Table striped bordered hover variant="secondary" style={{marginBottom: '10px'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(item => (
                        <tr key={item._id}>
                            <td>{i++}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => decrementItem(item, item._id)} style={{backgroundColor: 'transparent', border: 0}}>
                                    <img src={require("../assets/images/back.png")} alt={""} style={{ width: "27px", height: "26px",  }}></img>
                                </button>
                                {item.quantidade}
                                <button onClick={() => incrementItem(item)} style={{backgroundColor: 'transparent', border: 0}}>
                                    <img src={require("../assets/images/next.png")} alt={""} style={{ width: "24px", height: "24px",  }}></img>
                                </button>
                            </td>
                            <td>
                                <img src={require("../assets/images/"+item.img)} alt={""} style={{ width: "50px", height: "50px" }}></img>
                            </td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
            </div>
            <div>
                {list.length ? <Row style={{marginBottom: '50px'}}>
                    <Col style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button variant="primary" onClick={() => addFinalized(list)}>Finalize List</Button>
                    </Col>
                    <Col >
                        <Button variant="primary" onClick={() => (delet())}>Cancel List</Button>
                    </Col>
                </Row> : null}
            </div>

            <Footer />
        </div>
    ); /* End render(). */

} /* End class. */


export default MyList;
