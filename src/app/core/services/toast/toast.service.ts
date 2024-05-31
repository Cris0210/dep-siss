import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  public messageNotification(severity: any, detail: any, life?: any) {
    if (this.isNull(life)) life = 3000;
    return this.messageService.add({
      severity: severity,
      detail: detail,
      life: life,
    });
  }

  private isNull(obj: any) {
    if (typeof obj === 'undefined' || obj === null || obj == '') return true;
    else return false;
  }
}