import { type ReactNode, useEffect, useRef } from 'react';
import { useI18n } from './I18nContext';

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Record<string, string>>();
const localizedAttributes = ['aria-label', 'alt', 'title', 'placeholder'];

function shouldSkip(node: Node) {
  const element = node instanceof Element ? node : node.parentElement;
  return Boolean(element?.closest('script, style, code, pre, [data-no-localize]'));
}

export function ContentLocalizer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { localize, locale } = useI18n();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    function localizeTextNode(node: Text) {
      if (shouldSkip(node)) return;
      const source = originalText.get(node) ?? node.textContent ?? '';
      if (!originalText.has(node)) originalText.set(node, source);

      const trimmed = source.trim();
      if (!trimmed) return;

      node.textContent = source.replace(trimmed, localize(trimmed));
    }

    function localizeElementAttributes(element: Element) {
      if (shouldSkip(element)) return;
      const originals = originalAttributes.get(element) ?? {};

      localizedAttributes.forEach((attribute) => {
        const current = element.getAttribute(attribute);
        if (!current) return;

        if (!originals[attribute]) originals[attribute] = current;
        element.setAttribute(attribute, localize(originals[attribute]));
      });

      if (Object.keys(originals).length > 0 && !originalAttributes.has(element)) {
        originalAttributes.set(element, originals);
      }
    }

    function localizeTree(target: ParentNode) {
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        localizeTextNode(node as Text);
        node = walker.nextNode();
      }

      if (target instanceof Element) localizeElementAttributes(target);
      target.querySelectorAll?.('*').forEach(localizeElementAttributes);
    }

    localizeTree(root);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Text) localizeTextNode(node);
          if (node instanceof Element) localizeTree(node);
        });
      });
    });

    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale, localize]);

  return <div ref={ref}>{children}</div>;
}
