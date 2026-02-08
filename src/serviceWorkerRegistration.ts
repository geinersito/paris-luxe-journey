export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("New content is available; please refresh.");
            }
          });
        }
      });

      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }

      // Check for updates every hour
      setInterval(
        () => {
          registration.update();
        },
        1000 * 60 * 60,
      );
    } catch (error) {
      // Log error but don't throw - PWA functionality is optional
      console.warn("Service worker registration failed:", error);
    }
  }
};

export const unregisterServiceWorkers = async () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((registration) => registration.unregister()),
    );

    if ("caches" in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));
    }
  } catch (error) {
    // Keep app boot resilient even if cleanup fails.
    console.warn("Service worker cleanup failed:", error);
  }
};
