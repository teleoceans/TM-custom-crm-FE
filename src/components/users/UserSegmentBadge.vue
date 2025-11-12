<template>
  <component
    :is="tag"
    :type="tag === 'button' ? 'button' : undefined"
    :class="[
      'user-segment-badge',
      `user-segment-badge--${variant}`,
      { 'user-segment-badge--interactive': interactive },
    ]"
    :aria-label="ariaLabel || label"
  >
    <span class="user-segment-badge__icon" aria-hidden="true">
      <svg
        v-if="variant === 'all'"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 14C12.6863 14 10 16.6863 10 20H22C22 16.6863 19.3137 14 16 14Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 11C17.933 11 19.5 9.433 19.5 7.5C19.5 5.567 17.933 4 16 4C14.067 4 12.5 5.567 12.5 7.5C12.5 9.433 14.067 11 16 11Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 13C5.23858 13 3 15.2386 3 18.5H8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else-if="variant === 'new'"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5 14.25C17.4819 14.25 15.8075 15.6253 15.3329 17.531C15.2132 18.0084 15.5 18.5 16 18.5H23C23.5 18.5 23.7868 18.0084 23.6671 17.531C23.1925 15.6253 21.5181 14.25 19.5 14.25Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.5 12C21.433 12 23 10.433 23 8.5C23 6.567 21.433 5 19.5 5C17.567 5 16 6.567 16 8.5C16 10.433 17.567 12 19.5 12Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 14C9.23858 14 7 16.2386 7 19.5H12"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 9V13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 11H6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <slot v-else name="icon" />
    </span>
    <span class="user-segment-badge__label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "all",
  },
  label: {
    type: String,
    default: "All Users",
  },
  ariaLabel: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "button",
  },
  interactive: {
    type: Boolean,
    default: false,
  },
});

defineOptions({
  inheritAttrs: true,
});
</script>

<style scoped>
.user-segment-badge {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  min-width: 104px;
  height: 37px;
  border: 1px solid transparent;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background: transparent;
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: inherit;
}

.user-segment-badge__icon {
  display: inline-flex;
  width: 12px;
  height: 12px;
}

.user-segment-badge__label {
  display: inline-flex;
  align-items: center;
  height: 21px;
}

.user-segment-badge--all {
  background: #edebfe;
  border-color: #e5e7eb;
  color: #8d5cf3;
}

.user-segment-badge--new {
  background: #def7ec;
  border-color: #e5e7eb;
  color: #28a745;
  min-width: 117px;
}

.user-segment-badge--interactive {
  cursor: pointer;
}

:global(.dark) .user-segment-badge--all {
  background: #cabffd;
  border-color: #5521b5;
  color: #5521b5;
}

:global(.dark) .user-segment-badge--new {
  background: #def7ec;
  border-color: #e5e7eb;
  color: #28a745;
}
</style>
