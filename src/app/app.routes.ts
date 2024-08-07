import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OldStudentsComponent } from './old-students/old-students.component';

// Export the routes
export const routes: Routes = [
  
  { path: 'old-students', component: OldStudentsComponent }
];
