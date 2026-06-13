// components/common/StatusToggle.tsx

interface StatusToggleProps {
  isActive: boolean;
  loading?: boolean;
  onToggle: () => Promise<void> | void;
}

export function StatusToggle({ isActive, loading = false, onToggle }: StatusToggleProps) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onToggle}
      className={`
        relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 cursor-pointer
        ${isActive ? "bg-green-500" : "bg-red-500"}
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <span
        className={`
          inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300
          ${isActive ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
}
