import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnMount() {
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.setState(state);
  };

  render() {
    const notes = this.state.notes;

    return (
      <div>
        <h3>My Notes</h3>
        <button className="add-note" onClick={this.addNote}>+ Add</button>
        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }

  addNote = () => {
    NoteActions.create({ task: 'New task' });
  };

  editNote = (id, task) => {
    if (!task.trim()) {
      return;
    }
    NoteActions.update({ id, task });
  };

  deleteNote = (id, e) => {
    e.stopPropagation();
    NoteActions.delete(id);
  };
}