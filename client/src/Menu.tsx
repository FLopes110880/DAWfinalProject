// React imports.
import React, {useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { iItems } from '../../server/src/Items'
import { myList } from '../../server/src/Mylist'

/**
 * BaseLayout.
 */
function Menu() {
    /**
     * Render().
     */

    const [items, setItems] = useState([])

    async function setItemList() {
        const response = await fetch("http://localhost:8080/listItems")
        const json = await response.json()
        setItems(json);
    }

    async function setMyList() {
        const response = await fetch("http://localhost:8080/listMylist")
        const json = await response.json()
        // console.log(json)
    }

    const addMylist = async (item: iItems) => {
        try {
            // console.log(item.name)
            const result = await fetch("http://localhost:8080/listMylist")
            const json = await result.json()
            // console.log(json)
            let r = await json.find(p => p.name === item.name)
            if (r === undefined) {
                await fetch("http://localhost:8080/addItemList", {
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
                await fetch("http://localhost:8080/incrementQuantity", {
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
                                        <Card.Img variant="top" src={require("./assets/images/"+item.img)} style={{ width: "100px", height: "100px" }} />
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
