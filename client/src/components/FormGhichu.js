import React, { Component } from 'react'




export default class FormGhichu extends Component {

  handleInsertSubmit = (event) => {
    event.preventDefault();
    console.log("abc");
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
    console.log(value);
  }

  handleInsertSubmit = (event) => {
    event.preventDefault();
    const noteItem = {
      id:'',
      title: this.state.title,
      content: this.state.content
    }

    console.log(noteItem);

    let notes = this.props.notes;
    
    
  }

  render() {
    return (
      <div className="col-6 text-left">
        <h3>Thêm mới ghi chú</h3>
        <form onSubmit={this.handleInsertSubmit}>
          <div className="form-group">
            <label>Tiêu đề note</label>
            <input onChange={this.handleInputChange} type="text" name="noteTitle" id="noteTitle" className="form-control" placeholder="Tiêu đề note" />
            <small id="helpIdNoteTitle" className="text-muted">Điền nội dung vào đây</small>
          </div>
          <div className="form-group">
            <label>Nội dung note</label>
            <textarea onChange={this.handleInputChange} type="text" name="noteContent" id="noteContent" className="form-control" placeholder="nội dung note" />
            <small id="helpIdNoteContent" className="text-muted">Điền nội dung vào đây</small>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Lưu lại</button>
        </form>
      </div>
    )
  }
}
