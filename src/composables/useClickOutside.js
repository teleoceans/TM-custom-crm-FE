import { onBeforeUnmount, onMounted } from "vue";

const normalizeTargets = (targets) => {
  if (!Array.isArray(targets)) {
    return [targets];
  }
  return targets;
};

export function useClickOutside(targets, handler, options = {}) {
  const targetRefs = normalizeTargets(targets);
  const isEnabled = options.enabled ?? (() => true);

  const resolveElements = () =>
    targetRefs
      .map((target) => ("value" in target ? target.value : target))
      .filter((element) => element instanceof Element);

  const onClick = (event) => {
    if (!isEnabled()) {
      return;
    }

    const elements = resolveElements();
    const target = event.target;

    if (elements.some((element) => element.contains(target))) {
      return;
    }

    handler(event);
  };

  onMounted(() => {
    document.addEventListener("click", onClick, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", onClick, true);
  });
}
