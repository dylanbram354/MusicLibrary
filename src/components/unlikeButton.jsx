import React from 'react';
import axios from 'axios';

class UnlikeButton extends React.Component{
    constructor(props){
        super(props);
        this.songId = props.id;
    }

    async unlikeSong(){
        try{
            let response = await axios.get(`http://127.0.0.1:8000/music/unlike/${this.songId}/`);
            if (response.status == 200){
                this.props.refresh();
            }
        }
        catch(ex){
            alert('Error! Song cannot be found, or song already has zero likes.');
        }
    }

    render(){
        return(
            <button className="btn btn-warning btn-sm" onClick={this.unlikeSong.bind(this)}>Unlike</button>
        )
    }
}

export default UnlikeButton