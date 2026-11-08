import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

if (existsSync('.env')) {
  process.loadEnvFile();
}

export default defineConfig({
  testDir: './tests',
  // The public demo site is shared and protected by Cloudflare, so keep the traffic low.
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    ...devices['Desktop Chrome'],
    // The trailing slash matters: page paths such as 'register.htm' resolve against it.
    baseURL: 'https://parabank.parasoft.com/parabank/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'chromium', dependencies: ['setup'] },
  ],
});
