import React from 'react';
import axios from 'axios';

class UpdateModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.song.title,
            artist: this.props.song.artist,
            album: this.props.song.album,
            release_date: this.props.song.release_date,
            errors: {
                title: null,
                artist: null
            }
        }
    }

    handleChange = (event) => {
        let errors = this.state.errors;

        switch(event.target.name){
            case 'title':
                errors.title = event.target.value.length < 2 ? 'Title must be at least 2 characters.' : null;
                break;
            case 'artist':
                errors.artist = event.target.value.length < 2 ? 'Artist must be at least 2 characters.' : null;
                break;
        }

        this.setState({
            [event.target.name]: event.target.value,
            errors: errors
        })
    }

    async putEditedSong(){
        let newSong = Object.assign({},this.state);
        newSong.errors = null;
        try{
            let response = await axios.put(`http://127.0.0.1:8000/music/${this.props.song.id}/`, newSong);
            if (response.status == 200){
                alert(`"${this.state.title}" has been updated in the database!`)
                this.props.refresh();
            }
        }
        catch(ex){
            alert('Error in API call! Cannot edit song. Error:' + ex);
        }
    }

    isInvalid(){
        if (this.state.errors.title || this.state.errors.artist || !this.state.album || !this.state.release_date){
            return true;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isInvalid()){
            alert('Please make sure all fields have been completed.');
            return
        }
        this.putEditedSong();
    }

    render(){
        return(
            <div className="modal" id={this.props.song.id} role="dialog">
                <div className="modal-dialog">
                
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Update "{this.props.song.title}":</h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <div>
                                        <label for="title">Song Title</label>
                                        <input type="text" className="form-control" name="title" onChange={this.handleChange} value={this.state.title} />
                                    </div>
                                    <div>
                                        {this.state.errors.title ? <p className="text-danger">{this.state.errors.title}</p> : ''}
                                    </div>
                                </div>
                                <div className="form-group col-sm-6">
                                    <div>
                                        <label for="artist">Artist</label>
                                        <input type="text" className="form-control" name="artist" onChange={this.handleChange} value={this.state.artist} />
                                    </div>
                                    <div>
                                        {this.state.errors.artist ? <p className="text-danger">{this.state.errors.artist}</p> : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label for="album">Album</label>
                                    <input type="text" className="form-control" name="album" onChange={this.handleChange} value={this.state.album} />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label for="release_date">Release Date</label>
                                    <input type="date" className="form-control" name="release_date" onChange={this.handleChange} value={this.state.release_date} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary">Submit Changes</button>
                                </div>
                            </div>
                        </form>
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