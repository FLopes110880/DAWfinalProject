// React imports.
import React, { Component } from "react";

/**
 * BaseLayout.
 */
class NavBar extends Component {
    /**
     * Render().
     */
    render() {

        return (
            <div className="appContainer">
                <footer className="footer bg-secondary  text-dark fixed-bottom">
                    <div className="text-center p-2 bg-light fixed-rigth">made by: Francisco, Tomás e Miguel ©</div>
                </footer>
            </div>
        );

    } /* End render(). */


} /* End class. */


export default NavBar;