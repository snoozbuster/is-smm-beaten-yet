import{s as b}from"./index.esm.b44db6e8.js";import{s as h}from"./index.esm.ec66cc8e.js";import{s as m}from"./basecomponent.esm.7e777536.js";import{av as f,ae as r,o as k,c as g,a as t,Q as l,t as y,at as i,b as u,l as s}from"./entry.ddd72df0.js";import"./baseicon.esm.3fb8f7a9.js";var v=`
@layer primevue {
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
    }

    .p-checkbox-input {
        cursor: pointer;
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
`,I={root:function(a){var c=a.instance,o=a.props;return["p-tristatecheckbox p-checkbox p-component",{"p-highlight":c.active,"p-disabled":o.disabled}]},box:"p-checkbox-box",input:"p-checkbox-input",checkIcon:"p-checkbox-icon",uncheckIcon:"p-checkbox-icon",nullableIcon:"p-checkbox-icon"},x=f.extend({name:"tristatecheckbox",css:v,classes:I}),V={name:"BaseTriStateCheckbox",extends:m,props:{modelValue:null,disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:x,provide:function(){return{$parentInstance:this}}},C={name:"TriStateCheckbox",extends:V,emits:["update:modelValue","change","focus","blur"],methods:{getPTOptions:function(a){return this.ptm(a,{context:{active:this.active,disabled:this.disabled}})},updateModel:function(){var a;switch(this.modelValue){case!0:a=!1;break;case!1:a=null;break;default:a=!0;break}this.$emit("update:modelValue",a)},onChange:function(a){!this.disabled&&!this.readonly&&(this.updateModel(),this.$emit("change",a))},onFocus:function(a){this.$emit("focus",a)},onBlur:function(a){this.$emit("blur",a)}},computed:{active:function(){return this.modelValue!=null},checked:function(){return this.modelValue===!0},ariaValueLabel:function(){return this.modelValue?this.$primevue.config.locale.aria.trueLabel:this.modelValue===!1?this.$primevue.config.locale.aria.falseLabel:this.$primevue.config.locale.aria.nullLabel}},components:{CheckIcon:b,TimesIcon:h}},T=["data-p-highlight","data-p-disabled"],S=["id","value","checked","tabindex","disabled","readonly","aria-labelledby","aria-label"];function B(e,a,c,o,L,n){var d=r("CheckIcon"),p=r("TimesIcon");return k(),g("div",l({class:e.cx("root")},n.getPTOptions("root"),{"data-pc-name":"tristatecheckbox","data-p-highlight":n.active,"data-p-disabled":e.disabled}),[t("input",l({id:e.inputId,type:"checkbox",class:[e.cx("input"),e.inputClass],style:e.inputStyle,value:e.modelValue,checked:n.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,onFocus:a[0]||(a[0]=function(){return n.onFocus&&n.onFocus.apply(n,arguments)}),onBlur:a[1]||(a[1]=function(){return n.onBlur&&n.onBlur.apply(n,arguments)}),onChange:a[2]||(a[2]=function(){return n.onChange&&n.onChange.apply(n,arguments)})},n.getPTOptions("input")),null,16,S),t("span",l({role:"status",class:"p-hidden-accessible","aria-live":"polite"},n.getPTOptions("hiddenValueLabel"),{"data-p-hidden-accessible":!0}),y(n.ariaValueLabel),17),t("div",l({class:e.cx("box")},n.getPTOptions("box")),[e.modelValue===!0?i(e.$slots,"checkicon",{key:0,class:s(e.cx("checkIcon"))},function(){return[u(d,l({class:e.cx("checkIcon")},n.getPTOptions("checkIcon")),null,16,["class"])]}):e.modelValue===!1?i(e.$slots,"uncheckicon",{key:1,class:s(e.cx("uncheckIcon"))},function(){return[u(p,l({class:e.cx("uncheckIcon")},n.getPTOptions("uncheckIcon")),null,16,["class"])]}):i(e.$slots,"nullableicon",{key:2,class:s(e.cx("nullableIcon"))})],16)],16,T)}C.render=B;export{C as default};
