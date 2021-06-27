import { Link } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useEffect, useState } from 'react';
import { BoardSideNavModal } from './BoardSideNavModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard } from '../../store/actions/boardAction';

// import React from 'react'

export function BoardPreview({ board, onRemove }) {
    // const { boards } = useSelector(state => state.boardReducer)
    const [isModalShown, setIsModalShown] = useState(false)
    // const [isModalDeleteShown, setIsModalDeleteShown] = useState(false)
    const [boardName, setBoardName] = useState('')
    const [editName, setEditName] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setBoardName(board.name)
    }, [])

    const onToggleModalOptions = () => {
        setIsModalShown(!isModalShown)
    }

    const onToggleEditName = () => {
        setEditName(!editName)
    }

    const handleChange = (ev) => {
        const { value } = ev.target

        const boardCopy = { ...board }
        boardCopy.name = value
        setBoardName(boardCopy.name)

    }

    const onEditAndSaveName = (ev) => {
        ev.preventDefault()
        onUpdateBoardInfo()
        setEditName(false)
    }

    const onUpdateBoardInfo = () => {
        const updatedBoard = { ...board }
        updatedBoard.name = boardName.charAt(0).toUpperCase() + boardName.slice(1)
        setBoardName(updatedBoard.name)
        dispatch(updateBoard(updatedBoard, 'Update Board successfully'))
    }

    return (
        <React.Fragment>
            <section className="board-preview flex align-center" >
                {!editName && <Link to={`/board/${board._id}`}>
                    {boardName}
                </Link>}
                {editName &&
                    <form onSubmit={(ev) => onEditAndSaveName(ev)}>
                        <input
                            className="input-edit-board"
                            value={boardName}
                            autoComplete="off"
                            autoFocus={true}
                            onChange={(ev) => handleChange(ev)}
                        >

                        </input>
                        <button type="submit" hidden></button>
                    </form>}
                <MoreHorizIcon
                    className="more-icon"
                    onClick={() => onToggleModalOptions()} />

                {isModalShown &&
                    <BoardSideNavModal
                        board={board}
                        onRemove={onRemove}
                        onToggleModalOptions={onToggleModalOptions}
                        onToggleEditName={onToggleEditName}
                    />}

                {isModalShown &&
                    <div
                        className="screen"
                        onClick={() => onToggleModalOptions()}
                    />}

            </section >
        </React.Fragment>
    )
}