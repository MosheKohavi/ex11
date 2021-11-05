import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTextFormComponent } from './comment-text-form.component';

describe('CommentTextFormComponent', () => {
  let component: CommentTextFormComponent;
  let fixture: ComponentFixture<CommentTextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentTextFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentTextFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
