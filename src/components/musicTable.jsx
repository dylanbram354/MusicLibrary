import React, {Component} from 'react';
import axios from 'axios';

class MusicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMusic: null
        }
    }

    componentDidMount(){
        this.getAllMusic();
    }

    async getAllMusic(){
        try{
            let response = await axios.get('http://localhost:8000/music/')
            console.log(response.data)
            this.setState({
                allMusic: response.data
            })
        }
        catch (ex) {
            alert('Error in API call!')
        }
    }

    render(){
        return(
            <div>{JSON.stringify(this.state.allMusic)}</div>
        )
    }
}

export default MusicTable