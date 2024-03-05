import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import Icon from './Icon-7ea5cbb2.mjs';
import script$1 from './dialog.esm-5115bd99.mjs';
import { useSSRContext, defineComponent, ref, resolveDirective, mergeProps, unref, isRef, withCtx, createVNode, computed, shallowRef, watch, toRef, createTextVNode, toDisplayString, h, nextTick } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute } from '../server.mjs';
import { u as useTheAnswer, a as useFormatters, S as SHUTDOWN_DATE, C as COUNTRIES, b as useUnclearedLevels } from './useFormatters-0f1d4919.mjs';
import { Doughnut, Bar, Line, Pie } from 'vue-chartjs';
import { Chart, DoughnutController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, LineController, LineElement, PointElement, TimeScale, Tooltip, PieController, Legend } from 'chart.js';
import { C as COURSE_WORLD_TEXT, S as SMM_YELLOW, a as COURSE_WORLD_CARD, b as CHART_MAIN_COLOR, c as COURSE_WORLD_CARD_TEXT, d as CourseWorldCard } from './CourseWorldCard-e710f316.mjs';
import { orderBy, toPairs, sortBy, mapValues, capitalize, groupBy, keyBy, compact, sumBy } from 'lodash-es';
import script$2 from './tabmenu.esm-5ab49ab4.mjs';
import { DateTime } from 'luxon';
import script from './skeleton.esm-cef7bc15.mjs';
import gsap from 'gsap';
import { _ as __nuxt_component_0$1 } from './nuxt-link-09578c26.mjs';
import script$3 from './button.esm-6aefb566.mjs';
import { u as useSeoMeta } from './index-aac5049c.mjs';
import 'vue-bundle-renderer/runtime';
import '../../../index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './index-92afd306.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './focustrap.esm-8fe62260.mjs';
import './index.esm-73f2f135.mjs';
import './baseicon.esm-f3995527.mjs';
import './basecomponent.esm-8ef3d388.mjs';
import './portal.esm-e4a6f08c.mjs';
import 'vue-router';
import 'accept-language-parser';
import './index.esm-ab0e51c3.mjs';

