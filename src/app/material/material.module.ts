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
    MatInputModule
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
        MatInputModule
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
        MatInputModule
    ]
})
export class MaterialModule { }
