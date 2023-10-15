import "./Board.css"
import { useEffect, useState } from "react";
import blackKing from "../assets/black-king.svg"
import whiteKing from "../assets/white-king.svg"
import blackQueen from "../assets/black-queen.svg"
import whiteQueen from "../assets/white-queen.svg"
import blackRook from "../assets/black-rook.svg"
import whiteRook from "../assets/white-rook.svg"
import blackBishop from "../assets/black-bishop.svg"
import whiteBishop from "../assets/white-bishop.svg"
import blackKnight from "../assets/black-knight.svg"
import whiteKnight from "../assets/white-knight.svg"
import blackPawn from "../assets/black-pawn.svg"
import whitePawn from "../assets/white-pawn.svg"

function getData(e){

    console.log(e.target.getAttribute("data-squareid"));
}

function allowPieceDrop(e){
    e.stopPropagation();
    e.preventDefault();
}

function renderBoard(board,dragPiece){
    let squares = document.getElementsByClassName("square");
    
    for (let i = 0; i < 64; i++){
       
        if (board[i] != '\0'){
            let piece = document.createElement("div");
            piece.draggable=true;
            piece.textContent = board[i];
            piece.ondragstart = dragPiece;
            squares[i].replaceChildren(piece);
            piece.id = i;
            
            let img = document.createElement("img");
            
            switch(board[i]){
              case 'p':
                img.src = blackPawn;
                break;
              case 'n':
                img.src = blackKnight;
                break;
              case 'b':
                img.src = blackBishop;
                break;
              case 'r':
                img.src = blackRook;
                break;
              case 'q':
                img.src = blackQueen;
                break;
              case 'k':
                img.src = blackKing;
                break;
              case 'P':
                img.src = whitePawn;
                break;
              case 'N':
                img.src = whiteKnight;
                break;
              case 'B':
                img.src = whiteBishop;
                break;
              case 'R':
                img.src = whiteRook;
                break;
              case 'Q':
                img.src = whiteQueen;
                break;
              case 'K':
                img.src = whiteKing;
                break;
            }

            piece.replaceChildren(img);
        } else {
            squares[i].innerHTML = "";
        }
        
    }
}


// eslint-disable-next-line react/prop-types
function Board({board, dropPiece, dragPiece}){



    useEffect(()=>{
        
        renderBoard(board,dragPiece);
       
    }, [board,dragPiece])

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