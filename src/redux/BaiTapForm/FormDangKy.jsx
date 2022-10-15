import React, { Component } from 'react'
import { connect } from 'react-redux';

 class FormDangKy extends Component {
  state = {
    values: {
      maSV: '',
      hoTen: '',
      sdt: '',
      email: ''
    },
    errors: {
      maSV: '',
      hoTen: '',
      sdt: '',
      email: ''
    }
  }

  handelInput = (e) => {
    let { name, value } = e.target

    let newValues = { ...this.state.values };

    newValues[name] = value;

    // let newError = { ...this.props.sinhVien.errors };
    let newError = { ...this.state.errors };

    let message = '';

    // ktra rỗng
    if (value.trim() === '') {
      message = name + ' không được để trống'
    }

    let attrValue = e.target.getAttribute('data-type');
    let reg = '';

    if (attrValue === 'maSV') {
      reg = /^[a-zA-Z0-9_.-]*$/;
      // ktr ko đúng định dạng
      if (!reg.test(value)) {
        message = name + ' không đúng định dạng'
      }
    }

    // ktra hoTen
    if (attrValue === 'hoTen') {
      reg = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
      // ktr ko đúng định dạng
      if (!reg.test(value)) {
        message = name + ' không đúng định dạng'
      }
    }

    // ktr email

    if (attrValue === 'email') {
      reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      
      if (!reg.test(value)) {
        message = name + ' không đúng định dạng'
      }
    }
    // ktra number 
    if (attrValue === 'number') {
      reg = /^(0|[0-9][0-9]*)$/;
     
      if (!reg.test(value)) {
        message = name + ' không đúng định dạng'
      }
    }

    newError[name] = message;
    this.setState({
      values: newValues,
      errors: newError
    })


  }

  handelSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    for (let key in this.props.sinhVien.errors) {
      if (this.props.sinhVien.errors[key] !== '') {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      alert('Thông tin còn lỗi, vui lòng nhập lại');
      return;
    }

    let action = {
      type: 'THEM_SINH_VIEN',
      sinhVien: this.state.values
    }
    this.props.dispatch(action);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      values: newProps.thongTinSV
    })
  }
  render() {
    let { maSV, hoTen, sdt, email } = this.state.errors
    let values = this.state.values
    return (
      <div className='container'>
        <div class="card mt-5">
          <form onSubmit={this.handelSubmit}>
            <h2 className='bg-dark text-white p-2'>Thông Tin Sinh Viên</h2>
            <div className='card-body'>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Mã Sinh Viên</label>
                  <input value={values.maSV} data-type='maSV' onChange={this.handelInput} name='maSV' className='form-control' type="text" />
                  <p className='text-danger'>{maSV}</p>
                </div>
                <div className="form-group col-md-6">
                  <label>Họ Tên</label>
                  <input value={values.hoTen} data-type='hoTen' onChange={this.handelInput} name='hoTen' className='form-control' type="text" />
                  <p className='text-danger'>{hoTen}</p>
                </div>
                <div className="form-group col-md-6">
                  <label>Số Điện Thoại</label>
                  <input value={values.sdt} data-type='number' onChange={this.handelInput} name='sdt' className='form-control' type="text" />
                  <p className='text-danger'>{sdt}</p>
                </div>
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input value={values.email} data-type='email' onChange={this.handelInput} name='email' className='form-control' type="email" />
                  <p className='text-danger'>{email}</p>
                </div>
              </div>
              <div className="form-row">
                <div className='col-12'>
                  <button className='btn btn-success'>Thêm Sinh Viên</button>
                  <button type='button' className='btn btn-info ml-3' onClick={() => {
                    let action = {
                      type: 'CAP_NHAT',
                      thongTinSVCapNhat: this.state.values
                    }
                    this.props.dispatch(action)
                  }}>Cập Nhật</button>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    thongTinSV: rootReducer.qlSVReducer.thongTinSinhVien,
    sinhVien: rootReducer.qlSVReducer.sinhVien
  }
}
export default connect(mapStateToProps)(FormDangKy)