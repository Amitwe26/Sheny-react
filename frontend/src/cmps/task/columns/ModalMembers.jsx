import React from 'react';
import { Avatar } from '@material-ui/core';

export function ModalMembers({
  onRemoveMember,
  task,
  boardMembers,
  onAddMember,
}) {
  const renderBoardMembers = (taskMembers, boardMembers) => {
    return boardMembers.map((boardMember) => {
      if (
        !taskMembers.find((taskMember) => taskMember._id === boardMember._id)
      ) {
        return (
          <div
            className='member-card flex align-center'
            key={boardMember._id}
            onClick={() => {
              onAddMember(boardMember);
            }}
          >
            <div className='member-right flex align-center'>
              <Avatar
                className='avatar'
                alt={`${boardMember.fullname}`}
                src={boardMember.imgUrl}
              />
              <span className='member-name'>{boardMember.fullname}</span>
            </div>
            <span className='member-btn'>&#43;</span>
          </div>
        );
      }
    });
  };

  return (
    <div className='members-list'>
      <input type='text' placeholder='Enter name' autoFocus />
      {task.members.map((member) => {
        return (
          <div
            className='member-card flex align-center'
            key={member._id}
            onClick={() => {
              onRemoveMember(member._id);
            }}
          >
            <div className='member-right flex align-center'>
              <Avatar
                className='avatar'
                alt={`${member.fullname}`}
                src={member.imgUrl}
              />
              <span className='member-name'>{member.fullname}</span>
            </div>
            <span className='member-btn'>&minus;</span>
          </div>
        );
      })}
      <div>
        <div className='line'></div>
        <span className='people'>People</span>
      </div>
      {renderBoardMembers(task.members, boardMembers)}
    </div>
  );
}
