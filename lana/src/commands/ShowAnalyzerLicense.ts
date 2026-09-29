/*
 * Copyright (c) 2026 Certinia Inc. All rights reserved.
 */
import { commands, Uri } from 'vscode';

import { appName } from '../AppSettings.js';
import type { Context } from '../Context.js';
import { Command } from './Command.js';

const LICENSE_URL = 'https://github.com/certinia/debug-log-analyzer/blob/main/LICENSE.txt';

export class ShowAnalyzerLicense {
  static getCommand(context: Context): Command {
    return new Command('showAnalyzerLicense', 'Log: Show Apex Log Analyzer License', () =>
      ShowAnalyzerLicense.safeCommand(context),
    );
  }

  static apply(context: Context): void {
    ShowAnalyzerLicense.getCommand(context).register(context);
    context.display.output(`Registered command '${appName}: Show Apex Log Analyzer License'`);
  }

  private static async safeCommand(context: Context): Promise<void> {
    try {
      await commands.executeCommand('vscode.open', Uri.parse(LICENSE_URL));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      context.display.showErrorMessage(`Error opening license: ${msg}`);
    }
  }
}
