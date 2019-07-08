import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SectionFooterComponent } from './section-footer/section-footer.component';
import { SectionArticleComponent } from './section-article/section-article.component';
import { SectionChatComponent } from './section-chat/section-chat.component';
import { SectionDefaultComponent } from './section-default/section-default.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { MessageService } from '../Service/message.service';

@NgModule({
  declarations: [
    SectionHeaderComponent,
    SectionFooterComponent,
    SectionArticleComponent,
    SectionChatComponent,
    SectionDefaultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    SectionChatComponent
  ],
  providers: []
})

export class SectionModule { }
