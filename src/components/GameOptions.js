import React from 'react'
import "../styles/grid.scss";

const GameOptions = ({className, title, state}) => {
    // console.log(className)
    return (
        <div className={ className }>
            <p>{ title }</p>
            <p>{ state }</p>
        </div>
    )
}

export default GameOptions;
