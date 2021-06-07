import React, { useEffect, useState } from 'react'
import { Person, Mail, Phone, Cake, Work } from '@material-ui/icons';

import { Avatar } from '@material-ui/core';
import { AppHeader } from '../cmps/AppHeader'
import { userService } from '../services/userService';


export function Profile() {
    const [user, setUser] = useState({})
    const [initials, setInitials] = useState('')

    useEffect(() => {
        loadUser()
        getInitials('tak took')
    }, [])

    const loadUser = async () => {
        const user = await userService.getLoggedinUser()
        const initials = getInitials(user.fullname)
        setUser(user)
        setInitials(initials)
    }

    const getInitials = (fullname) => {
        const names = fullname.split(' ')
        const initials = names[0].charAt(0) + names[1].charAt(0)
        return initials.toUpperCase()
    }

    if (user === {}) return <div>Loading...</div>
    return (
        <React.Fragment>
            <AppHeader />
            <section className="profile flex col space-between">
                <div className="profile-header flex col align-center">
                    <div>{initials}</div>
                    <h1>{user.fullname}</h1>
                </div>

                <div className="profile-main flex space-between">
                    <div className="first-panel ">
                        <h2>My Boards</h2>
                        <ul className="boards-list clean-list">
                            <li>from board ⇒ task name </li>
                            <li>from board ⇒ task name </li>
                            <li>from board ⇒ task name </li>
                        </ul>
                    </div>

                    <div className="second-panel ">
                        <h2>My Tasks</h2>
                        <ul className="tasks-list clean-list">
                            <li>from board ⇒ task name </li>
                            <li>from board ⇒ task name </li>
                            <li>from board ⇒ task name </li>
                        </ul>
                    </div>

                    <div className="third-panel">
                        <Avatar
                            className="avatar"
                            alt={`${user.fullname || 'G'} `}
                            src={user.imgUrl || 'G'}
                        />
                        <ul className="clean-list">
                            <li><Person /><span>username:</span>{user.fullname}</li>
                            <li><Mail /><span>email:</span>{user.email}</li>
                            <li><Phone /><span>Phone:</span>{user.phoneNumber}</li>
                            <li><Cake /><span>Birthday:</span>{user.birthday}</li>
                            <li><Work /><span>Company:</span>{user.company} </li>
                        </ul>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
