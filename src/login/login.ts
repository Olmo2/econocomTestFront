import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';

import { TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslatePipe,
    CommonModule,
    MatSnackBarModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  languageSelected = 'es';
  passwordVisible: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [Validators.required])
  });

  languages: any[] = [
    { code: 'ES', value: 'es' },
    { code: 'EN', value: 'en' },
    { code: 'FR', value: 'fr' },
    { code: 'PT', value: 'pt' },
  ];

  constructor(private translate: TranslateService) {
    translate.use(this.languageSelected);
  }

  changePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }
  changeLanguage(language: string) {
    this.translate.use(language);
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const cred = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post('/api/auth/login', cred).subscribe({
      next: (res) => {
        this.snackBar.open(this.translate.instant('alert.success'),
          this.translate.instant('alert.close'), {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        this.snackBar.open(this.translate.instant('alert.failure'),
          this.translate.instant('alert.close'), {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }
}
