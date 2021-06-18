import React from 'react';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: null,
            errors: null
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
            if (arrayOfValues.includes(this.state.searchTerm)){ //figure out how to disregard spaces, use .upper, etc.
                return true
            }
        })
        return filteredMusic;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.isFiltered();
        let filteredSongs = this.filterData();
        this.props.filterTable(filteredSongs);
    }

    render(){
        return(
            <React.Fragment>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <h3 className="text-center mt-5">Search Database</h3>
                    <p className="text-center">Enter title, artist, album, or release date (yyyy-mm-dd).</p>
                    <div className="form-group d-flex justify-content-center">
                        <div>
                            <input type="text" className="form-control" name="searchTerm" onChange={this.handleChange} value={this.state.searchTerm} />
                        </div>
                        <div>
                            {this.state.errors ? <p className="text-danger">{this.state.errors}</p> : ''}
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