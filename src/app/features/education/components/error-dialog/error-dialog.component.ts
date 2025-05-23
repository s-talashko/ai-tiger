import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

export interface ErrorDialogData {
  message: string;
}

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4 text-red-400">Error</h2>
      <p class="mb-6 text-gray-300">{{ data.message }}</p>
      <div class="flex justify-end">
        <button
          (click)="onClose()"
          class="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  `
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}