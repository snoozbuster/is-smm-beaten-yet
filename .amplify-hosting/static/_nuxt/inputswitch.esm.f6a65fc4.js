import{s as r}from"./basecomponent.esm.7e777536.js";import{av as u,o as d,c as p,a as s,Q as l}from"./entry.ddd72df0.js";var o=`
@layer primevue {
    .p-inputswitch {
        display: inline-block;
    }

    .p-inputswitch-input {
        cursor: pointer;
    }

    .p-inputswitch-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid transparent;
    }

    .p-inputswitch-slider:before {
        position: absolute;
        content: '';
        top: 50%;
    }
}
`,c={root:{position:"relative"}},h={root:function(t){var a=t.instance,i=t.props;return["p-inputswitch p-component",{"p-highlight":a.checked,"p-disabled":i.disabled}]},input:"p-inputswitch-input",slider:"p-inputswitch-slider"},b=u.extend({name:"inputswitch",css:o,classes:h,inlineStyles:c}),f={name:"BaseInputSwitch",extends:r,props:{modelValue:{type:null,default:!1},trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:b,provide:function(){return{$parentInstance:this}}},y={name:"InputSwitch",extends:f,emits:["update:modelValue","change","focus","blur"],methods:{getPTOptions:function(t){return this.ptm(t,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(t){if(!this.disabled&&!this.readonly){var a=this.checked?this.falseValue:this.trueValue;this.$emit("update:modelValue",a),this.$emit("change",t)}},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){this.$emit("blur",t)}},computed:{checked:function(){return this.modelValue===this.trueValue}}},m=["data-p-highlight","data-p-disabled"],g=["id","checked","tabindex","disabled","readonly","aria-checked","aria-labelledby","aria-label"];function k(e,t,a,i,v,n){return d(),p("div",l({class:e.cx("root"),style:e.sx("root")},n.getPTOptions("root"),{"data-pc-name":"inputswitch","data-p-highlight":n.checked,"data-p-disabled":e.disabled}),[s("input",l({id:e.inputId,type:"checkbox",role:"switch",class:[e.cx("input"),e.inputClass],style:e.inputStyle,checked:n.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,"aria-checked":n.checked,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,onFocus:t[0]||(t[0]=function(){return n.onFocus&&n.onFocus.apply(n,arguments)}),onBlur:t[1]||(t[1]=function(){return n.onBlur&&n.onBlur.apply(n,arguments)}),onChange:t[2]||(t[2]=function(){return n.onChange&&n.onChange.apply(n,arguments)})},n.getPTOptions("input")),null,16,g),s("span",l({class:e.cx("slider")},n.getPTOptions("slider")),null,16)],16,m)}y.render=k;export{y as default};
