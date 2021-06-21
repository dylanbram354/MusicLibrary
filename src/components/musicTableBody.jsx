import React from 'react';
import DeleteButton from './deleteButton';
import LikeButton from './likeButton';
import UnlikeButton from './unlikeButton';
import UpdateModal from './updateModal';

function MusicTableBody(props){
    let songsArray = props.data;
    let tableBody = songsArray.map((song) => { 
        let row = [];
        for (let attribute in song){
            row.push(
                <td>{song[attribute]}</td>
            )
        }
        if (!props.isFiltered){
            row.push(
                <React.Fragment>
                    <td>
                        <div className="d-flex justify-content-around">
                            <DeleteButton id={song.id} refresh={props.refreshTable}/>
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target={"#"+song.id}>Edit Song</button>
                            <UpdateModal song={song} refresh={props.refreshTable}/> 
                        </div>
                    </td>
                    <td>
                        <div className="d-flex justify-content-around">
                        <LikeButton id={song.id} refresh={props.refreshTable}/>
                        {song.likes > 0 ? <UnlikeButton id={song.id} refresh={props.refreshTable}/> : ''}
                        </div>
                    </td>
                    
                </React.Fragment>
            )
        }
        return(
            <tr>{row}</tr>
        )
    })
    return(
        <React.Fragment>
            {tableBody}
        </React.Fragment>
        
    )
}

export default MusicTableBody