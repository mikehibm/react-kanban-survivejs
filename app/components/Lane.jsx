import React from 'react';
//import laneStyle from './lane.css';

export default class Lane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="lane">{this.props.lane.name}</span>
      </div>
    );
  }

}