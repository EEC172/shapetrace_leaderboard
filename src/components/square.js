import React, {useState, useEffect} from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Board from './board';
import axios from "axios";
import './../css/home.css';

function Square() {
    const [shadows, setShadows] = useState([]); 
    const [sorted, setSorted] = useState(false);

    function compareScore(a, b) {
        if (parseFloat(a.score) < parseFloat(b.score)) {
            return 1;
        }
        if (parseFloat(a.score) > parseFloat(b.score)) {
            return -1;
        }
        return 0;
    }

    useEffect(() => { 
        axios.get('http://localhost:5001/shadow/get-all-squares')
        .then((res) => {
            if (shadows.length !== res.data.length) {
                setShadows(res.data); 
                setSorted(false);
            }
        })
        .catch((error) => {console.log(error)}); 
    }, []);

    useEffect(() => {
        if (!sorted) {
            setShadows(shadows.sort(compareScore).slice(0, 10));
            setSorted(true);
        } 
    }, [shadows]);

    return (
        <div className='home'>
            <h1>Square</h1>
            <Row className='table-row'>
                <Col className='cell-col'>Score</Col>
                <Col className='cell-col'>Drawing</Col>
            </Row>
            {sorted ? (
                <Container>
                {
                    shadows.length > 0 ? (
                        shadows.map((item, index) => (
                            <Row key={index} className='cell-row'>
                                <Col><p>{item.score}</p></Col>
                                <Col className='center'> 
                                    <Board board={item.board} shape={item.shape} changed={sorted}/> 
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <Row>
                            <Col><p>No Scores Yet!</p></Col>
                        </Row>
                    )
                }
                </Container>
                ) : (
                    <Row>
                        <Col><p>Loading..</p></Col>
                    </Row>
                )
            }
            
        </div>
    )

}

export default Square; 