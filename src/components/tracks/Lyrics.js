import React, { Component } from 'react';
import Axios from 'axios';
import Spinner from '../layouts/Spinner';
import {Link} from 'react-router-dom'
import Moment from 'react-moment';
class Lyrics extends Component {
    state={
        track : {},
        lyrics: {},
    }
    componentDidMount(){
        Axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=179e35f7998a0339f4856ab1a6b5648f
        `)
        .then(res => {
            this.setState({lyrics:res.data.message.body.lyrics});
            return Axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=179e35f7998a0339f4856ab1a6b5648f
            `)
        }).then(res=>{
            this.setState({track:res.data.message.body.track});
        })
        .catch(err=>console.log(err))  
    }
    render() {
        const {track,lyrics} = this.state;
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0){
            return <Spinner/> 
        }else{
            return(
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                    <h5 className="card-header">
                        {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text">{lyrics.lyrics_body}</p>
                    </div>
                    <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong>Album Name</strong>: {track.album_name}
                        </li>
                        <li className="list-group-item">
                            <strong>Track Rating</strong>: {track.track_rating}
                        </li>
                        <li className="list-group-item">
                            <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                        </li>
                        <li className="list-group-item">
                        <strong>Release Date</strong>: <Moment format="DD-MM-YYYY">{track.updated_time}</Moment>
                    </li>
                    </ul>
                </React.Fragment>
            )
        }
    }
}

export default Lyrics;