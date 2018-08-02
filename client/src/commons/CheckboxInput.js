import React, { Component } from 'react'

export default class CheckboxInput extends Component {
  state = {
    'isChecked' : false
  }

  componentDidUpdate = (prevProps, prevState) => {

    if ( this.props.selectedCourses !== prevProps.selectedCourses ) {
      const selected = this.props.selectedCourses.filter( selectedCourse => selectedCourse._id === this.props.course._id )

      if ( selected.length > 0 ) {
        this.setState({ isChecked : 1 })   
      } else {
        this.setState({ isChecked : 0 })   
      }
    }  
  }
  

  onChange = (event) => {
    const {target} = event;
    this.setState({
      [target.name] : target.checked
    }, () => {
      if ( this.state.isChecked ) {
        this.props.addToCourses(this.props.course);
      } else {
        this.props.removeFromCourses(this.props.course);
      }
    })
  }

  render() {
    return (
      <label className='checkbox'>
        <input type='checkbox' name='isChecked' checked={this.state.isChecked} onChange={this.onChange} style={{marginRight:'0.5rem'}}  />
        {this.props.label}
      </label>
    )
  }
}