export function highlightText(text, highlight) {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-orange-100">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }