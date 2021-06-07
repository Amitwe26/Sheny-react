import { Component, useState } from 'react';

import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

import React from 'react'

// export function TaskMembers({ task, boardMembers, onRemoveMember, onAddMember }) {
//     const [isOpen, setIsOpen] = useState(false)
//     console.log('boardMembers is:', boardMembers);


//     const toggleMemebers = () => {
//         setIsOpen(!isOpen)
//     }

//     const renderTaskMembers = (members) => {
//         if (!members.length) {
//             return <Avatar className="avatar" src="/broken-image" />
//         }
//         return members.map(member => {
//             return <Avatar
//                 key={member._id}
//                 className="avatar"
//                 alt={member.fullname}
//                 src={member.imgUrl}
//             />
//         })
//     }


//     const renderBoardMembers = (taskMembers, boardMembers) => {
//         const arr = boardMembers.map(boardMember => {
//             const member = taskMembers.some(taskMember => taskMember._id === boardMember._id)
//             if (!member) {
//                 return (
//                     <div
//                         className="member-card flex align-center"
//                         key={boardMember._id}
//                         onClick={(boardMember) => onAddMember(boardMember)}
//                     >
//                         <div className="member-right flex align-center">
//                             <Avatar
//                                 className="avatar"
//                                 alt={`${boardMember.fullname}`}
//                                 src={boardMember.imgUrl}
//                             />
//                             <span className="member-name">{boardMember.fullname}</span>
//                         </div>
//                         <span className="member-btn">&#43;</span>
//                     </div>
//                 )

//             }

//         })
//         return arr
//     }

//     return (
//         <div className="column-members">
//             <AvatarGroup max={2} className="avatar-container flex center" onClick={() => toggleMemebers()} >
//                 {renderTaskMembers(task.members)}
//             </AvatarGroup>
//             <Avatar style={{ display: "none" }} src="/broken-image.jpg" />
//             {isOpen &&
//                 <div className="members-list">
//                     <input
//                         type="text"
//                         placeholder="Enter name"
//                         autoFocus
//                     />
//                     {task.members.map((member) => {
//                         return (
//                             <div
//                                 className="member-card flex align-center"
//                                 key={member._id}
//                                 onClick={() => onRemoveMember(member._id)}>
//                                 <div className="member-right flex align-center">
//                                     <Avatar
//                                         className="avatar"
//                                         alt={`${member.fullname}`}
//                                         src={member.imgUrl}
//                                     />
//                                     <span className="member-name">{member.fullname}</span>
//                                 </div>
//                                 <span className="member-btn">&minus;</span>

//                             </div>
//                         )
//                     })}
//                     <div>
//                         <div className="line"></div>
//                         <span className="people">People</span>
//                     </div>
//                     {renderBoardMembers(task.members, boardMembers)}
//                 </div>}
//             {
//                 isOpen &&
//                 <div
//                     className="screen"
//                     onClick={() => toggleMemebers()}
//                 />
//             }
//         </div >

//     )
// }


export class TaskMembers extends Component {
    state = {
        isOpen: false,
    }

    toggleMemebers = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    renderTaskMembers = (members) => {
        if (!members.length) {
            return <Avatar className="avatar" src="/broken-image" />
        }
        return members.map(member => {
            return <Avatar
                key={member._id}
                className="avatar"
                alt={member.fullname}
                src={member.imgUrl}
            />
        })
    }

    renderBoardMembers = (taskMembers, boardMembers) => {
        return boardMembers.map(boardMember => {
            if (!taskMembers.find(taskMember => taskMember._id === boardMember._id)) {
                return (
                    <div
                        className="member-card flex align-center"
                        key={boardMember._id}
                        onClick={() => {
                            this.props.onAddMember(boardMember)
                        }}>
                        <div className="member-right flex align-center">
                            <Avatar
                                className="avatar"
                                alt={`${boardMember.fullname}`}
                                src={boardMember.imgUrl}
                            />
                            <span className="member-name">{boardMember.fullname}</span>
                        </div>
                        <span className="member-btn">&#43;</span>
                    </div>
                )
            }
        })
    }

    render() {
        const { task, boardMembers, onRemoveMember } = this.props;
        const { isOpen } = this.state;
        return (
            <div className="column-members">
                <AvatarGroup max={2} className="avatar-container flex center" onClick={this.toggleMemebers} >
                    {this.renderTaskMembers(task.members)}
                </AvatarGroup>
                <Avatar style={{ display: "none" }} src="/broken-image.jpg" />
                {isOpen &&
                    <div className="members-list">
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoFocus
                        />
                        {task.members.map((member) => {
                            return (
                                <div
                                    className="member-card flex align-center"
                                    key={member._id}
                                    onClick={() => {
                                        onRemoveMember(member._id)
                                    }}>
                                    <div className="member-right flex align-center">
                                        <Avatar
                                            className="avatar"
                                            alt={`${member.fullname}`}
                                            src={member.imgUrl}
                                        />
                                        <span className="member-name">{member.fullname}</span>
                                    </div>
                                    <span className="member-btn">&minus;</span>

                                </div>
                            )
                        })}
                        <div>
                            <div className="line"></div>
                            <span className="people">People</span>
                        </div>
                        {this.renderBoardMembers(task.members, boardMembers)}
                    </div>}
                {
                    isOpen &&
                    <div
                        className="screen"
                        onClick={this.toggleMemebers}
                    />
                }
            </div >
        )
    }
}
