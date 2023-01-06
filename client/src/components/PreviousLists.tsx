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

    /**
     * These variable is a hook, Hooks are functions that let you “hook into” React state and lifecycle features from
     * function components. Hooks don't work inside classes — they let you use React without classes.
     * */
    const [ lists, setLists ] = useState([])

    /**
     * This function will make a fetch and return the array of lists which each of these lists as an array of items
     * then it will pass it to format json and subsequently will define the list that will be used to display the lists
     * This variable lists is set using a "hook" useState([]) it has [] because it's an array that it's retrieved.
     * */
    async function getLists() {
        const response = await fetch("http://localhost:8080/getFinalList")
        const data = await response.json()
        setLists(data)
        console.log(lists)
    }

    /**
     * This function it's based in React 'componentDidMount()' that will invoke the functions inside after a component is mounted.
     * In this case, the 'useEffect()' only executes the arrow function after the main component mount, only executing one time.
     * */
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