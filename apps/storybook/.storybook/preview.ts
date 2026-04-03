import "../../../packages/tokens/src/tokens.css";
import "../../../packages/tokens/src/storybook.css";
import type { Preview } from "@storybook/vue3-vite";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";

function isLocalhostHost() {
  if (typeof window === "undefined") return false;

  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

const shouldEnableAgentation = import.meta.env.DEV && isLocalhostHost();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "var(--mi-color-base-background)" },
        { name: "surface", value: "var(--mi-color-surface-muted)" },
        { name: "dark", value: "#111111" },
      ],
    },
    layout: "fullscreen",
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (story, context) => {
      const storyResult = story();

      return {
        components: {
          Story: storyResult,
          StoryWithAgentation: defineComponent({
            name: "StoryWithAgentation",
            setup() {
              const agentationRoot = ref<HTMLElement | null>(null);
              const storyRoot = ref<HTMLElement | null>(null);
              let reactRoot: { unmount: () => void } | null = null;
              let observer: MutationObserver | null = null;

              const replaceImagesWithSkeletons = () => {
                if (!storyRoot.value) return;

                const images = storyRoot.value.querySelectorAll<HTMLImageElement>("img:not([data-sb-skeletonized])");
                images.forEach((img) => {
                  const rect = img.getBoundingClientRect();
                  const computed = window.getComputedStyle(img);
                  const width = rect.width || parseFloat(computed.width) || img.width || 0;
                  const height = rect.height || parseFloat(computed.height) || img.height || 0;
                  if (!width || !height) return;

                  const skeleton = document.createElement("div");
                  skeleton.className = "sb-image-skeleton";
                  skeleton.dataset.sbSkeleton = "true";
                  skeleton.style.width = `${width}px`;
                  skeleton.style.height = `${height}px`;
                  skeleton.style.borderRadius = computed.borderRadius;
                  skeleton.style.display = computed.display === "inline" ? "inline-block" : computed.display;
                  skeleton.style.flex = computed.flex;
                  skeleton.style.alignSelf = computed.alignSelf;

                  img.dataset.sbSkeletonized = "true";
                  img.replaceWith(skeleton);
                });
              };

              onMounted(async () => {
                replaceImagesWithSkeletons();
                if (storyRoot.value) {
                  observer = new MutationObserver(() => {
                    replaceImagesWithSkeletons();
                  });
                  observer.observe(storyRoot.value, { childList: true, subtree: true });
                }

                if (!shouldEnableAgentation || !agentationRoot.value) return;

                const [{ Agentation }, { createElement }, { createRoot }] =
                  await Promise.all([
                    import("agentation"),
                    import("react"),
                    import("react-dom/client"),
                  ]);

                if (!agentationRoot.value) return;

                reactRoot = createRoot(agentationRoot.value);
                reactRoot.render(createElement(Agentation));
              });

              onBeforeUnmount(() => {
                observer?.disconnect();
                reactRoot?.unmount();
              });

              return () =>
                h("div", { class: "sb-frame__story" }, [
                  h("div", {
                    ref: (value) => {
                      storyRoot.value = value as HTMLElement | null;
                    },
                  }, [h(storyResult)]),
                  h("div", {
                    ref: (value) => {
                      agentationRoot.value = value as HTMLElement | null;
                    },
                  }),
                ]);
            },
          }),
        },
        setup() {
          const theme = context.globals.theme;
          document.documentElement.dataset.theme = theme;
          document.body.dataset.theme = theme;
          return { shouldEnableAgentation, theme };
        },
        template:
          '<div class="sb-frame" :data-theme="theme"><StoryWithAgentation v-if="shouldEnableAgentation" /><Story v-else /></div>',
      };
    },
  ],
};

export default preview;
