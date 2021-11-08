import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      modal: true,
      postId: this.props.postId
    };
    this.commentChange = this.commentChange.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = {
      postId: this.props.postId,
      content: this.state.comment
    };
    this.props.changeState(obj);
  }

  commentChange() {
    this.setState({
      comment: event.target.value
    });
  }

  closeModal() {
    this.setState({
      modal: false
    });
  }

  changeState() {
    this.setState({
      postId: false
    });
  }

  render() {
    const closeModal = !this.state.modal ? 'modal-background hidden' : 'modal-background';
    return (
    <div className={closeModal}>
      <div className="modal">
      <form onSubmit={this.handleSubmit}>
      <div className="modal-text row">
            <h1>Comment</h1>
            <textarea onChange={this.commentChange} type="text" name="name" id="name"/>
          </div>
          <div className="row justify-evenly">
            <button type="button" onClick={this.props.closeModal} id="cancel">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

export default Modal;
