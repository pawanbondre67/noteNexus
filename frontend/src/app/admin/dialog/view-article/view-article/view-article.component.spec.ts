import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticleComponent } from './view-article.component';

describe('ViewArticleComponent', () => {
  let component: ViewArticleComponent;
  let fixture: ComponentFixture<ViewArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
