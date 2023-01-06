// React imports.
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { iItems } from '../../../server/src/Items'

/**
 * BaseLayout.
 */
function Menu() {
    /**
     * Render().
     */

    const [items, setItems] = useState([])

    /**
     * This function will retrieve the objects that are in the database Items, and the pass the array to a json array to
     * then set the hook items to the json format of what was retrieved
     * */
    async function setItemList() {
        const response = await fetch("http://localhost:8080/listMenuItems")
        const json = await response.json()
        setItems(json);
    }

    /**
     * This function will make a fetch that will make a GET and retrieve an array of items that was added to database MyList
     * then it will transform what was retrieved to format json and subsequently will assign it to the "hook" list
     * to show in the page what was retrieved
     * */
    async function setMyList() {
        const response = await fetch("http://localhost:8080/listMylist")
        await response.json()
        // console.log(json)
    }

    /**
     * This functions will get what is in the database MyList and then find the item that was clicked to be added to MyList,
     * if it already exists in MyList in database it will increase it's number if not it will be added to the database MyList
     * */
    const addMylist = async (item: iItems) => {
        try {
            // console.log(item.name)
            const result = await fetch("http://localhost:8080/listMylist")
            const json = await result.json()
            // console.log(json)
            let r = await json.find(p => p.name === item.name)
            if (r === undefined) {
                await fetch("http://localhost:8080/addItemMyList", {
                    body: JSON.stringify({
                        item
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "POST"
                })
            }
            else {
                await fetch("http://localhost:8080/incrementQuantityMyList", {
                    body: JSON.stringify({
                        item
                    }),
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "PUT"
                })
            }
            setItemList();
            setMyList();
        }
        catch (error) {
            console.error(error)
        }
    }

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
    useEffect(() => {
        setItemList();
    }, []);

    return (
        <div className="appContainer">
            <NavBar />
            <Row xs={1} md={3} className="g-4" style={{paddingTop: '20px', marginLeft: '1rem', marginRight: '1rem', marginBottom: '70px'}}>
                {items.map(item => (
                    <Col key={item._id}>
                        <Card border="info" bg ="light">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{item.name}</Card.Title>
                                    </Col>
                                    <Col>
                                        <Card.Img variant="top" src={require("../assets/images/"+item.img)} alt="" style={{ width: "100px", height: "100px" }} />
                                    </Col>
                                </Row>
                                <Button variant="primary" onClick={() => addMylist(item)}>Add to list</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Footer />
        </div>
    ); /* End render(). */

} /* End class. */


export default Menu;
