import { _ as __nuxt_component_0 } from './nuxt-link-09578c26.mjs';
import { d as CourseWorldCard, e as COURSE_WORLD_GREEN } from './CourseWorldCard-e710f316.mjs';
import script$7 from './datatable.esm-95bd0c9b.mjs';
import script$8 from './menu.esm-963c489c.mjs';
import script$9 from './inputswitch.esm-a6e008cf.mjs';
import script$a from './checkbox.esm-b7eb6017.mjs';
import script$b from './column.esm-033b4d89.mjs';
import script$c from './skeleton.esm-cef7bc15.mjs';
import script$d from './toast.esm-830e7700.mjs';
import script$e from './progressbar.esm-f74b655d.mjs';
import { useSSRContext, defineComponent, resolveDirective, mergeProps, withCtx, createVNode, createTextVNode, unref, ref, watch, toRef, computed, markRaw, Fragment, withDirectives, isRef, toDisplayString, openBlock, createBlock, withModifiers, createCommentVNode, vShow, renderList, resolveDynamicComponent, createSlots } from 'vue';
import { b as useUnclearedLevels, a as useFormatters, C as COUNTRIES } from './useFormatters-0f1d4919.mjs';
import { map, filter, groupBy, orderBy, keys, range, some, compact, forEach, random } from 'lodash-es';
import { u as useLevelBrowserSettings, D as DEFAULT_COLUMN_ORDER, L as LEVEL_BROWSER_COLUMNS, a as _sfc_main$1$1, f as filename, _ as _sfc_main$3 } from './useLevelBrowserSettings-0896fa0e.mjs';
import { a as useToast, F as FilterService, b as usePrimeVue, e as __nuxt_component_4, d as FilterMatchMode } from '../server.mjs';
import script from './tag.esm-8f3bcfdc.mjs';
import script$1 from './button.esm-6aefb566.mjs';
import script$2 from './inputtext.esm-ec91fcd7.mjs';
import script$3 from './calendar.esm-c51f7b6b.mjs';
import script$6 from './inputnumber.esm-c153564c.mjs';
import Icon from './Icon-7ea5cbb2.mjs';
import script$4 from './multiselect.esm-6441a746.mjs';
import script$5 from './tristatecheckbox.esm-59df796a.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { DateTime } from 'luxon';
import script$f from './virtualscroller.esm-75fd2f7d.mjs';
import { u as useSeoMeta } from './index-aac5049c.mjs';
import '../../../index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './baseicon.esm-f3995527.mjs';
import './basecomponent.esm-8ef3d388.mjs';
import './index.esm-ab0e51c3.mjs';
import './dropdown.esm-767f3e89.mjs';
import './index.esm-37de8322.mjs';
import './index.esm-e706caf0.mjs';
import './index.esm-73f2f135.mjs';
import './overlayeventbus.esm-0df2206d.mjs';
import './portal.esm-e4a6f08c.mjs';
import './index.esm-0fc14015.mjs';
import './focustrap.esm-8fe62260.mjs';
import './index.esm-e655d8f0.mjs';
import 'accept-language-parser';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './index-92afd306.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const airship = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACvAAAArwAUKsNJgAAAIASURBVDhPpVJta9NQFH7SpBupSTqt2xoUtb4iImidg6BzOBAdtCD4yV/gvxDpT2r9IkJFCp0vDEVRoaC0riaCrl2aNrZp0uu9t0231X6RPXByz7nnnOeelwiEEBQKhWypVFrBfyKTyTwV8vl8NpfLPT6iHVoyrqdHrl1UKhXUat9H1i6qdQsXLl1+Ieq6/mjzdfnB2o1l3M+s487aKuJKDJJAkJjTMCMKUORZ6AsJaKoCORaDpqlo2C1svnufijC2Y8l5uI4NyzKH7NUayuUNLqZp8TsGt+eh6bhcep7P7zjBQXBgAol92EBctwtz28Gzlxu0hSqsPaWHYC30vD7Xm7bNT9EwjLtbH0vG8VgHvr2FnfpnoG1CEZx/5LDkYn62y+VEHAgGowpWr8p4mE0hqs3Ba/zCdr2Bdpt6J9CyB/SecP3LTw8fAjKcQVIXkb65iOV753HFOIqTpyQsLIpjOXsuitNnJB6nKAIn+Pa7jx87/vQhxuN09zRQ0yL8VFUBskx1NUL/g/0pY6tHS++3mlxXFBpIE8LEEKyFzkRrY2/fbsBvt0bWdDgOodsaziDE1BYmYdsEnc7+ly8mZ5BKRIcEz9+6ePWpyx3TwDbCXg5nw9DzCTy6BaFYLN5+QhE039xaupYECQLeikOTRErPdv1nT9mOM+D2V7qF9Mp64S8j1t0uvHAtVwAAAABJRU5ErkJggg==";
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: airship
});
const castle = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACvAAAArwAUKsNJgAAAGnSURBVDhPY9y0aZNvdmHxJgMtjc33X//yZUACH1/fY3h89zaDrLIqAy55RiD9v6ata7Ozre3sKz9UN4EkmN5e2fxPWMf35el5m1uqynzxyYMNAALGaSsPbgIJghTocNz2u/b0Z2pWuL0fIyMjXnkQ///uvXt9gYoYpq44sAmGQXyQOCF5ZqCChmeff0ZKiQqdE+b+D8f37t9X75gya9P9G1cZ8Mkz+vr6btq8ebOvc2A4yDUoYO/6lVAWAwMueZAHGUD+hIqRDFAMEBSVAgvCwPvXz8A0ujgMgOThBohKyTLomDmBJX7//s3w5/dfhhcPLoH5Egp6DCyszAysrKxgPrI83ACnoHgGASFesIIP7z4DFbMxyCpKg/mP7z8FavqFVZ4JLAIE3778AEsgS37++AGMQWyQGDZ5uAEQJ7KBDRKXEQdLwgCyIejycAO4eDjAiji5OBie3H8MdPIfqAwEwAxBl4cbAALv3rxhEJMUZPj/D+JPbIagy6MY8OXzN7CgoAgvPExAfHSMLA+OBT8/v01K2vpQYyDg53eI7eycLGAaHUDkGRgAh2NPJcabuNQAAAAASUVORK5CYII=";
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: castle
});
const ghost_house = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACvAAAArwAUKsNJgAAAHYSURBVDhPnVFLSxtRGD3zMGoyMyrYmGiiNWKsQykKBRftpuDCheAipEv/Qn9F+yu6Ku2miFuli+rChS6k+KjE+GhpJjYaFTM+8THT+93OnSajgvTAB/ecOd/5vnsH2Wz2s6Io1/9bquM48of3b5Wx0Ve4LPzCjW2DEEp2QjEMfhY6aTeVI/88/uYdVDJcWxZmP36C9buEZNsj6OEwpNw6Crtl2KenAW2PaWdMi+KoWITMR8CF67pIRFu5kRpXt37AiDSiv7sroIW5Zvb1wjB0EQA+pXJyhu/bP/2pRiQCizWS1qSFYaYec88a42u5PGz7+F+AWJcgmquvIMKEJ5FM8A0U0zRfHxQ3zMPKIaxyGQ2hEC4ur/Atv4nt4s6dvL6uDvNLK5hdzAGZTGZCkiRXlOzVQzhbxOVXoAcU5Xj1EE5QhwafIh3XOQlicmoGZjqFJz1dnnIbMiSArYNYezs0XednwbPDL/Dy+UCNXv2ddP8vsBzE4nFENM3nZOSHANqYT/N8PIAE0UgQfGp+ib38Xo1GEJk0UG5ubvHTCCQKPjL0DKmOaI0WHMbf4D5MLyz7GxCqgwTUL1/ncL6ziXyhhK0qM8F1HUQbVSj2vqf8BV0tnYyxnhL+AD1oBEuk32TKAAAAAElFTkSuQmCC";
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: ghost_house
});
const ground = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACvAAAArwAUKsNJgAAAFSSURBVDhPY3ROdN6z99peZwYyAaPzBqABEuQbwMTwFUi+geLfICEo+AjEMHE88sxKykpx90/eV2K4ChTgA2JGIP4GxPuA+CQQg8RhGIs8Y0SA+56zJw6AvfDU+DfDN6F/ICaDzFlWBs53TGA2DGCTZ+wtDtjz++kJsAHbL35mePb+D1iBpz4Pg5QgK5gNA9jkGWfWhe5hfXcGbMCHjz8Zfv2G2CDAz8bAxsoMZsMANnnGHbMS9yiwXQcbcPXme4aPn3+BFWirCTLw87GB2TCATR7FABhg4/7NwMzyj+HnV1aGf39QwwEEkOUxZYFASO4zg7jme6BCiH/RAbI8VgNIAXADQM5iAjoLBEBO+/6RHeh8UKRDAC55uAEgZ8Gc/P4RL8PL64IMv4AKYQCXPNwASIAhbEQHuOThBoBMRbYRHeCSZ9y6tL2D+etdQyifRMDAAADopqgluMCo8wAAAABJRU5ErkJggg==";
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: ground
});
const underground = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACvAAAArwAUKsNJgAAAGBSURBVDhPnZE7TwJBFIXP7LIQfBBYWSSCWW3Ewl9nD4UUJhRoYoGPys5Y09pYGi0sDNGYRfARUIGEGASW3XEGWB6DD+KXTGbm3jPn3swloVCojH+i63qBHJ7s0fhmEmxH+eUVzlnEySXT8YGmUW8a5OwqSy/OL5FK7kJbDCJ9tA2f39d/NsS2bNzfGUgldgaaeuXDIKfZY/rZNJEr1BCLzGFlXUe1VIUaVsd2LarBbJnI5/IIBAPd+OPts0G2DvapSyZY8rtQrJogkgRq25jxurER03B9U4KuuiDJUreTVtvCU83EWmQWisdjkEQmQ3lClggsm0JhZlFVwcN7G16PjPC8jGLF7D7mcDHX8aKyZRk9WwYPcghb3Iyya6NpocAeExZcXlDQYRpH17EoTLYGBg5tFsy/tfu3njEXOl3wDlc1d/fMmTDgOFVGcWKjZpxvDf5itMCYgdjeNIwZiO1NgyRWZAP4tYuJTxQrOmP8CTEviT8ujlFEzE81RrHtYR74Au16xSAF+KcBAAAAAElFTkSuQmCC";
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: underground
});
const underwater = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAGUSURBVFhHY/z//z/DQAImKD1gYNQBg8MBZ8+eNa6pqWkBi5ABKNHPBNLc398/Q0BAIJ0cQyjVz/z169dN3tGZJj+lLblYP9zTam5udrpx44amk5PTPqgarABkcXJy8ryLFy+GUaKfcdm2I/8vMekxvPn2n0GX9z2D4vdLDDdv3nyzd+/eM8bGxmdbWlpqoHrAABbcwsLCIuHh4SZfWIQYKNHPWLHj0//Pz26f1eV9t/4Ms1mLogAjA8/fdygGQfWCAbLF9zn0GD7/YmCgRD9j9ryzZ6xFP81++OGvoSDH/8cH/pq28LAxMiAbhAyQLX7w4R+D8Le7ZynRz7hs8/50kGZ5AebzyIaAFMMMQgYwjSCAbDm5+plNvGJTYZpB9Isv/9U12Z5u+Pz1B78h651pp75IOb36+p8Bhpnf3TlrznF3Gkge3XJy9DMnJyVKYzNEV/j3VmTDkDXB5NH1kaOfCZchMPr9D0ZZkCYYTUg9Ok1IPxM2TfSkCYYArenREBgNgdEQGA2B0RAYDYHREBjgEPhrCAAJSwpD/3lA8QAAAABJRU5ErkJggg==";
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: underwater
});
const nsmbu = "data:image/png;base64,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";
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: nsmbu
});
const smb1 = "data:image/png;base64,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";
const __vite_glob_1_1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: smb1
});
const smb3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAACaCAYAAACNKudlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATESURBVHhe7d29axRBHMbxiZBYiI2vOVIpCBYWvlRWImia+AKxiKhEiLCH/4LN3RX6L8gdKBhUtDCFMVUSRJug4BtYBASt4h2+NUEwd+K5I4MI7o4/M7OT3XueDwxhmuQuX1jYH/vS1+12FfW2deYn9TBGBsDIABgZACMDYGQAuTmFajabJb3MthBKpVJTL7PNLx05D6tarVb0xynS0p856bvkbfFwDYCRATAyAEYGwMgAGBkAIwMIMgyRDDruXL8WzU7eKJttIRwdP18/PXGhYbaZchm8BIlcq9Uq1ZjZJrq0Y0hd2jlkdsVw5e2SuvJuyeyypf9/lUqlZrb/hYdrAIwMgJEBMDIARgbAyAAYGYDzebKvQcfE0NZ4bTO7Yri+9CFeH80uW5LBS9rAxDlyrw468kYyeEkbmPBwDYCRATAyAEYGwMgAGBkAIwMIcp6shxx62OGqtGVzvDaZ3eo1P32J12ezSyb5W5Lf48u9zrrmo75+65UhURQ1yuVy3Wx/CxLZl0o0rqrxclVtTKpavGwkf0vye3zR/2NeGUKpGBkAIwNgZACMDICRATAyAOt5suSqj7u3b0VzM9POt7fooYIeLtiUR4+paHTE7JJJhhi+zpPrUw9UY2rG7LJ1ZOR4fezMWf9XhkgGHSEHFBK+hhi+vpcvks+cNjDh4RoAIwNgZACMDICRATAyAEYGABlZD0v2795lXdrzxTfW9a/hTV5ARtaTs2c3r1qXduDcRevSE68i4OEaACMDYGQAjAyAkQEwMgBGBmC9aKBer5cbjUZktomO7NtTGjt80PktMPcfL6jpeLnSV47o82Abye0t+oqPf50HS65U8eXuw4Xm3IvXxb5NJuSVGCFvb/El7aoPCR6uATAyAEYGwMgAGBkAIwNgZADO58mSgYnkdhtft8BIhLy9RXL7T9rtLX9KG3RIOEeWKOLAxBeX21t84eEaACMDYGQAjAyAkQEwMgBGBuB8niwZdPh6be6JY8Pq5Miw2a3e4PoBNTjQb3ar12p3VGulbXbJXK7o8CXIlSG+3ibj61W2IT9P1oMOCR6uATAyAEYGwMgAGBkAIwNgZADW82Rfgw5fr82VvMq21W6r1krH7JJJ3m4zODCgBtfbByaSz+PySlxfrJFDDjp84cDkbzxcA2BkAIwMgJEBMDIARgbAyAAYOYW+6uPl8lfnpX/PWuMwJAc4DCFnjAyAkQEwMgBGBsDIABgZgPU8WfI8kEPdTulU/w/r1SO+nvUhcfnV4q/lSn9e/bltJM8Dkcj6PDnIbTJFfDiqr1f0SmQdmYdrAIwMgJEBMDIARgbAyAAYGUChIneXl9WPpffWtX3lm9q7cYPz0n8r6XW6f65WQV6tW6hhSHt2XnXm5s0uWyGvMOEwhJwxMgBGBsDIABgZACMDYGQAQc6TJW+KkTzUtPPkqfoerxB8PZ8k6zfFSASJLJG3220k+ABVyg1GBsDIABgZACMDYGQAjAzA+TzZ16t1JQ81zRs9LNFDE5s8nCcrHTnrpb+n/lOIS3/3pP9JyMXDNQBGBsDIABgZACMDYGQAjAzAeRgiIRmY9Kqsr/qQCBKZ1hYP1wAYGQAjA2BkAIwMgJEBMDIARgbAyAAYuecp9RN/vfellc8gyAAAAABJRU5ErkJggg==";
const __vite_glob_1_2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: smb3
});
const smw = "data:image/png;base64,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";
const __vite_glob_1_3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: smw
});
function useLevelAssets() {
  const themes = /* @__PURE__ */ Object.assign({ "/assets/img/themes/airship.png": __vite_glob_0_0, "/assets/img/themes/castle.png": __vite_glob_0_1, "/assets/img/themes/ghost_house.png": __vite_glob_0_2, "/assets/img/themes/ground.png": __vite_glob_0_3, "/assets/img/themes/underground.png": __vite_glob_0_4, "/assets/img/themes/underwater.png": __vite_glob_0_5 });
  const themeImages = Object.fromEntries(
    Object.entries(themes).map(([key, value]) => [
      filename(key),
      value.default
    ])
  );
  const styles = /* @__PURE__ */ Object.assign({ "/assets/img/styles/nsmbu.png": __vite_glob_1_0, "/assets/img/styles/smb1.png": __vite_glob_1_1, "/assets/img/styles/smb3.png": __vite_glob_1_2, "/assets/img/styles/smw.png": __vite_glob_1_3 });
  const styleImages = Object.fromEntries(
    Object.entries(styles).map(([key, value]) => [
      filename(key),
      value.default
    ])
  );
  return {
    themeImages,
    styleImages
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LevelBrowserTable",
  __ssrInlineRender: true,
  props: {
    levels: {
      type: Array,
      default: () => []
    }
  },
  emits: ["refresh"],
  setup(__props) {
    var _a;
    const props = __props;
    const keyHack = ref(0);
    const sortField = ref("uploadDate");
    const sortOrder = ref(1);
    const currentTableView = ref([]);
    watch(toRef(props, "levels"), () => {
      currentTableView.value = props.levels;
    }, {
      immediate: true
    });
    const {
      formatDate,
      formatNumber,
      formatPercent
    } = useFormatters();
    const {
      levelBrowserSettings,
      shouldShowTranslation
    } = useLevelBrowserSettings();
    function columnVisible(field) {
      return unref(levelBrowserSettings).visibleColumns[field] !== false;
    }
    const columns = ref((_a = unref(levelBrowserSettings).columnOrder) != null ? _a : DEFAULT_COLUMN_ORDER);
    function handleColumnReorder({
      dragIndex,
      dropIndex
    }) {
      const columnOrder = levelBrowserSettings.value.columnOrder;
      const visibleColumns = columnOrder.filter(columnVisible);
      const trueDragIndex = columnOrder.indexOf(visibleColumns[dragIndex]);
      const trueDropIndex = columnOrder.indexOf(visibleColumns[dropIndex]);
      levelBrowserSettings.value.columnOrder.splice(trueDropIndex, 0, ...levelBrowserSettings.value.columnOrder.splice(trueDragIndex, 1));
    }
    const menu = ref();
    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const settingsMenuItems = computed(() => [{
      label: "Show hacked clears",
      prop: "includeHackedClears"
    }, {
      label: "Translate level titles",
      prop: "enableTranslation"
    }, {
      label: "Fast random levels",
      prop: "disableRouletteAnimation"
    }, {
      label: "Columns",
      items: map(LEVEL_BROWSER_COLUMNS, (title, field) => ({
        label: field === "autoscroll" ? `${title} (All clear!)` : title,
        field,
        disabled: field === "title"
      }))
    }]);
    function initColumns(reset = false) {
      if (!unref(levelBrowserSettings).visibleColumns) {
        levelBrowserSettings.value.visibleColumns = {};
      }
      if (!unref(levelBrowserSettings).columnOrder) {
        levelBrowserSettings.value.columnOrder = [...DEFAULT_COLUMN_ORDER];
      }
      DEFAULT_COLUMN_ORDER.slice(1).forEach((column, i) => {
        const columnOrder = unref(levelBrowserSettings).columnOrder;
        if (!columnOrder.includes(column)) {
          const insertAfter = columnOrder.indexOf(DEFAULT_COLUMN_ORDER[i]);
          columnOrder.splice(insertAfter + 1, 0, column);
        }
      });
      forEach(LEVEL_BROWSER_COLUMNS, (_, field) => {
        if (!(field in levelBrowserSettings.value.visibleColumns) || reset) {
          levelBrowserSettings.value.visibleColumns[field] = true;
        }
      });
    }
    initColumns();
    function translateLevels(levels) {
      if (!unref(levelBrowserSettings).enableTranslation) {
        return levels;
      }
      return levels.map((level) => {
        if (!shouldShowTranslation(level)) {
          return level;
        }
        return markRaw({
          ...level,
          title: level.titleTranslation,
          originalTitle: level.title,
          translated: true
        });
      });
    }
    const numRows = computed(() => unref(currentTableView).length);
    const numHiddenColumns = computed(() => filter(LEVEL_BROWSER_COLUMNS, (_, field) => !columnVisible(field)).length);
    const preparedLevels = computed(() => {
      const localZone = DateTime.local().zone;
      return translateLevels(unref(levelBrowserSettings).includeHackedClears ? props.levels : props.levels.filter(({
        hacked
      }) => !hacked)).map((level) => {
        var _a2;
        return markRaw({
          ...level,
          hasSubworld: Boolean(level.subworld),
          subWorldLength: (_a2 = level.subworld) == null ? void 0 : _a2.worldLength,
          filterDate: new Date(DateTime.fromISO(level.uploadDate).setZone(localZone, {
            keepLocalTime: true
          }).toString())
        });
      });
    });
    const levelsByCreator = computed(() => groupBy(props.levels, "creator"));
    const creators = computed(() => orderBy(keys(unref(levelsByCreator)).map((creator) => ({
      value: creator,
      countryCode: unref(levelsByCreator)[creator][0].countryCode,
      levelCount: unref(levelsByCreator)[creator].length
    })), "levelCount", "desc"));
    const datesWithLevels = computed(() => new Set(props.levels.map(({
      uploadDate
    }) => uploadDate)));
    FilterService.filters.year = (value, filter2) => {
      return value.getFullYear() === filter2.getFullYear();
    };
    FilterService.filters.month = (value, filter2) => {
      return value.getFullYear() === filter2.getFullYear() && value.getMonth() === filter2.getMonth();
    };
    function applyDisabledOptions(options, levelProp) {
      return orderBy(options.map((o) => {
        const count = props.levels.filter((l) => l[levelProp] === o.value).length;
        return {
          ...o,
          disabled: !count,
          count
        };
      }), "count", "desc");
    }
    const countries = computed(() => applyDisabledOptions(COUNTRIES, "countryCode"));
    const themes = computed(() => applyDisabledOptions([{
      value: "Castle"
    }, {
      value: "Ground"
    }, {
      value: "Underground"
    }, {
      value: "Ghost House"
    }, {
      value: "Airship"
    }, {
      value: "Underwater"
    }], "theme"));
    const styles = computed(() => applyDisabledOptions([{
      value: "SMB1",
      name: "Super Mario Bros."
    }, {
      value: "SMW",
      name: "Super Mario World"
    }, {
      value: "NSMBU",
      name: "New Super Mario Bros. U"
    }, {
      value: "SMB3",
      name: "Super Mario Bros. 3"
    }], "style"));
    const timerOptions = computed(() => orderBy(applyDisabledOptions(range(10, 510, 10).map((timer) => ({
      value: timer
    })), "timer"), "value", "asc"));
    const checkpointsOptions = computed(() => orderBy(applyDisabledOptions([{
      label: "No checkpoints",
      value: 0
    }, {
      label: "1 checkpoint",
      value: 1
    }, {
      label: "2 checkpoints",
      value: 2
    }], "checkpoints"), "value", "asc"));
    const filters = ref();
    function resetFilters() {
      filters.value = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS
        },
        title: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH
        },
        filterDate: {
          value: null,
          matchMode: FilterMatchMode.DATE_IS
        },
        stars: {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        },
        players: {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        },
        attempts: {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        },
        creator: {
          value: null,
          matchMode: FilterMatchMode.IN
        },
        countryCode: {
          value: null,
          matchMode: FilterMatchMode.IN
        },
        theme: {
          value: null,
          matchMode: FilterMatchMode.IN
        },
        style: {
          value: null,
          matchMode: FilterMatchMode.IN
        },
        timer: {
          value: null,
          matchMode: FilterMatchMode.IN
        },
        checkpoints: {
          value: null,
          matchMode: FilterMatchMode.IN
        },
        worldLength: {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        },
        hasSubworld: {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        },
        subWorldLength: {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        },
        autoscroll: {
          value: null,
          matchMode: FilterMatchMode.EQUALS
        }
      };
    }
    resetFilters();
    const toast = useToast();
    const selected = ref();
    const isRandomizing = ref(false);
    const randomProgress = ref(0);
    function getRowClass(level) {
      var _a2;
      if (level.levelId === ((_a2 = selected.value) == null ? void 0 : _a2.levelId)) {
        return "p-highlight";
      }
    }
    function selectRandomLevel() {
      let lastIndex = selected.value ? (
        // start with current selection index to avoid selecting the same value
        // that's already selected
        currentTableView.value.indexOf(selected.value)
      ) : -1;
      const isSmallSelection = () => unref(currentTableView).length <= 10;
      const getRandomIndex = () => {
        let newIndex;
        do {
          newIndex = random(0, unref(currentTableView).length - 1);
        } while (unref(currentTableView).length > 1 && lastIndex === newIndex);
        return newIndex;
      };
      const finalIndex = getRandomIndex();
      const numRandomChoices = unref(levelBrowserSettings).disableRouletteAnimation ? 0 : random(22, 26);
      if (isSmallSelection()) {
        const startingIndex = finalIndex - numRandomChoices % unref(currentTableView).length - 1;
        lastIndex = startingIndex < 0 ? startingIndex + unref(currentTableView).length : startingIndex;
      }
      let remainingChoices = numRandomChoices;
      selected.value = void 0;
      isRandomizing.value = true;
      if (!unref(levelBrowserSettings).disableRouletteAnimation) {
        toast.add({
          severity: "success"
        });
      }
      let timer = 0;
      let timerVelocity = 5;
      const timerAcceleration = 3;
      return function highlightRandomLevel() {
        let index;
        if (remainingChoices === 0) {
          index = finalIndex;
        } else if (isSmallSelection()) {
          index = (lastIndex + 1) % unref(currentTableView).length;
        } else {
          index = getRandomIndex();
        }
        lastIndex = index;
        selected.value = unref(currentTableView)[index];
        const tableScrollRoot = document.getElementsByClassName("table-scroller-root")[0];
        const viewportHeight = tableScrollRoot.clientHeight - /* height of header area */
        108;
        const randOffsetFactor = random(-viewportHeight + 100, 0);
        const scrollPos = Math.min(Math.max(0, index * 100 + randOffsetFactor), unref(currentTableView).length * 100);
        tableScrollRoot.scroll({
          top: scrollPos,
          behavior: "instant"
        });
        if (remainingChoices > 0) {
          timer += timerVelocity;
          timerVelocity += timerAcceleration;
          randomProgress.value = (numRandomChoices - remainingChoices) / numRandomChoices * 100;
          remainingChoices--;
          setTimeout(highlightRandomLevel, timer);
        } else {
          randomProgress.value = 100;
          setTimeout(() => {
            toast.removeAllGroups();
            isRandomizing.value = false;
          }, unref(levelBrowserSettings).disableRouletteAnimation ? 0 : 2500);
        }
      }();
    }
    const {
      themeImages,
      styleImages
    } = useLevelAssets();
    const {
      config
    } = usePrimeVue();
    const LevelColumn = defineComponent({
      props: ["data"],
      setup(props2) {
        return () => createVNode(Fragment, null, [props2.data.hacked ? withDirectives(createVNode(script, {
          "class": "cursor-default",
          "severity": "danger",
          "icon": "pi pi-danger",
          "value": "Hacked clear"
        }, null), [[resolveDirective("tooltip"), "'This level\\'s only clears are from known cheaters and still needs to be cleared legitimately'"]]) : void 0, createVNode("div", {
          "class": "mb-1"
        }, [props2.data.translated ? withDirectives(createVNode("span", {
          "class": "border-dotted border-black border-b cursor-help"
        }, [props2.data.title]), [[resolveDirective("tooltip"), `Translated from "${props2.data.originalTitle}"`]]) : createVNode("span", null, [props2.data.title])]), createVNode("span", {
          "class": "text-sm text-gray-400 font-medium text-nowrap"
        }, [props2.data.levelId]), createVNode(__nuxt_component_0, {
          "to": `/levels/${props2.data.levelId}`
        }, {
          default: () => [createVNode(script$1, {
            "class": "p-0 align-baseline ml-2",
            "link": true,
            "size": "small"
          }, {
            default: () => [createTextVNode("Preview")]
          })]
        })]);
      }
    });
    function makeNumericCol(key, ColIcon) {
      return {
        columnProps: {
          dataType: "numeric",
          style: "min-width: 150px",
          pt: {
            headerCell: {
              class: "text-nowrap"
            }
          }
        },
        body: (props2) => Number.isFinite(props2.data[key]) ? createVNode(Fragment, null, [ColIcon && createVNode(ColIcon, null, null), formatNumber(props2.data[key])]) : void 0,
        filter: (props2) => createVNode(script$6, {
          "model-value": props2.filterModel.value,
          "class": "p-column-filter",
          "onInput": ({
            value
          }) => {
            props2.filterModel.value = value;
            props2.filterCallback();
          }
        }, null)
      };
    }
    function makeMultiselectOption(displayKey, OptionIcon) {
      return function({
        option
      }) {
        return createVNode(Fragment, null, [createVNode("div", {
          "class": "mr-3"
        }, [OptionIcon && createVNode(OptionIcon, {
          "option": option
        }, null), createVNode("span", {
          "class": "font-medium"
        }, [option[displayKey]]), option.disabled ? createVNode("div", {
          "class": "text-xs"
        }, [createTextVNode("All levels completed!")]) : void 0]), option.count ? createVNode("span", {
          "class": "ml-auto"
        }, [option.count]) : void 0]);
      };
    }
    const COLUMN_MAP = {
      title: {
        columnProps: {
          frozen: true,
          style: "min-width: 300px"
        },
        body: LevelColumn,
        filter: (props2) => createVNode(script$2, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "type": "text",
          "class": "p-column-filter",
          "placeholder": "Search by name",
          "onInput": props2.filterCallback
        }, null)
      },
      uploadDate: {
        columnProps: {
          filterField: "filterDate",
          class: "text-nowrap",
          filterMatchModeOptions: [...config.filterMatchModeOptions.date.map((key) => {
            return {
              // @ts-expect-error
              label: config.locale[key],
              value: key
            };
          }), {
            label: "By year",
            value: "year"
          }, {
            label: "By month",
            value: "month"
          }],
          dataType: "date",
          style: "min-width: 200px"
        },
        body: (props2) => props2.data.uploadDate ? formatDate(props2.data.uploadDate) : "",
        filter: (props2) => {
          const dateFormat = props2.filterModel.matchMode === "year" ? "yy" : props2.filterModel.matchMode === "month" ? "mm/yy" : "mm/dd/yy";
          return createVNode(script$3, {
            "key": props2.filterModel.matchMode,
            "modelValue": props2.filterModel.value,
            "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
            "class": "p-column-filter min-w-24",
            "view": props2.filterModel.matchMode === "year" ? "year" : props2.filterModel.matchMode === "month" ? "month" : "date",
            "date-format": dateFormat,
            "placeholder": dateFormat,
            "min-date": /* @__PURE__ */ new Date("2016-06-01"),
            "max-date": /* @__PURE__ */ new Date("2021-04-01"),
            "onDate-select": props2.filterCallback
          }, {
            date: ({
              date
            }) => date.selectable && !unref(datesWithLevels).has(`${date.year}-${(date.month + 1).toString().padStart(2, "0")}-${date.day.toString().padStart(2, "0")}`) ? createVNode("strong", {
              "class": "line-through bg-green"
            }, [date.day]) : date.day
          });
        }
      },
      stars: makeNumericCol("stars", () => createVNode("span", {
        "class": "pi pi-star mr-1"
      }, null)),
      players: makeNumericCol("players", () => createVNode("span", {
        "class": "pi pi-users mr-1"
      }, null)),
      attempts: makeNumericCol("attempts", () => createVNode(Icon, {
        "class": "-mt-1 mr-1",
        "name": "material-symbols:footprint"
      }, null)),
      creator: {
        columnProps: {
          showFilterMenu: false
        },
        body: (props2) => {
          var _a2;
          const creatorLevels = unref(levelsByCreator)[props2.data.creator];
          return createVNode(Fragment, null, [createVNode("span", {
            "class": "font-medium"
          }, [props2.data.creator]), !((_a2 = unref(filters).creator.value) == null ? void 0 : _a2.length) && (creatorLevels == null ? void 0 : creatorLevels.length) > 1 ? createVNode(script$1, {
            "class": "text-sm p-0 text-left",
            "link": true,
            "label": `View ${formatNumber(creatorLevels.length - 1)} other level${creatorLevels.length > 2 ? "s" : ""}`,
            "onClick": () => filters.value.creator.value = [props2.data.creator]
          }, null) : void 0]);
        },
        filter: (props2) => {
          return createVNode(script$4, {
            "modelValue": props2.filterModel.value,
            "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
            "class": "p-column-filter",
            "options": unref(creators),
            "option-label": "value",
            "option-value": "value",
            "placeholder": "Any",
            "filter": true,
            "max-selected-labels": 1,
            "virtual-scroller-options": {
              itemSize: 56
            },
            "show-toggle-all": false,
            "pt": {
              panel: {
                style: {
                  width: "300px"
                }
              }
            },
            "onChange": props2.filterCallback
          }, {
            option({
              option
            }) {
              return createVNode(Fragment, null, [createVNode("span", {
                "class": "font-medium mr-auto"
              }, [option.countryCode ? createVNode(_sfc_main$1$1, {
                "class": "mr-2",
                "countryCode": option.countryCode
              }, null) : void 0, option.value]), option.levelCount]);
            }
          });
        }
      },
      countryCode: {
        columnProps: {
          showFilterMenu: false
        },
        body: (props2) => createVNode(Fragment, null, [props2.data.countryCode ? createVNode(_sfc_main$1$1, {
          "class": "mr-2",
          "countryCode": props2.data.countryCode
        }, null) : void 0, props2.data.countryCode]),
        filter: (props2) => createVNode(script$4, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "class": "p-column-filter",
          "options": unref(countries),
          "option-label": "name",
          "option-value": "value",
          "option-disabled": "disabled",
          "placeholder": "Any",
          "max-selected-labels": 1,
          "show-toggle-all": false,
          "onChange": props2.filterCallback
        }, {
          option: makeMultiselectOption("name", ({
            option
          }) => createVNode(_sfc_main$1$1, {
            "class": "mr-2",
            "countryCode": option.value
          }, null))
        })
      },
      style: {
        columnProps: {
          class: "text-nowrap",
          showFilterMenu: false
        },
        body: (props2) => createVNode(Fragment, null, [props2.data.style ? createVNode("img", {
          "class": "inline mr-2",
          "src": styleImages[props2.data.style.toLowerCase()],
          "width": "16",
          "height": "16"
        }, null) : void 0, props2.data.style]),
        filter: (props2) => createVNode(script$4, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "class": "p-column-filter",
          "options": unref(styles),
          "option-label": "name",
          "option-value": "value",
          "option-disabled": "disabled",
          "placeholder": "Any",
          "max-selected-labels": 1,
          "show-toggle-all": false,
          "pt": {
            wrapper: {
              style: {
                "max-height": "fit-content"
              }
            }
          },
          "onChange": props2.filterCallback
        }, {
          option: makeMultiselectOption("name", ({
            option
          }) => createVNode("img", {
            "class": "inline mr-2",
            "src": styleImages[props2.data.style.toLowerCase()],
            "width": "16",
            "height": "16"
          }, null))
        })
      },
      theme: {
        columnProps: {
          showFilterMenu: false
        },
        body: (props2) => createVNode(Fragment, null, [props2.data.theme ? createVNode("img", {
          "class": "inline mr-2",
          "src": themeImages[props2.data.theme.toLowerCase().replace(" ", "_")],
          "width": "20",
          "height": "20"
        }, null) : void 0, props2.data.theme]),
        filter: (props2) => createVNode(script$4, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "class": "p-column-filter",
          "options": unref(themes),
          "option-label": "value",
          "option-value": "value",
          "option-disabled": "disabled",
          "placeholder": "Any",
          "max-selected-labels": 1,
          "show-toggle-all": false,
          "pt": {
            wrapper: {
              style: {
                "max-height": "fit-content"
              }
            }
          },
          "onChange": props2.filterCallback
        }, {
          option: makeMultiselectOption("value", ({
            option
          }) => createVNode("img", {
            "class": "inline mr-2",
            "src": themeImages[props2.data.theme.toLowerCase().replace(" ", "_")],
            "width": "20",
            "height": "20"
          }, null))
        })
      },
      timer: {
        columnProps: {
          showFilterMenu: false
        },
        body: (props2) => createVNode(Fragment, null, [createVNode("span", {
          "class": "pi pi-clock"
        }, null), createTextVNode(" "), props2.data.timer]),
        filter: (props2) => createVNode(script$4, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "class": "p-column-filter",
          "options": unref(timerOptions),
          "option-label": "value",
          "option-value": "value",
          "option-disabled": "disabled",
          "placeholder": "Any",
          "max-selected-labels": 1,
          "show-toggle-all": false,
          "onChange": props2.filterCallback
        }, {
          option: makeMultiselectOption("value", () => createVNode("span", {
            "class": "pi pi-clock mr-1"
          }, null))
        })
      },
      checkpoints: {
        columnProps: {
          class: "text-nowrap",
          showFilterMenu: false
        },
        body: (props2) => createVNode(Fragment, null, [createVNode(Icon, {
          "class": "mr-2",
          "name": "tdesign:flag"
        }, null), props2.data.checkpoints]),
        filter: (props2) => createVNode(script$4, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "class": "p-column-filter",
          "options": unref(checkpointsOptions),
          "option-label": "name",
          "option-value": "value",
          "option-disabled": "disabled",
          "placeholder": "Any",
          "max-selected-labels": 1,
          "show-toggle-all": false,
          "pt": {
            wrapper: {
              style: {
                "max-height": "fit-content"
              }
            }
          },
          "onChange": props2.filterCallback
        }, {
          option: makeMultiselectOption("label", () => createVNode(Icon, {
            "class": "mr-2",
            "name": "tdesign:flag"
          }, null))
        })
      },
      worldLength: makeNumericCol("worldLength"),
      hasSubworld: {
        columnProps: {
          dataType: "boolean",
          pt: {
            filterInput: {
              class: "leading-[18px]"
            }
          },
          sortable: false
        },
        body: (props2) => createVNode("i", {
          "class": ["pi", {
            "pi-check-circle text-green-500": props2.data.hasSubworld,
            "pi-times-circle text-red-400": !props2.data.hasSubworld
          }]
        }, null),
        filter: (props2) => createVNode(script$5, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "onChange": props2.filterCallback
        }, null)
      },
      subWorldLength: makeNumericCol("subWorldLength"),
      autoscroll: {
        columnProps: {
          dataType: "boolean",
          pt: {
            filterInput: {
              class: "leading-[18px]"
            }
          },
          sortable: false
        },
        body: (props2) => createVNode("i", {
          "class": ["pi", {
            "pi-check-circle text-green-500": props2.data.autoscroll,
            "pi-times-circle text-red-400": !props2.data.autoscroll
          }]
        }, null),
        filter: (props2) => createVNode(script$5, {
          "modelValue": props2.filterModel.value,
          "onUpdate:modelValue": ($event) => props2.filterModel.value = $event,
          "onChange": props2.filterCallback
        }, null)
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimeDataTable = script$7;
      const _component_PrimeMenu = script$8;
      const _component_PrimeInputSwitch = script$9;
      const _component_PrimeCheckbox = script$a;
      const _component_PrimeColumn = script$b;
      const _component_PrimeSkeleton = script$c;
      const _component_PrimeToast = script$d;
      const _component_PrimeProgressBar = script$e;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_PrimeDataTable, {
        key: unref(keyHack),
        filters: unref(filters),
        "onUpdate:filters": ($event) => isRef(filters) ? filters.value = $event : null,
        selection: unref(selected),
        "onUpdate:selection": ($event) => isRef(selected) ? selected.value = $event : null,
        "sort-order": unref(sortOrder),
        "onUpdate:sortOrder": ($event) => isRef(sortOrder) ? sortOrder.value = $event : null,
        "sort-field": unref(sortField),
        "onUpdate:sortField": ($event) => isRef(sortField) ? sortField.value = $event : null,
        value: unref(preparedLevels),
        "data-key": "levelId",
        "row-class": getRowClass,
        scrollable: "",
        "scroll-height": "flex",
        "virtual-scroller-options": {
          itemSize: 100
        },
        "filter-display": "row",
        "global-filter-fields": ["levelId", "title", "titleTranslation", "creator", "country", "style", "theme"],
        pt: {
          table: {
            class: "border-separate"
          },
          header: {
            class: "bg-inherit pt-0 px-0"
          },
          bodyRow: {
            style: {
              height: "100px"
            }
          },
          virtualScroller: {
            root: {
              class: "table-scroller-root min-h-full"
            }
          }
        },
        "row-hover": "",
        "reorderable-columns": "",
        onValueChange: (v) => currentTableView.value = v,
        onColumnReorder: handleColumnReorder
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(script$1), {
              type: "button",
              icon: "pi pi-filter-slash",
              label: "Reset filters",
              outlined: "",
              size: "small",
              onClick: ($event) => resetFilters()
            }, null, _parent2, _scopeId));
            _push2(`<span class="p-input-icon-left"${_scopeId}><i class="pi pi-search ml-2"${_scopeId}></i>`);
            _push2(ssrRenderComponent(unref(script$2), mergeProps({
              modelValue: unref(filters)["global"].value,
              "onUpdate:modelValue": ($event) => unref(filters)["global"].value = $event,
              placeholder: "Find any level...",
              size: "small"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, `Search by level ID, title, creator, country code, style, or theme`, void 0, {
              bottom: true
            })), null, _parent2, _scopeId));
            _push2(`</span>`);
            _push2(ssrRenderComponent(unref(script$1), {
              type: "button",
              icon: "pi pi-question",
              label: "Random level",
              outlined: "",
              size: "small",
              disabled: unref(isRandomizing) || unref(currentTableView).length < 2,
              onClick: ($event) => selectRandomLevel()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(script$1), mergeProps({
              type: "button",
              icon: "pi pi-refresh",
              outlined: "",
              size: "small",
              onClick: ($event) => _ctx.$emit("refresh")
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, `Check for updates`, void 0, {
              bottom: true
            })), null, _parent2, _scopeId));
            _push2(`<span class="text-xl self-center ml-5"${_scopeId}>${ssrInterpolate(unref(formatNumber)(unref(numRows)))} levels <span style="${ssrRenderStyle(props.levels.length && unref(numRows) !== props.levels.length ? null : {
              display: "none"
            })}" class="font-normal"${_scopeId}> (${ssrInterpolate(unref(formatPercent)(unref(numRows), props.levels.length, {
              precision: 1
            }))} of all levels) </span></span><div class="ml-auto"${_scopeId}>`);
            if (unref(numHiddenColumns)) {
              _push2(`<span class="mr-3"${_scopeId}>${ssrInterpolate(unref(formatNumber)(unref(numHiddenColumns)))} ${ssrInterpolate(unref(numHiddenColumns) === 1 ? "column" : "columns")} hidden </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(script$1), {
              type: "button",
              icon: "pi pi-cog",
              "aria-haspopup": "true",
              "aria-controls": "table-settings",
              severity: "secondary",
              size: "small",
              onClick: toggle
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_PrimeMenu, {
              id: "table-settings",
              ref_key: "menu",
              ref: menu,
              model: unref(settingsMenuItems),
              popup: ""
            }, {
              submenuheader: withCtx(({
                item
              }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center"${_scopeId2}>${ssrInterpolate(item.label)} `);
                  if (unref(numHiddenColumns)) {
                    _push3(ssrRenderComponent(unref(script$1), {
                      class: "ml-auto",
                      link: "",
                      size: "small",
                      label: "Show all",
                      onClick: ($event) => initColumns(true)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [createVNode("div", {
                    class: "flex items-center"
                  }, [createTextVNode(toDisplayString(item.label) + " ", 1), unref(numHiddenColumns) ? (openBlock(), createBlock(unref(script$1), {
                    key: 0,
                    class: "ml-auto",
                    link: "",
                    size: "small",
                    label: "Show all",
                    onClick: withModifiers(($event) => initColumns(true), ["stop"])
                  }, null, 8, ["onClick"])) : createCommentVNode("", true)])];
                }
              }),
              item: withCtx(({
                item,
                props: {
                  action
                }
              }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (item.prop) {
                    _push3(`<label${ssrRenderAttrs(action)}${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_PrimeInputSwitch, {
                      modelValue: (
                        // @ts-expect-error
                        unref(levelBrowserSettings)[item.prop]
                      ),
                      "onUpdate:modelValue": ($event) => (
                        // @ts-expect-error
                        unref(levelBrowserSettings)[item.prop] = $event
                      ),
                      class: "mr-3"
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(item.label)}</label>`);
                  } else {
                    _push3(`<label${ssrRenderAttrs(action)}${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_PrimeCheckbox, {
                      modelValue: (
                        // @ts-expect-error
                        unref(levelBrowserSettings).visibleColumns[item.field]
                      ),
                      "onUpdate:modelValue": ($event) => (
                        // @ts-expect-error
                        unref(levelBrowserSettings).visibleColumns[item.field] = $event
                      ),
                      class: "mr-3",
                      binary: ""
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(item.label)}</label>`);
                  }
                } else {
                  return [item.prop ? (openBlock(), createBlock("label", mergeProps({
                    key: 0
                  }, action, {
                    onClick: withModifiers(() => {
                    }, ["stop"])
                  }), [createVNode(_component_PrimeInputSwitch, {
                    modelValue: (
                      // @ts-expect-error
                      unref(levelBrowserSettings)[item.prop]
                    ),
                    "onUpdate:modelValue": ($event) => (
                      // @ts-expect-error
                      unref(levelBrowserSettings)[item.prop] = $event
                    ),
                    class: "mr-3"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), createTextVNode(" " + toDisplayString(item.label), 1)], 16, ["onClick"])) : (openBlock(), createBlock("label", mergeProps({
                    key: 1
                  }, action, {
                    onClick: withModifiers(() => {
                    }, ["stop"])
                  }), [createVNode(_component_PrimeCheckbox, {
                    modelValue: (
                      // @ts-expect-error
                      unref(levelBrowserSettings).visibleColumns[item.field]
                    ),
                    "onUpdate:modelValue": ($event) => (
                      // @ts-expect-error
                      unref(levelBrowserSettings).visibleColumns[item.field] = $event
                    ),
                    class: "mr-3",
                    binary: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]), createTextVNode(" " + toDisplayString(item.label), 1)], 16, ["onClick"]))];
                }
              }),
              end: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(script$1), {
                    class: "ml-2 mt-1",
                    label: "Reset column order",
                    size: "small",
                    link: "",
                    onClick: () => {
                      unref(levelBrowserSettings).columnOrder = [...unref(DEFAULT_COLUMN_ORDER)];
                      columns.value = [...unref(DEFAULT_COLUMN_ORDER)];
                      keyHack.value++;
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [createVNode(unref(script$1), {
                    class: "ml-2 mt-1",
                    label: "Reset column order",
                    size: "small",
                    link: "",
                    onClick: () => {
                      unref(levelBrowserSettings).columnOrder = [...unref(DEFAULT_COLUMN_ORDER)];
                      columns.value = [...unref(DEFAULT_COLUMN_ORDER)];
                      keyHack.value++;
                    }
                  }, null, 8, ["onClick"])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [createVNode("div", {
              class: "flex gap-4"
            }, [createVNode(unref(script$1), {
              type: "button",
              icon: "pi pi-filter-slash",
              label: "Reset filters",
              outlined: "",
              size: "small",
              onClick: ($event) => resetFilters()
            }, null, 8, ["onClick"]), createVNode("span", {
              class: "p-input-icon-left"
            }, [createVNode("i", {
              class: "pi pi-search ml-2"
            }), withDirectives(createVNode(unref(script$2), {
              modelValue: unref(filters)["global"].value,
              "onUpdate:modelValue": ($event) => unref(filters)["global"].value = $event,
              placeholder: "Find any level...",
              size: "small"
            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [[_directive_tooltip, `Search by level ID, title, creator, country code, style, or theme`, void 0, {
              bottom: true
            }]])]), createVNode(unref(script$1), {
              type: "button",
              icon: "pi pi-question",
              label: "Random level",
              outlined: "",
              size: "small",
              disabled: unref(isRandomizing) || unref(currentTableView).length < 2,
              onClick: ($event) => selectRandomLevel()
            }, null, 8, ["disabled", "onClick"]), withDirectives(createVNode(unref(script$1), {
              type: "button",
              icon: "pi pi-refresh",
              outlined: "",
              size: "small",
              onClick: ($event) => _ctx.$emit("refresh")
            }, null, 8, ["onClick"]), [[_directive_tooltip, `Check for updates`, void 0, {
              bottom: true
            }]]), createVNode("span", {
              class: "text-xl self-center ml-5"
            }, [createTextVNode(toDisplayString(unref(formatNumber)(unref(numRows))) + " levels ", 1), withDirectives(createVNode("span", {
              class: "font-normal"
            }, " (" + toDisplayString(unref(formatPercent)(unref(numRows), props.levels.length, {
              precision: 1
            })) + " of all levels) ", 513), [[vShow, props.levels.length && unref(numRows) !== props.levels.length]])]), createVNode("div", {
              class: "ml-auto"
            }, [unref(numHiddenColumns) ? (openBlock(), createBlock("span", {
              key: 0,
              class: "mr-3"
            }, toDisplayString(unref(formatNumber)(unref(numHiddenColumns))) + " " + toDisplayString(unref(numHiddenColumns) === 1 ? "column" : "columns") + " hidden ", 1)) : createCommentVNode("", true), createVNode(unref(script$1), {
              type: "button",
              icon: "pi pi-cog",
              "aria-haspopup": "true",
              "aria-controls": "table-settings",
              severity: "secondary",
              size: "small",
              onClick: toggle
            }), createVNode(_component_PrimeMenu, {
              id: "table-settings",
              ref_key: "menu",
              ref: menu,
              model: unref(settingsMenuItems),
              popup: ""
            }, {
              submenuheader: withCtx(({
                item
              }) => [createVNode("div", {
                class: "flex items-center"
              }, [createTextVNode(toDisplayString(item.label) + " ", 1), unref(numHiddenColumns) ? (openBlock(), createBlock(unref(script$1), {
                key: 0,
                class: "ml-auto",
                link: "",
                size: "small",
                label: "Show all",
                onClick: withModifiers(($event) => initColumns(true), ["stop"])
              }, null, 8, ["onClick"])) : createCommentVNode("", true)])]),
              item: withCtx(({
                item,
                props: {
                  action
                }
              }) => [item.prop ? (openBlock(), createBlock("label", mergeProps({
                key: 0
              }, action, {
                onClick: withModifiers(() => {
                }, ["stop"])
              }), [createVNode(_component_PrimeInputSwitch, {
                modelValue: (
                  // @ts-expect-error
                  unref(levelBrowserSettings)[item.prop]
                ),
                "onUpdate:modelValue": ($event) => (
                  // @ts-expect-error
                  unref(levelBrowserSettings)[item.prop] = $event
                ),
                class: "mr-3"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]), createTextVNode(" " + toDisplayString(item.label), 1)], 16, ["onClick"])) : (openBlock(), createBlock("label", mergeProps({
                key: 1
              }, action, {
                onClick: withModifiers(() => {
                }, ["stop"])
              }), [createVNode(_component_PrimeCheckbox, {
                modelValue: (
                  // @ts-expect-error
                  unref(levelBrowserSettings).visibleColumns[item.field]
                ),
                "onUpdate:modelValue": ($event) => (
                  // @ts-expect-error
                  unref(levelBrowserSettings).visibleColumns[item.field] = $event
                ),
                class: "mr-3",
                binary: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"]), createTextVNode(" " + toDisplayString(item.label), 1)], 16, ["onClick"]))]),
              end: withCtx(() => [createVNode(unref(script$1), {
                class: "ml-2 mt-1",
                label: "Reset column order",
                size: "small",
                link: "",
                onClick: () => {
                  unref(levelBrowserSettings).columnOrder = [...unref(DEFAULT_COLUMN_ORDER)];
                  columns.value = [...unref(DEFAULT_COLUMN_ORDER)];
                  keyHack.value++;
                }
              }, null, 8, ["onClick"])]),
              _: 1
            }, 8, ["model"])])])];
          }
        }),
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}>`);
            if (!props.levels.length) {
              _push2(`<span${_scopeId}><!--[-->`);
              ssrRenderList(10, (i) => {
                _push2(ssrRenderComponent(_component_PrimeSkeleton, {
                  key: i,
                  class: "mb-2",
                  width: "100%",
                  height: "73px"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></span>`);
            } else {
              _push2(`<!--[--><span class="mr-2"${_scopeId}> No levels match current filters. </span>`);
              _push2(ssrRenderComponent(unref(script$1), {
                class: "align-baseline",
                type: "button",
                icon: "pi pi-filter-slash",
                label: "Reset filters",
                size: "small",
                outlined: "",
                onClick: ($event) => resetFilters()
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [createVNode("div", {
              class: "text-center"
            }, [!props.levels.length ? (openBlock(), createBlock("span", {
              key: 0
            }, [(openBlock(), createBlock(Fragment, null, renderList(10, (i) => {
              return createVNode(_component_PrimeSkeleton, {
                key: i,
                class: "mb-2",
                width: "100%",
                height: "73px"
              });
            }), 64))])) : (openBlock(), createBlock(Fragment, {
              key: 1
            }, [createVNode("span", {
              class: "mr-2"
            }, " No levels match current filters. "), createVNode(unref(script$1), {
              class: "align-baseline",
              type: "button",
              icon: "pi pi-filter-slash",
              label: "Reset filters",
              size: "small",
              outlined: "",
              onClick: ($event) => resetFilters()
            }, null, 8, ["onClick"])], 64))])];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(columns), (column) => {
              _push2(`<!--[-->`);
              if (columnVisible(column)) {
                _push2(ssrRenderComponent(_component_PrimeColumn, mergeProps({
                  key: column,
                  field: column,
                  header: unref(LEVEL_BROWSER_COLUMNS)[column],
                  sortable: ""
                }, COLUMN_MAP[column].columnProps), {
                  body: withCtx(({
                    data
                  }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(COLUMN_MAP[column].body), {
                        data
                      }, null), _parent3, _scopeId2);
                    } else {
                      return [(openBlock(), createBlock(resolveDynamicComponent(COLUMN_MAP[column].body), {
                        data
                      }, null, 8, ["data"]))];
                    }
                  }),
                  filter: withCtx((props2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(COLUMN_MAP[column].filter), props2, null), _parent3, _scopeId2);
                    } else {
                      return [(openBlock(), createBlock(resolveDynamicComponent(COLUMN_MAP[column].filter), props2, null, 16))];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
          } else {
            return [(openBlock(true), createBlock(Fragment, null, renderList(unref(columns), (column) => {
              return openBlock(), createBlock(Fragment, null, [columnVisible(column) ? (openBlock(), createBlock(_component_PrimeColumn, mergeProps({
                key: column,
                field: column,
                header: unref(LEVEL_BROWSER_COLUMNS)[column],
                sortable: ""
              }, COLUMN_MAP[column].columnProps), {
                body: withCtx(({
                  data
                }) => [(openBlock(), createBlock(resolveDynamicComponent(COLUMN_MAP[column].body), {
                  data
                }, null, 8, ["data"]))]),
                filter: withCtx((props2) => [(openBlock(), createBlock(resolveDynamicComponent(COLUMN_MAP[column].filter), props2, null, 16))]),
                _: 2
              }, 1040, ["field", "header"])) : createCommentVNode("", true)], 64);
            }), 256))];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_PrimeToast, {
        position: "bottom-center",
        pt: {
          buttonContainer: {
            class: unref(isRandomizing) && "hidden"
          }
        }
      }, createSlots({
        _: 2
      }, [unref(isRandomizing) ? {
        name: "message",
        fn: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>${ssrInterpolate(unref(randomProgress) < 100 ? "Picking a random level..." : "Done!")} `);
            if (unref(randomProgress) < 100) {
              _push2(ssrRenderComponent(_component_PrimeProgressBar, {
                value: unref(randomProgress),
                "show-value": false
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [createVNode("div", null, [createTextVNode(toDisplayString(unref(randomProgress) < 100 ? "Picking a random level..." : "Done!") + " ", 1), unref(randomProgress) < 100 ? (openBlock(), createBlock(_component_PrimeProgressBar, {
              key: 0,
              value: unref(randomProgress),
              "show-value": false
            }, null, 8, ["value"])) : createCommentVNode("", true)])];
          }
        }),
        key: "0"
      } : void 0]), _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LevelBrowserTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LevelBrowserList",
  __ssrInlineRender: true,
  props: {
    levels: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const { formatNumber } = useFormatters();
    const { shouldShowTranslation } = useLevelBrowserSettings();
    const globalFilter = ref("");
    const filteredLevels = computed(
      () => !unref(globalFilter) ? props.levels : props.levels.filter((level) => {
        return some(
          compact([
            level.levelId,
            level.title,
            level.titleTranslation,
            level.creator,
            level.countryCode,
            level.style,
            level.theme
          ]),
          (searchText) => searchText.includes(unref(globalFilter))
        );
      })
    );
    const levelsByCreator = computed(() => groupBy(props.levels, "creator"));
    const creators = computed(
      () => orderBy(
        keys(unref(levelsByCreator)).map((creator) => ({
          value: creator,
          countryCode: unref(levelsByCreator)[creator][0].countryCode,
          levelCount: unref(levelsByCreator)[creator].length
        })),
        "levelCount",
        "desc"
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrimeInputText = script$2;
      const _component_PrimeVirtualScroller = script$f;
      const _component_LevelListItem = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-left h-full flex flex-col" }, _attrs))}><span class="text-xl mb-3 text-course-world-contrast">${ssrInterpolate(unref(formatNumber)(__props.levels.length))} levels from ${ssrInterpolate(unref(formatNumber)(unref(creators).length))} creators </span><div class="bg-course-world-card text-course-world-card-contrast rounded-lg h-full border shadow-xl">`);
      if (!__props.levels.length) {
        _push(`<div class="p-3">Loading levels...</div>`);
      } else {
        _push(`<div><span class="p-input-icon-left w-full p-2"><i class="pi pi-search"></i>`);
        _push(ssrRenderComponent(_component_PrimeInputText, {
          modelValue: unref(globalFilter),
          "onUpdate:modelValue": ($event) => isRef(globalFilter) ? globalFilter.value = $event : null,
          placeholder: "Search by level ID, title, creator, and more",
          size: "small",
          pt: {
            root: {
              class: "w-full"
            }
          }
        }, null, _parent));
        _push(`</span></div>`);
      }
      _push(ssrRenderComponent(_component_PrimeVirtualScroller, {
        items: unref(filteredLevels),
        "item-size": 125
      }, {
        item: withCtx(({ item: data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-3 border-b border-collapse"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_LevelListItem, {
              level: data,
              "translate-level-title": unref(shouldShowTranslation)(data)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-3 border-b border-collapse" }, [
                createVNode(_component_LevelListItem, {
                  level: data,
                  "translate-level-title": unref(shouldShowTranslation)(data)
                }, null, 8, ["level", "translate-level-title"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LevelBrowserList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "levels",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "SMM1 Uncleared Level Browser",
      ogTitle: "SMM1 Uncleared Level Browser",
      themeColor: COURSE_WORLD_GREEN
    });
    const toast = useToast();
    const { uncleared, load } = useUnclearedLevels();
    const { formatNumber } = useFormatters();
    async function refreshLevels() {
      const previousLevelCount = uncleared.value.length;
      await load();
      const newLevelCount = uncleared.value.length;
      const levelsRemoved = previousLevelCount - newLevelCount;
      toast.add({
        severity: "success",
        summary: "Table refreshed",
        detail: levelsRemoved ? `${formatNumber(
          levelsRemoved
        )} levels have been cleared since last update` : "No levels cleared since last update. Note that the level list may be up to 5 minutes behind.",
        life: 4e3
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CourseWorldCard = CourseWorldCard;
      const _component_LevelBrowserTable = _sfc_main$2;
      const _component_LevelBrowserList = _sfc_main$1;
      const _component_NuxtPage = __nuxt_component_4;
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-dvh overflow-hidden bg-course-world" }, _attrs))}><div class="h-full max-w-[1800px] mt-auto mx-auto flex flex-col p-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/#stats",
        class: "w-fit text-course-world-contrast text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="pi pi-angle-left"${_scopeId}></span> Back to stats `);
          } else {
            return [
              createVNode("span", { class: "pi pi-angle-left" }),
              createTextVNode(" Back to stats ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-course-world-contrast text-4xl lg:mb-5"><span class="hidden lg:inline"> Uncleared Super Mario Maker 1 Levels </span><span class="lg:hidden"> Uncleared levels </span><button${ssrRenderAttrs(mergeProps({ class: "ml-2 opacity-50 hover:opacity-100 transition-opacity" }, ssrGetDirectiveProps(
        _ctx,
        _directive_tooltip,
        "Level list is synced with the game every ~5 minutes.",
        void 0,
        { focus: true }
      )))}><span class="text-2xl pi pi-question-circle"></span></button></h1><div class="hidden lg:block grow">`);
      _push(ssrRenderComponent(_component_CourseWorldCard, {
        grid: false,
        class: "h-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LevelBrowserTable, {
              levels: unref(uncleared),
              onRefresh: refreshLevels
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LevelBrowserTable, {
                levels: unref(uncleared),
                onRefresh: refreshLevels
              }, null, 8, ["levels"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="lg:hidden grow">`);
      _push(ssrRenderComponent(_component_LevelBrowserList, { levels: unref(uncleared) }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/levels.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=levels-ab090e83.mjs.map
