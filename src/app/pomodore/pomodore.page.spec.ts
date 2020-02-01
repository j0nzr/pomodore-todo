import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PomodorePage } from './pomodore.page';

describe('PomodorePage', () => {
  let component: PomodorePage;
  let fixture: ComponentFixture<PomodorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PomodorePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PomodorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
