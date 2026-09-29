/*
 * Copyright (c) 2026 Certinia Inc. All rights reserved.
 */
import { describe, expect, it } from '@jest/globals';

import { commands, Uri } from 'vscode';

import { createMockContext } from '../../__tests__/helpers/test-builders.js';
import { ShowAnalyzerLicense } from '../ShowAnalyzerLicense.js';

const LICENSE_URL = 'https://github.com/certinia/debug-log-analyzer/blob/main/LICENSE.txt';

describe('ShowAnalyzerLicense', () => {
  it('opens the upstream license', async () => {
    const context = createMockContext();

    await ShowAnalyzerLicense.getCommand(
      context as unknown as import('../../Context.js').Context,
    ).run();

    expect(commands.executeCommand).toHaveBeenCalledWith('vscode.open', Uri.parse(LICENSE_URL));
  });

  it('reports open failures', async () => {
    const context = createMockContext();
    (commands.executeCommand as jest.Mock).mockRejectedValueOnce(new Error('browser blocked'));

    await ShowAnalyzerLicense.getCommand(
      context as unknown as import('../../Context.js').Context,
    ).run();

    expect(context.display.showErrorMessage).toHaveBeenCalledWith(
      'Error opening license: browser blocked',
    );
  });

  it('registers the command', () => {
    const context = createMockContext();

    ShowAnalyzerLicense.apply(context as unknown as import('../../Context.js').Context);

    expect(context.context.subscriptions.length).toBe(1);
    expect(context.display.output).toHaveBeenCalledWith(
      "Registered command 'Apex Log Analyzer powered by Certinia: View Apex Log Analyzer License'",
    );
  });
});
