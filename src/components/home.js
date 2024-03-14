import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Board from './board';
import axios from "axios";
import './../css/home.css';

function Home() {
    const [shadows, setShadows] = useState([]); 

    useEffect(() => { 
        axios.get('http://localhost:5001/shadow/get-all-shadows')
        .then((res) => {
            setShadows(res.data); 
        }) 
        .catch((error) => {}); 
    }, []);

    return (
        <div className='home'>
            <Row className='table-row'>
                <Col className='cell-col'>Shape</Col>
                <Col className='cell-col'>Score</Col>
                <Col className='cell-col'>Drawing</Col>
            </Row>
            {
                shadows.length > 0 ? (
                    shadows.map((item, index) => (
                        <Row key={index} className='cell-row'>
                            <Col><p>{item.shape}</p></Col>
                            <Col><p>{item.score}</p></Col>
                            <Col className='center'> <Board board={item.board} /> </Col>
                        </Row>
                    ))
                ) : (
                    <Row>
                        <Col><p>No Scores Yet!</p></Col>
                    </Row>
                )
            }
        </div>
    )

}

export default Home; 