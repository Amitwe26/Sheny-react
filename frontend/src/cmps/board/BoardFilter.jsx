import { useState } from 'react'
import Input from '@material-ui/core/Input';

import React from 'react'

export function BoardFilter({ getBoradsForDisplay, toggleSarech }) {
    const [filterBy, setFilterBy] = useState({ txt: '' })

    const handleChange = (ev) => {
        const newFilterBy = { ...filterBy }
        newFilterBy.txt = ev.target.value;
        setFilterBy(newFilterBy)
        getBoradsForDisplay(newFilterBy.txt);
    }

    return (
        <section className="board-filter flex">
            <Input
                type="text"
                name="name"
                autoFocus
                autoComplete="off"
                placeholder="search"
                onChange={(ev) => handleChange(ev)}
                value={filterBy.txt}>
            </Input>
            <button
                className="btn-close"
                onClick={() => toggleSarech()}>
                X
                </button>
        </section>
    )
}