import React, { useState, useEffect, type JSX } from "react";
import { useLocation } from "react-router-dom";

type LocationState = { text?: string } | null;

// Validation function
const validateText = (text: string): { isValid: boolean; message: string } => {
  const trimmedText = text.trim().toLowerCase();

  if (!trimmedText) {
    return { isValid: false, message: "Please enter your what if scenario" };
  }

  if (!trimmedText.includes("what if")) {
    return {
      isValid: false,
      message: "Your scenario must contain 'what if' (case insensitive)",
    };
  }

  if (trimmedText.length < 10) {
    return {
      isValid: false,
      message:
        "Please provide a more detailed scenario (minimum 10 characters)",
    };
  }

  return { isValid: true, message: "" };
};

export default function ImagePage(): JSX.Element {
  const location = useLocation();
  const state = (location.state as LocationState) ?? null;
  const initial = state?.text ?? "";

  const [text, setText] = useState<string>(initial);
  const [status, setStatus] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (initial) setText(initial);
  }, [initial]);

  // Real-time validation as user types
  useEffect(() => {
    if (text.trim()) {
      const validation = validateText(text);
      setValidationError(validation.isValid ? "" : validation.message);
    } else {
      setValidationError("");
    }
  }, [text]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate before submitting
    const validation = validateText(text);
    if (!validation.isValid) {
      setStatus(`Error: ${validation.message}`);
      return;
    }

    setStatus("Sending...");
    setPreviewUrl(null);
    setLoadingPreview(true);

    try {
      const SERVER_API = import.meta.env.VITE_API_URL as string;
      const resp = await fetch(`${SERVER_API}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        // Handle backend validation errors
        if (data?.error?.includes("what if")) {
          throw new Error(data.error);
        }
        throw new Error(data?.error || "Request failed");
      }

      const fileUrl = data?.file_url ?? null;
      if (fileUrl) {
        setPreviewUrl(fileUrl);
        setStatus("Sent ✅ Preview below");
      } else {
        setStatus("Sent ✅ (no preview available)");
      }
      setText("");
      setValidationError("");
    } catch (err) {
      setStatus("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoadingPreview(false);
    }
  }

  const isFormValid = validateText(text).isValid;

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
                <div className="space-y-2">
                  <label htmlFor="whatif" className="sr-only">
                    What if?
                  </label>
                  <textarea
                    id="whatif"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What if I could change the world with crypto?..."
                    rows={8}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                      validationError && text.trim()
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-300 focus:border-black focus:ring-black/10"
                    }`}
                  />

                  {/* Validation Message */}
                  {validationError && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Help Text */}
                  {!validationError && text.trim() && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Looking good! Your scenario contains "what if"
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-3 w-full sm:w-auto">
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!isFormValid || loadingPreview}
                      className="px-6 py-3 bg-[#00C46C] text-white font-semibold rounded-full
    hover:opacity-90 disabled:bg-gray-300 transition shadow-sm"
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
                      onClick={() => {
                        setText("");
                        setValidationError("");
                      }}
                      className="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Status */}
                  <div
                    className={`text-sm font-medium min-h-5 ${status.includes("Error")
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
