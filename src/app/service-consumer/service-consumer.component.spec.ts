/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ServiceConsumerComponent } from './service-consumer.component';
import { HelloService } from '../hello.service';
import { Observable } from 'rxjs';

const mockedResponse = 'hello mocked';

class MockHelloService {
  get(): Observable<any> {
    return Observable.of(mockedResponse);
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
      // we have search results so elements are now in the DOM
      this.mainParagraph = fixture.debugElement.query(By.css('p')).nativeElement;
    }
  }

  // setup
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceConsumerComponent]
    }).overrideComponent(ServiceConsumerComponent, {
      set: {
        providers: [{provide: HelloService, useClass: MockHelloService}]
      }
    })
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
