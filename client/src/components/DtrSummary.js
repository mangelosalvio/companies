import React, { Component } from 'react';
import 'react-dates/initialize';
import { NavLink } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './../styles/Summary.css';
import  { connect } from 'react-redux';
import { getUserDtrSummary } from './../actions/dtr'
import { logoutUser } from './../actions/authActions'
import moment from 'moment';
import isEmpty from './../validation/is-empty'
import numeral from 'numeral'

class DtrSummary extends Component {

    state = {
        startDate : null,
        enddDate : null,
        focusedInput : null,
        id_no : ''
    }

    onChange = (e) => {
        this.setState(({ id_no : e.target.value }));
    }

    onSubmit = (e) => {
        e.preventDefault();

        if ( this.state.startDate && this.state.endDate && this.state.id_no ) {;
            this.props.getUserDtrSummary(this.state);
        }

    }

    onLogout = () => {
        this.props.logoutUser();   
    }


    render() {
        const { user } = this.props.auth;

        return (
            <div>
                <nav className="navbar is-fixed-top" aria-label="dropdown">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                        </a>
                        <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                        </div>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                { user.name }
                                </a>

                                <div className="navbar-dropdown is-right">
                                    <a className="navbar-item">
                                        Settings
                                    </a>
                                    <hr className="navbar-divider" />
                                    <a onClick={this.onLogout} className="navbar-item">
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>    
                </nav>
                <div className='container'>
                    <div className='columns'>
                        <form className='column is-one-third DtrSummary-form-input' onSubmit={this.onSubmit}>
                        
                            <div className='field'>
                                <DateRangePicker
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    startDateId='start_date'
                                    endDateId='end_date'
                                    onDatesChange={ ({ startDate, endDate }) => this.setState({ startDate, endDate }) }
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={focusedInput => this.setState({focusedInput})}
                                    isOutsideRange={ () => false }
                                />
                            </div>
                            <div className='field'>
                                <label className='label'>ID Number</label>
                                <div className='control'>
                                    <input type='text' className='input' placeholder='e.g. 1234567' name='id_no' value={this.state.id_no} onChange={this.onChange} />
                                </div>
                            </div>
                            
                            <div className='field is-grouped'>
                                <p className='control'>
                                    <button className='button is-primary'>Search</button>
                                </p>
                                <p className='control'>
                                    <NavLink to="/" className='button'>Back</NavLink>
                                </p>
                            </div>
                            

                        </form>
                        <div className='column'>
                            <table className='table is-fullwidth'>
                                <thead>
                                    <tr>
                                        <th>DATE</th>
                                        <th>SHIFT IN</th>
                                        <th>LUNCH OUT</th>
                                        <th>LUNCH IN</th>
                                        <th>SHIFT OUT</th>
                                        <th class='has-text-right'># OF HOURS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.props.dtr_summary.map( dtr => {

                                        const am_hours = ( !isEmpty( dtr.shift_in) && !isEmpty( dtr.lunch_out ) ) ? moment.duration(moment(dtr.lunch_out).diff(dtr.shift_in)).asHours() : 0
                                        const pm_hours = ( !isEmpty( dtr.lunch_in) && !isEmpty( dtr.shift_out ) ) ? moment.duration(moment(dtr.shift_out).diff(dtr.lunch_in)).asHours() : 0
                                        const total_hours = numeral(am_hours + pm_hours).format('0.00');

                                        return (
                                            <tr key={dtr._id}>
                                                <td>{dtr && moment(dtr.date).format('l') }</td>
                                                <td>{dtr.shift_in && moment(dtr.shift_in).format('LTS') }</td>
                                                <td>{dtr.lunch_out && moment(dtr.lunch_out).format('LTS') }</td>
                                                <td>{dtr.lunch_in && moment(dtr.lunch_in).format('LTS') }</td>
                                                <td>{dtr.shift_out && moment(dtr.shift_out).format('LTS') }</td>
                                                <td class='has-text-right'>{ total_hours }</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dtr_summary : state.dtr.dtr_summary,
        auth : state.auth
    }
}

export default connect(mapStateToProps, { getUserDtrSummary, logoutUser })(DtrSummary);
