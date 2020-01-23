export default class FormHelper {
  // tslint:disable:max-line-length
  static readonly emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // tslint:enable:max-line-length
  static readonly passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/;
  static readonly passwordMinLength = 6;
  static readonly passwordMaxLength = 16;
  static readonly productNameMaxLength = 255;
  static readonly productDescriptionMaxLength = 1000;
  static readonly userNameMaxLength = 255;
  static readonly userLastNameMaxLength = 255;
  static readonly phoneMask: any[] = ['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  static readonly phonePattern = /\+\d{3}\s\d{2}\s\d{3}\s\d{4}/;
}
