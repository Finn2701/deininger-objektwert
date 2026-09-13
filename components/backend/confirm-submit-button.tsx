"use client";

export function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { confirmMessage: string }) {
  return (
    <button
      {...props}
      className={className}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
