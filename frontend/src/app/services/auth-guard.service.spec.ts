import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuard;
  let router: Router;

  const makeState = (url: string): RouterStateSnapshot => ({ url } as RouterStateSnapshot);

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    });
    service = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect authenticated users from root to /logedin', () => {
    sessionStorage.setItem('auth-token', 'token');

    const result = service.canActivate({} as any, makeState('/'));

    expect(result).toEqual(router.parseUrl('/logedin'));
  });

  it('should allow unauthenticated users to access root', () => {
    const result = service.canActivate({} as any, makeState('/'));

    expect(result).toBeTrue();
  });

  it('should redirect unauthenticated users from protected routes to root', () => {
    const result = service.canActivate({} as any, makeState('/logedin'));

    expect(result).toEqual(router.parseUrl('/'));
  });
});
