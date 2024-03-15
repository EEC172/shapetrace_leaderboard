import React, {useState, useLayoutEffect} from 'react';
import './../css/board.css'
import { Row, Col } from 'react-bootstrap';


function Board (props) {
    const board_string = props.board; 
    const shape = props.shape; 
    const changed = props.changed; 
    const [boardGrid, setGrid] = useState([]);

    var grid = new Array(128).fill().map(() => new Array(128).fill(0)); 
    

    useLayoutEffect(() => { 
        if (boardGrid.length === 0 || changed) {
            stringToBits();
        }
    }, []);

    function drawShape() {
        if (shape === 'Square') {
            for (let i = 30; i < 90; i++) {
                for (let j = 30; j < 90; j++) {
                    if (((i==30 && j != 30) ||
                            (i==89 && j != 89) || (j == 30 || j == 89)) &&
                        grid[i][j] === '0') {
                        grid[i][j] = "2";
                    }
                }
            }
        }
    }

    function stringToBits() {
        // console.log(grid);
        
        let gridRow = 0; 
        let gridCol = 0; 

        for (let i = 0; i < board_string.length; i++) {
            let char = parseInt(board_string[i], 16);
            
            var binary = char.toString(2).toString();
            while (binary.length < 4) {
                binary = '0' + binary;
            }
            // console.log(gridRow + "," + gridCol + " " + gridRow + "," + (gridCol+1) + " " + (gridRow+1) + "," + gridCol + " " +  (gridRow+1) + " " + (gridCol+1));
            
            if (gridRow+1 < 128 && gridCol+1 < 128) {
                grid[gridCol][gridRow] = binary[0];
                grid[gridCol+1][gridRow] = binary[1];
                grid[gridCol][gridRow+1] = binary[2];
                grid[gridCol+1][gridRow+1] = binary[3];
                // if (char != 0)
                // console.log(grid[gridRow][gridCol] + grid[gridRow][gridCol+1] + "\n" +  grid[gridRow+1][gridCol] + grid[gridRow+1][gridCol+1]);
            }
            gridCol+=2; 
            if (gridCol === 128) {
                gridCol = 0; 
                gridRow+=2; 
            }
        }
        drawShape();
        setGrid(grid); 
    }

    function getColor(value) {
        if (value === '1') {
            return 'yellow';
        } else if (value==='2') {
            return 'cyan';
        } else {
            return 'black';
        }
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