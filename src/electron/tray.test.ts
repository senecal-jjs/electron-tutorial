import { expect, Mock, test, vi } from 'vitest';
import { createTray } from './tray.js';
import { BrowserWindow, Menu } from 'electron';

vi.mock('electron', () => {
  return {
    Tray: vi.fn(
        class {
            setContextMenu = vi.fn()
        }
    ),
    app: {
      getAppPath: vi.fn().mockReturnValue('/'),
      dock: {
        show: vi.fn(),
      },
      quit: vi.fn(),
    },
    Menu: {
      buildFromTemplate: vi.fn(),
    },
  };
});

const mainWindow = { 
    show: vi.fn() 
} satisfies Partial<BrowserWindow> as any as BrowserWindow;

test("tray has menu", () => {
    createTray(mainWindow)

    const calls = (Menu.buildFromTemplate as any as Mock).mock.calls
    const args = calls[0] as Parameters<typeof Menu.buildFromTemplate>
    const template = args[0]

    expect(template).toHaveLength(2)
})