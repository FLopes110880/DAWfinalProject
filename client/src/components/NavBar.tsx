import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";

function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">MyProducts</Navbar.Brand>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Nav>
                            <Nav.Link href="/myList" >List</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/previousLists" >Previous Lists</Nav.Link>
                        </Nav>
                    </div>
                </Container>
            </Navbar>

        </>
    );
}

export default NavBar;