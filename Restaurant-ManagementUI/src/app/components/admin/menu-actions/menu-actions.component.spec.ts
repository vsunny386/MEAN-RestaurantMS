import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuActionsComponent } from './menu-actions.component';

describe('MenuActionsComponent', () => {
  let component: MenuActionsComponent;
  let fixture: ComponentFixture<MenuActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
