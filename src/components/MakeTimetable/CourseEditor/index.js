import React, { Component } from 'react'
import { connect } from 'react-redux'

import ColorPreview from './ColorPreview.jsx'
import LectureEditForm from './LectureEditForm.jsx'
import ColorManager from './ColorManager.jsx'

class CourseEditor extends Component {
  constructor(props) {
    super()
    this.handleReset = this.handleReset.bind(this)
    this.toggleColorEdit = this.toggleColorEdit.bind(this)
    this.updateCourse = this.updateCourse.bind(this)
    this.updateColor = this.updateColor.bind(this)
    this.state = {
      isEditingColor: false,
      updatedCourse: props.course,
    }
  }

  toggleColorEdit() {
    this.setState({ isEditingColor: !this.state.isEditingColor })
  }

  handleReset() {
    if (this.state.isEditingColor == true) {
      this.updateColor(this.props.course.fgColor, this.props.course.bgColor)
    } else {
      this.setState({ updatedCourse: this.props.course })
    }
  }

  updateColor(fg, bg) {
    let updated = Object.assign({}, this.state.updatedCourse, {
      fgColor: fg,
      bgColor: bg,
    })
    this.setState({ updatedCourse: updated })
  }

  updateCourse(obj) {
    let updated = Object.assign({}, this.state.updatedCourse, obj)
    this.setState({ updatedCourse: updated })
  }

  render() {
    const course = this.state.updatedCourse
    return(
      <div style={divStyle}>
        <ColorPreview
          onClick={this.toggleColorEdit}
          char={course.course_title[0]}
          fgColor={course.fgColor}
          bgColor={course.bgColor}
          size={25}
        />
        <span style={titleStyle}>{course.course_title}</span>
        <span
          className='glyphicon glyphicon-repeat'
          aria-hidden='true'
          onClick={this.handleReset}
        />
        <hr style={hrStyle}/>
        { this.state.isEditingColor ?
          <ColorManager
            toggleColorEdit={this.toggleColorEdit}
            updateColor={this.updateColor}
            currentFgColor={course.fgColor}
            currentBgColor={course.bgColor}
          /> :
          <LectureEditForm
            course={course}
            updateCourse={this.updateCourse}
          />
        }
      </div>
    )
  }
}

const divStyle = {
  position: 'relative',
  textAlign: 'left',
  margin: 'auto',
  backgroundColor: 'white',
  width: '500px',
  height: '240px',
  padding: '10px',
}

const titleStyle = {
  fontSize: '18px',
}

const hrStyle = {
  margin: '10px 0',
}

function mapStateToProps(state) {
  return { course: state.editingCourse }
}

export default connect(mapStateToProps)(CourseEditor)
