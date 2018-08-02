import React, { Component } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'

class RegistrationForm extends Component {

    state = {
        errors : {},
        name : '',
        id_no : '',
        password : ''
    }

    onChange = (e) => {
        this.setState(({ [e.target.name]  : e.target.value }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("here");

        axios.post('/api/users/register', this.state)
            .then(({data}) => {
                this.setState({errors : {}})
            })
            .catch((error) => {
                this.setState({ errors : error.response.data });
            })
    }

    componentDidMount() {
        if ( this.props.auth.isAuthenticated ) {
            this.props.history.push("/");
        }
    }
    
    

    render() {

        const {errors} = this.state;
        return (
        <div className='container'>
            <form className='columns' onSubmit={this.onSubmit}>
                <div className='column is-half is-offset-one-quarter'>
                    <div className="field">
                        <label className="label">ID #</label>
                        <div className="control">
                            <input 
                                className={classnames('input', {
                                    'is-danger' : errors.id_no 
                                })} 
                                name='id_no'
                                type="text" 
                                value={this.state.id_no} 
                                onChange={this.onChange} />
                            { errors.id_no && (
                                <p className={classnames('help',{
                                    'is-danger' : errors.id_no
                                })}>{errors.id_no}</p>
                            ) }
                            
                        </div>
                    </div>    

                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                className={classnames('input', {
                                    'is-danger' : errors.name 
                                })} 
                                name='name'
                                type="text" 
                                value={this.state.name} 
                                onChange={this.onChange} />
                            { errors.name && (
                                <p className={classnames('help',{
                                    'is-danger' : errors.name
                                })}>{errors.name}</p>
                            ) }
                            
                        </div>
                    </div>    

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input 
                                className={classnames('input', {
                                    'is-danger' : errors.password 
                                })} 
                                name='password'
                                type="password" 
                                value={this.state.password} 
                                onChange={this.onChange} />
                            { errors.password && (
                                <p className={classnames('help',{
                                    'is-danger' : errors.password
                                })}>{errors.password}</p>
                            ) }
                            
                        </div>
                    </div>    

                    <div className='field is-grouped'>
                        <div className='control'>
                            <button className='button is-primary'>Register</button>
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
        auth : state.auth
    }
}

export default connect(mapStateToProps)(RegistrationForm);
