import { test, expect } from '@playwright/test';

test.describe('Document Lifecycle E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard. 
    // Note: The app must be running on this URL.
    await page.goto('http://localhost:5173');
  });

  test('should complete full document lifecycle', async ({ page }) => {
    const docName = `Test Doc ${Date.now()}`;
    const newName = `Updated ${docName}`;
    const cabinetId = 'cab-test-123';

    // 1. Create a document
    await page.getByRole('button', { name: /Новый документ/i }).click();
    await page.getByLabel(/Название/i).fill(docName);
    await page.getByRole('button', { name: /Создать/i }).click();
    await expect(page.getByText(docName)).toBeVisible();

    // 2. View details
    await page.getByText(docName).click();
    await expect(page.getByText(docName)).toBeVisible();

    // 3. Edit document
    await page.getByRole('button', { name: /Редактировать/i }).click();
    await page.getByLabel(/Название/i).fill(newName);
    await page.getByRole('button', { name: /Сохранить/i }).click();
    await expect(page.getByText(newName)).toBeVisible();

    // 4. Move document
    await page.getByRole('button', { name: /Переместить/i }).click();
    // Handle the prompt for cabinet ID
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('button', { name: /Переместить/i }).click(); // Re-click if first one closed modal
    const dialog = await dialogPromise;
    await dialog.accept(cabinetId);
    
    // Check if document is still in main list (it should be, but in a cabinet)
    // In our implementation, Dashboard shows all documents.
    await expect(page.getByText(newName)).toBeVisible();

    // 5. Delete document
    await page.getByRole('button', { name: /Удалить/i }).click();
    // Handle confirmation dialog
    const confirmDialog = await page.waitForEvent('dialog');
    await confirmDialog.accept();

    // 6. Check Trash
    await expect(page.getByText(/Корзина/i)).toBeVisible();
    // The document should appear in the trash section
    await expect(page.getByText(newName)).toBeVisible();
  });
});
