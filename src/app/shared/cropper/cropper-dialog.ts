import { Component, ChangeDetectionStrategy, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { StyleRenderer, WithStyles, lyl, ThemeRef, ThemeVariables } from '@alyle/ui';
import { LyDialogRef, LY_DIALOG_DATA } from '@alyle/ui/dialog';
import { LySliderChange, STYLES as SLIDER_STYLES } from '@alyle/ui/slider';
import {
  STYLES as CROPPER_STYLES,
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent
} from '@alyle/ui/image-cropper';



@Component({
  templateUrl: './cropper-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class CropperDialog implements WithStyles, AfterViewInit {
  
   classes: any;
  ready: boolean;
  scale: number;
  minScale: number;
  @ViewChild(LyImageCropper, { static: true }) cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 400,
    height: 600,
    // type: 'image/png',
    keepAspectRatio: true,
    responsiveArea: true,
    output: {
      width: 400,
      height: 600
    },
    resizableArea: true,
    // round: true
  };
  constructor(
    @Inject(LY_DIALOG_DATA) private event: Event,
    readonly sRenderer: StyleRenderer,
    public dialogRef: LyDialogRef
  ) { 
    this.initilizeCropper();
  }

  initilizeCropper(): void{
    //Set Cropper Image Variables
    this.myConfig.width = this.event['configWidth'];
    this.myConfig.height = this.event['configHeight'];
    this.myConfig.output['width'] = this.event['outputWidth'];
    this.myConfig.output['height'] = this.event['outputHeight'];
    if(this.event['round']){
      this.myConfig.round = true
    }
    if(this.event['round']){
      this.myConfig.round = true
    }

    //Set Cropper Window Variables
    let popupMaxWidth     = "500px";
    let popupMaxHeight    = "800px";
    let popupSliderWidth  = "80%";
    if(this.event['cropperWindowMaxWidth']){
      popupMaxWidth = this.event['cropperWindowMaxWidth']
    }
    if(this.event['cropperWindowHeight']){
      popupMaxHeight = this.event['cropperWindowHeight']
    }
    if(this.event['cropperWindowSliderWidth']){
      popupSliderWidth = this.event['cropperWindowSliderWidth']
    }
    let STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
      ref.renderStyleSheet(SLIDER_STYLES);
      ref.renderStyleSheet(CROPPER_STYLES);
      const slider  = ref.selectorsOf(SLIDER_STYLES);
      const cropper = ref.selectorsOf(CROPPER_STYLES);
      return {
        root: lyl `{
          ${cropper.root} {
            max-width: ${popupMaxWidth}
            height: ${popupMaxHeight}
          }
        }`,
        sliderContainer: lyl `{
          position: relative
          ${slider.root} {
            width: ${popupSliderWidth}
            position: absolute
            left: 0
            right: 0
            margin: auto
            top: -32px
          }
        }`,
        slider: lyl `{
          padding: 1em
        }`
      };
    };
    this.classes = this.sRenderer.renderSheet(STYLES, 'root');
  }

  ngAfterViewInit() {
    // Load image when dialog animation has finished
    this.dialogRef.afterOpened.subscribe(() => {
      this.cropper.selectInputEvent(this.event);
    });
  } 

  onCropped(e: ImgCropperEvent) {
    console.log('cropped img: ', e);
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
    // Close the dialog if it fails
    this.dialogRef.close();
  }

  onSliderInput(event: LySliderChange) {
    this.scale = event.value as number;
  }

}