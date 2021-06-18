import React, {Component} from 'react';
import MusicTable from './musicTable';

class App extends Component {
    constructor(props){
        super(props);
    }


    render(){
        return(
            <React.Fragment>
                <MusicTable />
            </React.Fragment>
        )
    }
}

export default App