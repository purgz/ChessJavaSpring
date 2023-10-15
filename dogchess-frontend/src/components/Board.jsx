import "./Board.css"
import { useEffect, useState } from "react";

function getData(e){

    console.log(e.target.getAttribute("data-squareid"));
}

function pieceDragStart(e){

    const piece = e.target;
    //const pieceSquare = piece.parentNode.getAttribute("data-squareid");

    e.dataTransfer.setData("text", piece.id);
}

function allowPieceDrop(e){
    e.stopPropagation();
    e.preventDefault();
}




function renderBoard(board){
    let squares = document.getElementsByClassName("square");
    
    for (let i = 0; i < 64; i++){
       
        if (board[i] != '\0'){
            let piece = document.createElement("div");
            piece.draggable=true;
            piece.textContent = board[i];
            piece.ondragstart = pieceDragStart;
            squares[i].replaceChildren(piece);
            piece.id = i;
        } else {
            squares[i].innerHTML = "";
        }
        
    }
}


// eslint-disable-next-line react/prop-types
function Board({board, dropPiece}){



    useEffect(()=>{
        
        renderBoard(board);
       
    }, [board])

    const squares = Array.from(Array(64).keys());

    return (

        <div className={'board'}>
            {squares.map((square) =>
                <div onDragOver={allowPieceDrop} onDrop={dropPiece} onClick={getData} data-squareid={square} className={'square'} key={square}></div>
            )}
        </div>

    )
}

export default Board;