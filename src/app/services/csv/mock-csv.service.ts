import {Injectable} from '@angular/core';

@Injectable()
export class MockCsvService {

  exampleCsv = 'Title1,Title2,Title3\none,two,three\nexample1,example2,example3';

  generateCsv( sales: Object[]) {
    return this.exampleCsv;
  }

  downloadCsv(csvData: string[], download: boolean) {}
}
