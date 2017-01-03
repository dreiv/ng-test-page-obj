/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HelloService } from './hello.service';
import { HttpModule } from '@angular/http';

describe('HelloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HelloService]
    });
  });

  it('should ...', inject([HelloService], (service: HelloService) => {
    expect(service).toBeTruthy();
  }));
});
