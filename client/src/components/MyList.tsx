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

    /**
     * These variable is a hook, Hooks are functions that let you “hook into” React state and lifecycle features from
     * function components. Hooks don't work inside classes — they let you use React without classes.
     * */
    const [list, setList] = useState([])
    /**
     * This variable is going to be used to view the number of the item that will be listed in the MyList page
     * */
    let i = 1

    /**
     * This function will make a fetch that will make a GET and retrieve an array of items that was added to database MyList
     * then it will transform what was retrieved to format json and subsequently will assign it to the "hook" list
     * to show in the page what was retrieved
     * */
    async function setMyList() {
        const response = await fetch("http://localhost:8080/listMylist")
        const json = await response.json()
        setList(json);
    }

    /**
     * This function will make a request HTTP PUT method that will put in his body the item that will increase the key quantity
     * in the object that is being passed that will go to the endpoint in the fetch in file main.ts and it will make an update
     * and increase the quantity value by each click the user does in the right arrow in the frontend
     * */
    async function incrementItem(item: myList) {
        await fetch("http://localhost:8080/incrementQuantityMyList", {
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


    /**
     * This function will make a request HTTP PUT method that will put in his body the item that will decrease the key quantity
     * in the object that is being passed that will go to the endpoint in the fetch in file main.ts, and it will make an update
     * and decrease the quantity value by each click the user does in the right arrow in the frontend.
     * If the value of the object gets to 0 it will remove the item from the database MyList, it will make a fetch delete that
     * will pass the id of the item to then search it, and subsequently it will search the item to see if exists and will remove it
     * */
    async function decrementItem(item: myList, ID: string) {
        await fetch("http://localhost:8080/decrementQuantityMyList", {
            body: JSON.stringify({
                item
            }),
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT"
        })
        if (item.quantidade-1 <= 0) {
            await fetch("http://localhost:8080/deleteItemMyList/"+ID, {
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "DELETE"
                })
            }
        setMyList();
    }

    /**
     * This function when the user clicks in the button cancel it will remove everything within database MyList
     * using a fetch with request HTTP Delete method
     * */
    async function deleteDB () {
        await fetch("http://localhost:8080/deleteMyListDB", {
            headers: {
                "Content-type": "application/json"
            },
            method: "DELETE"
        })
        setMyList()
    }

    /**
     * This function will call deleteDB, and then it will pop up an alert to let user know that it's MyList will be eliminated
     * */
    async function delet () {
        await deleteDB()
        alert("List Cancelled, please go to Home Page to add new Items")
    }


    /**
     * When the user clicks in Finalize list it will add the array of items in MyList in the database finalList using a
     * request HTTP Post method, and then delete MyList database for the next time the user wants to add a new list, and
     * subsequently it will call the function setMyList to refresh the variable that has the items to show to the user,
     * and finally alert that the list was added
     * */
    async function addFinalized (items: myList[]) {
        await fetch("http://localhost:8080/addItemFinalList", {
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
        alert("Lista Finalizada")
    }

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
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
