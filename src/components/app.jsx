import React, {Component} from 'react';
import axios from 'axios';
import MusicTableBody from './musicTableBody';
import NewSongForm from './newSongForm';
import SearchBar from './searchBar'

class App extends Component {
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
        if (!this.state.filtered){
            header.push(<React.Fragment><th></th><th></th></React.Fragment>);
        }
        return(<thead><tr>{header}</tr></thead>);
    }

    isFiltered = (songs) => {
        this.setState({filtered:true, filteredMusic: songs})
    }

    fillTable = (songs) => {
        if (songs.length == 0){
            return (
                <div>
                    <h2 className="text-center">No matches found!</h2>
                </div>)
        }
        else{
            return(
                <React.Fragment>
                    {this.makeHeader()}
                    <tbody>
                        <MusicTableBody data={songs} refreshTable={this.getAllMusic} isFiltered = {this.state.filtered}/>
                    </tbody>
                </React.Fragment>
            )
        }
    }

    render(){
        return(
            <div>
                {this.state.filtered ? <h1 className="text-center">Search Results</h1> : <h1 className="text-center">Music Database</h1>}
                {this.state.allMusic ? 
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            {this.state.filtered ? this.fillTable(this.state.filteredMusic) : this.fillTable(this.state.allMusic)}
                        </table>
                    </div>
                    : 
                    <h3 className="text-center">Generating table...</h3>
                }
                {this.state.filtered ? 
                    <div className="d-flex justify-content-center mt-5">
                        <button className="btn btn-success" onClick={() => this.getAllMusic()}>Go Back</button>
                    </div>  
                    : 
                    <React.Fragment>
                        <NewSongForm refreshTable={this.getAllMusic}/> 
                        <SearchBar allMusic={this.state.allMusic} isFiltered={this.isFiltered}/>
                    </React.Fragment>
                    }
            </div>
        )
    }
}

export default App