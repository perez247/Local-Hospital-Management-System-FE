import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { AppServerError } from "../models/jwtToken";

export interface IFileStatus {
    isSuccess?: boolean;
    errorMessage?: string;
}

export class UtilityHelpers
{
  public static dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const firstArr = arr[0];
    const mime1 = firstArr.match(/:(.*?);/) ?? {} as RegExpMatchArray;
    const mime = mime1[1]
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  public static validateFile(file: any): IFileStatus {
    if (file.size > 200000) {
      return { isSuccess: false, errorMessage:  'File should no be greater 2MB'}
    }

    return { isSuccess: true, errorMessage: undefined };
  }

  public static validateFileName(fileName?: string): IFileStatus {

    if (!fileName) {
      return { isSuccess: false, errorMessage:  'File name is required'}
    }

    if (fileName.length <= 0) {
      return { isSuccess: false, errorMessage:  'File name is required'}
    }

    const pattern = new RegExp('^[a-zA-Z0-9._ ]*$');

    const result = pattern.test(fileName ?? '');

    if (!result) {
      return { isSuccess: false, errorMessage:  'Only letters, numbers, periods and underscore'}
    }

    return { isSuccess: true, errorMessage: undefined };
  }

  public static showError(error: any, toast: CustomToastService): string {
    // console.log(error);
    const serverError = error.error as AppServerError;

    if (serverError.error && serverError.error.length > 0) {
      toast.error(serverError.error);

      return serverError.error;
    }

    if (serverError.errors && serverError.errors.length > 0) {
      const errors = serverError.errors as any[];
      errors.forEach(x => {
        x.fieldErrors.forEach((ele: string) => {
          toast.error(ele);
        });
      });
    }

    return '';
  }
}
