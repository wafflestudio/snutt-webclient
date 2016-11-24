import React from 'react'
import PureRenderComponent from '../../PureRenderComponent.jsx'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import ColorPickerWrapper from './ColorPickerWrapper.jsx'
import { contrast, timeJsonToMask } from './util'
import { addLecture, updateLecture, closeCourse } from '../../../actions/tableActions'
import JsonEditor from './JsonEditor.jsx'

class CourseEditor extends PureRenderComponent {
  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleColorSelect = this.handleColorSelect.bind(this)
    this.renderInput = this.renderInput.bind(this)

    const defaultColor = { fg: "#1579C2", bg: "#94E6FE" }
    const { course } = props
    this.state = {
      isNew: Boolean(Object.keys(course).length),
      _id: course._id || '', // || for new course
      course_title: course.course_title || '',
      instructor: course.instructor || '',
      class_time_mask: course.class_time_mask || '',
      class_time_json: course.class_time_json || [],
      remark: course.remark || '',
      color: course.color || defaultColor,
    }
  }

  handleColorSelect = (chosenColor) => {
    this.setState({ color: {
      bg: chosenColor.hex,
      fg: contrast(chosenColor.rgb),
    }})
  }

  handleJsonUpdate = (updatedJson) => this.setState({class_time_json: updatedJson})

  handleSave(e) {
    e.preventDefault()
    console.log('handle save')
    const { dispatch } = this.props
    const { course_title, instructor, class_time_json, remark, color } = this.state
    const editedLecuture = {
      course_title,
      instructor,
      class_time_mask: timeJsonToMask(class_time_json),
      class_time_json,
      remark,
      color,
    }
    if (this.state.isNew) { //add new course
      dispatch(addLecture(editedLecuture))
    } else {
      dispatch(updateLecture(this.state._id, editedLecuture))
    }
  }

  handleClose(e) {
    e.preventDefault()
    console.log('handle close')
    this.props.dispatch(closeCourse())
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value })
  }

  renderInput(field, key) {
    return (
      <div className='form-group'>
        <label className='col-sm-2 control-label'>{field}</label>
        <div className='col-sm-7'>
          <input
            className='form-control'
            value={this.state[key]}
            onChange={this.handleChange.bind(this, key)}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <Modal
        isOpen={true}
        className='snutt__modal'
        overlayClassName='snutt__modal-overlay'
        portalClassName='snutt__course-editor'
        style={{ content: {
          backgroundColor: this.state.color.bg,
          color: this.state.color.fg
        }}}
      >
        <h3>강의 편집</h3>
        <ColorPickerWrapper
          color={this.state.bgColor}
          onChange={this.handleColorSelect}
        />
        <form
          className='form-horizontal'
          onSubmit={this.handleSave}
        >
          {this.renderInput('제목', 'course_title')}
          {this.renderInput('선생님', 'instructor')}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>시간</label>
            <div className='col-sm-7'>
              <JsonEditor
                updateJson={this.handleJsonUpdate}
                class_time_json={this.state.class_time_json}
              />
            </div>
          </div>
          {this.renderInput('비고', 'remark')}
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-7'>
              <p>
                <button type='submit' className='btn btn-primary'>
                  확인
                </button> {' '}
                <button
                  className='btn btn-default'
                  onClick={this.handleClose}
                >
                  취소
                </button>
              </p>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const { isOpen, course } = state.courseEditor
  return { isOpen, course }
}

export default connect(mapStateToProps)(CourseEditor)
