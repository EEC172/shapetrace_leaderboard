import React from 'react';
import { Row, Col, Nav, Navbar } from 'react-bootstrap';
import './../css/header.css';

function Header() {

    return (
        <div className="navbar-container">
        <Navbar expand="lg" className="bg-body-tertiary navbar-subcontainer"  sticky="top">
            <Row className="navbar-row">
                <Col sm = {5} md={5} lg={5}>
                    <Navbar.Brand className="logo-text" href="/">ShapeTrace Leaderboard</Navbar.Brand>
                </Col>
                <Col>
                    <Nav className="d-flex justify-content-end">
                        <Nav.Link className="navbar-text" href="/">All-Time</Nav.Link>
                        <Nav.Link className="navbar-text" href="/square">Square</Nav.Link>
                        <Nav.Link className="navbar-text" href="/triangle">Triangle</Nav.Link>
                        <Nav.Link className="navbar-text" href="/circle">Circle</Nav.Link>
                        <Nav.Link className="navbar-text" href="/">EEC172</Nav.Link>
                    </Nav>
                </Col>
            </Row>
        </Navbar>
        </div> 
    )

}

export default Header; 