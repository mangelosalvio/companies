import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './../styles/Summary.css';
import  { connect } from 'react-redux';
import classnames from 'classnames'
import { getCompanyList, updateCompanyCourses } from '../actions/companyActions';
import CheckboxInput from '../commons/CheckboxInput';
import { getCourses } from '../actions/coursesActions';
import isEmpty from './../validation/is-empty'
import logo from './../images/logo.png'

class CompanyList extends Component {

    state = {
        startDate : null,
        enddDate : null,
        focusedInput : null,
        id_no : '',
        companies : [],
        courses : [],
        selectedCourses : [],
        selectedCompany : {}
    }

    componentDidMount() {

        getCourses()
            .then( result => this.setState({ courses : result.data }) )
            .catch( err => console.log(err) );
        
        getCompanyList(this.state.selectedCourses)
            .then( result => this.setState({ companies : result.data }) )
            .catch( err => console.log(err) );
    }

    onChange = (e) => {
        this.setState(({ id_no : e.target.value }));
    }



    addToCourses = (course) => {
        this.setState( (prevState) => {
            return {
                selectedCourses : [
                    ...prevState.selectedCourses,
                    course
                ]
            }
        }, this.updateCompany) 
    }

    removeFromCourses = (course) => {
        const { selectedCourses } = this.state;
        const index = this.state.selectedCourses.indexOf(course);
        selectedCourses.splice(index,1);
        console.log(selectedCourses);
        this.setState({
            selectedCourses
        }, this.updateCompany);
    }

    updateCompany = () => {
        if ( !isEmpty( this.state.selectedCompany ) ) {
            this.setState((prevState) => {
                return {
                    selectedCompany : {
                        ...prevState.selectedCompany,
                        courses : [
                            ...prevState.selectedCourses
                        ]
                    }
                }
            }, () => {
                const company = this.state.selectedCompany;
                updateCompanyCourses({ company })
                    .then((response) => {

                        const { companies } = this.state;
                        const index = companies.findIndex((company) => company._id === this.state.selectedCompany._id)
                        companies[index] = company;

                        this.setState({
                            companies
                        })
                    })
                    .catch( err => console.log(err) )
            })
        } else {
            this.getCompaniesFromCourses();
        }
        
    }

    getCompaniesFromCourses = () => {
        getCompanyList(this.state.selectedCourses)
            .then( result => this.setState({ companies : result.data }) )
            .catch( err => console.log(err) );
    }

    onCompanySelected = (company) => {
        if ( company._id === this.state.selectedCompany._id ) {
            this.setState({ selectedCompany : {}, selectedCourses : [] }, () => {
                this.getCompaniesFromCourses()
            })
        } else {
            this.setState({ 
                selectedCompany: company,
                selectedCourses : company.courses
            })
        }
    }
    
    render() {
        return (
            <div className='full-height'>
                <div className='container full-height'>
                    <div className='columns full-height' >
                        
                        <form className='column is-one-third DtrSummary-form-input' onSubmit={this.onSubmit}>
                            <ul>
                            { this.state.courses.map( course => (
                                <li key={course._id} style={{ padding : '0.5rem' }}>
                                    <CheckboxInput label={course.name} course={course} addToCourses={this.addToCourses} removeFromCourses={this.removeFromCourses} selectedCourses={this.state.selectedCourses} />
                                </li>
                            ) ) }
                            </ul>

                            <div>
                                <img src={logo} style={{ 'marginLeft' : '-4rem' }} />
                                <p  style={{ 'fontSize' : '1rem' }}>Developed by: <b>Michael Salvio</b></p>
                            </div>

                        </form>
                        <div className='column box full-height' style={{ overflow : 'auto' }}>
                            <table className='table is-fullwidth'>
                                <thead>
                                    <tr>
                                        <th>COMPANY NAME</th>
                                        <th>ADDRESS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.companies.map( company => {

                                        return (
                                            <tr key={company._id} className={classnames({
                                                'active' : this.state.selectedCompany._id === company._id
                                            })} /* onClick={() => { this.onCompanySelected(company)} } */>
                                                <td>{ company.company_name }</td>
                                                <td>{ company.company_address }</td>
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

export default connect(mapStateToProps, {  })(CompanyList);
