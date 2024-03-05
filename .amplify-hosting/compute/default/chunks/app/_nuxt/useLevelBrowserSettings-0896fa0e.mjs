import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import script from './tag.esm-8f3bcfdc.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, resolveDirective, withCtx, createTextVNode, toDisplayString, createVNode, ref, shallowRef, nextTick, readonly, getCurrentInstance, watch, getCurrentScope, onScopeDispose } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-09578c26.mjs';
import Icon from './Icon-7ea5cbb2.mjs';
import { a as useFormatters, d as useRequestEvent } from './useFormatters-0f1d4919.mjs';
import { r as parse, t as getRequestHeader, v as destr, x as isEqual, y as setCookie, z as getCookie, A as deleteCookie } from '../../../index.mjs';
import { f as useNuxtApp } from '../server.mjs';
import { assign, mapValues } from 'lodash-es';

const FILENAME_RE = /(^|[/\\])([^/\\]+?)(?=(\.[^.]+)?$)/;
function filename(path) {
  return path.match(FILENAME_RE)?.[2];
}

const at = "data:image/gif;base64,R0lGODlhgAEAAbMAAAAAAP///7c+QOMGE9wPGu/GxvfOzt69vf/v797e3s7Ozr29vaWlpZSUlP///wAAACH5BAEAAA4ALAAAAACAAQABAAT/cMhJq7046827/2AojmRpnmiqrhXBvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/C4fE6v2+/4vH7P7/v/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQFyKYSLGixYsYM2rcyLGjx48g/0OKHEmypMmTKFOqXMnSYoIAMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJPOfKm0qdOnUKNKnUq1qtWgTK9q3cq1q9evYLdmDUu2rNmzaNM6Hau2rdu3cONqZSu3rt27ePPGpKu3r9+/gKvyDUy4sOHDOQcjXsy4cV7FjiNLnkwWMuXLmDM/tay5s+fPPDmDHk0atOjSqFNLPq26tWvCrF/Lnm03Nu3buNHazs27N9fdvoMLhwp8uPHjRIsjX85cp/Lm0KPDfC69OnLq1rMHx669O27u3sO/Bi++PGry5tN/Rq++PWb27uNHhi+/PmL69vMHxq+/v17+/gVYF/+AAhboFoEGJngWggo2CBaDDkYoloQUGgZhhRgSl+GG/3HoYW0fhgjXhSKW2BOJJqaIE4oqtriUizD+FuOMVrFIY4o23lhijjqGyGOPHv4I5IZCDolhkUZSiGSSES7JZINOPplglFIWSGWVAV6JZX9abplfl17WB2aY8Y1JZntmnplemmqWx2ab4b0JZ3dyzpldnXZWh2ee0e3JZ3N+/rlcoIIeR2ihwx2K6HaLGqloo7w9Cul3k/YoaaWzXYrpeJvSmEABBoQq6qiklmrqqaimquqqrLbq6quwxirrrLTWauutuOaq66gHROTrr8AGK+ywxBZr7LHIJqvsssw26+x0s9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2zxxRhnrPHGHHfs8ccghyzyyCSXXIILJpcgQAQAOw==";
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: at
});
const au = "" + buildAssetsURL("au.f6d93aa7.gif");
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: au
});
const ca = "data:image/gif;base64,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";
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: ca
});
const de = "data:image/gif;base64,R0lGODlhqgEAAcQAAAAAAP///84bIbshJc24MvXMDObDHv/OAP7OAdFKLOAnE94rF94gEN4hEN0gENkdEs7Ozr29vaWlpZSUlCEhIRgYGP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABYALAAAAACqAQABAAX/YAWMZGmeaKqubOu+cCzPdG3feK7vfD9TvqBwSCwaj8ikcskSMZ/QqHRKrVppzqt2y+16v9sseEwum8/okTjNbrvf8Ns6Tq/b7+U5fs/v+4t6f4KDhIUpgYaJiot0iIyPkJFdjpKVlpdIlJibnJ01mp6hoqMkoKSnqJWmqaythauusbJ3sLO2t2m1uLu8k72/wGe6wcTFRsPGyco6yMvOzzDN0NPUJtLV2NDX2dzJ293gwN/h5Ljj5eix5+nsqOvt8KHv8fSY8/X4kff5/Ir7/QAH/QtIkM/AggjrHEzI0M3ChhCFRZyoiqLFRw8varSScaPHKB0/ilQScqRJQCdT/8YpqbIlM5cwJcacCYYlzZstbOLciUInz59qgAp94nMozqJGaSJNGnMpU5dOn6qMKvUk1aojr2L9qHXrxq5eL4INS3Es2YhmzzZMqzYh27YF38INKHduv7p28+HNW28v33h+/7YLLDgd4cLlDiMOp3hxt8aOs0GOXG0y5WmWLz/LrHkZ587eQG+t8MCB6dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AbQ9g0KC48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/VBRAHT768+fPo06tfz769e+bi38ufT7++/fv481uPr7+///8ABiigf/wNaOCBCCao4P+CxRXI4IMQRijhhNk5SOGFGGaoIYIWbujhhyCGiF6HIpZo4okoLkdiiiy26OKFK74o44w0AhhjjTjmqON6N+7o449AXtdjkEQWaaRxQx6p5JI4Jsnkk1Ci6GSUVFap4ZRWZqklg1hu6eWXNo4H5phkHthlmWimmd6ZarbpJndsvinnnNLFSeedeCJnZ5580rlnn4C2+WeghJI5aKGIbnloooxSuWijkC75aKSUEjlppZjueGmmnNK4aaegtvhpqKSaOGqpqH54aqqsYrhqq7BG+GqstCo4a624DnhrrrwSKGavwJr6a7DEqjpssci6emyyzMq6bLPQ2vpstNTqOm3/tdj6mu221nLr7X+7fiuuc+GOa25y5Z6rbgPprmtuu+6KC2+83s5L77b23ottvvpSy2+/0P4LMLMCD4xswQYTi3DCwC7MMK8OP4xrxBLTSnHFsF6MMasab4xqxx6TCnLIoI5MMqcmn4xpyipTynLLkL4MM6Myz4xozTYTinPOgO7MM58+/4xn0EL7eW3R5wqwgAJMN+3001BHLfXUVFdt9dVYZ6311lx37fXXYIct9thkl2021wkgcMDabLft9ttwxy333HTXbffdeOet99589+3334AHLvjghBe+dwFqG6744ow37vjjkEcu+eSUy4145ZhnrvnmnHfu+ed8Xw76/+ikl2766aiTLnrqrLfu+uuwx7726rLXbvvtuOf+N+269+7778C7znvwxBdv/PGOD4/88sw373zcyj8v/fTU9x599dhnr73p12/v/ffgR959+OSXb37f45+v/vrss51++/DH7/378tdvv/P036///sDnz///AJSd/wJIwAJyL3EGTKACWzfABTrwgY9rIAQnSEHBSbCCGMwg3i6owQ560G0c/KAINRjCEZpwgiU8oQoVmMIVujCALXyhDPUXwxnaMH41vKEO1ZfDHfowfD38oRC1F8QhGnF6RTyiEpmXxCU6sXhNfKIUfRfFKVrxdlW8ohZhl8UtejF1XfyiGFWHwOsxmpGJZTyjGqGYxjW6kYptfKMcsRjHOdqRi3W8ox7BmMc9+pGMfwwkHwVJyNKFsZCIpNshE8nIty2ykZA8wCMjychJUhKRlrwkITOpyUByspN+/CQo9SjKUdqxlKaUIypT6cZVslKNrnylGWMpSzHSspZevCUutajLXVqxl76UIjCD6cRhElOJxjymEZOpTCEys5k+fCY0dSjNadqwmtaUITaz6cJtclOF3vymCcMpThGSs5wePCc6SdjHdTayAAYogDznSc962vOe+MynPvfJz376858ADahAB0rQghr0oAhNqEIXylCBEiAEADs=";
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: de
});
const es = "" + buildAssetsURL("es.ae93a51a.gif");
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: es
});
const fr = "data:image/gif;base64,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";
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: fr
});
const gb = "" + buildAssetsURL("gb.3656492c.gif");
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: gb
});
const jp = "data:image/gif;base64,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";
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: jp
});
const mx = "" + buildAssetsURL("mx.8d6ce263.gif");
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: mx
});
const nl = "data:image/gif;base64,R0lGODlhgAEAAcQAAAAAAP///wAzmQQ1mRJBnhlGniVQpjFarH6PsaixxN4hENwiEqxvat6jnfe7t97e3r29vaWlpZSUlP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAACAAQABAAX/oCKOZGmeaKqubOu+cCzPdG3feK7v5cL/wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyA3OhhJsqTJkyhT/6pcybKly5cwY8qcSbOmzZs4c+rcydNkgwBAgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYsw59oLWr169gw4odS7asWalcz6pdy7at27dw2aaNS7eu3bt4836dq7ev37+AA6/lK7iw4cOIEwslrLix48eQzTKOTLmy5ctKJ2PezLmzYs2eQ4seXRc06dOoU4M1rbq169dNWcOeTXu27Nq4c4++rbu378q8fwsffjg48ePI8xpPzrx52+XOo0sPC3269etVq2Pfzn2p9u7gwwf9Lr78dvLm00tHr759cvbu4wuHL79+bvr288PGr79/av7+BSgagAIWuBmBBiZIGf+CCjbYGIMORmgYhBJW+BeFFmaIF4YadhgXhx6GKJeIJFoGYokoUpfiip+x6OKEL8YI2Iky1ugUjTbmmBSOOvZIFI8+BhkAkEL2SGSROR6JZI1KLhljk066CGWUK05JJYpWXklillqGyGWXHX4JZoZijllhmWZGiGaaDa7JZoJuvllgnHIGSGed/d2JZ3567llfn37GB2ig7Q1KaHqGHlpeooqGx2ij3T0K6XmTmilppdZdiul6m3apaafNfQrqe6NSKWqpxJ2K6nyrLvmAAQfEKuustNZq66245qrrrrz26uuvwAYr7LDEFmvsscgmq+ysBAjg7LPQRivttNRWa+3/tdhmq+223Hbr7bfghivuuOSWa+656Kar7rrstuvuu/DGK++89NZr77345qvvvvz26++/AAcs8MAEF2zwwQgnrPDCDDfs8MMQRyzxxBRXbPHFGGes8cYcd+zxxyCHLPLIJJds8skop6zyyiy37PLLMMcs88w012zzzTjnrPPOPPfs889ABy300EQXbfTRSCet9NJMN+3001BHLfXUVFdt9dVYZ6311lx37fXXYIct9thkl2322WinrfbabLft9ttwxy333HTXbffdeOet99589+3334AHLvjghBdu+OGIJ6744ow37vjjkEcu+eSUV2755ZhnrvnmnHfu+eeghy76Neikl2766ainrvrqrLfu+uuwxy777LTXbvvtuOeu++689+7778AHL/zwxBdv/PHIJ6/88iEAADs=";
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: nl
});
const no = "data:image/gif;base64,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";
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: no
});
const nz = "" + buildAssetsURL("nz.00e104c1.gif");
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: nz
});
const se = "data:image/gif;base64,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";
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: se
});
const us = "" + buildAssetsURL("us.a53f9b41.gif");
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: us
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CountryFlag",
  __ssrInlineRender: true,
  props: {
    countryCode: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const glob = /* @__PURE__ */ Object.assign({ "/assets/img/flags/at.gif": __vite_glob_0_0, "/assets/img/flags/au.gif": __vite_glob_0_1, "/assets/img/flags/ca.gif": __vite_glob_0_2, "/assets/img/flags/de.gif": __vite_glob_0_3, "/assets/img/flags/es.gif": __vite_glob_0_4, "/assets/img/flags/fr.gif": __vite_glob_0_5, "/assets/img/flags/gb.gif": __vite_glob_0_6, "/assets/img/flags/jp.gif": __vite_glob_0_7, "/assets/img/flags/mx.gif": __vite_glob_0_8, "/assets/img/flags/nl.gif": __vite_glob_0_9, "/assets/img/flags/no.gif": __vite_glob_0_10, "/assets/img/flags/nz.gif": __vite_glob_0_11, "/assets/img/flags/se.gif": __vite_glob_0_12, "/assets/img/flags/us.gif": __vite_glob_0_13 });
    const images = Object.fromEntries(
      Object.entries(glob).map(([key, value]) => [filename(key), value.default])
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<img${ssrRenderAttrs(mergeProps({
        class: [
          "inline",
          "border",
          __props.countryCode !== "JP" ? "border-transparent" : "border-black/25"
        ],
        src: unref(images)[__props.countryCode.toLowerCase()],
        width: "24",
        height: "16",
        alt: "flag"
      }, _attrs))}>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CountryFlag.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LevelListItem",
  __ssrInlineRender: true,
  props: {
    level: {
      type: Object,
      required: true
    },
    translateLevelTitle: {
      type: Boolean,
      default: false
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    showIcons: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const { formatDate, formatNumber } = useFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimeTag = script;
      const _component_CountryFlag = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = Icon;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      if (__props.level.hacked) {
        _push(ssrRenderComponent(_component_PrimeTag, mergeProps({
          class: "cursor-default mb-1",
          severity: "danger",
          icon: "pi pi-danger",
          value: "Hacked clear",
          tabindex: "1"
        }, ssrGetDirectiveProps(
          _ctx,
          _directive_tooltip,
          "This level's only clears are from known cheaters and still needs to be cleared legitimately",
          void 0,
          { focus: true }
        )), null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex"><div class="${ssrRenderClass([!__props.showPreview && "max-w-[300px]", "w-8/12 mr-2 flex flex-col justify-between"])}"><div>`);
      if (__props.showIcons) {
        _push(`<!--[--><button${ssrRenderAttrs(mergeProps({ class: "mr-2 align-middle" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, `This level uses the ${__props.level.style} style`, void 0, {
          focus: true,
          right: true
        })))}>`);
        if (__props.level.style) {
          _push(`<img${ssrRenderAttr("src", `/img/${__props.level.style.toLowerCase()}.png`)}${ssrRenderAttr("width", 12)}${ssrRenderAttr("height", 12)}>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button><button${ssrRenderAttrs(mergeProps({ class: "mr-3 align-middle" }, ssrGetDirectiveProps(
          _ctx,
          _directive_tooltip,
          `This level uses the ${__props.level.theme.toLowerCase()} theme`,
          void 0,
          {
            focus: true,
            right: true
          }
        )))}><img${ssrRenderAttr("src", `/img/themes/${__props.level.theme.toLowerCase().replace(" ", "_")}.png`)}${ssrRenderAttr("width", 16)}${ssrRenderAttr("height", 16)}></button><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (__props.translateLevelTitle) {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: "cursor-pointer text-left",
          tabindex: "1"
        }, ssrGetDirectiveProps(_ctx, _directive_tooltip, `Translated from "${__props.level.title}"`, void 0, { focus: true })))}><span class="border-dotted border-black border-b">${ssrInterpolate(__props.level.titleTranslation)}</span></span>`);
      } else {
        _push(`<span>${ssrInterpolate(__props.level.title)}</span>`);
      }
      _push(`</div><div class="mb-1 font-medium">`);
      _push(ssrRenderComponent(_component_CountryFlag, {
        "country-code": __props.level.countryCode
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.level.creator)}</div>`);
      if (__props.showPreview) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "text-sm text-gray-400 font-medium text-nowrap",
          to: `/levels/${__props.level.levelId}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.level.levelId)} `);
              _push2(ssrRenderComponent(_component_Icon, {
                class: "align-middle ml-1 text-blue-600",
                name: "icon-park-outline:preview-open"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(toDisplayString(__props.level.levelId) + " ", 1),
                createVNode(_component_Icon, {
                  class: "align-middle ml-1 text-blue-600",
                  name: "icon-park-outline:preview-open"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ml-auto text-right"><div class="font-medium text-nowrap"><span class="hidden lg:inline">Uploaded on</span> ${ssrInterpolate(__props.level.uploadDate ? unref(formatDate)(__props.level.uploadDate, true) : "")}</div><div class="text-nowrap">`);
      if (Number.isFinite(__props.level.stars)) {
        _push(`<!--[--><span class="pi pi-star"></span> ${ssrInterpolate(unref(formatNumber)(__props.level.stars))}<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="pi pi-clock ml-3"></span> ${ssrInterpolate(__props.level.timer)} `);
      if (__props.level.autoscroll) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: "ml-2" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Contains auto-scroll", void 0, {
          left: true,
          focus: true
        })))}><span class="pi pi-forward"></span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><button${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_tooltip, "Total attempts of this level", void 0, {
        focus: true,
        left: true
      }))}>`);
      _push(ssrRenderComponent(_component_Icon, {
        class: "-mt-1",
        name: "material-symbols:footprint"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(formatNumber)(__props.level.attempts))}</button>`);
      if (Number.isFinite(__props.level.players)) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: "ml-3" }, ssrGetDirectiveProps(
          _ctx,
          _directive_tooltip,
          "Number of players that have attempted this level",
          void 0,
          {
            focus: true,
            left: true
          }
        )))}><span class="pi pi-users"></span> ${ssrInterpolate(unref(formatNumber)(__props.level.players))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LevelListItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2;
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = hasExpired ? void 0 : (_a2 = cookies[name]) != null ? _a2 : (_a = opts.default) == null ? void 0 : _a.call(opts);
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function getLifeCycleTarget(target) {
  const instance = target || getCurrentInstance();
  return instance;
}
function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}
function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter,
    ...watchOptions
  } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter
    }
  );
  return { stop, pause, resume, isActive };
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
const handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
};
const customStorageEventName = "vueuse-storage";
function useStorage(key, defaults, storage, options = {}) {
  var _a;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    },
    initOnMounted
  } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults === "function" ? defaults() : defaults);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a2;
        return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
      })();
    } catch (e) {
      onError(e);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults);
  const type = guessSerializerType(rawInit);
  const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  );
  if (window && listenToStorageChanges) {
    tryOnMounted(() => {
      useEventListener(window, "storage", update);
      useEventListener(window, customStorageEventName, updateFromCustomEvent);
      if (initOnMounted)
        update();
    });
  }
  if (!initOnMounted)
    update();
  return data;
  function write(v) {
    try {
      if (v == null) {
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v);
        const oldValue = storage.getItem(key);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          if (window) {
            window.dispatchEvent(new CustomEvent(customStorageEventName, {
              detail: {
                key,
                oldValue,
                newValue: serialized,
                storageArea: storage
              }
            }));
          }
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e) {
      onError(e);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
}
const LEVEL_BROWSER_COLUMNS = {
  title: "Level name",
  uploadDate: "Upload date",
  stars: "Stars",
  players: "Players",
  attempts: "Attempts",
  creator: "Creator",
  countryCode: "Country",
  style: "Style",
  theme: "Theme",
  timer: "Timer",
  checkpoints: "Checkpoints",
  worldLength: "Main World Length",
  autoscroll: "Autoscroll",
  hasSubworld: "Subworld",
  subWorldLength: "Subworld Length"
};
const DEFAULT_COLUMN_ORDER = [
  "title",
  "uploadDate",
  "stars",
  "players",
  "attempts",
  "creator",
  "countryCode",
  "style",
  "theme",
  "timer",
  "autoscroll",
  "hasSubworld",
  "checkpoints",
  "worldLength",
  "subWorldLength"
];
function useLevelBrowserSettings() {
  const legacyLevelBrowserSettings = useStorage("levelBrowser", {});
  const levelBrowserSettings = useCookie("levelBrowser", {
    default: () => assign(
      {
        includeHackedClears: true,
        enableTranslation: true,
        disableRouletteAnimation: false,
        columnOrder: DEFAULT_COLUMN_ORDER,
        visibleColumns: mapValues(
          LEVEL_BROWSER_COLUMNS,
          (_, columnId) => columnId !== "autoscroll"
        )
      },
      unref(legacyLevelBrowserSettings)
    )
  });
  function shouldShowTranslation(level) {
    return Boolean(
      unref(levelBrowserSettings).enableTranslation && (level.countryCode === "JP" || level.hacked) && level.titleTranslation && level.title.localeCompare(level.titleTranslation, "en", {
        sensitivity: "accent"
      })
    );
  }
  return { levelBrowserSettings, shouldShowTranslation };
}

export { DEFAULT_COLUMN_ORDER as D, LEVEL_BROWSER_COLUMNS as L, _sfc_main as _, _sfc_main$1 as a, filename as f, useLevelBrowserSettings as u };
//# sourceMappingURL=useLevelBrowserSettings-0896fa0e.mjs.map
