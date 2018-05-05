import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule { }
