import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableDSSV extends Component {
  constructor(props) {
    super(props);
    this.state = { search: true };
  }
  // constructor(props) {
  //   super(props);
  //   this.state = { search: true };
  // }
  renderSinhVien = (mang) => {
    let { mangSV } = this.props;
    return mang.map((sv, index) => {
      return (
        <tr key={sv.maSV}>
          <td>{sv.maSV}</td>
          <td>{sv.hoTen}</td>
          <td>{sv.sdt}</td>
          <td>{sv.email}</td>
          <td>
            <button className='btn btn-danger' onClick={() => {
              let action = {
                type: 'XOA_SINH_VIEN',
                xoaMaSV: sv.maSV
              }
              this.props.dispatch(action);
            }}>Xóa</button>
            <button className='btn btn-info ml-2' onClick={() => {
              let action = {
                type: 'XEM_THONG_TIN',
                thongTinSV: sv
              }
              this.props.dispatch(action);
            }} >Xem</button>
          </td>
        </tr>
      )
    })
  }

  handleSearch(event) {
    let { value } = event.target;
    let mangSVSearch = [...this.props.mangSV]

    mangSVSearch = this.props.mangSV.filter(sv => {
      if (sv.hoTen.toLowerCase().includes(value.toLowerCase())) {
        return true
      }
    })

    this.setState({
      search: false
    });

    let action = {
      type: 'TIM_SINH_VIEN',
      seachSV: mangSVSearch
    }
    this.props.dispatch(action)
  }
  render() {

    return (
      <div className='container'>
        <div className='col-12 text-right'>
          <label className='mr-3'>Tìm Sinh Viên</label>
          <input className='my-2 rounded p-1' placeholder='Search...' onChange={(e) => { this.handleSearch(e) }} />
        </div>
        <table className="table">


          <thead>
            <tr className='bg-dark text-white'>
              <th>Mã SV</th>
              <th>Họ Tên</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.search ? this.renderSinhVien(this.props.mangSV) : this.renderSinhVien(this.props.mangSVSearch)}
          </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.qlSVReducer.mangSV,
    mangSVSearch: rootReducer.qlSVReducer.mangSVSearch
  }
}
export default connect(mapStateToProps)(TableDSSV)
