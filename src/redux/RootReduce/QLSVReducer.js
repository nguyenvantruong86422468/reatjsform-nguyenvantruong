let qlsv = {
    mangSV: [
      { maSV: 1, hoTen: 'Nguyễn van ABC', sdt: '0909887799', email: 'nguyenvanabc@gmail.com' },
      { maSV: 2, hoTen: 'Trần van BCD', sdt: '0909887799', email: 'tranvanbcd@gmail.com' }
    ],
    thongTinSinhVien: {
      maSV: 1, hoTen: 'Nguyên Văn ABC', sdt: '0909887799', email: 'nguyenvanabc@gmail.com'
    },
    sinhVien: {
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
    },
    mangSVSearch :[]
  }
  export const qlSVReducer = (state = qlsv, action) => {
    switch (action.type) {
      case 'THEM_SINH_VIEN': {
        state.mangSV = [...state.mangSV, action.sinhVien]
        return { ...state }
      }
      case 'XOA_SINH_VIEN': {
        let mangSVXoa = [...state.mangSV];
        state.mangSV = mangSVXoa.filter(sv => sv.maSV !== action.xoaMaSV);
        return { ...state }
      }
      case 'XEM_THONG_TIN': {
        state.thongTinSinhVien = action.thongTinSV;
        state.sinhVien = { ...state.sinhVien }
        return { ...state }
      }
      
      case 'CAP_NHAT': {
        let mangCapNhat = [...state.mangSV]
        let sinhVienCapNhat = mangCapNhat.find((sv) => {
          return sv.maSV === action.thongTinSVCapNhat.maSV;
        });
        if (sinhVienCapNhat) {
          sinhVienCapNhat.maSV = action.thongTinSVCapNhat.maSV
          sinhVienCapNhat.hoTen = action.thongTinSVCapNhat.hoTen
          sinhVienCapNhat.sdt = action.thongTinSVCapNhat.sdt
          sinhVienCapNhat.email = action.thongTinSVCapNhat.email
        }
        state.mangSV = mangCapNhat;
        return { ...state }    
      }
      case 'TIM_SINH_VIEN' :{
        state.mangSVSearch = action.seachSV
        return { ...state }
      }
  
      default: return state;
    }
  }