"use client";

export function SelectAllCheckbox() {
  return (
    <input
      type="checkbox"
      aria-label="Alle auswählen"
      onChange={(event) => {
        const checked = event.currentTarget.checked;
        document
          .querySelectorAll<HTMLInputElement>('input[name="ids"]')
          .forEach((checkbox) => {
            checkbox.checked = checked;
          });
      }}
      className="h-4 w-4 accent-ink"
    />
  );
}
