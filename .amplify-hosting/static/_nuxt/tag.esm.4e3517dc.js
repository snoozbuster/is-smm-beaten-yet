import{s as i}from"./basecomponent.esm.7e777536.js";import{av as p,o as s,c as t,E as l,Q as a,R as c,J as o,at as u,a as d,t as g}from"./entry.ddd72df0.js";var v=`
@layer primevue {
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .p-tag-icon,
    .p-tag-value,
    .p-tag-icon.pi {
        line-height: 1.5;
    }

    .p-tag.p-tag-rounded {
        border-radius: 10rem;
    }
}
`,m={root:function(r){var n=r.props;return["p-tag p-component",{"p-tag-info":n.severity==="info","p-tag-success":n.severity==="success","p-tag-warning":n.severity==="warning","p-tag-danger":n.severity==="danger","p-tag-rounded":n.rounded}]},icon:"p-tag-icon",value:"p-tag-value"},y=p.extend({name:"tag",css:v,classes:m}),f={name:"BaseTag",extends:i,props:{value:null,severity:null,rounded:Boolean,icon:String},style:y,provide:function(){return{$parentInstance:this}}},$={name:"Tag",extends:f};function B(e,r,n,k,S,h){return s(),t("span",a({class:e.cx("root")},e.ptm("root"),{"data-pc-name":"tag"}),[e.$slots.icon?(s(),l(c(e.$slots.icon),a({key:0,class:e.cx("icon")},e.ptm("icon")),null,16,["class"])):e.icon?(s(),t("span",a({key:1,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):o("",!0),e.value||e.$slots.default?u(e.$slots,"default",{key:2},function(){return[d("span",a({class:e.cx("value")},e.ptm("value")),g(e.value),17)]}):o("",!0)],16)}$.render=B;export{$ as default};
