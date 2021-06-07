import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { DeleteModalBoard } from '../DeleteModalBoard';

export function BoardSideNavModal({ board, onToggleModalOptions, onRemove }) {
    const [isModalDeleteShown, setIsModalDeleteShown] = useState(false)

    const onToggleAskDelete = () => {
        console.log('amit');
        setIsModalDeleteShown(!isModalDeleteShown)
    }
    const onCloseModalDelete = () => {
        // setIsModalShown(false)
        setIsModalDeleteShown(false)
    }
    return (
        <div className="modal-side-nave  board-modal-options flex col">
            <span className="btn-in-modal flex align-center">
                <EditOutlinedIcon />
            Rename Board
            </span>
            <span className="btn-in-modal flex align-center">
                <StarBorderTwoToneIcon />
                Add to Favorites
            </span>
            <span onClick={() => onToggleAskDelete()} className="btn-in-modal flex align-center">
                <DeleteIcon />
                    Delete Board
                    </span>
            {isModalDeleteShown &&
                <DeleteModalBoard
                    board={board}
                    onRemove={onRemove}
                    onToggleModalOptions={onToggleModalOptions}
                />
            }
            {isModalDeleteShown &&
                <div
                    className="dark-screen-nover "
                    onClick={() => onToggleAskDelete()}
                />}
        </div>
    )
}
