import { unref, ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, computed, toValue, reactive } from 'vue';
import { g as asyncDataDefaults, h as fetchDefaults, f as useNuxtApp, c as createError } from '../server.mjs';
import { B as getRequestHeaders, C as hash } from '../../../index.mjs';
import { DateTime } from 'luxon';
import { parse } from 'accept-language-parser';

function useAsyncData(...args) {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxt = useNuxtApp();
  const getDefault = () => null;
  const getDefaultCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  const hasCachedData = () => ![null, void 0].includes(options.getCachedData(key));
  if (!nuxt._asyncData[key] || !options.immediate) {
    (_g = (_a = nuxt.payload._errors)[key]) != null ? _g : _a[key] = null;
    const _ref = options.deep ? ref : shallowRef;
    nuxt._asyncData[key] = {
      data: _ref((_h = options.getCachedData(key)) != null ? _h : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxt.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const headers = event ? getRequestHeaders(event) : {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return toValue(r);
  });
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    if (timeoutLength) {
      setTimeout(() => controller.abort(), timeoutLength);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/") && (!toValue(opts.baseURL) || toValue(opts.baseURL).startsWith("/"));
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    const iterator = Array.isArray(obj) ? obj : Object.entries(obj);
    for (const [key, value] of iterator) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const DATA_ROOT_URL = "https://is-smm-beaten-yet-public-data.s3.us-west-2.amazonaws.com/levels";
const COUNTRIES = [
  { value: "JP", name: "Japan" },
  { value: "US", name: "United States" },
  { value: "NL", name: "Netherlands" },
  { value: "SE", name: "Sweden" },
  { value: "DE", name: "Germany" },
  { value: "FR", name: "France" },
  { value: "ES", name: "Spain" },
  { value: "GB", name: "Great Britain" },
  { value: "NO", name: "Norway" },
  { value: "MX", name: "Mexico" },
  { value: "CA", name: "Canada" },
  { value: "AU", name: "Australia" },
  { value: "AT", name: "Austria" },
  { value: "NZ", name: "New Zealand" }
];
const SHUTDOWN_DATE = "2024-04-08T16:00:00-07:00";
const __DEBUG_0PERCENT_MODE__ = false;
function useTheAnswer() {
  const { data: theAnswer, pending } = useAsyncData("the-answer", () => $fetch(`${DATA_ROOT_URL}/uncleared.json`), {
    deep: false,
    immediate: true,
    server: true,
    lazy: true,
    transform: (levels) => !levels.length || __DEBUG_0PERCENT_MODE__ ? "Yes" : DateTime.now() < DateTime.fromISO(SHUTDOWN_DATE) ? "Not yet" : "No"
  });
  return {
    theAnswer,
    pending
  };
}
function useUnclearedLevel(levelId) {
  const { data: level, pending } = useAsyncData(
    `uncleared-${unref(levelId)}`,
    () => $fetch(`${DATA_ROOT_URL}/uncleared.json`),
    {
      deep: false,
      immediate: true,
      server: true,
      lazy: true,
      transform: (levels) => levels.find((level2) => level2.levelId === unref(levelId))
    }
  );
  return {
    level,
    pending
  };
}
function useUnclearedLevels() {
  const {
    data: uncleared,
    pending,
    execute
  } = useFetch(`${DATA_ROOT_URL}/uncleared.json`, {
    key: "uncleared",
    deep: false,
    immediate: false,
    server: false,
    lazy: true,
    default: () => []
  }, "$MW4XEErxde");
  return {
    uncleared,
    pending,
    load: execute
  };
}
function getNavigatorLangs() {
  try {
    return navigator.languages;
  } catch {
    return "en-US";
  }
}
function useFormatters() {
  const { "accept-language": langPref } = useRequestHeaders([
    "Accept-Language"
  ]);
  return {
    formatPercent: (numerator, denominator, { precision = 0, rounding = "halfExpand" } = {}) => {
      if (!denominator) {
        return "";
      }
      return new Intl.NumberFormat(
        langPref ? parse(langPref).map(({ code }) => code) : getNavigatorLangs(),
        {
          style: "percent",
          maximumFractionDigits: precision,
          roundingMode: rounding
        }
      ).format(numerator / denominator);
    },
    formatNumber: (n) => new Intl.NumberFormat().format(n),
    formatDate: (d, short = false) => DateTime.fromISO(d).toLocaleString(
      short ? DateTime.DATE_MED : DateTime.DATE_FULL
    )
  };
}

export { COUNTRIES as C, DATA_ROOT_URL as D, SHUTDOWN_DATE as S, useFormatters as a, useUnclearedLevels as b, useUnclearedLevel as c, useRequestEvent as d, useTheAnswer as u };
//# sourceMappingURL=useFormatters-0f1d4919.mjs.map
