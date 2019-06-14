import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

// We're assigning stream list to class-based component because we want to
// use componentDidMount() to fetch all of the streams only ONE TIME
class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    { this.renderDeleteAndEdit(stream) }
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        { stream.title }
                        <div className="description">{ stream.description }</div>
                    </div>
                </div>
            )
        })
    }

    renderDeleteAndEdit(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
              <div className="right floated content">
                <Link
                  to={`/streams/edit/${stream.id}`}
                  className="ui button primary"
                >
                  Edit
                </Link>
                <button className="ui button negative">
                  Delete
                </button>
              </div>
            );
        }
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={ {textAlign: 'right' } }>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        // console.log(this.props.streams)
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{ this.renderList() }</div>
                { this.renderCreate() }
            </div>
        );
    };
};

// Object.values takes an object as and argument
// all of the different values of that object are going to be
// pulled out and then inserted in an array
const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);