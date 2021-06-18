import React from 'react';
import axios from 'axios';

class LikeButton extends React.Component{
    constructor(props){
        super(props);
        this.songId = props.id;
    }

    async likeSong(){
        try{
            let response = await axios.get(`http://127.0.0.1:8000/music/like/${this.songId}/`);
            if (response.status == 200){
                this.props.refresh();
            }
        }
        catch(ex){
            alert('Error in API call! Cannot find song.');
        }
    }

    render(){
        return(
            <button className="btn btn-success" onClick={this.likeSong.bind(this)}>Like</button>
        )
    }
}

export default LikeButton