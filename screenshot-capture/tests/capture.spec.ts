import { test } from '@playwright/test';
import { mkdirSync } from 'fs';

const routes = [
  { path: '/en/company/1/dashboard', name: '01-dashboard' },
  { path: '/en/company/1/quotation', name: '02-quotation' },
  { path: '/en/company/1/sales-order', name: '03-sales-order' },
  { path: '/en/company/1/sales-invoice', name: '04-sales-invoice' },
  { path: '/en/company/1/bom', name: '05-bom' },
  { path: '/en/company/1/production-order', name: '06-production-order' },
  { path: '/en/company/1/production-planning', name: '07-production-planning' },
  { path: '/en/company/1/mrp', name: '08-mrp' },
  { path: '/en/company/1/manufacturing', name: '09-manufacturing' },
  { path: '/en/company/1/wip-costing', name: '10-wip-costing' },
  { path: '/en/company/1/job-history', name: '11-job-history' },
  { path: '/en/company/1/factory-capacity', name: '12-factory-capacity' },
  { path: '/en/company/1/worker-allowance', name: '13-worker-allowance' },
  { path: '/en/company/1/worker-allowance/history', name: '14-worker-allowance-history' },
  { path: '/en/company/1/purchasing', name: '15-purchasing' },
  { path: '/en/company/1/inventory', name: '16-inventory' },
  { path: '/en/company/1/accounting', name: '17-accounting' },
  { path: '/en/users', name: '18-users' },
];

test('Capture all pages', async ({ page }) => {
  mkdirSync('screenshots', { recursive: true });
  
  for (const route of routes) {
    console.log(`Capturing ${route.name}...`);
    await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    await page.screenshot({
      path: `screenshots/${route.name}.png`,
      fullPage: true,
    });
  }
});
