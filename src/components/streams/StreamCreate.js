import React from 'react';
import { Field, reduxForm } from 'redux-form';
// Field => component
// reduxForm => function
import { connect } from 'react-redux';
import { createStream } from '../../actions/index'


class StreamCreate extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{ error }</div>
                </div>
            );
        }
    }
    // renderInput(formProps) {
    //     console.log(formProps);
    //     return (
    //     1st METHOD
    //       <input
    //         onChange={formProps.input.onChange}
    //         value={formProps.input.value}
    //       />

    //     2nd METHOD from REDUX-FORM DOCS
    //         all the key value pairs will be pulled out and added to input field as PROPS
    //         <input {...formProps.input} />
    //     );

    //     3rd METHOD would be to destructure parameter formProps => { input }
    //     <input {... input } />
    // }

    renderInput = ({ input, label, meta }) => {
        // console.log(meta);

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={ className }>
                <label>{ label }</label>
                <input { ...input } autoComplete="off" />
                { this.renderError(meta) }
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }
 
    render() {
        // console.log(this.props);
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};

const validateForm = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        // only ran if user entered title
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors; // if empty object is returned REDUX-FORM treats it as everything OK
}



const formWrapped = reduxForm({
    form: 'streamCreate', // name of the form
    validate: validateForm
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);