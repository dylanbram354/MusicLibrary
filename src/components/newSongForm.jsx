import React, {Component} from 'react';
import axios from 'axios';

class NewSongForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: null,
            artist: null,
            album: null,
            release_date: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async postNewSong(){
        try{
            let response = await axios.post('http://127.0.0.1:8000/music/', this.state);
            if (response.status == 201){
                alert(`"${this.state.title}" by ${this.state.artist} added to database!`)
                this.props.refreshTable();
                this.setState({
                    title: null,
                    artist: null,
                    album: null,
                    release_date: null
                })
            }
        }
        catch(ex){
            alert('Error in API call! Cannot add song.');
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.postNewSong();
    }

    render(){
        return(
            <form className="row" onSubmit={(event) => this.handleSubmit(event)}>
                <h3 className="text-center" >Add New Song</h3>
                <div className="form-group col-3">
                    <label for="title">Song Title</label>
                    <input type="text" className="form-control" name="title" onChange={this.handleChange} value={this.state.title} />
                </div>
                <div className="form-group col-3">
                    <label for="artist">Artist</label>
                    <input type="text" className="form-control" name="artist" onChange={this.handleChange} value={this.state.artist} />
                </div>
                <div className="form-group col-3">
                    <label for="album">Album</label>
                    <input type="text" className="form-control" name="album" onChange={this.handleChange} value={this.state.album} />
                </div>
                <div className="form-group col-3">
                    <label for="release_date">Release Date</label>
                    <input type="date" className="form-control" name="release_date" onChange={this.handleChange} value={this.state.release_date} />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-25">Submit Song</button>
                </div>
            </form>
        )
    }
}

export default NewSongForm