import { type ReactNode, useEffect, useRef } from 'react';
import { useI18n } from './I18nContext';
import { locales } from './translations';
import { localizeContent } from './content';

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Record<string, string>>();
const localizedAttributes = ['aria-label', 'alt', 'title', 'placeholder'];

function shouldSkip(node: Node) {
  const element = node instanceof Element ? node : node.parentElement;
  return Boolean(element?.closest('script, style, code, pre, [data-no-localize]'));
}

function isKnownLocalizedValue(source: string, value: string) {
  return locales.some((item) => localizeContent(source, item) === value);
}

function updateOriginalText(node: Text) {
  const current = node.textContent ?? '';
  const source = originalText.get(node);

  if (!source) {
    originalText.set(node, current);
    return current;
  }

  if (current !== source && !isKnownLocalizedValue(source, current)) {
    originalText.set(node, current);
    return current;
  }

  return source;
}

export function ContentLocalizer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { localize, locale } = useI18n();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    function localizeTextNode(node: Text) {
      if (shouldSkip(node)) return;
      const source = updateOriginalText(node);

      const trimmed = source.trim();
      if (!trimmed) return;

      const nextText = source.replace(trimmed, localize(trimmed));
      if (node.textContent !== nextText) {
        node.textContent = nextText;
      }
    }

    function localizeElementAttributes(element: Element) {
      if (shouldSkip(element)) return;
      const originals = originalAttributes.get(element) ?? {};

      localizedAttributes.forEach((attribute) => {
        const current = element.getAttribute(attribute);
        if (!current) return;

        if (!originals[attribute]) originals[attribute] = current;
        const nextValue = localize(originals[attribute]);
        if (element.getAttribute(attribute) !== nextValue) {
          element.setAttribute(attribute, nextValue);
        }
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
        if (mutation.type === 'characterData' && mutation.target instanceof Text) {
          localizeTextNode(mutation.target);
        }
        if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          localizeElementAttributes(mutation.target);
        }
      });
    });

    observer.observe(root, { attributes: true, attributeFilter: localizedAttributes, characterData: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale, localize]);

  return <div ref={ref}>{children}</div>;
}
