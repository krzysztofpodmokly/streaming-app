import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

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
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        { stream.title }
                        <div className="description">{ stream.description }</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        // console.log(this.props.streams)
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    { this.renderList() }
                </div>
            </div>
        );
    };
};

// Object.values takes an object as and argument
// all of the different values of that object are going to be
// pulled out and then inserted in an array
const mapStateToProps = (state) => {
    return { streams: Object.values(state.streams) }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);