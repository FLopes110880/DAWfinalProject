// React imports.
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Lists from "./Lists"
/**
 * BaseLayout.
 */

function MyLists() {
    /**
     * Render().
     */
    const [ lists, setLists ] = useState([])

    async function getLists() {
        const response = await fetch("http://localhost:8080/getFinalList")
        const data = await response.json()
        setLists(data)
        console.log(lists)
    }

    useEffect(() => {
        getLists();
    }, []);

    return (
        <div>
            <NavBar/>
            <ul style={{marginTop: '20px', marginBottom: '60px'}}>
                {lists.map((item,i) =>
                    <Lists key={i} items={item} index={i+1}/>
                )}
            </ul>
            <Footer/>
        </div>
    )
};


export default MyLists;