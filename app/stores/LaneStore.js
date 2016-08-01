import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [
      { id: 'aaa', name: "Test lane", notes: [] },
      { id: '01010', name: "Test lane 2", notes: [] }
    ];
  }

  create(lane) {
    const lanes = this.lanes;
    lane.id = uuid.v4();
    lane.notes = lane.notes || [];
    this.setState({
      lanes: [...lanes, lane]
    });
  }

  attachToLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        if (lane.notes.includes(noteId)) {
          console.warn('Already attatched note to lane.', lanes);
        } else {
          lane.notes.push(noteId);
        }
      }
      return lane;
    });
    this.setState({ lanes });
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        lane.notes = lane.notes.filter(note => note !== noteId);
      }
      return lane;
    });
    this.setState({lanes});
  }

}

export default alt.createStore(LaneStore, 'LaneStore');
