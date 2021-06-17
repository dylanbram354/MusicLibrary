import React, {Component} from 'react';
import axios from 'axios';
import DeleteButton from './deleteButton';
import MusicTableRows from './musicTableRows';

class MusicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getAllMusic = this.getAllMusic.bind(this);
    }

    componentDidMount(){
        this.getAllMusic();
    }

    async getAllMusic(){
        try{
            let response = await axios.get('http://127.0.0.1:8000/music/');
            this.setState({
                allMusic: response.data
            })
        }
        catch (ex) {
            alert('Error in API call!')
        }
    }

    makeHeader(){
        let header =[];
        for (let key in this.state.allMusic[0]){
            header.push(<th>{key}</th>);
        }
        header.push(<th></th>);
        return(<tr>{header}</tr>);
    }

    render(){
        return(
            <React.Fragment>
                {this.state.allMusic ? 
                    <table className="table">
                        <thead>
                            {this.makeHeader()}
                        </thead>
                        <tbody>
                            <MusicTableRows data={this.state.allMusic} refresh={this.getAllMusic}/>
                        </tbody>
                    </table> : 
                    <h3 className="text-center">Generating table...</h3>}
            </React.Fragment>
            //Do you pretty much always need conditional rendering when displaying data from API calls?
        )
    }
}

export default MusicTable