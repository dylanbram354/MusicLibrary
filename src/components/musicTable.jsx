import React, {Component} from 'react';
import axios from 'axios';
import DeleteButton from './deleteButton'

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
            let response = await axios.get('http://localhost:8000/music/');
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
        for (let key in this.state.allMusic[0]){
            header.push(<th>{key}</th>);
        }
        let rows = [];
        for (let i=0; i<this.state.allMusic.length; i++){
            let currentSong = this.state.allMusic[i];
            let row = [];
            for (let key in currentSong){ //nested iteration boooooo 
                row.push(
                    <td>{currentSong[key]}</td>
                )
            }
            row.push(
                <td><DeleteButton id={currentSong[id]} /></td>
            )
            rows.push(
                <tr>
                    {row}
                </tr>
            )
        }
        return(
            <table className="table">
                <thead><tr>{header}</tr></thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }

    render(){
        return(
            <React.Fragment>
                {this.state.allMusic ? this.makeTable() : <h3 className="text-center">Generating table...</h3>}
            </React.Fragment>
            //Do you pretty much always need conditional rendering when displaying data from API calls?
        )
    }
}

export default MusicTable