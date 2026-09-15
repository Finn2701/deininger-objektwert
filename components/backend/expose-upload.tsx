"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { exposeCategories } from "@/lib/expose-categories";
import {
  recordProjectImage,
  deleteProjectImage,
  recordProjectDocument,
  deleteProjectDocument,
} from "@/app/backend/expose-actions";

type ImageItem = { id: string; category: string; storagePath: string; url: string | null };
type DocumentItem = { id: string; filename: string; storagePath: string; url: string | null };

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function CategorySlot({
  projectId,
  category,
  label,
  images,
  onChanged,
}: {
  projectId: string;
  category: string;
  label: string;
  images: ImageItem[];
  onChanged: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    const supabase = createClient();
    for (const file of Array.from(fileList)) {
      const path = `${projectId}/images/${category}/${crypto.randomUUID()}-${safeName(file.name)}`;
      const { error } = await supabase.storage.from("project-media").upload(path, file, { contentType: file.type });
      if (!error) await recordProjectImage(projectId, category, path);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    onChanged();
  }

  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-xs font-medium text-ink-soft">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {images.map((image) => (
          <div key={image.id} className="group relative h-16 w-16 overflow-hidden rounded-lg border border-line">
            {image.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            ) : null}
            <button
              type="button"
              onClick={async () => {
                await deleteProjectImage(image.id, projectId, image.storagePath);
                onChanged();
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              Entfernen
            </button>
          </div>
        ))}
        <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border border-dashed border-line text-xs text-ink-soft/60 hover:text-ink">
          {uploading ? "…" : "+"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
}

function DocumentUpload({
  projectId,
  documents,
  onChanged,
}: {
  projectId: string;
  documents: DocumentItem[];
  onChanged: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    const supabase = createClient();
    for (const file of Array.from(fileList)) {
      const path = `${projectId}/documents/${crypto.randomUUID()}-${safeName(file.name)}`;
      const { error } = await supabase.storage.from("project-media").upload(path, file, { contentType: file.type });
      if (!error) await recordProjectDocument(projectId, file.name, path);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    onChanged();
  }

  return (
    <div className="rounded-xl border border-line p-3">
      <p className="text-xs font-medium text-ink-soft">
        Sonstige Dokumente (Energieausweis, Grundriss-PDF, Baubeschreibung …)
      </p>
      <div className="mt-2 space-y-1.5">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between gap-2 text-sm">
            {doc.url ? (
              <a href={doc.url} target="_blank" rel="noreferrer" className="truncate text-ink-soft hover:text-ink">
                {doc.filename}
              </a>
            ) : (
              <span className="truncate text-ink-soft">{doc.filename}</span>
            )}
            <button
              type="button"
              onClick={async () => {
                await deleteProjectDocument(doc.id, projectId, doc.storagePath);
                onChanged();
              }}
              className="shrink-0 text-xs text-ink-soft/50 hover:text-red-600"
            >
              Entfernen
            </button>
          </div>
        ))}
      </div>
      <label className="mt-3 inline-block cursor-pointer rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft hover:text-ink">
        {uploading ? "Lädt hoch…" : "+ Dokument hochladen"}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
    </div>
  );
}

export function ExposeUpload({
  projectId,
  images,
  documents,
}: {
  projectId: string;
  images: ImageItem[];
  documents: DocumentItem[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function onChanged() {
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {exposeCategories.map((category) => (
          <CategorySlot
            key={category.value}
            projectId={projectId}
            category={category.value}
            label={category.label}
            images={images.filter((i) => i.category === category.value)}
            onChanged={onChanged}
          />
        ))}
      </div>
      <DocumentUpload projectId={projectId} documents={documents} onChanged={onChanged} />
    </div>
  );
}
