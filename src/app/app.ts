import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { ScrollTopButtonComponent } from './components/scroll-top-button/scroll-top-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent, ScrollTopButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
