import React from 'react'

export function ActivitiesModal({ activities }) {
    return (
        <div className="ActivitiesModal">
            {activities.map(active => {
                return (
                    <div
                        key={active.id}
                        className="active-preview">
                        <span>{active.name}</span>
                        {/* <span>Status: {active.status}</span> */}
                    </div>
                )
            })}
        </div>
    )
}
