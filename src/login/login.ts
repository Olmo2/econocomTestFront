import { ChangeDetectionStrategy, Component } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-login',
  imports: [RouterOutlet,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslatePipe,
    TranslateDirective,
    CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  passwordVisible: boolean = false;

  languages: any[] = [
    {code: 'ES', value: 'es'},
    {code: 'EN', value: 'en'},
    {code: 'FR', value: 'fr'},
    {code: 'PT', value: 'pt'},
  ];
 languageSelected = 'es';

  constructor(private translate: TranslateService) {
    translate.use(this.languageSelected);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
