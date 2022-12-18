import { ExtensionContext, languages, workspace } from 'coc.nvim';
import { CSSClassCompletionProvider } from './completion';
import { ExtensionName } from './constants';

export async function activate(context: ExtensionContext): Promise<void> {
  const cfg = workspace.getConfiguration(ExtensionName);
  if (cfg.get<boolean>('enabled', false) === false) {
    return;
  }

  const enabledLanguages = cfg.get<string[]>('languages', ['html']);
  context.logger.info(`Activating ${ExtensionName} for ${enabledLanguages.join(',')}`);
  const provider = new CSSClassCompletionProvider(context);

  context.subscriptions.push(
    languages.registerCompletionItemProvider('coc-class-css', 'CCC', enabledLanguages, provider),
    provider
  );
}

export function deactivate() {}
