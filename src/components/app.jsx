import React, {Component} from 'react';
import MusicTable from './musicTable';


class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <MusicTable />
        )
    }
}

export default App