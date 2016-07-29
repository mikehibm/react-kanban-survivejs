import React from 'react';
import Lane from './Lane.jsx';

export default ({lanes, onEdit, onDelete}) => {
  return (
    <ul className="lanes">{ lanes.map(lane =>
      <li className="lane" key={lane.id}>
        <Lane lane={lane} />
      </li>
    )}
    </ul>
  );
};