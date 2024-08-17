import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArticleComponent } from './manage-article.component';

describe('ManageArticleComponent', () => {
  let component: ManageArticleComponent;
  let fixture: ComponentFixture<ManageArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
