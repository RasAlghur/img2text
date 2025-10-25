// src/pages/ImagePage.tsx
import React, { useState, useEffect, type JSX } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/site.css';

type LocationState = { text?: string } | null;

export default function ImagePage(): JSX.Element {
  const location = useLocation();
  const state = (location.state as LocationState) ?? null;
  const initial = state?.text ?? '';

  const [text, setText] = useState<string>(initial);
  const [status, setStatus] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  useEffect(() => {
    if (initial) setText(initial);
  }, [initial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Sending...');
    setPreviewUrl(null);
    setLoadingPreview(true);

    try {
      const resp = await fetch('http://localhost:8080/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || 'Request failed');

      const fileUrl = data?.file_url ?? null;
      if (fileUrl) {
        setPreviewUrl(fileUrl);
        setStatus('Sent ✅ Preview below');
      } else {
        setStatus('Sent ✅ (no preview available)');
      }
      setText('');
    } catch (err) {
      setStatus('Error: ' + (err || String(err)));
    } finally {
      setLoadingPreview(false);
    }
  }

  return (
    <section className="imagepage-section">
      <div className="imagepage-inner">
        <div className="imagepage-left">
          <h1 className="imagepage-title">Create your what if image</h1>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <label htmlFor="whatif" className="sr-only">What if?</label>
              <textarea
                id="whatif"
                className="form-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your anonymous what if here..."
                rows={8}
              />

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={!text.trim() || loadingPreview}
                  className="submit-btn"
                >
                  {loadingPreview ? 'sending...' : 'send whatif'}
                </button>

                <button
                  type="button"
                  onClick={() => setText('')}
                  className="clear-btn"
                >
                  Clear
                </button>

                <div className="status" aria-live="polite">{status}</div>
              </div>
            </form>
          </div>
        </div>

        <aside className="imagepage-right">
          <div className="preview-card">
            <div className="preview-header">Preview</div>
            <div className="preview-body">
              {loadingPreview && <div className="preview-placeholder">Generating image…</div>}

              {!loadingPreview && previewUrl && (
                <img src={previewUrl} alt="Generated preview" className="generated-preview" />
              )}

              {!loadingPreview && !previewUrl && (
                <div className="preview-placeholder">
                  Your generated image will appear in the Telegram feed.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
