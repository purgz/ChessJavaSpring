import "./Board.css"

function getData(e){

    console.log(e.target.getAttribute("data-squareid"));
}

function Board(){

    const squares = Array.from(Array(64).keys());

    return (

        <div className={'board'}>
            {squares.map((square) =>
                <div onClick={getData} data-squareid={square} className={'square'} key={square}>{square}</div>
            )}
        </div>

    )
}

export default Board;