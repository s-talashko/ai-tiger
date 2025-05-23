import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">{{ data.title }}</h2>
      <p class="mb-6 text-gray-300">{{ data.message }}</p>
      <div class="flex justify-end gap-4">
        <button
          (click)="onCancel()"
          class="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
        >
          {{ data.cancelText }}
        </button>
        <button
          (click)="onConfirm()"
          class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity duration-300"
        >
          {{ data.confirmText }}
        </button>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}