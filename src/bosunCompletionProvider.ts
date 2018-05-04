import { CompletionItemProvider, TextDocument, Position, CancellationToken, CompletionContext, CompletionList, CompletionItem, CompletionItemKind, window } from 'vscode';
import { getMetricsPaths } from './lib/openTsdb';

let suggestionsCache = new Map<string, CompletionList>();

class BosunCompletionProvider implements CompletionItemProvider {
  public async provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): Promise<CompletionList> {
    try {
      const query = getQueryString(document, position);
      if (query.length < 1) { return new CompletionList([]); }
      if (suggestionsCache.has(query)) { return <any>suggestionsCache.get(query); }

      const items = await getOpenTsdbMetricsPaths(query);

      const response = new CompletionList(items);
      suggestionsCache.set(query, response);

      return response;
    } catch (err) {
      console.error(err);
      return new CompletionList([]);
    }
  }
}

const clearCache = () => suggestionsCache = new Map<string, CompletionList>();

export { BosunCompletionProvider as default, clearCache };

const stripTypedString = (query: string, path: string): string => {
  const remaining = path.slice(query.length);

  if (remaining.indexOf('.') === -1) { return remaining; }
  return remaining.substring(0, remaining.indexOf('.'));
};

const getQueryString = (document: TextDocument, position: Position): string => {
  const { text } = document.lineAt(position.line);
  const quotedText = text.slice(0, position.character).split('"').pop() || '';
  return quotedText.split(":").pop() || '';
};

const getOpenTsdbMetricsPaths = async (query: string): Promise<CompletionItem[]> => {
  const metricsPaths = getMetricsPaths(query);

  window.setStatusBarMessage('Fetching metrics paths from OpenTSDB...', metricsPaths);

  const result = await metricsPaths;
  const paths: Set<string> = new Set(result.map((path: string): string => stripTypedString(query, path)));

  const items: CompletionItem[] = [];
  paths.forEach((path: string): void => {
    items.push(new CompletionItem(path, CompletionItemKind.Property));
  });

  return items;
};