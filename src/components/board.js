import React, {useState, useEffect, useLayoutEffect} from 'react';
import './../css/board.css'
import { Row, Col, Container } from 'react-bootstrap';

function Board (props) {
    const board_string = props.board; 
    const [boardGrid, setGrid] = useState([]);
    // const grid = new Array(128).fill().map(() => new Array(128).fill(0)); 

    useLayoutEffect(() => { 
        if (boardGrid.length === 0) {
            stringToBits();
        }
    }, []);

    function stringToBits() {
        const grid = new Array(128).fill().map(() => new Array(128).fill(0)); 
        let gridRow = 0; 
        let gridCol = 0; 
        // for (let row = 0; row < 32; row++) {
        //     for (let col = row*32; col < row*32 + 31; col++) {
        //         // console.log(board_string[col] + board_string[col+1] + " ");
        //         // 1 char = 2 hex digits = 8 bits (4 bits each)
        //         let hex = board_string[col];
        //         let bin = parseInt(hex, 16).toString(2).padStart(4, '0');
        //         for(let index = 0; index < 4; index++) {
        //             grid[gridRow][gridCol + index] = parseInt(bin[index]);
        //         }
        //         gridCol += 4; 
        //         if (gridCol === 128) {
        //             console.log("hit max, resetting gridCol, index=" + row+ " " + col + " " + gridRow + " " + gridCol)
        //             gridRow += 1; 
        //             gridCol = 0; 

        //         }
        //     }
        //     console.log(gridRow);
        // }

        for (let row = 0; row < 128; row++) {
            for (let col = row*128; col < row*128 + 128; col++) {
                grid[gridRow][gridCol] = parseInt(board_string[col]);
                gridCol ++; 
                if (gridCol === 128) {
                    gridCol = 0; 
                }
            }
            gridRow++; 
        }

        console.log(grid);
        setGrid(grid); 
    }

    function getColor(value) {
        return value === 1 ? 'green' : 'black'; 
    }

    return (
        <div className='board'>
            {boardGrid.map((row, rowIndex) => (
                <Row key={rowIndex} className='g-0'>
                    {row.map((cell, colIndex) => (
                        <Col key={colIndex}>
                            <div
                                className='pixel g-0'
                                style={{ width: '1px', height: '1px', backgroundColor: getColor(cell), padding: 0}}
                            ></div>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    )
}

export default Board; 