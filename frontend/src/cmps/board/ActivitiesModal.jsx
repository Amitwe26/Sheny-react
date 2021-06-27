import React from 'react';

export function ActivitiesModal({
  activities,
  togglemodalActivities,
  activeModal,
}) {
  return (
    <div
      // className="activities-modal">
      className={`activities-modal ${activeModal ? 'modal-open' : ''}`}
    >
      <button onClick={() => togglemodalActivities()}>X</button>
      <h1>Activities</h1>
      <ul className=''>
        <li>Activity</li>
        <li>Last viewed</li>
        <li>Updates</li>
      </ul>
      <button>Filter log</button>
      <input type='text' placeholder='Filter by name' />
      {activities.map((active) => {
        return (
          <div key={active.id} className='active-preview'>
            <span>{active.name}</span>
            {/* <span>Status: {active.status}</span> */}
          </div>
        );
      })}
    </div>
  );
}
