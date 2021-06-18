import React from 'react';
import DeleteButton from './deleteButton';

function MusicTableBody(props){
    let songsArray = props.data;
    let tableBody = songsArray.map((song) => { // '(song) => {}' same as 'function(song) {}'
        let row = [];
        for (let attribute in song){
            row.push(
                <td>{song[attribute]}</td>
            )
        }
        row.push(
            <td><DeleteButton id={song.id} refresh={props.refreshTable}/></td>
        )
        return(
            <tr>{row}</tr>
        )
    })
    return(
        <React.Fragment>{tableBody}</React.Fragment>
    )
}

export default MusicTableBody