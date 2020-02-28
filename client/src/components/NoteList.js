import React, { Component } from 'react'

export default class NoteList extends Component {
  render() {
    return (
      <div className="col">
        <div id="noteList" role="tablist" aria-multiselectable="true">
          <div className="card">
            <div className="card-header" role="tab" id="note01">
              <h5 className="mb-0">
                <a data-toggle="collapse" data-parent="#noteList" href="#section1ContentId" aria-expanded="true" aria-controls="section1ContentId">
                 {this.props.title}
                </a>
              </h5>
            </div>
            <div id="section1ContentId" className="collapse in" role="tabpanel" aria-labelledby="note01">
              <div className="card-body">
                {this.props.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
