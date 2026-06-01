// Build a compact list of page tokens like [1, '...', 4, 5, 6, '...', 12]
export function buildPageTokens(current, total) {
  if (total <= 1) return [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const tokens = [];
  const windowSize = 1;
  const left = Math.max(2, current - windowSize);
  const right = Math.min(total - 1, current + windowSize);

  tokens.push(1);
  if (left > 2) tokens.push('...');
  for (let i = left; i <= right; i += 1) tokens.push(i);
  if (right < total - 1) tokens.push('...');
  tokens.push(total);

  return tokens;
}

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M8.5 2.5L4.5 7L8.5 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M5.5 2.5L9.5 7L5.5 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronsLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M10 2.5L6 7L10 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 2.5L1 7L5 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronsRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M4 2.5L8 7L4 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 2.5L13 7L9 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasPrev,
  hasNext,
  size = 'md',
}) {
  const tokens = buildPageTokens(currentPage, totalPages);

  const sizing =
    size === 'sm'
      ? 'min-w-7 h-7 px-1.5 text-[12px] rounded-[6px]'
      : 'min-w-9 h-9 px-2 text-sm rounded-[8px]';

  const baseBtn = `${sizing} border font-semibold flex items-center justify-center transition-all duration-200`;
  const navBtn = `${baseBtn} border-[#e5e5e6] text-[#4a5565] hover:bg-[#f9fafb] hover:border-[#00bc96]/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[#e5e5e6]`;

  return (
    <nav
      dir="rtl"
      className="flex items-center justify-center gap-1.5 flex-wrap"
      aria-label="ترقيم الصفحات"
    >
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={!hasPrev}
        className={navBtn}
        aria-label="الصفحة الأولى"
        title="الأولى"
      >
        <ChevronsRightIcon />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={!hasPrev}
        className={navBtn}
        aria-label="الصفحة السابقة"
        title="السابق"
      >
        <ChevronRightIcon />
      </button>

      {tokens.map((token, idx) =>
        token === '...' ? (
          <span
            key={`dots-${idx}`}
            className={`${sizing} flex items-center justify-center text-[#99a1af] select-none`}
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            type="button"
            key={token}
            onClick={() => onPageChange(token)}
            aria-current={token === currentPage ? 'page' : undefined}
            className={`${baseBtn} ${
              token === currentPage
                ? 'bg-[#00bc96] border-[#00bc96] text-white shadow-sm'
                : 'border-[#e5e5e6] text-[#4a5565] hover:bg-[#f9fafb] hover:border-[#00bc96]/40'
            }`}
          >
            {token}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={!hasNext}
        className={navBtn}
        aria-label="الصفحة التالية"
        title="التالي"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={!hasNext}
        className={navBtn}
        aria-label="الصفحة الأخيرة"
        title="الأخيرة"
      >
        <ChevronsLeftIcon />
      </button>
    </nav>
  );
}
