import { Injectable } from '@angular/core';

/* Service for generating/downloading csv files */

@Injectable()
export class CsvService {

  constructor() { }

  downloadCsv(csvData: string, download: boolean) {
    const downloadLink = document.createElement('a');
    const blob = new Blob(['\ufeff', csvData]);
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.csv';

    document.body.appendChild(downloadLink);
    // This is just here for testing. I don't want to download a file everytime the unit test runs.
    if (download) {
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  }

  /* Generate a CSV of the table contents */
  generateCsv ( rows: Object[]): string {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(rows[0]);
    let csv: any = rows.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');
    return csv;
  }

}
