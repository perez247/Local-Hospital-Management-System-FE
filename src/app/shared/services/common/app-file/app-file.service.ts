import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { UtilityHelpers } from '../../../core/functions/utility-helpers';
import { UserFile } from '../../../core/models/files';
import { CustomToastService } from '../custom-toast/custom-toast.service';

@Injectable({
  providedIn: 'root'
})
export class AppFileService {

  constructor(
    private toast: CustomToastService
  ) { }

  download(userFile: UserFile) {
    const file = UtilityHelpers.dataURLtoFile(userFile.base64String ?? '', userFile.name ?? '')
    saveAs(file, userFile.name);
  }

  downloadAsCSV(data: any, filename='data') {

    if (!data) { this.toast.error('No data available to download'); }

    let csvData = this.jsonToCSV(data, Object.keys(data[0]));
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
}

  private jsonToCSV(objArray: any, headerList: string[]) {
    let array = objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
     row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r';
    for (let i = 0; i < array.length; i++) {
     let line = (i+1)+'';
     for (let index in headerList) {
      let head = headerList[index];
      line += ',' + array[i][head];
     }
     str += line + '\r';
    }
    return str;
   }
}
