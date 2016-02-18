import React, { Component } from 'react'

export default class NewCourseForm extends Component {
  constructor() {
    super()
    this.state = { title: '', place: '', memo: '' }
    this.formGroup = this.formGroup.bind(this)
  }

  formGroup(field, label) {
    return(
      <div className='form-group'>
        <label>{label}</label>
        <input
          id={field}
          type='text'
          className='form-control'
          value={this.state[field]}
          onChange={e =>
            this.setState({ [field]: e.target.value })
          }
        />
      </div>
    )
  }

  render() {
    return(
      <form className='form-inline'>
        {this.formGroup('title', 'Title')}
        {this.formGroup('place', 'Place')}
        {this.formGroup('memo', "Memo")}
        <button type='submit' className='btn btn-primary'>Add</button>
      </form>
    )
  }
}
