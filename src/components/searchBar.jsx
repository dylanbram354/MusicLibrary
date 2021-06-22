import React from 'react';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    filterData(){
        let allMusic = this.props.allMusic.slice();
        let filteredMusic = allMusic.filter((song) => {
            let arrayOfValues = Object.values(song);
            let match = false;
            for (let i=0; i<arrayOfValues.length; i++){
                if ((typeof arrayOfValues[i]) == 'string' && arrayOfValues[i].toUpperCase() == this.state.searchTerm.toUpperCase()){
                    match = true;
                    { break }
                }
            }
            if (match){
                return true;
            }
        })
        return filteredMusic;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let filteredSongs = this.filterData();
        this.props.isFiltered(filteredSongs);
    }

    render(){
        return(
            <React.Fragment>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <h3 className="text-center mt-5">Filter Database</h3>
                    <p className="text-center">Enter title, artist, album, or release date (yyyy-mm-dd).</p>
                    <div className="form-group d-flex justify-content-center">
                        <div>
                            <input type="text" className="form-control" name="searchTerm" onChange={this.handleChange} value={this.state.searchTerm} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default SearchBar