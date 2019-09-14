import React, { Component } from 'react';
import { Consumer } from '../../Context';
import Axios from 'axios';

class Search extends Component {
    state = {
        trackTitle : ''
    }
    findTrack = (dispatch,e) =>{
        e.preventDefault();
        Axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=179e35f7998a0339f4856ab1a6b5648f
        `)
        .then(res => {
            dispatch({
                type:'SEARCH_TRACKS',
                payload : res.data.message.body.track_list
            })
        })
        .catch(err=>console.log(err))  
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <Consumer>
                {value=>{
                    const {dispatch} = value
                    return (
                        <div className="card card-bodt mb-4 p-4">
                            <h1 className="display-4 text-center"><i className="fas fa-music"/>Search For A Song</h1>
                            <p className="lead text-center">get the Lyrics for any song</p>    
                            <form onSubmit={this.findTrack.bind(this,dispatch)}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" onChange={this.onChange} placeholder="Song title....." name="trackTitle" value={this.state.trackTitle}/>
                                </div>
                                <button className="btn btn-dark btn-lg btn-block mb-5" type="submit">Track Lyrics</button>
                            </form>    
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default Search;