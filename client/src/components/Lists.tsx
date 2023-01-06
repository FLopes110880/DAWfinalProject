// React imports.
import React, {useEffect} from "react";
import { Accordion } from "react-bootstrap";
import {myList} from "../../../server/src/Mylist"
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";

/**
 * BaseLayout.
 */
function List(props) {

    /**
     * Render().
     */
    //o primeito items vem da linha que passa o aray de itens pelo construtor,
    //o segundo .items vem do nome que está ba base de dados
    const items = props.items.items;

    return (
        <div style={{marginBottom: '10px', marginRight: '70px'}}>
            <ul>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1" style={{color: "50%"}}>
                        <Accordion.Header>List {props.index}</Accordion.Header>
                        <Accordion.Body style={{textAlign: "center"}}>
                            <MDBContainer className="py-5">
                                <MDBCard className="p-4">
                                    <MDBCardBody>
                                        <MDBRow className="my-2 mx-1 justify-content-center">
                                            <MDBTable striped borderless>
                                                <MDBTableHead
                                                    className="text-white"
                                                    style={{ backgroundColor: "#84B0CA" }}
                                                >
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Qantity</th>
                                                    </tr>
                                                </MDBTableHead>
                                                {items.map((item,i) =>
                                                    <MDBTableBody key={i}>
                                                        <tr>
                                                            <th scope="row">{i+1}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.quantidade}</td>
                                                        </tr>
                                                    </MDBTableBody>
                                                )}
                                            </MDBTable>
                                        </MDBRow>
                                        <hr />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBContainer>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </ul>
        </div>
    );


} /* End class. */


export default List; 