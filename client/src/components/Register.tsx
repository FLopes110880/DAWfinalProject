// React imports.
import React, {Component, useEffect} from "react";
import { useState } from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";

/**
 * Login.
 */
function Register() {

    useEffect(() => {

    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //converter do getMylist do ficheiro myList e depois passar tudo para um array e ai alterar as quantidades e depois
    // mandas no body list
    const [list, setMyList] = useState([]);



    const addUser = async () => {
        try {
            let result = list.filter((element) => element.quantidade > 0)
            await fetch("http://localhost:8080/addFinal", {
                body: JSON.stringify({
                    result
                }),
                headers: {
                    "Content-type": "application/json"
                },
                method: "POST"
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="appContainer">
            <NavBar />
            <div className={"container py-5 h-100 tamanho"}>
                <div className="row d-flex align-items-center justify-content-center h-100 ">
                    <div className="justify-content-center ms-auto btn btn-lg shadow border-dark">
                        <div id="login-form" className="container">
                            <h1 style={{textAlign: 'center'}}>Register</h1>
                        </div>
                        <form>
                            <input type="email" onChange={(e) => setEmail(e.target.value)}
                                   className="form-control form-control-lg" placeholder="Email address"/>
                            <input type="password" onChange={(e) => setPassword(e.target.value)}
                                   className="form-control form-control-lg" placeholder="Password" style={{marginTop: '1rem'}}/>
                        </form>
                        <button onClick={addUser} style={{marginTop: '1rem'}}>Register</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
} /* End class. */


export default Register;
