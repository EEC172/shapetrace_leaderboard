import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Board from './board';
import axios from "axios";

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
        <div>
            {
                shadows.length > 0 ? (
                    shadows.map((item, index) => (
                        <Row key={index}>
                            {/* <Col><p>{item.shape}</p></Col> */}
                            <Col> <Board board={item.board}/> </Col>
                            {/* <Col><p>{item.score}</p></Col> */}
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