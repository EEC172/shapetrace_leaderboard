import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Board from './board';
import axios from "axios";
import './../css/home.css';

function Square() {
    const [shadows, setShadows] = useState([]); 

    useEffect(() => { 
        axios.get('http://localhost:5001/shadow/get-all-squares')
        .then((res) => {
            setShadows(res.data); 
        }) 
        .catch((error) => {}); 
    }, []);

    return (
        <div className='home'>
            <h1>Shape</h1>
            <Row className='table-row'>
                <Col className='cell-col'>Score</Col>
                <Col className='cell-col'>Drawing</Col>
            </Row>
            {
                shadows.length > 0 ? (
                    shadows.map((item, index) => (
                        <Row key={index} className='cell-row'>
                            <Col><p>{item.score}</p></Col>
                            <Col className='center'> <Board board={item.board}/> </Col>
                        </Row>
                    ))
                ) : (
                    <Row>
                        <Col><h1>No Scores Yet!</h1></Col>
                    </Row>
                )
            }
        </div>
    )

}

export default Square; 