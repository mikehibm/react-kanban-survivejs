import AltContainer from 'alt-container';
import React from 'react';
import Editable from './Editable.jsx';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import NoteStore from '../stores/NoteStore';
//import laneStyle from './lane.css';

export default class Lane extends React.Component {
  render() {
    const { lane, ...props } = this.props;
    return (
      <div className="lane" {...props} >
      </div>
    );
  }

}

Lane.Header = class LaneHeader extends React.Component {
  render() {
    const lane = this.props.lane;
    return (
      <div className="lane-header" onClick={this.activateLaneEdit}>
        <div className="lane-add-note">
          <button onClick={this.addNote}>+</button>
        </div>
        <button className="lane-delete" onClick={this.deleteLane}>x</button>
        <Editable className="lane-name" editing={lane.editing} value={lane.name} onEdit={this.editName} />
      </div>
    );
  }

  addNote = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;
    const note = NoteActions.create({ task: 'New task', editing: true });
    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  };

  editName = (name) => {
    const laneId = this.props.lane.id;
    if (!name.trim()){
      LaneActions.update({id: laneId, editing: false});
      return;
    }
    LaneActions.update({id: laneId, name, editing: false});
  };

  deleteLane = () => {
    const laneId = this.props.lane.id;
    LaneActions.delete(laneId);
  };

  activateLaneEdit = () => {
    const laneId = this.props.lane.id;
    LaneActions.update({id: laneId, editing: true});
  };

};

Lane.Notes = class LaneNotes extends React.Component {
  render() {
    const lane = this.props.lane;
    return (
      <AltContainer
        stores={[NoteStore]}
        inject={{ notes: () => NoteStore.getNotesByIds(lane.notes) }}
        >
        <Notes
          onValueClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </AltContainer>
    );
  }

  activateNoteEdit = (id) => {
    NoteActions.update({id, editing: true});
  };

  editNote(id, task) {
    if (!task.trim()) {
      NoteActions.update({id, editing: false});
      return;
    }
    NoteActions.update({id, task, editing: false});
  }

  deleteNote = (noteId, e) => {
    e.stopPropagation();
    const laneId = this.props.lane.id;
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId)
  };

};