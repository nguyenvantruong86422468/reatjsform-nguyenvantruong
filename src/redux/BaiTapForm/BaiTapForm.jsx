import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDSSV from './TableDSSV'

export default class BaiTapForm extends Component {
    render() {
        return (
            <div className='container'>
                <h2 className='text-center mt-3'>Bài Tập Form</h2>
                <FormDangKy />
                <TableDSSV />
            </div>
        )
    }
}
