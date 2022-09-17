import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccAddComponent } from './new-acc-add.component';

describe('NewAccAddComponent', () => {
  let component: NewAccAddComponent;
  let fixture: ComponentFixture<NewAccAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAccAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
