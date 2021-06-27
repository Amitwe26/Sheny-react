import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { ColorLens } from '@material-ui/icons';
import { ColorCmp } from './ColorCmp';
import { DeleteModalBoard } from '../DeleteModalBoard';


export function GroupEdit({ group, toggleModal, onUpdateGroup, onRemoveGroup }) {
    const [showPallete, setShowPallete] = useState(false)
    const [isModalDeleteShown, setIsModalDeleteShown] = useState(false)

    const togglePallete = () => {
        setShowPallete(!showPallete);
    }

    const changeColor = (ev, chosenColor) => {
        ev.stopPropagation();
        const copyGroup = { ...group };
        copyGroup.color = chosenColor;
        onUpdateGroup(copyGroup);
        toggleModal();
    }

    const onToggleModalDelete = () => {
        setIsModalDeleteShown(!isModalDeleteShown)
    }

    return (
        <React.Fragment>
            <section className="group-edit flex col ">
                <span className="delete flex align-center" onClick={() => onToggleModalDelete()}>
                    <DeleteIcon
                        className="icon-delete"
                    />
                            Delete Group
                        </span>
                <span className="color flex align-center" onClick={() => togglePallete()}>
                    <ColorLens />
                            Change Color
                            {showPallete && <ColorCmp togglePallete={togglePallete} changeColor={changeColor} />}
                </span>
            </section>
            {isModalDeleteShown &&
                <DeleteModalBoard
                    info={group}
                    keyName={'group'}
                    onRemove={onRemoveGroup}
                    onToggleModalDelete={onToggleModalDelete}
                />}
            {isModalDeleteShown &&
                <div
                    className="dark-screen-nover "
                />}
        </React.Fragment>
    )
}