const _sfc_main$a = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<iframe${ssrRenderAttrs(mergeProps({
    id: "kofiframe",
    src: "https://ko-fi.com/snoozbuster/?hidefeed=true&widget=true&embed=true&preview=true",
    style: { "border": "none", "width": "100%", "padding": "4px", "background": "#f9f9f9" },
    height: "650",
    title: "snoozbuster"
  }, _attrs))}></iframe>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DonationPanel.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SocialLinks",
  __ssrInlineRender: true,
  setup(__props) {
    const links = [
      {
        name: "Team 0% Discord",
        href: "https://discord.com/invite/0-394519186610847754",
        icon: "logos:discord-icon"
      },
      {
        name: "Team 0% Twitter",
        href: "https://twitter.com/Team0Percent",
        icon: "logos:twitter"
      },
      {
        name: "Team 0% YouTube",
        href: "https://www.youtube.com/@TeamZeroPercent",
        icon: "logos:youtube-icon"
      },
      {
        name: "Github",
        href: "https://github.com/snoozbuster/is-smm-beaten-yet",
        icon: "logos:github-icon"
      }
    ];
    const donateVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = Icon;
      const _component_PrimeDialog = script$1;
      const _component_DonationPanel = __nuxt_component_2$1;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "social-links flex gap-3 justify-center" }, _attrs))}><!--[-->`);
      ssrRenderList(links, (link) => {
        _push(`<a${ssrRenderAttr("href", link.href)} target="_blank"${ssrRenderAttr("title", link.name)}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: link.icon,
          size: "2em"
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--><button${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_tooltip, `Support this site`, void 0, { bottom: true }))}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "simple-icons:kofi",
        size: "2em"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_PrimeDialog, {
        visible: unref(donateVisible),
        "onUpdate:visible": ($event) => isRef(donateVisible) ? donateVisible.value = $event : null,
        header: "Support this site",
        modal: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DonationPanel, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DonationPanel)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SocialLinks.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "TheAnswer",
  __ssrInlineRender: true,
  setup(__props) {
    const { theAnswer } = useTheAnswer();
    const animationStarted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SocialLinks = _sfc_main$9;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "text-center grid place-content-center bg-smm-yellow uppercase relative overflow-hidden" }, _attrs))} data-v-cac5786e><span class="text-smm sm:text-2xl" data-v-cac5786e> Is Super Mario Maker beaten yet?</span><h1 id="the-answer" class="${ssrRenderClass(["text-smm", !unref(animationStarted) && "opacity-0"])}" data-v-cac5786e>${ssrInterpolate(unref(theAnswer))}</h1>`);
      _push(ssrRenderComponent(_component_SocialLinks, { class: "absolute top-0 right-0 p-7 opacity-50 hover:opacity-100 transition-opacity hidden sm:flex" }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheAnswer.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-cac5786e"]]);
const DonutCenterTextPlugin = {
  id: "donut_center_text",
  beforeDraw: function(chart, _, options) {
    if (Object.keys(options != null ? options : {}).length) {
      const ctx = chart.ctx;
      const centerConfig = options;
      const fontStyle = centerConfig.fontStyle || "Arial";
      const txt = centerConfig.text;
      const color = centerConfig.color || "#000";
      const maxFontSize = centerConfig.maxFontSize || 75;
      const sidePadding = centerConfig.sidePadding || 20;
      const sidePaddingCalculated = sidePadding / 100 * (chart._metasets[chart._metasets.length - 1].data[0].innerRadius * 2);
      ctx.font = "30px " + fontStyle;
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = chart._metasets[chart._metasets.length - 1].data[0].innerRadius * 2 - sidePaddingCalculated;
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = chart._metasets[chart._metasets.length - 1].data[0].innerRadius * 2;
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let minFontSize = centerConfig.minFontSize;
      const lineHeight = centerConfig.lineHeight || 25;
      let wrapText = false;
      if (minFontSize === void 0) {
        minFontSize = 20;
      }
      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;
      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }
      const words = txt.split(" ");
      let line = "";
      const lines = [];
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      centerY -= lines.length / 2 * lineHeight;
      for (let n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      ctx.fillText(line, centerX, centerY);
    }
  }
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PercentClear",
  __ssrInlineRender: true,
  props: {
    clearedLevels: {
      type: Number,
      required: true
    },
    unclearedLevels: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    Chart.register(DoughnutController, ArcElement, DonutCenterTextPlugin);
    const props = __props;
    const { formatPercent } = useFormatters();
    const percentClear = computed(() => {
      const numerator = props.clearedLevels;
      const denominator = props.clearedLevels + props.unclearedLevels;
      const precision = numerator / denominator >= 0.991 ? 2 : 0;
      return formatPercent(numerator, denominator, {
        precision,
        rounding: "trunc"
      });
    });
    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: false,
        legend: {
          display: false
        },
        donut_center_text: {
          text: `${percentClear.value} clear`,
          color: COURSE_WORLD_TEXT,
          minFontSize: 20,
          maxFontSize: 200
        }
      }
    }));
    const data = computed(() => {
      return {
        labels: ["Cleared", "Uncleared"],
        datasets: [
          {
            data: [props.clearedLevels, props.unclearedLevels],
            backgroundColor: [SMM_YELLOW, COURSE_WORLD_CARD]
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "align-center flex h-full justify-center position-relative w-full" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Doughnut), {
        data: unref(data),
        options: unref(options)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PercentClear.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
function __nuxt_component_1$1(_, { slots }) {
  var _a;
  return h(
    "div",
    {
      class: "position-relative min-h-0 w-full h-full max-h-[30vh] xl:max-h-[40vh]"
    },
    (_a = slots.default) == null ? void 0 : _a.call(slots)
  );
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ClearLeaderboard",
  __ssrInlineRender: true,
  props: {
    clearsByPerson: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale);
    const props = __props;
    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          ticks: {
            autoSkip: false
          },
          grid: {
            display: false
          }
        }
      }
    }));
    const data = computed(() => {
      const clearers = orderBy(
        toPairs(props.clearsByPerson),
        "1",
        "desc"
      ).slice(0, 10);
      return {
        labels: clearers.map(([user]) => user),
        datasets: [
          {
            label: "Clears",
            data: clearers.map(([_, clears]) => clears)
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ChartContainer = __nuxt_component_1$1;
      _push(`<!--[--><h3 class="text-xl mb-3">Top clears leaderboard</h3>`);
      _push(ssrRenderComponent(_component_ChartContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Bar), {
              data: unref(data),
              options: unref(options)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Bar), {
                data: unref(data),
                options: unref(options)
              }, null, 8, ["data", "options"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-sm"> Full leaderboards coming soon! </span><!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClearLeaderboard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ClearsOverTime",
  __ssrInlineRender: true,
  props: {
    unclearedLevelCount: {
      type: Number,
      required: true
    },
    clearsByDate: {
      type: Object,
      required: true
    },
    winners: {
      type: Object,
      required: true
    },
    allTime: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      TimeScale,
      LinearScale
    );
    const props = __props;
    const tab = ref("daily");
    const tabs = [
      { label: "Daily", command: () => tab.value = "daily" },
      { label: "Weekly", command: () => tab.value = "weekly" }
    ];
    const { formatNumber } = useFormatters();
    const topClearerTooltipCallback = (items) => {
      const day = items[0].raw.x;
      const winner = props.winners[unref(tab)][day];
      const creators = compact([
        `${winner.creators[0]}`,
        winner.creators.slice(1).join(", ")
      ]).join(",\n");
      return `Most clears: ${creators} (${winner.creators.length > 1 ? "tied with " : ""}${formatNumber(winner.levels)} levels)`;
    };
    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        tooltip: {
          position: "average",
          footerFont: { weight: "normal" },
          callbacks: unref(tab) === "weekly" ? {
            title: (items) => `${items[0].label} - ${DateTime.fromISO(
              items[0].raw.x
            ).endOf("week").toLocaleString(DateTime.DATE_MED)}`,
            footer: topClearerTooltipCallback
          } : {
            footer: topClearerTooltipCallback
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: unref(tab) === "daily" ? "day" : "month",
            tooltipFormat: "DDD"
          },
          grid: {
            drawOnChartArea: false
          }
        },
        yClears: {
          type: "linear",
          position: "left",
          beginAtZero: true
        },
        yRemaining: {
          type: "linear",
          position: "right",
          beginAtZero: true,
          grid: {
            drawOnChartArea: false
          }
        }
      }
    }));
    const orderedDays = computed(
      () => sortBy(Object.keys(props.clearsByDate)).filter(
        (d) => DateTime.fromISO(d).isValid
      )
    );
    const remainingLevelsByDate = computed(() => {
      const remainingByDate = {};
      const dates = [...unref(orderedDays)];
      let lastDay = dates.pop();
      remainingByDate[lastDay] = props.clearsByDate[lastDay] + props.unclearedLevelCount;
      while (dates.length) {
        const currentDay = dates.pop();
        remainingByDate[currentDay] = remainingByDate[lastDay] + props.clearsByDate[currentDay];
        lastDay = currentDay;
      }
      return remainingByDate;
    });
    const computeWeeklyData = (datapoints, sum = true) => {
      return mapValues(
        groupBy(
          unref(orderedDays),
          (day) => DateTime.fromISO(day).startOf("week").toISOWeekDate()
        ),
        (days) => sum ? sumBy(days, (d) => datapoints[d]) : datapoints[days[0]]
      );
    };
    const data = computed(() => {
      const datapoints = unref(tab) === "daily" ? props.clearsByDate : computeWeeklyData(props.clearsByDate);
      const leftEdge = unref(tab) === "daily" ? (props.allTime ? DateTime.fromISO("2023-02-06") : DateTime.now().minus({ month: 1 })).toISODate() : (
        /* there is a huge spike of 6k the week before this which dwarfs the
         * rest of the chart
         */
        DateTime.fromISO("2023-02-06").toISOWeekDate()
      );
      const days = sortBy(Object.keys(datapoints)).filter(
        (dateCleared) => dateCleared >= leftEdge
      );
      const remainingDatapoints = unref(tab) === "daily" ? unref(remainingLevelsByDate) : computeWeeklyData(unref(remainingLevelsByDate), false);
      const shutdown = DateTime.fromISO(SHUTDOWN_DATE);
      const rateToBeat = mapValues(
        remainingDatapoints,
        (remainingLevels, day) => {
          const remainingDays = shutdown.diff(DateTime.fromISO(day), "days").days;
          return Math.ceil(remainingLevels / remainingDays) * (unref(tab) === "daily" ? 1 : 7);
        }
      );
      return {
        datasets: [
          {
            label: "Clears",
            data: days.map((d) => ({
              x: d,
              y: datapoints[d]
            })),
            pointRadius: 0,
            pointHitRadius: 5,
            yAxisID: "yClears"
          },
          {
            label: `${capitalize(unref(tab))} clear target`,
            data: days.map((d) => ({
              x: d,
              y: rateToBeat[d]
            })),
            borderDash: [4, 4],
            borderColor: "#6c43a1",
            backgroundColor: "#6c43a1",
            pointRadius: 0,
            pointHitRadius: 5,
            yAxisID: "yClears"
          },
          {
            label: "Remaining (start of day)",
            data: days.map((d) => ({
              x: d,
              y: remainingDatapoints[d]
            })),
            borderColor: "#8f2532aa",
            backgroundColor: "#8f2532aa",
            pointRadius: 0,
            pointHitRadius: 5,
            yAxisID: "yRemaining"
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimeTabMenu = script$2;
      const _component_ChartContainer = __nuxt_component_1$1;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[--><h3 class="text-xl"> Clears over time <button${ssrRenderAttrs(mergeProps({ class: "ml-2 opacity-50 hover:opacity-100" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Clear dates are recorded in the GMT time zone", void 0, { focus: true })))}><span class="pi pi-question-circle"></span></button></h3>`);
      _push(ssrRenderComponent(_component_PrimeTabMenu, {
        class: "mb-3",
        model: tabs
      }, null, _parent));
      _push(ssrRenderComponent(_component_ChartContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Line), {
              data: unref(data),
              options: unref(options)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Line), {
                data: unref(data),
                options: unref(options)
              }, null, 8, ["data", "options"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClearsOverTime.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _imports_0 = "" + buildAssetsURL("first_clear.fb38810c.png");
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ClearedStats",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    ready: () => true
  },
  setup(__props, { emit: __emit }) {
    Chart.register(Tooltip);
    Chart.defaults.datasets.bar.backgroundColor = CHART_MAIN_COLOR;
    Chart.defaults.datasets.line.borderColor = CHART_MAIN_COLOR;
    Chart.defaults.datasets.line.backgroundColor = CHART_MAIN_COLOR;
    Chart.defaults.color = COURSE_WORLD_CARD_TEXT;
    Chart.defaults.borderColor = COURSE_WORLD_CARD_TEXT;
    Tooltip.positioners.mouse = function(_elements, eventPosition) {
      return eventPosition;
    };
    Chart.defaults.plugins.tooltip.position = "mouse";
    const StatSection = (props2, { slots, attrs }) => {
      var _a, _b;
      return props2.card ? h(CourseWorldCard, attrs, (_a = slots.default) == null ? void 0 : _a.call(slots)) : h(
        "div",
        {
          class: ["stat-section grid place-content-center text-center"]
        },
        (_b = slots.default) == null ? void 0 : _b.call(slots)
      );
    };
    StatSection.props = {
      card: {
        type: Boolean,
        default: false
      }
    };
    const props = __props;
    const animationStarted = ref(false);
    const ready = ref(false);
    const clearSummary = shallowRef({});
    const timeToShutdown = computed(
      () => {
        var _a, _b;
        return (_b = DateTime.fromISO(SHUTDOWN_DATE).toRelative({
          base: DateTime.fromISO(
            (_a = clearSummary.value.mostRecentClear) == null ? void 0 : _a.dateCleared
          ),
          unit: ["days", "hours", "minutes"]
        })) == null ? void 0 : _b.replace(/^in /, "");
      }
    );
    function startAnimation() {
      if (unref(ready) && props.visible && !animationStarted.value) {
        animationStarted.value = true;
        nextTick(() => {
          gsap.to(".stat-section", {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 0.3
          });
        });
      }
    }
    useFormatters();
    watch(toRef(props, "visible"), startAnimation);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_PercentClear = _sfc_main$7;
      const _component_SocialLinks = _sfc_main$9;
      const _component_ClearLeaderboard = _sfc_main$6;
      const _component_ClearsOverTime = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-course-world text-course-world-contrast" }, _attrs))} data-v-d512cf45><div class="${ssrRenderClass([!__props.visible && !unref(animationStarted) && "invisible", "grid p-7 grid-flow-row grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-full gap-7 overflow-hidden"])}" data-v-d512cf45>`);
      if (unref(animationStarted)) {
        _push(`<!--[--><div class="stat-section min-h-[20vh]" data-v-d512cf45>`);
        _push(ssrRenderComponent(_component_PercentClear, {
          "uncleared-levels": 0,
          "cleared-levels": (_a = unref(clearSummary).clearedTotal) != null ? _a : 0
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(StatSection, { class: "md:grid-rows-[1fr_2fr_1fr]" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b, _c, _d;
            if (_push2) {
              _push2(`<div class="placement" data-v-d512cf45${_scopeId}></div><div class="self-center mb-6" data-v-d512cf45${_scopeId}><h2 data-v-d512cf45${_scopeId}><span class="text-xl" data-v-d512cf45${_scopeId}>The last <img class="inline"${ssrRenderAttr("src", _imports_0)} alt="First Clear" title="First Clear" width="50" data-v-d512cf45${_scopeId}> was:</span><div class="text-4xl md:text-3xl xl:text-4xl mb-2 font-semibold text-balance" data-v-d512cf45${_scopeId}>${ssrInterpolate((_a2 = unref(clearSummary).mostRecentClear) == null ? void 0 : _a2.title)}</div></h2><span data-v-d512cf45${_scopeId}> Achieved by <span class="font-semibold" data-v-d512cf45${_scopeId}>${ssrInterpolate((_b = unref(clearSummary).mostRecentClear) == null ? void 0 : _b.firstClearerNnid)}</span> with ${ssrInterpolate(unref(timeToShutdown))} remaining before the server shutdown. Congratulations! </span></div><div class="self-end" data-v-d512cf45${_scopeId}><h4 class="text-xl font-semibold mb-1" data-v-d512cf45${_scopeId}>Join us today!</h4><p class="mb-2" data-v-d512cf45${_scopeId}> We&#39;re not done yet - there&#39;s still an entire other game with plenty of uncleared levels. Join the Discord to help take down some of the oldest uncleared levels in SMM2! </p>`);
              _push2(ssrRenderComponent(_component_SocialLinks, null, null, _parent2, _scopeId));
              _push2(`</div><div class="md:hidden" data-v-d512cf45${_scopeId}><h3 class="text-2xl font-semibold mt-7" data-v-d512cf45${_scopeId}>More stats</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "placement" }),
                createVNode("div", { class: "self-center mb-6" }, [
                  createVNode("h2", null, [
                    createVNode("span", { class: "text-xl" }, [
                      createTextVNode("The last "),
                      createVNode("img", {
                        class: "inline",
                        src: _imports_0,
                        alt: "First Clear",
                        title: "First Clear",
                        width: "50"
                      }),
                      createTextVNode(" was:")
                    ]),
                    createVNode("div", { class: "text-4xl md:text-3xl xl:text-4xl mb-2 font-semibold text-balance" }, toDisplayString((_c = unref(clearSummary).mostRecentClear) == null ? void 0 : _c.title), 1)
                  ]),
                  createVNode("span", null, [
                    createTextVNode(" Achieved by "),
                    createVNode("span", { class: "font-semibold" }, toDisplayString((_d = unref(clearSummary).mostRecentClear) == null ? void 0 : _d.firstClearerNnid), 1),
                    createTextVNode(" with " + toDisplayString(unref(timeToShutdown)) + " remaining before the server shutdown. Congratulations! ", 1)
                  ])
                ]),
                createVNode("div", { class: "self-end" }, [
                  createVNode("h4", { class: "text-xl font-semibold mb-1" }, "Join us today!"),
                  createVNode("p", { class: "mb-2" }, " We're not done yet - there's still an entire other game with plenty of uncleared levels. Join the Discord to help take down some of the oldest uncleared levels in SMM2! "),
                  createVNode(_component_SocialLinks)
                ]),
                createVNode("div", { class: "md:hidden" }, [
                  createVNode("h3", { class: "text-2xl font-semibold mt-7" }, "More stats")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(StatSection, {
          card: "",
          class: "md:col-span-2 xl:col-span-1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b;
            if (_push2) {
              _push2(ssrRenderComponent(_component_ClearLeaderboard, {
                "clears-by-person": (_a2 = unref(clearSummary).clearsByPerson) != null ? _a2 : {}
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ClearLeaderboard, {
                  "clears-by-person": (_b = unref(clearSummary).clearsByPerson) != null ? _b : {}
                }, null, 8, ["clears-by-person"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(StatSection, {
          card: "",
          class: "md:col-span-2 xl:col-span-3"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b, _c, _d;
            if (_push2) {
              _push2(ssrRenderComponent(_component_ClearsOverTime, {
                "uncleared-level-count": 0,
                "clears-by-date": (_a2 = unref(clearSummary).clearsByDate) != null ? _a2 : {},
                winners: (_b = unref(clearSummary).winners) != null ? _b : {},
                "all-time": ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ClearsOverTime, {
                  "uncleared-level-count": 0,
                  "clears-by-date": (_c = unref(clearSummary).clearsByDate) != null ? _c : {},
                  winners: (_d = unref(clearSummary).winners) != null ? _d : {},
                  "all-time": ""
                }, null, 8, ["clears-by-date", "winners"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(2, (i) => {
          _push(ssrRenderComponent(unref(script), {
            key: i,
            class: "w-full",
            height: "100%"
          }, null, _parent));
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(ssrRenderComponent(StatSection, {
            key: i,
            class: "force-visible",
            card: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(script), {
                  class: "w-full",
                  height: "100%"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(script), {
                    class: "w-full",
                    height: "100%"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClearedStats.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d512cf45"]]);
function useUnclearedTooltipFormatter(unclearedLevels) {
  const { formatPercent, formatNumber } = useFormatters();
  return {
    label: (item) => {
      var _a, _b;
      return `${formatNumber((_a = item.parsed.y) != null ? _a : item.parsed)} ${item.dataset.label} (${formatPercent(
        (_b = item.parsed.y) != null ? _b : item.parsed,
        unref(unclearedLevels).length,
        { precision: 1 }
      )} of total)`;
    }
  };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "UnclearedByDate",
  __ssrInlineRender: true,
  props: {
    unclearedLevels: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    Chart.register(BarController, BarElement, TimeScale, LinearScale);
    const props = __props;
    const tab = ref("year");
    const tabs = [
      { label: "Year", command: () => tab.value = "year" },
      { label: "Month", command: () => tab.value = "month" }
    ];
    const tooltipCallbacks = useUnclearedTooltipFormatter(
      toRef(props, "unclearedLevels")
    );
    const options = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: tooltipCallbacks
          }
        },
        scales: {
          x: {
            type: "time",
            grid: {
              offset: unref(tab) === "year",
              display: false
            },
            time: {
              unit: "year",
              tooltipFormat: unref(tab) === "year" ? "yyyy" : "LLLL yyyy",
              displayFormats: unref(tab) === "year" ? {} : {
                month: "LLL yyyy",
                year: "yyyy"
              }
            },
            ticks: {
              major: { enabled: true }
            }
          }
        }
      };
    });
    const data = computed(() => {
      const levelCountByYear = mapValues(
        groupBy(
          props.unclearedLevels.filter(({ uploadDate }) => uploadDate),
          ({ uploadDate }) => uploadDate.substring(0, unref(tab) === "year" ? 4 : 7)
        ),
        "length"
      );
      const years = sortBy(Object.keys(levelCountByYear));
      return {
        datasets: [
          {
            label: "remaining",
            data: years.map((date) => ({
              x: date,
              y: levelCountByYear[date]
            }))
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimeTabMenu = script$2;
      const _component_ChartContainer = __nuxt_component_1$1;
      _push(`<!--[--><h3 class="text-xl">Uncleared levels by date</h3>`);
      _push(ssrRenderComponent(_component_PrimeTabMenu, {
        class: "mb-3",
        model: tabs
      }, null, _parent));
      _push(ssrRenderComponent(_component_ChartContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Bar), {
              data: unref(data),
              options: unref(options)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Bar), {
                data: unref(data),
                options: unref(options)
              }, null, 8, ["data", "options"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UnclearedByDate.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StylePieChart",
  __ssrInlineRender: true,
  props: {
    unclearedLevels: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    Chart.register(PieController, ArcElement, Legend);
    const props = __props;
    const tooltipCallbacks = useUnclearedTooltipFormatter(
      toRef(props, "unclearedLevels")
    );
    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom"
        },
        tooltip: {
          enabled: true,
          callbacks: tooltipCallbacks
        }
      }
    }));
    const tab = ref("style");
    const labelMaps = {
      style: {
        SMB1: "Super Mario Bros.",
        SMW: "Super Mario World",
        SMB3: "Super Mario Bros. 3",
        NSMBU: "New Super Mario Bros. U"
      },
      countryCode: mapValues(keyBy(COUNTRIES, "value"), "name"),
      theme: void 0
    };
    const styleData = computed(() => {
      const styles = toPairs(groupBy(props.unclearedLevels, unref(tab)));
      const styleLabelKey = labelMaps[unref(tab)];
      return {
        labels: styles.map(
          ([style]) => styleLabelKey ? styleLabelKey[style] : style
        ),
        datasets: [
          {
            label: "remaining",
            data: styles.map(([_, levels]) => levels.length),
            backgroundColor: [
              "#6c43a1",
              CHART_MAIN_COLOR,
              "#8f2532",
              SMM_YELLOW,
              COURSE_WORLD_TEXT,
              "#d4d530"
            ]
          }
        ]
      };
    });
    const tabs = [
      { label: "Style", command: () => tab.value = "style" },
      { label: "Theme", command: () => tab.value = "theme" },
      { label: "Country", command: () => tab.value = "countryCode" }
    ];
    const data = computed(() => {
      return styleData.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimeTabMenu = script$2;
      const _component_ChartContainer = __nuxt_component_1$1;
      _push(`<!--[--><h3 class="text-xl"> Uncleared levels by ${ssrInterpolate(unref(tab) === "countryCode" ? "country" : unref(tab))}</h3>`);
      _push(ssrRenderComponent(_component_PrimeTabMenu, {
        class: "mb-3 -mx-2 md:mx-0",
        model: tabs
      }, null, _parent));
      _push(ssrRenderComponent(_component_ChartContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Pie), {
              data: unref(data),
              options: unref(options)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Pie), {
                data: unref(data),
                options: unref(options)
              }, null, 8, ["data", "options"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StylePieChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UnclearedStats",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    ready: () => true
  },
  setup(__props, { emit: __emit }) {
    Chart.register(Tooltip);
    Chart.defaults.datasets.bar.backgroundColor = CHART_MAIN_COLOR;
    Chart.defaults.datasets.line.borderColor = CHART_MAIN_COLOR;
    Chart.defaults.datasets.line.backgroundColor = CHART_MAIN_COLOR;
    Chart.defaults.color = COURSE_WORLD_CARD_TEXT;
    Chart.defaults.borderColor = COURSE_WORLD_CARD_TEXT;
    Tooltip.positioners.mouse = function(_elements, eventPosition) {
      return eventPosition;
    };
    Chart.defaults.plugins.tooltip.position = "mouse";
    const StatSection = (props2, { slots, attrs }) => {
      var _a, _b;
      return props2.card ? h(CourseWorldCard, attrs, (_a = slots.default) == null ? void 0 : _a.call(slots)) : h(
        "div",
        {
          class: ["stat-section grid place-content-center text-center"]
        },
        (_b = slots.default) == null ? void 0 : _b.call(slots)
      );
    };
    StatSection.props = {
      card: {
        type: Boolean,
        default: false
      }
    };
    const props = __props;
    const animationStarted = ref(false);
    const showFaq = ref(false);
    const ready = ref(false);
    const clearSummary = shallowRef({});
    const { uncleared, load } = useUnclearedLevels();
    function startAnimation() {
      if (unref(ready) && props.visible && !animationStarted.value) {
        animationStarted.value = true;
        nextTick(() => {
          gsap.to(".stat-section", {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 0.3
          });
        });
      }
    }
    const { formatNumber, formatDate } = useFormatters();
    watch(toRef(props, "visible"), startAnimation);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_PercentClear = _sfc_main$7;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_PrimeButton = script$3;
      const _component_PrimeDialog = script$1;
      const _component_SocialLinks = _sfc_main$9;
      const _component_UnclearedByDate = _sfc_main$3;
      const _component_ClearsOverTime = _sfc_main$5;
      const _component_ClearLeaderboard = _sfc_main$6;
      const _component_StylePieChart = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-course-world text-course-world-contrast" }, _attrs))} data-v-25435b57><div class="${ssrRenderClass([!__props.visible && !unref(animationStarted) && "invisible", "grid p-7 grid-flow-row grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-full gap-7 overflow-hidden"])}" data-v-25435b57>`);
      if (unref(animationStarted)) {
        _push(`<!--[--><div class="stat-section min-h-[20vh]" data-v-25435b57>`);
        _push(ssrRenderComponent(_component_PercentClear, {
          "uncleared-levels": unref(uncleared).length,
          "cleared-levels": (_a = unref(clearSummary).clearedTotal) != null ? _a : 0
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(StatSection, { class: "md:grid-rows-[1fr_2fr_1fr]" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="placement" data-v-25435b57${_scopeId}></div><div class="self-center" data-v-25435b57${_scopeId}><h2 class="text-4xl md:text-3xl xl:text-4xl font-semibold text-balance" data-v-25435b57${_scopeId}>${ssrInterpolate(unref(formatNumber)(unref(uncleared).length))} levels left to clear </h2><span data-v-25435b57${_scopeId}> before the server shutdown on ${ssrInterpolate(unref(formatDate)(unref(SHUTDOWN_DATE)))}</span>`);
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/levels" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_PrimeButton, {
                      label: "View uncleared levels",
                      class: "w-full text-smm uppercase mt-5 mb-3",
                      size: "large",
                      severity: "warning"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_PrimeButton, {
                        label: "View uncleared levels",
                        class: "w-full text-smm uppercase mt-5 mb-3",
                        size: "large",
                        severity: "warning"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_PrimeButton, {
                class: "text-course-world-contrast",
                link: "",
                label: "How is this calculated?",
                onClick: ($event) => showFaq.value = true
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_PrimeDialog, {
                visible: unref(showFaq),
                "onUpdate:visible": ($event) => isRef(showFaq) ? showFaq.value = $event : null,
                class: "w-80",
                header: "FAQ",
                modal: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="mb-4" data-v-25435b57${_scopeId2}> Percentages calculated out of ~${ssrInterpolate(unref(formatNumber)(48e3))} levels that were still uncleared when level upload was disabled on ${ssrInterpolate(unref(formatDate)("2021-04-01"))}. </p><p data-v-25435b57${_scopeId2}> Levels are marked as cleared by the community by running commands for a custom-made Discord bot built by TheCryptan. Additionally, the uncleared list is refreshed periodically to look for any unreported levels that have been cleared. </p>`);
                  } else {
                    return [
                      createVNode("p", { class: "mb-4" }, " Percentages calculated out of ~" + toDisplayString(unref(formatNumber)(48e3)) + " levels that were still uncleared when level upload was disabled on " + toDisplayString(unref(formatDate)("2021-04-01")) + ". ", 1),
                      createVNode("p", null, " Levels are marked as cleared by the community by running commands for a custom-made Discord bot built by TheCryptan. Additionally, the uncleared list is refreshed periodically to look for any unreported levels that have been cleared. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="self-end" data-v-25435b57${_scopeId}><h4 class="text-xl font-semibold mb-1" data-v-25435b57${_scopeId}>Join us today!</h4><p class="mb-2" data-v-25435b57${_scopeId}> There are still many ways to help out, even if you&#39;re not a platforming pro. We&#39;d love for you to join our community! </p>`);
              _push2(ssrRenderComponent(_component_SocialLinks, null, null, _parent2, _scopeId));
              _push2(`</div><div class="md:hidden" data-v-25435b57${_scopeId}><h3 class="text-2xl font-semibold mt-7" data-v-25435b57${_scopeId}>More stats</h3></div>`);
            } else {
              return [
                createVNode("div", { class: "placement" }),
                createVNode("div", { class: "self-center" }, [
                  createVNode("h2", { class: "text-4xl md:text-3xl xl:text-4xl font-semibold text-balance" }, toDisplayString(unref(formatNumber)(unref(uncleared).length)) + " levels left to clear ", 1),
                  createVNode("span", null, " before the server shutdown on " + toDisplayString(unref(formatDate)(unref(SHUTDOWN_DATE))), 1),
                  createVNode(_component_NuxtLink, { to: "/levels" }, {
                    default: withCtx(() => [
                      createVNode(_component_PrimeButton, {
                        label: "View uncleared levels",
                        class: "w-full text-smm uppercase mt-5 mb-3",
                        size: "large",
                        severity: "warning"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_PrimeButton, {
                    class: "text-course-world-contrast",
                    link: "",
                    label: "How is this calculated?",
                    onClick: ($event) => showFaq.value = true
                  }, null, 8, ["onClick"]),
                  createVNode(_component_PrimeDialog, {
                    visible: unref(showFaq),
                    "onUpdate:visible": ($event) => isRef(showFaq) ? showFaq.value = $event : null,
                    class: "w-80",
                    header: "FAQ",
                    modal: ""
                  }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "mb-4" }, " Percentages calculated out of ~" + toDisplayString(unref(formatNumber)(48e3)) + " levels that were still uncleared when level upload was disabled on " + toDisplayString(unref(formatDate)("2021-04-01")) + ". ", 1),
                      createVNode("p", null, " Levels are marked as cleared by the community by running commands for a custom-made Discord bot built by TheCryptan. Additionally, the uncleared list is refreshed periodically to look for any unreported levels that have been cleared. ")
                    ]),
                    _: 1
                  }, 8, ["visible", "onUpdate:visible"])
                ]),
                createVNode("div", { class: "self-end" }, [
                  createVNode("h4", { class: "text-xl font-semibold mb-1" }, "Join us today!"),
                  createVNode("p", { class: "mb-2" }, " There are still many ways to help out, even if you're not a platforming pro. We'd love for you to join our community! "),
                  createVNode(_component_SocialLinks)
                ]),
                createVNode("div", { class: "md:hidden" }, [
                  createVNode("h3", { class: "text-2xl font-semibold mt-7" }, "More stats")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(StatSection, { card: "" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UnclearedByDate, { "uncleared-levels": unref(uncleared) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UnclearedByDate, { "uncleared-levels": unref(uncleared) }, null, 8, ["uncleared-levels"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(StatSection, { card: "" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b, _c, _d;
            if (_push2) {
              _push2(ssrRenderComponent(_component_ClearsOverTime, {
                "uncleared-level-count": unref(uncleared).length,
                "clears-by-date": (_a2 = unref(clearSummary).clearsByDate) != null ? _a2 : {},
                winners: (_b = unref(clearSummary).winners) != null ? _b : {}
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ClearsOverTime, {
                  "uncleared-level-count": unref(uncleared).length,
                  "clears-by-date": (_c = unref(clearSummary).clearsByDate) != null ? _c : {},
                  winners: (_d = unref(clearSummary).winners) != null ? _d : {}
                }, null, 8, ["uncleared-level-count", "clears-by-date", "winners"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(StatSection, { card: "" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b;
            if (_push2) {
              _push2(ssrRenderComponent(_component_ClearLeaderboard, {
                "clears-by-person": (_a2 = unref(clearSummary).clearsByPerson) != null ? _a2 : {}
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ClearLeaderboard, {
                  "clears-by-person": (_b = unref(clearSummary).clearsByPerson) != null ? _b : {}
                }, null, 8, ["clears-by-person"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(StatSection, { card: "" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_StylePieChart, { "uncleared-levels": unref(uncleared) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_StylePieChart, { "uncleared-levels": unref(uncleared) }, null, 8, ["uncleared-levels"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(2, (i) => {
          _push(ssrRenderComponent(unref(script), {
            key: i,
            class: "w-full",
            height: "100%"
          }, null, _parent));
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(ssrRenderComponent(StatSection, {
            key: i,
            class: "force-visible",
            card: ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(script), {
                  class: "w-full",
                  height: "100%"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(script), {
                    class: "w-full",
                    height: "100%"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UnclearedStats.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-25435b57"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Is Super Mario Maker Beaten Yet?",
      ogTitle: "Is Super Mario Maker Beaten Yet?",
      description: "Click here to find out!",
      ogDescription: "Click here to find out!",
      ogImage: {
        url: "https://www.issmmbeatenyet.com/img/mario.png",
        width: 775,
        height: 775,
        alt: "Mario in a builder outfit",
        type: "image/png"
      },
      ogImageSecureUrl: "https://www.issmmbeatenyet.com/img/mario.png",
      twitterCard: "summary_large_image",
      themeColor: SMM_YELLOW
    });
    const { theAnswer } = useTheAnswer();
    const promptText = computed(
      () => unref(theAnswer) === "Not yet" ? "See how we're doing" : "Check out the journey"
    );
    useRoute();
    const dataReady = ref(false);
    const scrolled = ref(false);
    const forceStatsScroll = ref(false);
    function promptScroll() {
      dataReady.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheAnswer = __nuxt_component_0;
      const _component_ClearedStats = __nuxt_component_1;
      const _component_UnclearedStats = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(mergeProps({
        class: ["h-dvh", [
          "position-relative",
          unref(dataReady) || unref(forceStatsScroll) ? "scroll-snap" : "overflow-hidden"
        ]]
      }, _attrs))} data-v-da2fee86><div class="pane relative h-svh" data-v-da2fee86>`);
      _push(ssrRenderComponent(_component_TheAnswer, { class: "h-svh" }, null, _parent));
      _push(`<div class="${ssrRenderClass([!unref(dataReady) && "opacity-0", "absolute bottom-0 pb-3 left-2/4 transition-opacity"])}"${ssrIncludeBooleanAttr(!unref(dataReady)) ? " inert" : ""} data-v-da2fee86><a href="#stats" class="-translate-x-2/4 mb-5 text-xl grid place-content-center relative text-center" data-v-da2fee86><div data-v-da2fee86>${ssrInterpolate(unref(promptText))}</div><div class="scroll-arrow justify-self-center" data-v-da2fee86></div></a></div></div>`);
      if (unref(theAnswer) === "Yes") {
        _push(ssrRenderComponent(_component_ClearedStats, {
          id: "stats",
          class: "pane pb-10 md:pb-0 min-h-dvh md:h-dvh",
          visible: unref(scrolled),
          onReady: promptScroll
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_UnclearedStats, {
          id: "stats",
          class: "pane pb-10 md:pb-0 min-h-dvh md:h-dvh",
          visible: unref(scrolled),
          onReady: promptScroll
        }, null, _parent));
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-da2fee86"]]);

export { index as default };
//# sourceMappingURL=index-2da2b0a9.mjs.map
