let lockCount = 0;
let lockedScrollY = 0;

let restoreStyles: {
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyWidth: string;
  bodyTouchAction: string;
  bodyOverscrollBehavior: string;
  htmlOverflow: string;
  htmlTouchAction: string;
  htmlOverscrollBehavior: string;
} | null = null;

function applyBodyScrollLock() {
  const { body, documentElement } = document;

  lockedScrollY = window.scrollY || window.pageYOffset || 0;
  restoreStyles = {
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyWidth: body.style.width,
    bodyTouchAction: body.style.touchAction,
    bodyOverscrollBehavior: body.style.overscrollBehavior,
    htmlOverflow: documentElement.style.overflow,
    htmlTouchAction: documentElement.style.touchAction,
    htmlOverscrollBehavior: documentElement.style.overscrollBehavior,
  };

  documentElement.style.overflow = "hidden";
  documentElement.style.touchAction = "none";
  documentElement.style.overscrollBehavior = "none";

  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${lockedScrollY}px`;
  body.style.width = "100%";
  body.style.touchAction = "none";
  body.style.overscrollBehavior = "none";
}

function releaseBodyScrollLock() {
  const { body, documentElement } = document;

  if (restoreStyles) {
    body.style.overflow = restoreStyles.bodyOverflow;
    body.style.position = restoreStyles.bodyPosition;
    body.style.top = restoreStyles.bodyTop;
    body.style.width = restoreStyles.bodyWidth;
    body.style.touchAction = restoreStyles.bodyTouchAction;
    body.style.overscrollBehavior = restoreStyles.bodyOverscrollBehavior;

    documentElement.style.overflow = restoreStyles.htmlOverflow;
    documentElement.style.touchAction = restoreStyles.htmlTouchAction;
    documentElement.style.overscrollBehavior = restoreStyles.htmlOverscrollBehavior;
  }

  window.scrollTo(0, lockedScrollY);
  restoreStyles = null;
}

export function lockBodyScroll() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return () => {};
  }

  lockCount += 1;
  if (lockCount === 1) {
    applyBodyScrollLock();
  }

  let isReleased = false;

  return () => {
    if (isReleased) return;
    isReleased = true;

    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      releaseBodyScrollLock();
    }
  };
}
