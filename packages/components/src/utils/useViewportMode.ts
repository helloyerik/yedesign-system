import { onBeforeUnmount, onMounted, ref } from "vue";

const MOBILE_MAX_WIDTH = 767;

export function useIsMobileViewport() {
  const isMobile = ref(false);

  const sync = () => {
    if (typeof window === "undefined") return;
    isMobile.value = window.innerWidth <= MOBILE_MAX_WIDTH;
  };

  onMounted(() => {
    sync();
    window.addEventListener("resize", sync);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", sync);
  });

  return { isMobile };
}
