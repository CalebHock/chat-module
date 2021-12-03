import React from "react";
import Board from "../board/Board";

import './style.css';

class Container extends React.Component
{
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div className="container">
                <div className="color-picker">
                    <input type="color" />
                </div>

                <div class="board-container">
                    <Board></Board>
                </div>
            </div>
        )
    }
}

export default Container