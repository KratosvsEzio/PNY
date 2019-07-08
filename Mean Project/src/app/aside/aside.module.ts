import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideSectionComponentComponent } from './side-section-component/side-section-component.component';
import { AsideHeaderComponentComponent } from './defaultSideSection/aside-header-component/aside-header-component.component';
import { AsideMainComponentComponent } from './defaultSideSection/aside-main-component/aside-main-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileHeaderComponent } from './profileSideSection/profile-header/profile-header.component';
import { ProfileMainComponent } from './profileSideSection/profile-main/profile-main.component';
import { NewChatHeaderComponent } from './newChat/new-chat-header/new-chat-header.component';
import { NewChatMainComponent } from './newChat/new-chat-main/new-chat-main.component';

@NgModule({
  declarations: [
    SideSectionComponentComponent,
    AsideHeaderComponentComponent,
    AsideMainComponentComponent,
    ProfileHeaderComponent,
    ProfileMainComponent,
    NewChatHeaderComponent,
    NewChatMainComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SideSectionComponentComponent
  ],
})
export class AsideModule { }
