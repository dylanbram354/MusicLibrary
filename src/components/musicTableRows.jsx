import React, {Component} from 'react';
import DeleteButton from './deleteButton';

function MusicTableRows(props){
    let songsArray = props.data;
    let rows = songsArray.map(function(song){
        let row = [];
        for (let key in song){
            row.push(
                <td>{song[key]}</td>
            )
        }
        row.push(
            <td><DeleteButton id={song.id} refresh={props.refresh}/></td>
        )
        return(
            <tr>{row}</tr>
        )
    })
    return(
        <React.Fragment>{rows}</React.Fragment>
    )
}

export default MusicTableRows