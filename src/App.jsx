import { useEffect, useMemo, useState } from 'react';
import { toSentenceCase, toSlug, toTitleCase } from './transforms.js';
import './styles.css';

const EXAMPLE = 'Online casinos España';

const OUTPUTS = [
  {
    id: 'slug',
    label: 'Slug',
    hint: 'Lowercase, spaces become hyphens, accents and symbols removed',
    convert: toSlug,
  },
  {
    id: 'title',
    label: 'Title case',
    hint: 'Hyphens become spaces, each word starts with a capital',
    convert: toTitleCase,
  },
  {
    id: 'sentence',
    label: 'Sentence case',
    hint: 'Hyphens become spaces, only the first word is capitalized',
    convert: toSentenceCase,
  },
];

export default function App() {
  const [value, setValue] = useState(EXAMPLE);
  const [copiedId, setCopiedId] = useState(null);
  const results = useMemo(
    () => OUTPUTS.map((item) => ({ ...item, text: item.convert(value) })),
    [value],
  );

  useEffect(() => {
    if (!copiedId) return undefined;
    const timeoutId = window.setTimeout(() => setCopiedId(null), 1500);
    return () => window.clearTimeout(timeoutId);
  }, [copiedId]);

  function copyLabel(id) {
    if (copiedId === id) return 'Copied';
    if (copiedId === `${id}-failed`) return 'Copy failed';
    return 'Copy';
  }

  async function copyResult(id, text) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
    } catch {
      setCopiedId(`${id}-failed`);
    }
  }

  return (
    <main className="converterPage">
      <header className="converterHeader">
        <p className="converterEyebrow">Text tool</p>
        <h1>Case Converter</h1>
        <p className="converterLead">
          Turn a title into a slug, or a slug back into readable text.
        </p>
      </header>

      <label className="sourceField">
        <span className="sourceFieldLabel">Source text</span>
        <textarea
          className="sourceTextarea"
          value={value}
          rows={4}
          spellCheck={false}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>

      <div className="sourceActions">
        <button type="button" className="tryExampleButton" onClick={() => setValue(EXAMPLE)}>
          Try example
        </button>
        <button type="button" className="clearSourceButton" onClick={() => setValue('')}>
          Clear
        </button>
      </div>

      <section className="resultList" aria-live="polite">
        {results.map((result) => (
          <article key={result.id} className="resultCard">
            <div className="resultCardHeader">
              <h2>{result.label}</h2>
              <button
                type="button"
                className="copyResultButton"
                disabled={!result.text}
                onClick={() => copyResult(result.id, result.text)}
              >
                {copyLabel(result.id)}
              </button>
            </div>
            <p className="resultHint">{result.hint}</p>
            <p className={`resultText${result.text ? '' : ' resultTextEmpty'}`}>
              {result.text || 'Nothing to convert yet'}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
