import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardApprovalComponent } from './admin-card-approval.component';

describe('AdminCardApprovalComponent', () => {
  let component: AdminCardApprovalComponent;
  let fixture: ComponentFixture<AdminCardApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCardApprovalComponent]
    });
    fixture = TestBed.createComponent(AdminCardApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
