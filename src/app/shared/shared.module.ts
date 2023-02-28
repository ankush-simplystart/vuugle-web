import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LyDialogModule } from '@alyle/ui/dialog';
import { LyGridModule } from '@alyle/ui/grid';
import { LyTypographyModule } from '@alyle/ui/typography';
import { LyFieldModule } from '@alyle/ui/field';

import { MaterialModule } from '../material.module';
import { GenericValidatorComponent } from './generic-validator/generic-validator.component';
import { CropperDialog } from './cropper/cropper-dialog';


import { HeaderComponent } from '../header/header.component';

@NgModule({
  exports: [
    MaterialModule,
    CropperDialog,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyDialogModule,
    LyGridModule,
    LyTypographyModule,
    LyFieldModule,

  ],
  declarations: [
    GenericValidatorComponent,
    CropperDialog,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyDialogModule,
    LyGridModule,
    LyTypographyModule,
    LyFieldModule,

  ],
  providers: [
    GenericValidatorComponent
  ],
})
export class SharedModule { }
