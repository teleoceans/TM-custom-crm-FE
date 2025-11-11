const iconLoaders = Object.freeze({
  "lead-stage-user": () => import("./icons/lead-stage-user.js"),
  "chevron-down-small": () => import("./icons/chevron-down-small.js"),
  check: () => import("./icons/check.js"),
  "lead-detail-name": () => import("./icons/lead-detail-name.js"),
  "lead-detail-phone": () => import("./icons/lead-detail-phone.js"),
  "lead-detail-email": () => import("./icons/lead-detail-email.js"),
  "lead-detail-address": () => import("./icons/lead-detail-address.js"),
  "lead-detail-value": () => import("./icons/lead-detail-value.js"),
});

const definitionCache = new Map();

export const LEAD_ICON_NAMES = Object.freeze(Object.keys(iconLoaders));

export function hasLeadIcon(name) {
  return (
    typeof name === "string" &&
    Object.prototype.hasOwnProperty.call(iconLoaders, name)
  );
}

function normalizeIcon(rawIcon, name) {
  if (!rawIcon || typeof rawIcon !== "object") {
    console.warn(`Lead icon "${name}" is missing a valid export.`);
    return null;
  }

  const { viewBox, paths } = rawIcon;

  if (typeof viewBox !== "string" || !Array.isArray(paths)) {
    console.warn(`Lead icon "${name}" has an invalid shape.`);
    return null;
  }

  const normalizedPaths = paths.map((path) => ({ ...path }));

  return {
    viewBox,
    paths: normalizedPaths,
  };
}

function cloneIconDefinition(definition) {
  if (!definition) {
    return null;
  }

  return {
    viewBox: definition.viewBox,
    paths: definition.paths.map((path) => ({ ...path })),
  };
}

async function loadIconDefinition(name) {
  if (!hasLeadIcon(name)) {
    return null;
  }

  if (!definitionCache.has(name)) {
    const loadPromise = iconLoaders[name]()
      .then((module) => module?.default ?? module)
      .then((icon) => normalizeIcon(icon, name))
      .catch((error) => {
        console.error(`Failed to load lead icon "${name}"`, error);
        definitionCache.delete(name);
        return null;
      });

    definitionCache.set(name, loadPromise);
  }

  const definition = await definitionCache.get(name);

  if (!definition) {
    definitionCache.delete(name);
    return null;
  }

  return definition;
}

export async function getLeadIcon(name) {
  const definition = await loadIconDefinition(name);
  return cloneIconDefinition(definition);
}

export function preloadLeadIcons(names = LEAD_ICON_NAMES) {
  return Promise.all(names.map((name) => loadIconDefinition(name)));
}
