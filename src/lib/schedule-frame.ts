type ScheduledFrame = (() => void) & { cancel: () => void };

/** Run work on the next animation frame, collapsing duplicate calls. */
export function scheduleFrame(callback: () => void): ScheduledFrame {
  let frame = 0;

  const schedule = (() => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      callback();
    });
  }) as ScheduledFrame;

  schedule.cancel = () => {
    if (!frame) return;
    window.cancelAnimationFrame(frame);
    frame = 0;
  };

  return schedule;
}
