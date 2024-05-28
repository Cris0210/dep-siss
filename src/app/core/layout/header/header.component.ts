import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutService } from '../../services/layout/layout.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  constructor(private router: Router, public _layoutService: LayoutService) {}
  public goToLogin() {
    this.router.navigate(['/login']);
  }
  public goToHome() {
    this.router.navigate(['/']);
  }
}