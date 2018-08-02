import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { loginUser } from './../actions/authActions';
import { connect } from 'react-redux';
import TextFieldGroup from './../commons/TextFieldGroup';

class LoginForm extends Component {

    state = {
        errors : {},
        id_no : '',
        password : ''
    }

    onChange = (e) => {
        this.setState(({ [e.target.name]  : e.target.value }));
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const form_data = {
            id_no : this.state.id_no,
            password : this.state.password
        }

        this.props.loginUser(form_data, this.props.history);
    }

    componentWillReceiveProps (nextProps) {
        if ( nextProps.errors ) {
            this.setState({errors : nextProps.errors})
        }
    }

    componentDidMount() {
        if ( this.props.auth.isAuthenticated ) {
            //this.props.history.push("/");
        }
    }    

    render() {

        const {errors} = this.state;
        return (
        <div className='container'>
            <form className='columns' onSubmit={this.onSubmit}>
                <div className='column is-half is-offset-one-quarter'>

                    <TextFieldGroup
                        label='ID #'
                        name='id_no'
                        value={this.state.id_no}
                        onChange={this.onChange}
                        error={errors.id_no} />

                    <TextFieldGroup
                        type='password'
                        label='Password'
                        name='password'
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password} />

                    <div className='field is-grouped'>
                        <div className='control'>
                            <button className='button is-primary'>Login</button>
                        </div>
                        <div className='control'>
                            <NavLink to="/" className='button is-text'>Cancel</NavLink>
                        </div>
                    </div>
                </div>       
            </form>
        </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        errors : state.errors,
        auth : state.auth
    }
}

export default connect(mapStateToProps, {loginUser})(withRouter(LoginForm));