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
        if (shape === 'House') {
            let starting_point = 40;
            let x = starting_point; let y = starting_point;
            let limit = starting_point + 50;
            for (y = starting_point; y < limit; y++) {
                for (x = starting_point; x < limit; x++) {
                    if (y == starting_point || y == limit-1 || x == starting_point || x == limit-1) {
                        if (grid[x][y] === '0')
                            grid[x][y] = "2";
                    }
                }
            }
            let roof_start = 40; let roof_end = 90;
            let middle = (roof_start + roof_end) / 2;
            let i;
            for (i = 1; i <= middle - roof_start; i++) {
                if (grid[roof_start-i][roof_start+i] === '0')
                    grid[roof_start-i][roof_start+i] = "2";

                if (grid[roof_start-i][roof_end-i] === '0')
                    grid[roof_start-i][roof_end-i] = "2";
            }
        }
        if (shape === 'Triangle') {
            let base = 60; let height = 60; let starting_point = 30;
            let x = starting_point; let y = starting_point;
            for (y = starting_point; y < starting_point + height; y++) {
                for (x = starting_point; x < starting_point + base - (y - 30); x++) {
                    if (x == starting_point || y == starting_point ||
                            x == starting_point + base - (y - 30) - 1) {
                        if (grid[x][y] === '0')
                            grid[x][y] = "2";

                    }
                }
            }
        }
        if (shape === 'Circle') {
            let x0 = 60; 
            let y0 = 60; 
            let r = 30; 
            let f = 1 - r;
            let ddF_x = 1;
            let ddF_y = -2 * r;
            let x = 0;
            let y = r;
      
            if (grid[x0][y0+r] === '0')
                grid[x0][y0+r] = "2";

            if (grid[x0][y0-r] === '0')
                grid[x0][y0-r] = "2";

            if (grid[x0+r][y0] === '0')
                grid[x0+r][y0] = "2";

            if (grid[x0-r][y0] === '0')
                grid[x0-r][y0] = "2";
      
            while (x<y) {
                if (f >= 0) {
                    y--;
                    ddF_y += 2;
                    f += ddF_y;
                }
                x++;
                ddF_x += 2;
                f += ddF_x;
      
                if (grid[x0+x][y0+y] === '0')
                    grid[x0+x][y0+y] = "2";

                if (grid[x0-x][y0+y] === '0')
                    grid[x0-x][y0+y] = "2";

                if (grid[x0+x][y0-y] === '0')
                    grid[x0+x][y0-y] = "2";
                
                if (grid[x0-x][y0-y] === '0')
                    grid[x0-x][y0-y] = "2";

                if (grid[x0+y][y0+x] === '0')
                    grid[x0+y][y0+x] = "2";

                if (grid[x0-y][y0+x] === '0')
                    grid[x0-y][y0+x] = "2";

                if (grid[x0+y][y0-x] === '0')
                    grid[x0+y][y0-x] = "2";
                
                if (grid[x0-y][y0-x] === '0')
                    grid[x0-y][y0-x] = "2";
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