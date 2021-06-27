import { Component, useState } from 'react'

import { Avatar } from '@material-ui/core';

import React from 'react'

export function FilterModal({ activeBoard, getGroupsForDisplay }) {
    const [filterBy, setFilterBy] = useState({
        groupName: '',
        member: '',
        status: '',
        priority: '',
        date: '',
    })

    const filterGroup = (ev, field, value) => {
        ev.stopPropagation();

        const newFilterBy = { ...filterBy };
        newFilterBy[field] = value;

        setFilterBy(newFilterBy)
        getGroupsForDisplay(newFilterBy)
    }
    return (
        <section className="filter-modal flex">
            <div className="column">
                <h1>Group</h1>
                <ul className="list groups clean-list">
                    {activeBoard.groups.map(group => {
                        return (
                            <li
                                key={group.id}
                                onClick={(ev) => filterGroup(ev, 'groupName', group.name)}
                            >
                                {group.name}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="column">
                <h1>Member</h1>
                <ul className="list clean-list member">
                    {activeBoard.members.map((member) => {
                        return (
                            <li
                                className="member-tab flex align-center"
                                key={member._id}
                                onClick={(ev) => filterGroup(ev, 'member', member.fullname)}
                            >
                                <Avatar
                                    className="avatar"
                                    alt={`${member.fullname}`}
                                    src={member.imgUrl}
                                />
                                <span className="member-name">{member.fullname}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="column">
                <h1>Priority</h1>
                <ul className="list priorities clean-list">
                    {activeBoard.priority.map((priority, idx) => {
                        return (
                            <li
                                key={idx}
                                className="priority"
                                style={{ background: priority.color }}
                                onClick={(ev) => filterGroup(ev, 'priority', priority.txt)}
                            >
                                {priority.txt}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="column">
                <h1>Status</h1>
                <ul className="list statuses clean-list">
                    {activeBoard.status.map((status, idx) => {
                        return (
                            <li
                                key={idx}
                                className="status"
                                style={{ background: status.color }}
                                onClick={(ev) => filterGroup(ev, 'status', status.txt)}
                            >
                                {status.txt}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="column">
                <h1>Due Date</h1>
                <ul className="list dates clean-list">
                    <li onClick={(ev) => filterGroup(ev, 'date', 'today')}>Today</li>
                    <li onClick={(ev) => filterGroup(ev, 'date', 'tomorrow')}>Tomorrow</li>
                    <li onClick={(ev) => filterGroup(ev, 'date', 'this week')}>This Week</li>
                </ul>
            </div>

            <div className="column">
                <h1>Passed Date</h1>
                <ul className="list dates clean-list">
                    <li onClick={(ev) => filterGroup(ev, 'date', 'all passed')}>All Passed</li>
                    <li onClick={(ev) => filterGroup(ev, 'date', 'yesterday')}>Yesterday</li>
                    <li onClick={(ev) => filterGroup(ev, 'date', 'last week')}>Last Week</li>
                </ul>
            </div>
        </section >
    )
}

// export class FilterModal extends Component {
//     state = {
//         filterBy: {
//             groupName: '',
//             member: '',
//             status: '',
//             priority: '',
//             date: '',
//         }
//     }

//     filterGroup = (ev, field, value) => {
//         ev.stopPropagation();

//         var filterBy = { ...this.state.filterBy };
//         filterBy[field] = value;

//         this.setState({ filterBy }, () => {
//             this.props.getGroupsForDisplay(filterBy)
//         })
//     }

//     render() {
//         const { activeBoard } = this.props
//         return (
//             <section className="filter-modal flex">
//                 <div className="column">
//                     <h1>Group</h1>
//                     <ul className="list groups clean-list">
//                         {activeBoard.groups.map(group => {
//                             return (
//                                 <li
//                                     key={group.id}
//                                     onClick={(ev) => this.filterGroup(ev, 'groupName', group.name)}
//                                 >
//                                     {group.name}
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </div>

//                 <div className="column">
//                     <h1>Member</h1>
//                     <ul className="list clean-list member">
//                         {activeBoard.members.map((member) => {
//                             return (
//                                 <li
//                                     className="member-tab flex align-center"
//                                     key={member._id}
//                                     onClick={(ev) => this.filterGroup(ev, 'member', member.fullname)}
//                                 >
//                                     <Avatar
//                                         className="avatar"
//                                         alt={`${member.fullname}`}
//                                         src={member.imgUrl}
//                                     />
//                                     <span className="member-name">{member.fullname}</span>
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </div>

//                 <div className="column">
//                     <h1>Priority</h1>
//                     <ul className="list priorities clean-list">
//                         {activeBoard.priority.map((priority, idx) => {
//                             return (
//                                 <li
//                                     key={idx}
//                                     className="priority"
//                                     style={{ background: priority.color }}
//                                     onClick={(ev) => this.filterGroup(ev, 'priority', priority.txt)}
//                                 >
//                                     {priority.txt}
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </div>

//                 <div className="column">
//                     <h1>Status</h1>
//                     <ul className="list statuses clean-list">
//                         {activeBoard.status.map((status, idx) => {
//                             return (
//                                 <li
//                                     key={idx}
//                                     className="status"
//                                     style={{ background: status.color }}
//                                     onClick={(ev) => this.filterGroup(ev, 'status', status.txt)}
//                                 >
//                                     {status.txt}
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </div>

//                 <div className="column">
//                     <h1>Due Date</h1>
//                     <ul className="list dates clean-list">
//                         <li onClick={(ev) => this.filterGroup(ev, 'date', 'today')}>Today</li>
//                         <li onClick={(ev) => this.filterGroup(ev, 'date', 'tomorrow')}>Tomorrow</li>
//                         <li onClick={(ev) => this.filterGroup(ev, 'date', 'this week')}>This Week</li>
//                     </ul>
//                 </div>

//                 <div className="column">
//                     <h1>Passed Date</h1>
//                     <ul className="list dates clean-list">
//                         <li onClick={(ev) => this.filterGroup(ev, 'date', 'all passed')}>All Passed</li>
//                         <li onClick={(ev) => this.filterGroup(ev, 'date', 'yesterday')}>Yesterday</li>
//                         <li onClick={(ev) => this.filterGroup(ev, 'date', 'last week')}>Last Week</li>
//                     </ul>
//                 </div>
//             </section >
//         )
//     }
// }
