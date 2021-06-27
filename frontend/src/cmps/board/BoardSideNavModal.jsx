import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { DeleteModalBoard } from '../DeleteModalBoard';

export function BoardSideNavModal({
  board,
  onToggleModalOptions,
  onRemove,
  onToggleEditName,
}) {
  const [isModalDeleteShown, setIsModalDeleteShown] = useState(false);

  const onToggleAskDelete = () => {
    setIsModalDeleteShown(!isModalDeleteShown);
  };
  const onCloseModalDelete = () => {
    // setIsModalShown(false)
    setIsModalDeleteShown(false);
  };
  const toggleEdit = () => {
    if (!onToggleEditName) return;
    onToggleEditName();
    onToggleModalOptions();
  };
  return (
    <div className='modal-side-nave  board-modal-options flex col'>
      <span
        className='btn-in-modal flex align-center'
        onClick={() => toggleEdit()}
      >
        <EditOutlinedIcon />
        Rename Board
      </span>
      <span className='btn-in-modal flex align-center'>
        <StarBorderTwoToneIcon />
        Add to Favorites
      </span>
      <span
        onClick={() => onToggleAskDelete()}
        className='btn-in-modal flex align-center'
      >
        <DeleteIcon />
        Delete Board
      </span>
      {isModalDeleteShown && (
        <DeleteModalBoard
          info={board}
          keyName={'board'}
          onRemove={onRemove}
          onToggleModalDelete={onToggleModalOptions}
        />
      )}
      {isModalDeleteShown && (
        <div
          className='dark-screen-nover '
          onClick={() => onToggleAskDelete()}
        />
      )}
    </div>
  );
}
