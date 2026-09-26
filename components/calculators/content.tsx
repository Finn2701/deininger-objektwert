import type { ReactNode } from "react";

export function SectionH2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-2xl leading-[1.2] font-medium text-ink md:text-3xl">{children}</h2>;
}

export function DataTable({
  headers,
  rows,
  highlightRow,
}: {
  headers: string[];
  rows: (string | number)[][];
  highlightRow?: number;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-paper-dim text-xs tracking-[0.1em] text-ink-soft/80 uppercase">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, i) => (
            <tr key={i} className={i === highlightRow ? "bg-paper-dim" : undefined}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? "text-ink" : "text-ink-soft"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
