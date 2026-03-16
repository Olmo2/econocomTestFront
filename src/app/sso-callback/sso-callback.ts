import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sso-callback',
  templateUrl: './sso-callback.html',
  styleUrl: './sso-callback.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SsoCallbackComponent implements OnInit {

  message = 'Autenticando...';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  private router: Router
  ) {}

  ngOnInit(): void {

    const code = this.route.snapshot.queryParamMap.get('code');

    if (!code) {
      this.message = 'Error: Código SSO no recibido';
      return;
    }

    this.http.post<any>('/api/auth/sso/callback', { code }).subscribe({
      next: (response) => {
        this.message = 'Login SSO completado con éxito';
        localStorage.setItem('token', response.token);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = 'Error en la autenticación SSO';
        console.error(err);
      }
    });

  }
}