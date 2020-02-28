import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      notes: [],
      isEdit:false,
      id: '',
      title: '',
      content: ''
    }
  }

 // get data notes from postgres
  componentDidMount() {
    axios.get('/api/notes').then((res) => {this.setState({ notes:res.data })})
   .catch((error) => { console.log(error.res); return Promise.reject(error.res)})
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleInsertSubmit = (event) => {
    event.preventDefault();

    //khai báo một item mới, với các giá trị là các giá trị được nhập từ form.
    const noteItem = {
      id:'',
      title: this.state.noteTitle,
      content: this.state.noteContent
    }

    //đưa dữ liệu item phía trên vào trong axios,
    axios.post('/api/insert', noteItem)
      .then(res => {
        let notes = this.state.notes;
        notes = [...notes, noteItem];
        this.setState({ notes: notes });
      })
      .catch((error) => { console.log(error.response); return Promise.reject(error.response)})
  }

  handleEditSubmit = (event) => {
    event.preventDefault();

    const noteUpdate = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    };

    axios.post('/api/edit', noteUpdate)
    .then(res => {
      let key = this.state.id;
      this.setState(prevState => ({
        notes: prevState.notes.map(
          elm => elm.id === key ? {
            ...elm,
            title: this.state.title,
            content: this.state.content
          }: elm
        )
      }))
    })
     .catch(error => console.log(error));
  }


  // In dữ liệu trong api sau khi nhận được ra
  // getDulieu = () => {
  //   if(this.state.notes !== null){
  //     return this.state.notes.map((value,key) => (
  //       <NoteList key={key} title={value.title} content={value.content}/>
  //     ))
  //   } 
  // }

  onClickAction = (item ) => {
    this.setState({ 
      isEdit: true,
      id: item.id,
      title: item.title,
      content: item.content
     })
  }
  
  
  render() {
    return(
      <div className="container mt-5">
        <div className="row">
        <div className="col-6">
          <h4 className="mb-5 text-center">Danh sách các ghi chú sử dụng Postgres SQL</h4>
          {this.state.notes.map((item,key) => (
          <div id="noteList" role="tablist" aria-multiselectable="true" key={key}>
            <div className="card">
              <div className="card-header" role="tab" id="note01">
                <h5 className="mb-0">
                  <a data-toggle="collapse" data-parent="#noteList" href="#section1ContentId" aria-expanded="true" aria-controls="section1ContentId">
                  {item.title}
                  </a>
                  <div className="btn-group float-right">
                    <button className="btn btn-outline-info" onClick={() => this.onClickAction(item )}>Sửa</button>
                    <button className="btn btn-outline-secondary" onClick={() => this.getDeleteData()}>Xóa</button>
                  </div>
                </h5>
              </div>
              <div id="section1ContentId" className="collapse in" role="tabpanel" aria-labelledby="note01">
                <div className="card-body">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="col text-left">
          <h3>Sửa ghi chú</h3>
          <form onSubmit={this.handleEditSubmit}>
            <div className="form-group">
              <label>Tiêu đề note</label>
              <input onChange={this.handleInputChange} name="title" value={this.state.title} type="text" id="title" className="form-control" placeholder="Tiêu đề note" />
              <small id="helpIdNoteTitle" className="text-muted">Điền nội dung vào đây</small>
            </div>
            <div className="form-group">
              <label>Nội dung note</label>
              <textarea onChange={this.handleInputChange} name="content" value={this.state.content} type="text" id="content" className="form-control" placeholder="nội dung note" />
              <small id="helpIdNoteContent" className="text-muted">Điền nội dung vào đây</small>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Lưu lại</button>
          </form>
        </div>
        
        </div>
        <div className="row mt-5">
          <div className="col text-left">
          <h3>Thêm mới ghi chú</h3>
            <form onSubmit={this.handleInsertSubmit}>
              <div className="form-group">
                <label>Tiêu đề note</label>
                <input onChange={this.handleInputChange} name="noteTitle" type="text" id="noteTitle" className="form-control" placeholder="Tiêu đề note" />
                <small id="helpIdNoteTitle" className="text-muted">Điền nội dung vào đây</small>
              </div>
              <div className="form-group">
                <label>Nội dung note</label>
                <textarea onChange={this.handleInputChange} name="noteContent" type="text" id="noteContent" className="form-control" placeholder="nội dung note" />
                <small id="helpIdNoteContent" className="text-muted">Điền nội dung vào đây</small>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Lưu lại</button>
            </form>
          </div>
        </div>
      </div>
    )
  };
};

export default App;