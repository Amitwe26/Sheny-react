import { Component, useState } from 'react';

import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { ModalMembers } from './ModalMembers';
import React from 'react';

export function TaskMembers({
  task,
  boardMembers,
  onRemoveMember,
  onAddMember,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMemebers = () => {
    setIsOpen(!isOpen);
  };

  const renderTaskMembers = (members) => {
    if (!members.length) {
      return <Avatar className='avatar' src='/broken-image' />;
    }
    return members.map((member) => {
      return (
        <Avatar
          key={member._id}
          className='avatar'
          alt={member.fullname}
          src={member.imgUrl}
        />
      );
    });
  };

  return (
    <div className='column-members'>
      <AvatarGroup
        max={2}
        className='avatar-container flex center'
        onClick={() => toggleMemebers()}
      >
        {renderTaskMembers(task.members)}
      </AvatarGroup>
      {isOpen && (
        <ModalMembers
          onRemoveMember={onRemoveMember}
          task={task}
          boardMembers={boardMembers}
          onAddMember={onAddMember}
        />
      )}
      {isOpen && <div className='screen' onClick={() => toggleMemebers()} />}
    </div>
  );
}
