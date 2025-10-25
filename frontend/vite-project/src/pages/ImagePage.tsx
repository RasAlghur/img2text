// src/pages/ImagePage.tsx
import React, { useState, useEffect, type JSX } from "react";
import { useLocation } from "react-router-dom";

type LocationState = { text?: string } | null;

export default function ImagePage(): JSX.Element {
  const location = useLocation();
  const state = (location.state as LocationState) ?? null;
  const initial = state?.text ?? "";

  const [text, setText] = useState<string>(initial);
  const [status, setStatus] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  useEffect(() => {
    if (initial) setText(initial);
  }, [initial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Sending...");
    setPreviewUrl(null);
    setLoadingPreview(true);

    try {
      const resp = await fetch("http://localhost:8080/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error || "Request failed");

      const fileUrl = data?.file_url ?? null;
      if (fileUrl) {
        setPreviewUrl(fileUrl);
        setStatus("Sent ✅ Preview below");
      } else {
        setStatus("Sent ✅ (no preview available)");
      }
      setText("");
    } catch (err) {
      setStatus("Error: " + (err || String(err)));
    } finally {
      setLoadingPreview(false);
    }
  }

  return (
    <section className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Create your{" "}
                <span className="text-black font-extrabold">what if</span> image
              </h1>
              <p className="text-gray-600 text-lg">
                Share your anonymous thoughts and turn them into visual stories
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Textarea */}
                <div>
                  <label htmlFor="whatif" className="sr-only">
                    What if?
                  </label>
                  <textarea
                    id="whatif"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your anonymous what if here..."
                    rows={8}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-3 w-full sm:w-auto">
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!text.trim() || loadingPreview}
                      className="flex-1 sm:flex-none px-6 py-3 bg-black text-white font-semibold rounded-xl border-2 border-black hover:bg-gray-800 hover:border-gray-800 hover:scale-105 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 shadow-sm"
                    >
                      {loadingPreview ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send WhatIf"
                      )}
                    </button>

                    {/* Clear Button */}
                    <button
                      type="button"
                      onClick={() => setText("")}
                      className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Status */}
                  <div
                    className={`text-sm font-medium min-h-5 ${
                      status.includes("Error")
                        ? "text-red-600"
                        : status.includes("Sent")
                        ? "text-green-600"
                        : "text-gray-600"
                    } transition-colors duration-200`}
                    aria-live="polite"
                  >
                    {status}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Preview */}
          <aside className="space-y-8">
            {/* Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit">
              <div className="space-y-4">
                {/* Preview Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Your generated image will appear here
                  </p>
                </div>

                {/* Preview Body */}
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-8 min-h-[400px] flex items-center justify-center">
                  {loadingPreview && (
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 border-3 border-gray-400 border-t-black rounded-full animate-spin mx-auto"></div>
                      <p className="text-gray-700 font-medium">
                        Generating your image...
                      </p>
                      <p className="text-gray-500 text-sm">
                        This may take a few moments
                      </p>
                    </div>
                  )}

                  {!loadingPreview && previewUrl && (
                    <div className="space-y-4 w-full">
                      <img
                        src={previewUrl}
                        alt="Generated preview"
                        className="w-full rounded-lg shadow-md border border-gray-200"
                      />
                      <div className="text-center">
                        <p className="text-green-600 font-medium">
                          ✓ Image generated successfully!
                        </p>
                        <p className="text-gray-600 text-sm">
                          Also shared to Telegram feed
                        </p>
                      </div>
                    </div>
                  )}

                  {!loadingPreview && !previewUrl && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-xl border border-gray-300 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          No preview yet
                        </p>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">
                          Your generated image will appear here and in the
                          Telegram feed
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  How it works
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-black font-semibold mt-0.5">•</span>
                    Write your anonymous "what if" scenario
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black font-semibold mt-0.5">•</span>
                    AI transforms it into a visual story
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black font-semibold mt-0.5">•</span>
                    Preview your image and share to Telegram
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-black font-semibold mt-0.5">•</span>
                    100% anonymous and secure
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
