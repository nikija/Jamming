import React from 'react';
import './Track.css';

const minusSign = ' - ';
const plusSign = ' + ';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemoval(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack} >{minusSign}</a>
    } else {
      return <a className="Track-action" onClick={this.addTrack} >{plusSign}</a>
    }
  }

  render() {
    const { name, artist, album } = this.props.track;
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            {this.renderAction()}
      </div>
    );
  }
}

export default Track;
