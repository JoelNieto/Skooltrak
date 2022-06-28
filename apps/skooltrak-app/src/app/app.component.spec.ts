import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { StorageService } from './shared/services/storage.service';
import { UpdateService } from './shared/services/update.service';
import getTranslocoTestingModule from './transloco-testing.module';

fdescribe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
        getTranslocoTestingModule(),
      ],
      declarations: [AppComponent],
      providers: [StorageService, UpdateService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
