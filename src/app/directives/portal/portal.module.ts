import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalToDirective } from './portal.directive';

// удалить?
@NgModule({
  declarations: [PortalToDirective],
  imports: [CommonModule],
  exports: [PortalToDirective],
})
export class PortalModule {}
