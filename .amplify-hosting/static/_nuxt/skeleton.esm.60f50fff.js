import{s as o}from"./basecomponent.esm.7e777536.js";import{av as i,o as s,c as a,Q as l}from"./entry.ddd72df0.js";var p=`
@layer primevue {
    .p-skeleton {
        overflow: hidden;
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
    }

    .p-skeleton.p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }
}
`,d={root:{position:"relative"}},c={root:function(t){var n=t.props;return["p-skeleton p-component",{"p-skeleton-circle":n.shape==="circle","p-skeleton-none":n.animation==="none"}]}},u=i.extend({name:"skeleton",css:p,classes:c,inlineStyles:d}),h={name:"BaseSkeleton",extends:o,props:{shape:{type:String,default:"rectangle"},size:{type:String,default:null},width:{type:String,default:"100%"},height:{type:String,default:"1rem"},borderRadius:{type:String,default:null},animation:{type:String,default:"wave"}},style:u,provide:function(){return{$parentInstance:this}}},m={name:"Skeleton",extends:h,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}}}};function f(e,t,n,k,y,r){return s(),a("div",l({class:e.cx("root"),style:[e.sx("root"),r.containerStyle],"aria-hidden":"true"},e.ptm("root"),{"data-pc-name":"skeleton"}),null,16)}m.render=f;export{m as default};
