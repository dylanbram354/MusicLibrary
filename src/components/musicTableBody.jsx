import React from 'react';
import DeleteButton from './deleteButton';
import LikeButton from './likeButton';

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
            <React.Fragment>
                <td className="text-center"><DeleteButton id={song.id} refresh={props.refreshTable}/></td>
                <td className="text-center"><LikeButton id={song.id} refresh={props.refreshTable}/></td>
            </React.Fragment>
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