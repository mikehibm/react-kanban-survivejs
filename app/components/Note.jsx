import React from 'react';
import noteStyle from './note.css';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }
    return this.renderNote();
  }

  renderEdit() {
    return <input type="text"
      ref={ (e) => e ? e.selectionStart = this.props.note.task.length : null }
      autoFocus={true}
      defaultValue={this.props.note.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
      />;
  }

  renderNote() {
    const onDelete = this.props.onDelete;
    return (
      <div onClick={this.edit}>
        {onDelete ? this.renderDelete() : null}
        <span className="task">{this.props.note.task}</span>
      </div>
    );
  }

  renderDelete = () => {
    return <button className="delete-note" onClick={ this.props.onDelete }>x</button>;
  };

  edit = () => {
    this.setState({ editing: true });
  };

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {
    const value = e.target.value;
    if (this.props.onEdit) {
      this.props.onEdit(value);
    }

    this.setState({ editing: false });
  };
}