import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService, ToastrType } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _toastr: ToastrService) { }

  errorHandler(err: HttpErrorResponse) {
    switch (err.status) {
      case 0:
        this._toastr.toast(ToastrType.Error, "Hata!", "Api adresine ulaşılamıyor!");
        break;

      case 404:
        this._toastr.toast(ToastrType.Error, "Hata!", "Api adresi bulunamıyor!");
        break;

      case 500:
        if (err.error.errors) {
          let errors: any = err.error.errors;
          errors.forEach((element: any) => {
            this._toastr.toast(ToastrType.Error, "Hata!", element);
          });
        } else {
          this._toastr.toast(ToastrType.Error, "Hata!", err.error.Message);
        }
        break;

      default:
        if (err.error.errors) {
          let errors: any = err.error.errors;
          errors.forEach((element: any) => {
            this._toastr.toast(ToastrType.Error, "Hata!", element);
          });
        } else {
          this._toastr.toast(ToastrType.Error, "Hata!", err.message);
        }
        break;
    }

    console.log(err);
  }
}
