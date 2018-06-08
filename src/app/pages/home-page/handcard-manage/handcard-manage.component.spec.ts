import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandcardManageComponent } from './handcard-manage.component';

describe('HandcardManageComponent', () => {
  let component: HandcardManageComponent;
  let fixture: ComponentFixture<HandcardManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandcardManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandcardManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
