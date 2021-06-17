import React, {Component} from 'react';
import axios from 'axios';

class MusicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount(){
        this.getAllMusic();
    }

    async getAllMusic(){
        try{
            let response = await axios.get('http://localhost:8000/music/')
            this.setState({
                allMusic: response.data
            })
        }
        catch (ex) {
            alert('Error in API call!')
        }
    }

    makeTable(){
        let header =[];
        for (let key in this.state.allMusic[0])
            header.push(<th>{key}</th>)
        return(
            <table className="table">
                <thead><tr>{header}</tr></thead>
            </table>
        )
    }

    render(){
        return(
            <React.Fragment>
                {this.state.allMusic ? this.makeTable() : <h3 className="text-center">Generating table...</h3>}
            </React.Fragment>
        )
    }
}

export default MusicTable