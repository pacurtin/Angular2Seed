import { TestBed } from '@angular/core/testing';
import { CsvService } from './csv.service';

describe('CsvService', () => {
  let service: CsvService;

  const exampleCsvArray: Object[] = [
    {
      'status': 'OK',
      'amount': '93',
      'date': '2017-12-12T23:01:01.000Z',
      'shop': 'UNKNOWN',
    },
    {
      'status': 'OK',
      'amount': '50',
      'date': '2017-12-13T00:45:21.000Z',
      'shop': 'UNKNOWN',
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvService]
    });
    service = new CsvService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a csv string from an array of Objects', () => {
    const csv = service.generateCsv( exampleCsvArray );
    expect(csv).toEqual(jasmine.any(String));
    expect(csv.substring(0, 19)).toEqual('status,amount,date,');
  });

  it('should download a csv file given a csv string', () => {
    expect(function() {
      service.downloadCsv(exampleCsvString, false);
    }).not.toThrow();
  });

});

export const exampleCsvString = 'status,amount,date,shop\n' +
  '"OK","93","2017-12-12T23:01:01.000Z","UNKNOWN"\n' +
  '"OK","50","2017-12-13T00:45:21.000Z","UNKNOWN"';
