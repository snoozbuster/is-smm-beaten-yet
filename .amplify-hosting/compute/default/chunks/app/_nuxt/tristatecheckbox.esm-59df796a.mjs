import { s as script$2 } from './index.esm-37de8322.mjs';
import { s as script$3 } from './index.esm-73f2f135.mjs';
import { s as script$4 } from './basecomponent.esm-8ef3d388.mjs';
import { B as BaseStyle } from '../server.mjs';
import { resolveComponent, openBlock, createElementBlock, mergeProps, createElementVNode, toDisplayString, renderSlot, normalizeClass, createVNode } from 'vue';
import './baseicon.esm-f3995527.mjs';
import '../../../index.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vue/server-renderer';

var css = "\n@layer primevue {\n    .p-checkbox {\n        position: relative;\n        display: inline-flex;\n        user-select: none;\n        vertical-align: bottom;\n    }\n\n    .p-checkbox-input {\n        cursor: pointer;\n    }\n\n    .p-checkbox-box {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-tristatecheckbox p-checkbox p-component", {
      "p-highlight": instance.active,
      "p-disabled": props.disabled
    }];
  },
  box: "p-checkbox-box",
  input: "p-checkbox-input",
  checkIcon: "p-checkbox-icon",
  uncheckIcon: "p-checkbox-icon",
  nullableIcon: "p-checkbox-icon"
};
var TriStateCheckboxStyle = BaseStyle.extend({
  name: "tristatecheckbox",
  css,
  classes
});
var script$1 = {
  name: "BaseTriStateCheckbox",
  "extends": script$4,
  props: {
    modelValue: null,
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: TriStateCheckboxStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "TriStateCheckbox",
  "extends": script$1,
  emits: ["update:modelValue", "change", "focus", "blur"],
  methods: {
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          active: this.active,
          disabled: this.disabled
        }
      });
    },
    updateModel: function updateModel() {
      var newValue;
      switch (this.modelValue) {
        case true:
          newValue = false;
          break;
        case false:
          newValue = null;
          break;
        default:
          newValue = true;
          break;
      }
      this.$emit("update:modelValue", newValue);
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        this.updateModel();
        this.$emit("change", event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.$emit("blur", event);
    }
  },
  computed: {
    active: function active() {
      return this.modelValue != null;
    },
    checked: function checked() {
      return this.modelValue === true;
    },
    ariaValueLabel: function ariaValueLabel() {
      return this.modelValue ? this.$primevue.config.locale.aria.trueLabel : this.modelValue === false ? this.$primevue.config.locale.aria.falseLabel : this.$primevue.config.locale.aria.nullLabel;
    }
  },
  components: {
    CheckIcon: script$2,
    TimesIcon: script$3
  }
};
var _hoisted_1 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_2 = ["id", "value", "checked", "tabindex", "disabled", "readonly", "aria-labelledby", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = resolveComponent("CheckIcon");
  var _component_TimesIcon = resolveComponent("TimesIcon");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, $options.getPTOptions("root"), {
    "data-pc-name": "tristatecheckbox",
    "data-p-highlight": $options.active,
    "data-p-disabled": _ctx.disabled
  }), [createElementVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.modelValue,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions("input")), null, 16, _hoisted_2), createElementVNode("span", mergeProps({
    role: "status",
    "class": "p-hidden-accessible",
    "aria-live": "polite"
  }, $options.getPTOptions("hiddenValueLabel"), {
    "data-p-hidden-accessible": true
  }), toDisplayString($options.ariaValueLabel), 17), createElementVNode("div", mergeProps({
    "class": _ctx.cx("box")
  }, $options.getPTOptions("box")), [_ctx.modelValue === true ? renderSlot(_ctx.$slots, "checkicon", {
    key: 0,
    "class": normalizeClass(_ctx.cx("checkIcon"))
  }, function() {
    return [createVNode(_component_CheckIcon, mergeProps({
      "class": _ctx.cx("checkIcon")
    }, $options.getPTOptions("checkIcon")), null, 16, ["class"])];
  }) : _ctx.modelValue === false ? renderSlot(_ctx.$slots, "uncheckicon", {
    key: 1,
    "class": normalizeClass(_ctx.cx("uncheckIcon"))
  }, function() {
    return [createVNode(_component_TimesIcon, mergeProps({
      "class": _ctx.cx("uncheckIcon")
    }, $options.getPTOptions("uncheckIcon")), null, 16, ["class"])];
  }) : renderSlot(_ctx.$slots, "nullableicon", {
    key: 2,
    "class": normalizeClass(_ctx.cx("nullableIcon"))
  })], 16)], 16, _hoisted_1);
}
script.render = render;

export { script as default };
//# sourceMappingURL=tristatecheckbox.esm-59df796a.mjs.map
