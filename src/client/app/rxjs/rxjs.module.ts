import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RxjsComponent } from './rxjs.component';
import { NameListService } from '../shared/name-list/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [RxjsComponent],
  exports: [RxjsComponent],
  providers: [NameListService]
})
export class RxjsModule { }
