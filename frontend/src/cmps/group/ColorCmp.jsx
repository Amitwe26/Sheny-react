import React from 'react'

export function ColorCmp({ changeColor, togglePallete, opacity }) {
    return (
        <section className='colors-container' style={{ opacity: `${opacity}` }}>
            <button
                className='btn-color dark-green' onClick={(ev) => { changeColor(ev, 'rgb(3, 127, 76)'); togglePallete() }}>
            </button>
            <button
                className='btn-color green' onClick={(ev) => { changeColor(ev, 'rgb(0, 202, 113)'); togglePallete() }}>
            </button>
            <button
                className='btn-color khaki' onClick={(ev) => { changeColor(ev, 'rgb(156, 211, 38)'); togglePallete() }}>
            </button>
            <button
                className='btn-color orange' onClick={(ev) => { changeColor(ev, 'rgb(255, 100, 46)'); togglePallete() }}>
            </button>
            <button
                className='btn-color light-orange' onClick={(ev) => { changeColor(ev, 'rgb(253, 171, 61)'); togglePallete() }}>
            </button>
            <button
                className='btn-color yellow' onClick={(ev) => { changeColor(ev, 'rgb(253, 171, 61)'); togglePallete() }}>
            </button>
            <button
                className='btn-color purple' onClick={(ev) => { changeColor(ev, 'rgb(120, 75, 209)'); togglePallete() }}>
            </button>
            <button
                className='btn-color light-purple' onClick={(ev) => { changeColor(ev, 'rgb(162, 93, 220)'); togglePallete() }}>
            </button>
            <button
                className='btn-color blue' onClick={(ev) => { changeColor(ev, 'rgb(0, 134, 192)'); togglePallete() }}>
            </button>
            <button
                className='btn-color bourdeaux' onClick={(ev) => { changeColor(ev, 'rgb(187, 51, 84)'); togglePallete() }}>
            </button>
            <button
                className='btn-color red' onClick={(ev) => { changeColor(ev, 'rgb(228, 66, 88)'); togglePallete() }}>
            </button>
            <button
                className='btn-color pink' onClick={(ev) => { changeColor(ev, 'rgb(255, 21, 138)'); togglePallete() }}>
            </button>
            <button
                className='btn-color black' onClick={(ev) => { changeColor(ev, 'rgb(32, 20, 17)'); togglePallete() }}>
            </button>
            <button
                className='btn-color brown' onClick={(ev) => { changeColor(ev, 'rgb(127, 83, 71)'); togglePallete() }}>
            </button>
            <button
                className='btn-color gray' onClick={(ev) => { changeColor(ev, 'gray'); togglePallete() }}>
            </button>
        </section>
    )
}
