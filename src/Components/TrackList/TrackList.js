import React from 'react';
import { map } from 'lodash';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
    render() {
        const { tracks } = this.props;
        const trackies = map(tracks, track => <Track track={track} key={track.id} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemoval={this.props.onRemoval} />);
        console.log(tracks);        
        return (
            <div className="TrackList">
                {trackies}
            </div>
        );
    }
}

export default TrackList;