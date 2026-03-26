<script setup lang="ts">
import { computed } from "vue";

const USER_AVATAR_BASE_SIZE = 36;

const props = withDefaults(
  defineProps<{
    size?: number;
  }>(),
  {
    size: 36,
  },
);

const avatarStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}));

const clipId = computed(() => `mi-user-avatar-clip-${props.size}`);
const radius = USER_AVATAR_BASE_SIZE / 2;
</script>

<template>
  <div class="mi-user-avatar" :style="avatarStyle" aria-hidden="true">
    <svg
      class="mi-user-avatar__svg"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      :viewBox="`0 0 ${USER_AVATAR_BASE_SIZE} ${USER_AVATAR_BASE_SIZE}`"
    >
      <g :clip-path="`url(#${clipId})`">
        <rect
          :width="USER_AVATAR_BASE_SIZE"
          :height="USER_AVATAR_BASE_SIZE"
          :rx="radius"
          fill="var(--mi-color-base-generic)"
        />
        <path
          d="M24.3333 29.9245C26.8337 28.5943 27.1897 25.1083 24.7351 23.6954C23.4138 22.9348 21.8816 22.5 20.25 22.5H15.75C14.1161 22.5 12.582 22.936 11.2594 23.6986C8.80849 25.1117 9.16209 28.5939 11.6593 29.9235C13.5499 30.9302 15.7078 31.5 18 31.5C20.2892 31.5 22.4445 30.9294 24.3333 29.9245Z"
          fill="var(--mi-color-text-hint)"
        />
        <path
          d="M18 19.125C20.7984 19.125 23.0625 16.8609 23.0625 14.0625C23.0625 11.2641 20.7984 9 18 9C15.2016 9 12.9375 11.2641 12.9375 14.0625C12.9375 16.8609 15.2016 19.125 18 19.125Z"
          fill="var(--mi-color-text-hint)"
        />
      </g>
      <defs>
        <clipPath :id="clipId">
          <rect
            :width="USER_AVATAR_BASE_SIZE"
            :height="USER_AVATAR_BASE_SIZE"
            :rx="radius"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.mi-user-avatar {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.mi-user-avatar__svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
