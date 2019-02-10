import React, { Component } from 'react';
import html2canvas from 'html2canvas';

// Mostly from
// https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas

class TableCapturer extends Component {
  captureTable = e => {
    e.preventDefault();
    html2canvas(document.querySelector('.timetable')).then(canvas => {
      var a = document.createElement('a');
      a.href = canvas
        .toDataURL('image/jpeg')
        .replace('image/jpeg', 'image/octet-stream');
      a.download = 'timetable.jpg';
      a.click();
      a.remove();
    });
  };

  render() {
    return (
      <div className="add-button btn-default" onClick={this.captureTable}>
        <span>캡쳐하기</span>
      </div>
    );
  }
}

export default TableCapturer;
