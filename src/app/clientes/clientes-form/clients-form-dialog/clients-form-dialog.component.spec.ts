import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsFormDialogComponent } from './clients-form-dialog.component';

describe('ClientsFormDialogComponent', () => {
  let component: ClientsFormDialogComponent;
  let fixture: ComponentFixture<ClientsFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
