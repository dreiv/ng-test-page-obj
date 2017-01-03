/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ServiceConsumerComponent } from './service-consumer.component';
import { HelloService } from '../hello.service';
import { Observable } from 'rxjs';

class MockHelloService {
  get(): Observable<any> {
    return Observable.of('hello');
  }
}

describe('ServiceConsumerComponent', () => {
  let component: ServiceConsumerComponent;
  let fixture: ComponentFixture<ServiceConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceConsumerComponent]
    }).overrideComponent(ServiceConsumerComponent, {
      set: {
        providers: [{provide: HelloService, useClass: MockHelloService}]
      }
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
