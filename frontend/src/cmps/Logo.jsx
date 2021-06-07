import React from 'react'

export function Logo() {
    return (<div className="loader-container flex center align-center">
        <video width="700" height="700" autoPlay loop preload="true">
            <source src="loader.mp4" type="video/mp4"></source>
        </video>
    </div>)
}
