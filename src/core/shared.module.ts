import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [],
})
export class SharedModule {}
