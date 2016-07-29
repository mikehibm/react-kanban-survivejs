import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [
      { id: 'aaa', name: "Test lane"},
      { id: '01010', name: "Test lane 2"}
    ];
  }

  create(lane) {
    const lanes = this.lanes;
    lane.id = uuid.v4();
    this.setState({
      lanes: [...lanes, lane]
    });
  }

}

export default alt.createStore(LaneStore, 'LaneStore');
