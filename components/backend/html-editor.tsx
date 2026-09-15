"use client";

import { useRef, useState } from "react";

function ToolbarButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-soft hover:text-ink"
    >
      {label}
    </button>
  );
}

// Bewusst kein externes Rich-Text-Editor-Paket: ein einfaches contentEditable
// mit execCommand deckt die paar Formate ab, die ein Ratgeber-Artikel braucht
// (Überschriften, Absätze, Fett, Liste, Link) — mit Umschalter auf rohes HTML
// für alles, was darüber hinausgeht.
export function HtmlEditor({ name, defaultValue }: { name: string; defaultValue: string }) {
  const [mode, setMode] = useState<"visual" | "html">("visual");
  // `html` ist der für den Hidden-Input maßgebliche Wert. `visualSeed` speist
  // NUR den initialen Inhalt des contentEditable-Divs und ändert sich absichtlich
  // nicht bei jedem Tastendruck — sonst würde React bei jedem Zeichen das
  // innerHTML neu setzen und den Cursor an den Anfang zurückspringen lassen.
  const [html, setHtml] = useState(defaultValue);
  const [visualSeed, setVisualSeed] = useState(defaultValue);
  const editableRef = useRef<HTMLDivElement>(null);

  function exec(command: string, value?: string) {
    editableRef.current?.focus();
    document.execCommand(command, false, value);
    syncFromEditable();
  }

  function syncFromEditable() {
    if (editableRef.current) setHtml(editableRef.current.innerHTML);
  }

  return (
    <div className="rounded-lg border border-line">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line bg-paper-dim p-2">
        <ToolbarButton label="H2" onClick={() => exec("formatBlock", "h2")} />
        <ToolbarButton label="H3" onClick={() => exec("formatBlock", "h3")} />
        <ToolbarButton label="Absatz" onClick={() => exec("formatBlock", "p")} />
        <ToolbarButton label="Fett" onClick={() => exec("bold")} />
        <ToolbarButton label="Kursiv" onClick={() => exec("italic")} />
        <ToolbarButton label="Liste" onClick={() => exec("insertUnorderedList")} />
        <ToolbarButton
          label="Link"
          onClick={() => {
            const url = window.prompt("Link-URL:");
            if (url) exec("createLink", url);
          }}
        />
        <div className="ml-auto flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (mode === "visual") {
                syncFromEditable();
                setMode("html");
              } else {
                setVisualSeed(html);
                setMode("visual");
              }
            }}
            className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-soft hover:text-ink"
          >
            {mode === "visual" ? "HTML-Quellcode" : "Zur Vorschau"}
          </button>
        </div>
      </div>

      {mode === "visual" ? (
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={syncFromEditable}
          onBlur={syncFromEditable}
          dangerouslySetInnerHTML={{ __html: visualSeed }}
          className="prose-article min-h-[300px] max-w-none px-4 py-3 outline-none"
        />
      ) : (
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={16}
          className="w-full px-4 py-3 font-mono text-xs text-ink outline-none"
        />
      )}

      <input type="hidden" name={name} value={html} />
    </div>
  );
}
