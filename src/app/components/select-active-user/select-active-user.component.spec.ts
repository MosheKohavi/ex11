import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectActiveUserComponent } from './select-active-user.component';

describe('ActiveUserComponent', () => {
  let component: SelectActiveUserComponent;
  let fixture: ComponentFixture<SelectActiveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectActiveUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectActiveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
