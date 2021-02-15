export function resizer(element, callback) {
  // create a resize observer
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      callback(width, height);
    }
  });

  resizeObserver.observe(element);
}
