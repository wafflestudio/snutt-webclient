import React from 'react'
import ResultRow from './ResultRow.jsx'

export default class DetailRow extends ResultRow {
  constructor() {
    super()
  }

  render() {
    return (
      <tr
        className='tr-detail'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td colSpan='7'>

        </td>
      </tr>
    )
  }
}
