import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActorComponent } from './movie-actor.component';

describe('MovieActorComponent', () => {
  let component: MovieActorComponent;
  let fixture: ComponentFixture<MovieActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
