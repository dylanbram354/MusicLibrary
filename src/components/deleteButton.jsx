import React, {Component} from 'react';
import axios from 'axios';

class DeleteButton extends Component {
    constructor(props){
        super(props);
        this.songId = props.id;
    }

    async getSongToDelete(){
        try{
            let response = await axios.get(`http://127.0.0.1:8000/music/${this.songId}/`);
            let confirmDelete = window.confirm(`Are you sure you want to delete ${response.data.title} by ${response.data.artist}?`);
            if (confirmDelete){
                this.deleteSong();
            }
        }
        catch(ex){
            alert('Error in API call! Cannot find song.');
        }
    }

    async deleteSong(){
        try{
            let response = await axios.delete(`http://127.0.0.1:8000/music/${this.songId}/`);
            if (response.status == '200'){
                alert('Song deleted.');
                this.props.refresh();
            }
        }
        catch(ex){
            alert('Error in API call! Cannot delete.');
        }
        
    }

    render(){
        return(
            <button onClick={this.getSongToDelete.bind(this)}>Delete Song</button>
        )
    }
}

export default DeleteButton