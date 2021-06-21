import React from 'react';

class UpdateModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id
        }
    }
    render(){
        return(
            <div className="modal" id={this.props.id} role="dialog">
                <div className="modal-dialog">
                
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Update Song {this.props.id}</h4>
                    </div>
                    <div className="modal-body">
                    <p>Form goes here </p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
                
                </div>
            </div>
        )
    }
}

export default UpdateModal