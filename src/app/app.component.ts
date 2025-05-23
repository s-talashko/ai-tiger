import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-blue-900 to-black text-white">
      <!-- Header -->
      <header class="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-2xl">
                🚀
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                L9Verse
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-300">
                <div>Welcome, Space Explorer</div>
                <div class="text-xs text-cyan-400">Galactic HR Department</div>
              </div>
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                👩‍🚀
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'L9Verse';
}