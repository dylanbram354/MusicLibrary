import React, {Component} from 'react';
import axios from 'axios';
import MusicTableBody from './musicTableBody';
import NewSongForm from './newSongForm';
import SearchBar from './searchBar'

class MusicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: false,
            filteredMusic: null
        };
        this.getAllMusic = this.getAllMusic.bind(this);
    }

    componentDidMount(){
        this.getAllMusic();
    }

    async getAllMusic(){
        try{
            let response = await axios.get('http://127.0.0.1:8000/music/');
            this.setState({
                allMusic: response.data,
                filtered: false,
                filteredMusic: null
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
        header.push(<React.Fragment><th></th><th></th></React.Fragment>);
        return(<tr>{header}</tr>);
    }

    isFiltered = () => {
        this.setState({filtered:true})
    }

    setFilteredSongs = (songs) => {
        this.setState({filteredMusic: songs})
    }

    fillTable = (songs) => {
        return(
            <MusicTableBody data={songs} refreshTable={this.getAllMusic}/> //passing refresh function down to delete/like buttons.. Need to find out how to refresh FILTERED table
        )
    }

    render(){
        return(
            <React.Fragment>
                {this.state.allMusic ? 
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                {this.makeHeader()}
                            </thead>
                            <tbody>
                                {this.state.filtered ? this.fillTable(this.state.filteredMusic) : this.fillTable(this.state.allMusic)}
                                {/* <MusicTableBody data={this.state.allMusic} refreshTable={this.getAllMusic}/> */}
                            </tbody>
                        </table>
                    </div> : 
                    <h3 className="text-center">Generating table...</h3>}
                <NewSongForm refreshTable={this.getAllMusic}/>
                <SearchBar allMusic={this.state.allMusic} isFiltered={this.isFiltered} filterTable={this.setFilteredSongs}/>
            </React.Fragment>
            //Do you pretty much always need conditional rendering when displaying data from API calls?
        )
    }
}

export default MusicTable