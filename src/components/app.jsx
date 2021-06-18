import React, {Component} from 'react';
import MusicTable from './musicTable';

class App extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
            <React.Fragment>
                <h1 className="text-center"> Music Database</h1>
                <MusicTable />
            </React.Fragment>
        )
    }
}

export default App