import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ServiceConsumerComponent } from './service-consumer.component';
import { HelloService } from '../hello.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

const mockedResponse = 'hello mocked';

class MockHelloService {
  static get(): Observable<any> {
    return Observable.of(mockedResponse);
  }
}

class RouterStub {
  static navigateByUrl(url: string) {
    return url;
  }
}

@Injectable()
export class ActivatedRouteStub {
  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {};
  get testParams() {
    return this._testParams;
  }

  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return {params: this.testParams};
  }
}


describe('ServiceConsumerComponent', () => {
  let component: ServiceConsumerComponent;
  let fixture: ComponentFixture<ServiceConsumerComponent>;
  let page: Page;

  class Page {
    mainParagraph: HTMLElement;

    constructor() {
    }

    /** Add page elements after data is retrieved */
    addPageElements() {
      // we have data so elements are now in the DOM
      this.mainParagraph = fixture.debugElement.query(By.css('p')).nativeElement;
    }
  }

  // setup
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceConsumerComponent]
    }).overrideComponent(ServiceConsumerComponent, {
      set: {
        providers: [
          {provide: ActivatedRoute, useClass: ActivatedRouteStub},
          {provide: HelloService, useClass: MockHelloService},
          {provide: Router, useClass: RouterStub}
        ]
      }
    });
    createComponent();
  }));

  /** Create the SearchHitsComponent, initialize it, set test variables */
  function createComponent() {
    fixture = TestBed.createComponent(ServiceConsumerComponent);
    component = fixture.debugElement.componentInstance;
    page = new Page();

    // 1st change detection triggers ngOnInit data retrieval.
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched data
      fixture.detectChanges();
      page.addPageElements();
    });
  }

  // specs
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the mocked service data', () => {
    expect(component.data).toBe(mockedResponse);
  });

  it('should render the mocked service data', () => {
    expect(page.mainParagraph.textContent).toContain(mockedResponse);
  });
});
