import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'sick-leave',
    loadComponent: () => import('./features/sick-leave/sick-leave.component').then(m => m.SickLeaveComponent)
  },
  {
    path: 'education',
    loadComponent: () => import('./features/education/education.component').then(m => m.EducationComponent)
  },
  {
    path: 'education/new',
    loadComponent: () => import('./features/education/activity-form/activity-form.component').then(m => m.ActivityFormComponent)
  },
  {
    path: 'education/edit/:id',
    loadComponent: () => import('./features/education/activity-form/activity-form.component').then(m => m.ActivityFormComponent)
  },
  {
    path: 'education/:id',
    loadComponent: () => import('./features/education/activity-detail/activity-detail.component').then(m => m.ActivityDetailComponent)
  },
  {
    path: 'travel',
    loadComponent: () => import('./features/travel/travel.component').then(m => m.TravelComponent)
  },
  {
    path: 'maintenance',
    loadComponent: () => import('./features/maintenance/maintenance.component').then(m => m.MaintenanceComponent)
  },
  {
    path: 'assets',
    loadComponent: () => import('./features/asset-booking/asset-booking.component').then(m => m.AssetBookingComponent)
  },
  {
    path: 'expenses',
    loadComponent: () => import('./features/expense/expense.component').then(m => m.ExpenseComponent)
  },
  { path: '**', redirectTo: '' }
];