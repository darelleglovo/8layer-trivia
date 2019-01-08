import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TriviaComponent } from '../../trivia/trivia.component';
import { AddTriviaModal } from '../../modals/add-trivia-modal/add-trivia-modal.component';



import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatIconModule,
  MatChipsModule,
  MatDividerModule,
  MatCardModule,
  MatExpansionModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TriviaComponent,
    AddTriviaModal
  ],
  entryComponents: [
    AddTriviaModal,
  ],
})


export class AdminLayoutModule {}