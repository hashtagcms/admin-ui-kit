<template>
  <div class="playground-modern theme-modern antialiased">
    <div class="space-y-24 pb-32">
        <!-- 01. Design Principles -->
        <section id="philosophy" class="bg-gradient-to-br from-indigo-600 to-blue-700 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>
            <div class="relative z-10">
                <div class="flex items-center gap-6 mb-8">
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center text-3xl shadow-inner">
                        <i class="fa fa-gem"></i>
                    </div>
                    <div>
                        <h2 class="text-3xl font-black uppercase tracking-tighter leading-none">Modern Theme Gallery</h2>
                        <p class="text-indigo-100 font-bold mt-2 uppercase tracking-[0.2em] text-[10px]">Exhaustive UI Kit & Component Reference</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="space-y-6">
                        <p class="text-xl font-medium leading-relaxed opacity-90">
                            Our components are <span class="text-white font-black underline decoration-white/30 decoration-4">highly configurable</span> via a strict layer of theme abstraction.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <span class="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest">Tailwind v4 Optimized</span>
                            <span class="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest">Atomic Architecture</span>
                            <span class="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest">Design-Driven Props</span>
                        </div>
                    </div>
                    <div class="p-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-[2rem] relative">
                         <i class="fa fa-quote-left absolute top-4 left-4 text-white/10 text-4xl"></i>
                         <p class="text-sm italic text-indigo-50 leading-loose relative z-10 pl-6">
                             "This playground showcases 100% of the Modern theme's visual surface. Select any section to explore every supported variant, size, and interaction state."
                         </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 02. Navigation Shell -->
        <nav class="sticky top-6 z-[100] bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-3xl p-3 shadow-2xl shadow-slate-200/50 flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
             <a v-for="nav in playgroundNav" :key="nav.id" :href="'#' + nav.id" 
                class="px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-slate-50 border border-transparent"
                :class="route.hash === '#' + nav.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 border-indigo-400' : 'text-slate-500 hover:border-slate-200'">
                {{ nav.label }}
             </a>
        </nav>

        <!-- 03. IDENTITY & SHELL COMPONENTS -->
        <section id="identity" class="scroll-mt-32 space-y-12">
            <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">01. Identity & Shell</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>
            
            <!-- Consolidated Application Shell Mockup -->
            <div class="bg-white p-8 lg:p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                <div class="flex items-center justify-between">
                    <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Unified Application Shell Mockup</h4>
                    <div class="flex gap-2">
                        <span class="w-2 h-2 rounded-full bg-slate-200"></span>
                        <span class="w-2 h-2 rounded-full bg-slate-200"></span>
                        <span class="w-2 h-2 rounded-full bg-slate-200"></span>
                    </div>
                </div>

                <div class="rounded-3xl border border-slate-200 overflow-hidden shadow-2xl bg-slate-50 flex flex-col" style="height: 600px;">
                    <!-- Top Header -->
                    <div class="z-20 bg-slate-900 shadow-lg">
                        <component :is="activeComponents.TopNav" v-bind="topNavProps" />
                    </div>
                    
                    <div class="flex flex-1 overflow-hidden">
                        <!-- Navigation Sidebar -->
                        <div class="z-10 shadow-xl relative">
                            <component :is="activeComponents.LeftNav" v-bind="leftNavProps" />
                        </div>

                        <!-- Content Area Mockup -->
                        <div class="flex-1 bg-slate-50 p-12 overflow-y-auto">
                            <div class="max-w-4xl mx-auto space-y-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <div class="h-8 bg-slate-200 rounded-lg w-1/4"></div>
                                <div class="grid grid-cols-3 gap-6">
                                    <div class="h-32 bg-white rounded-3xl border border-slate-200 shadow-sm"></div>
                                    <div class="h-32 bg-white rounded-3xl border border-slate-200 shadow-sm"></div>
                                    <div class="h-32 bg-white rounded-3xl border border-slate-200 shadow-sm"></div>
                                </div>
                                <div class="h-[300px] bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-4">
                                    <div class="h-4 bg-slate-100 rounded w-full"></div>
                                    <div class="h-4 bg-slate-100 rounded w-5/6"></div>
                                    <div class="h-4 bg-slate-100 rounded w-4/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Auxiliary Controls -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-50">
                     <div class="space-y-4">
                        <p class="text-[9px] uppercase text-slate-400 font-black tracking-widest">Identity Controllers</p>
                        <div class="flex items-center gap-4 flex-wrap">
                            <component :is="activeComponents.SiteButton" v-bind="siteButtonProps" />
                            <component :is="activeComponents.GlobalSiteButton" v-bind="globalSiteProps" />
                            <component :is="activeComponents.LanguageButton" v-bind="languageButtonProps" />
                        </div>
                     </div>
                     <div class="space-y-4">
                        <p class="text-[9px] uppercase text-slate-400 font-black tracking-widest">Platform & Context</p>
                        <div class="flex items-center gap-4 flex-wrap">
                            <component :is="activeComponents.PlatformButton" v-bind="platformButtonProps" />
                            <component :is="activeComponents.CmsModuleDropdown" v-bind="cmsModuleProps" />
                        </div>
                     </div>
                </div>

                <!-- Developer Code -->
                <div class="pt-8 border-t border-slate-50">
                    <details class="group/code">
                        <summary class="text-[10px] font-black uppercase text-indigo-400 cursor-pointer list-none flex items-center gap-2">
                             <i class="fa fa-code"></i> Developer Code
                        </summary>
                        <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto shadow-2xl">
                             <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;TopNav v-bind="topNavProps" /&gt;
&lt;LeftNav v-bind="leftNavProps" /&gt;
&lt;SiteButton v-bind="siteButtonProps" /&gt;
&lt;GlobalSiteButton v-bind="globalSiteProps" /&gt;
&lt;LanguageButton v-bind="languageButtonProps" /&gt;
&lt;PlatformButton v-bind="platformButtonProps" /&gt;
&lt;CmsModuleDropdown v-bind="cmsModuleProps" /&gt;</code></pre>
                        </div>
                    </details>
                </div>
            </div>
        </section>

        <!-- 04. CORE LAYOUT COMPONENTS -->
        <section id="layout" class="scroll-mt-32 space-y-12">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">02. Core Layout Elements</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="space-y-12">
                <div class="grid grid-cols-1 gap-12">
                     <div class="space-y-4">
                        <component :is="activeComponents.TitleBar" v-bind="titleBarProps" />
                        <details class="ml-4">
                            <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                            <div class="mt-2 p-4 bg-slate-900 rounded-2xl w-fit">
                                <pre class="text-[10px] text-indigo-200"><code>&lt;TitleBar v-bind="titleBarProps" /&gt;</code></pre>
                            </div>
                        </details>
                     </div>
                     <div class="space-y-4">
                        <component :is="activeComponents.ActionBar" v-bind="actionBarProps" />
                        <details class="ml-4">
                            <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                            <div class="mt-2 p-4 bg-slate-900 rounded-2xl w-fit">
                                <pre class="text-[10px] text-indigo-200"><code>&lt;ActionBar v-bind="actionBarProps" /&gt;</code></pre>
                            </div>
                        </details>
                     </div>
                </div>

                <div class="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl">
                     <component :is="activeComponents.TabularView" v-bind="tabularViewProps" />
                     <div class="bg-slate-50/50 p-8 border-t border-slate-100 flex justify-center">
                         <component :is="activeComponents.Pagination" v-bind="paginationProps" />
                     </div>
                     <div class="p-6 bg-slate-50 border-t border-slate-100">
                        <details>
                            <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                            <div class="mt-2 p-4 bg-slate-900 rounded-2xl">
                                <pre class="text-[10px] text-indigo-200"><code>&lt;TabularView v-bind="tabularViewProps" /&gt;
&lt;Pagination v-bind="paginationProps" /&gt;</code></pre>
                            </div>
                        </details>
                     </div>
                </div>

                <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                     <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Tabbed Navigation (&lt;TabView /&gt;)</h4>
                     <component :is="activeComponents.TabView" v-bind="tabViewRealProps" />
                     
                     <details class="mt-4">
                        <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                        <div class="mt-2 p-4 bg-slate-900 rounded-2xl">
                            <pre class="text-[10px] text-indigo-200"><code>&lt;TabView v-bind="tabViewProps" /&gt;</code></pre>
                        </div>
                     </details>
                </div>
                <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                     <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">SiteWise Manager</h4>
                     <component :is="activeComponents.SiteWiseData" v-bind="sitewiseDataProps" />

                     <details class="mt-4">
                        <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                        <div class="mt-2 p-4 bg-slate-900 rounded-2xl">
                            <pre class="text-[10px] text-indigo-200"><code>&lt;SiteWiseData v-bind="sitewiseDataProps" /&gt;</code></pre>
                        </div>
                     </details>
                </div>
            </div>
        </section>

        <!-- 05. BUTTONS EXHAUSTIVE GALLERY -->
        <section id="buttons" class="scroll-mt-32 space-y-12">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">03. Exhaustive Button Gallery</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm overflow-x-auto custom-scrollbar">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-slate-50">
                            <th class="p-4"></th>
                            <th v-for="size in uiKitConfig.sizes" :key="size" class="p-4 text-[9px] font-black uppercase text-slate-400">Size: {{ size }}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        <tr v-for="variant in uiKitConfig.variants" :key="variant" class="group transition-colors hover:bg-slate-50/50">
                            <td class="p-6">
                                <span class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{{ variant }}</span>
                            </td>
                            <td v-for="size in uiKitConfig.sizes" :key="size" class="p-6">
                                <component :is="activeComponents.HcButton" :variant="variant" :size="size">Button</component>
                            </td>
                        </tr>
                        <!-- Special States -->
                        <tr>
                            <td class="p-6 font-black text-[10px] uppercase text-indigo-600">Icons</td>
                            <td colspan="5" class="p-6">
                                <div class="flex flex-wrap gap-6 items-center">
                                    <component :is="activeComponents.HcButton" variant="primary" icon-left="fa fa-plus">Left Icon</component>
                                    <component :is="activeComponents.HcButton" variant="success" icon-right="fa fa-check">Right Icon</component>
                                    <component :is="activeComponents.HcButton" variant="danger" icon-left="fa fa-trash" icon-right="fa fa-chevron-right">Double</component>
                                    <component :is="activeComponents.HcButton" variant="info" square size="lg"><i class="fa fa-cloud"></i></component>
                                    <component :is="activeComponents.HcButton" variant="dark" loading>Processing</component>
                                    <component :is="activeComponents.HcButton" variant="primary" disabled>Disabled State</component>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="p-6 font-black text-[10px] uppercase text-indigo-600">Groups</td>
                            <td colspan="5" class="p-6">
                                <div class="flex flex-wrap gap-12">
                                     <component :is="activeComponents.HcButtonGroup">
                                        <component :is="activeComponents.HcButton" variant="secondary" active>Daily</component>
                                        <component :is="activeComponents.HcButton" variant="secondary">Weekly</component>
                                        <component :is="activeComponents.HcButton" variant="secondary">Monthly</component>
                                     </component>
                                     <component :is="activeComponents.HcButtonGroup" vertical>
                                        <component :is="activeComponents.HcButton" variant="dark" size="sm">Option A</component>
                                        <component :is="activeComponents.HcButton" variant="dark" size="sm">Option B</component>
                                     </component>
                                     <component :is="activeComponents.SplitButton" label="Main Action" :options="[{label: 'Sub Action 1'}, {label: 'Sub Action 2'}]" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="mt-8 pt-8 border-t border-slate-50">
                    <details>
                        <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                        <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                             <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcButton variant="primary" size="md"&gt;Button&lt;/HcButton&gt;
&lt;HcButtonGroup&gt;...&lt;/HcButtonGroup&gt;
&lt;SplitButton v-bind="splitButtonProps" /&gt;</code></pre>
                        </div>
                    </details>
                </div>
            </div>
        </section>

        <!-- 06. BADGES & AVATARS -->
        <section id="badges" class="scroll-mt-32 space-y-12">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">04. Badges & Avatars</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <!-- Badges -->
                 <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-12">
                    <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Exhaustive Badge Multiplier</h4>
                    <div class="pt-4 border-b border-slate-50 pb-8">
                        <details>
                            <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                            <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                                 <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcBadge variant="primary" size="md"&gt;New&lt;/HcBadge&gt;
&lt;HcBadgeContainer :count="5"&gt;...&lt;/HcBadgeContainer&gt;</code></pre>
                            </div>
                        </details>
                    </div>
                    <div class="space-y-8">
                        <div v-for="variant in uiKitConfig.variants" :key="variant" class="flex flex-wrap items-center gap-4">
                             <span class="w-20 text-[9px] font-black uppercase text-slate-400">{{ variant }}</span>
                             <component :is="activeComponents.HcBadge" :variant="variant" size="sm">New</component>
                             <component :is="activeComponents.HcBadge" :variant="variant" size="md">Beta</component>
                             <component :is="activeComponents.HcBadge" :variant="variant" size="lg">Priority</component>
                             <component :is="activeComponents.HcBadge" :variant="variant" size="md" pill>Rounded Pill</component>
                             <component :is="activeComponents.HcBadge" :variant="variant" size="md" outline>Outline Style</component>
                        </div>
                    </div>
                    <div class="pt-8 border-t border-slate-50 flex items-center gap-8">
                         <div class="space-y-4">
                            <p class="text-[9px] uppercase text-slate-400">Badge Containers</p>
                            <div class="flex gap-8">
                                <component :is="activeComponents.HcBadgeContainer" :count="5">
                                    <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400"><i class="fa fa-bell"></i></div>
                                </component>
                                <component :is="activeComponents.HcBadgeContainer" :count="99">
                                    <component :is="activeComponents.HcButton" variant="dark" size="sm">Messages</component>
                                </component>
                            </div>
                         </div>
                    </div>
                 </div>

                 <!-- Avatars -->
                 <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-12">
                    <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Avatar Variations & States</h4>
                    <div class="pt-8 border-b border-slate-50 pb-8">
                        <details>
                            <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                            <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                                 <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcAvatar size="lg" status="online" name="JD" /&gt;
&lt;HcAvatar size="xl" image="url" /&gt;</code></pre>
                            </div>
                        </details>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                         <div class="space-y-6">
                            <p class="text-[9px] uppercase text-slate-400 tracking-tighter">Sizes (XS - 2XL)</p>
                            <div class="flex flex-wrap items-end gap-3">
                                <component :is="activeComponents.HcAvatar" v-for="s in ['xs','sm','md','lg','xl','2xl']" :key="s" :size="s" name="User Name" />
                            </div>
                         </div>
                         <div class="space-y-6">
                            <p class="text-[9px] uppercase text-slate-400 tracking-tighter">Status Indicators</p>
                            <div class="flex gap-4">
                                <component :is="activeComponents.HcAvatar" size="lg" status="online" name="JD" />
                                <component :is="activeComponents.HcAvatar" size="lg" status="busy" name="JD" />
                                <component :is="activeComponents.HcAvatar" size="lg" status="away" name="JD" />
                                <component :is="activeComponents.HcAvatar" size="lg" status="offline" name="JD" />
                            </div>
                         </div>
                    </div>
                    <div class="space-y-8 pt-8 border-t border-slate-50">
                         <p class="text-[9px] uppercase text-slate-400 tracking-tighter">Custom Rendering</p>
                         <div class="flex flex-wrap gap-8">
                              <component :is="activeComponents.HcAvatar" size="xl" :rounded="false" name="Squared Avatar" />
                              <component :is="activeComponents.HcAvatar" size="xl" image="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" />
                              <component :is="activeComponents.HcAvatar" size="xl" variant="danger" name="Alert System" />
                              <component :is="activeComponents.HcAvatar" size="xl" variant="success" name="Verified User" />
                         </div>
                    </div>
                 </div>
            </div>
        </section>

        <!-- 07. FORM CONTROLS -->
        <section id="forms" class="scroll-mt-32 space-y-12">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">05. Text Inputs & Form Controls</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <!-- Inputs Exhaustive -->
                 <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                    <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Input Sizes & Variants</h4>
                    <div class="pt-4 border-b border-slate-50 pb-8">
                        <details>
                            <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                            <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                                 <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcInput label="Email" placeholder="user@example.com" /&gt;
&lt;HcAutoSuggest :data="['Option 1', 'Option 2']" /&gt;</code></pre>
                            </div>
                        </details>
                    </div>
                    <div class="space-y-8">
                        <div v-for="size in ['sm','md','lg']" :key="size" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                             <component :is="activeComponents.HcInput" :size="size" label="Generic Input" :placeholder="'Size ' + size" />
                             <component :is="activeComponents.HcInput" :size="size" label="With Icon" icon="fa fa-search" :placeholder="'Search ' + size" />
                        </div>
                    </div>
                    <div class="pt-8 border-t border-slate-50 space-y-6">
                         <p class="text-[9px] uppercase text-slate-400">Validation States</p>
                         <div class="space-y-4">
                             <component :is="activeComponents.HcInput" variant="success" label="Valid Form" helper="Looking good!" icon-right="fa fa-check" value="correct_input" />
                             <component :is="activeComponents.HcInput" variant="danger" label="Error Found" helper="Invalid email address" icon-right="fa fa-exclamation-triangle" value="bad_input" />
                             <component :is="activeComponents.HcAutoSuggest" label="Auto-Suggest" :data="['Apple', 'Banana', 'Cherry']" placeholder="Type characters..." />
                         </div>
                    </div>
                 </div>

                 <!-- Selection Controls -->
                 <div class="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl space-y-12 relative overflow-hidden group">
                    <div class="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                    <div class="relative z-10 space-y-12">
                        <h4 class="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Selection & Booleans</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                             <div class="space-y-6">
                                <p class="text-[9px] uppercase text-slate-500">Checkboxes & Radios</p>
                                <div class="space-y-4">
                                     <component :is="activeComponents.HcCheckbox" v-model="formState.check1" label="System Enabled" />
                                     <component :is="activeComponents.HcCheckbox" v-model="formState.check2" label="Public Repository" />
                                     <hr class="border-slate-800" />
                                     <component :is="activeComponents.HcRadioGroup" 
                                        v-model="formState.radio" 
                                        name="playground_radio"
                                        :options="[{label: 'Mode A', value: 'a'}, {label: 'Mode B', value: 'b'}]"
                                        is-stacked
                                    />
                                </div>
                             </div>
                             <div class="space-y-8">
                                <p class="text-[9px] uppercase text-slate-500">Toggle Switches</p>
                                <div class="space-y-8 sticky top-0">
                                     <component :is="activeComponents.HcSwitch" v-for="s in ['sm','md','lg']" :key="s" :size="s" v-model="formState.switchState" :label="'Size ' + s" variant="primary" />
                                     <component :is="activeComponents.HcSwitch" v-model="formState.switchState" label="Danger variant" variant="danger" />
                                </div>
                             </div>
                        </div>

                        <div class="pt-8 border-t border-slate-800 space-y-8">
                             <p class="text-[9px] uppercase text-slate-500 font-mono">Selects & Dropdowns</p>
                             <div class="pt-4 border-b border-white/10 pb-8 mb-8">
                                <details>
                                    <summary class="text-[9px] font-black uppercase text-slate-500 cursor-pointer">Developer Code</summary>
                                    <div class="mt-4 p-6 bg-slate-800/50 rounded-3xl overflow-x-auto border border-white/5">
                                         <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcCheckbox label="Enabled" v-model="checked" /&gt;
&lt;HcSwitch label="Power" v-model="active" /&gt;
&lt;HcSelect label="Theme" :options="[{label:'Auto', value:'a'}]" /&gt;
&lt;HcDropdown label="Tools" :items="[{label:'A'}]" /&gt;</code></pre>
                                    </div>
                                </details>
                             </div>
                             <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <component :is="activeComponents.HcSelect" label="System Theme" :options="[{label:'Auto', value:'a'}, {label:'Dark', value:'d'}]" />
                                <component :is="activeComponents.HcDropdown" label="Quick Actions" :items="[{label: 'Settings', icon: 'fa fa-cog'}, {label: 'Profile', icon: 'fa fa-user'}]" />
                             </div>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        <!-- 08. DATA DISPLAY & STATISTICS -->
        <section id="stats" class="scroll-mt-32 space-y-12">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">06. Data, Cards & Stats</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="space-y-12">
                <!-- Stat Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    <component :is="activeComponents.HcStatCard" v-for="v in ['primary','success','danger','warning','info']" :key="v" 
                        :variant="v" title="Platform Revenue" value="$42,500" :trend="v === 'danger' ? '-4.2' : '15.8'" icon="fa fa-chart-line" />
                </div>

                <!-- Cards Variations -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                     <component :is="activeComponents.HcCard" title="Standard Card" subtitle="Shadow MD / Rounded LG">
                        <p class="text-xs text-slate-500 leading-relaxed py-4 italic">The baseline container for modern interface elements. Clean, breathable, and structured.</p>
                     </component>
                     <component :is="activeComponents.HcCard" title="Premium Card" shadow="xl" rounded="2xl" border="false">
                        <div class="py-4 space-y-3">
                            <component :is="activeComponents.HcProgress" :value="85" variant="success" size="sm" show-percentage />
                            <p class="text-[10px] font-bold text-slate-400">System resources normalized.</p>
                        </div>
                     </component>
                     <component :is="activeComponents.HcCard" title="Flat Card" shadow="none" rounded="none">
                         <div class="bg-slate-50 p-4 rounded-xl text-center">
                            <component :is="activeComponents.HcSpinner" size="md" variant="indigo" />
                         </div>
                     </component>
                </div>

                <!-- Tables & Placeholders -->
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                         <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Atomic Table System</h4>
                         <div class="pt-4 border-b border-slate-50 pb-8">
                            <details>
                                <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                                <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                                     <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcStatCard variant="primary" title="Revenue" value="$42k" /&gt;
&lt;HcCard title="Card"&gt;...&lt;/HcCard&gt;
&lt;HcTable :headers="['ID','Status']" :rows="[[1,'Active']]" /&gt;
&lt;HcPlaceholder width="100%" height="20px" /&gt;</code></pre>
                                </div>
                            </details>
                         </div>
                         <component :is="activeComponents.HcTable" 
                            :headers="['ID', 'Service', 'Status', 'Load']"
                            :rows="[[1, 'CDN Node', 'Active', '12%'], [2, 'DB Mirror', 'Syncing', '44%'], [3, 'API Gtw', 'Active', '5%']]" 
                        />
                    </div>
                    <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                         <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Skeletons & Placeholders</h4>
                         <div class="space-y-6">
                             <div class="flex items-center gap-4">
                                <component :is="activeComponents.HcPlaceholder" width="60px" height="60px" rounded="full" />
                                <div class="flex-1 space-y-3">
                                    <component :is="activeComponents.HcPlaceholder" width="40%" height="16px" rounded="md" />
                                    <component :is="activeComponents.HcPlaceholder" width="80%" height="12px" rounded="md" />
                                </div>
                             </div>
                             <component :is="activeComponents.HcPlaceholder" width="100%" height="120px" rounded="xl" />
                         </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 09. STATUS & FEEDBACK -->
        <section id="status" class="scroll-mt-32 space-y-12 font-bold">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">07. Status & Feedback System</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div class="col-span-1 lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm mb-8">
                    <details>
                        <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                        <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                             <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcAlert variant="success" title="Done" message="Task completed" /&gt;
&lt;HcProgress :value="65" variant="primary" /&gt;
&lt;HcSpinner variant="blue" /&gt;
&lt;TimerButton /&gt;</code></pre>
                        </div>
                    </details>
                 </div>
                 <!-- Alerts -->
                 <div class="space-y-6">
                    <component :is="activeComponents.HcAlert" variant="success" title="Backup Success" message="All datasets have been successfully synchronized to the cloud mirror." />
                    <component :is="activeComponents.HcAlert" variant="info" title="System Notice" message="We will be performing scheduled maintenance this Friday at 2:00 AM UTC." />
                    <component :is="activeComponents.HcAlert" variant="warning" title="Incomplete Profile" message="Please fill in your company details to enable billing and invoices." />
                    <component :is="activeComponents.HcAlert" variant="danger" title="Security Breach" message="Multiple failed login attempts detected from a new IP address: 192.168.0.1" closable />
                 </div>

                 <!-- Feedback Utils -->
                 <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl space-y-12">
                    <div class="space-y-6">
                        <p class="text-[9px] uppercase text-slate-400">Progress States (SM, MD, LG)</p>
                        <component :is="activeComponents.HcProgress" v-for="s in ['sm','md','lg']" :key="s" :size="s" :value="65" variant="primary" show-percentage />
                    </div>
                    <div class="pt-8 border-t border-slate-50 grid grid-cols-2 gap-8 items-center">
                        <div class="space-y-4">
                             <p class="text-[9px] uppercase text-slate-400">Spinners</p>
                             <div class="flex items-center gap-4">
                                <component :is="activeComponents.HcSpinner" v-for="v in ['blue','indigo','rose','emerald','amber']" :key="v" :variant="v" size="md" />
                             </div>
                        </div>
                        <div class="space-y-4">
                             <p class="text-[9px] uppercase text-slate-400">Timer Interaction</p>
                             <component :is="activeComponents.TimerButton" />
                        </div>
                    </div>
                    <div class="pt-8 border-t border-slate-50 flex items-center justify-between">
                         <div class="flex flex-wrap gap-2">
                            <component :is="activeComponents.HcButton" variant="success" size="sm" @click="showToast('Success Toast', 'success')">Success</component>
                            <component :is="activeComponents.HcButton" variant="danger" size="sm" @click="showToast('Error Toast', 'error')">Error</component>
                            <component :is="activeComponents.HcButton" variant="warning" size="sm" @click="showToast('Warning Toast', 'warning')">Warning</component>
                            <component :is="activeComponents.HcButton" variant="info" size="sm" @click="showToast('Info Toast', 'info')">Info</component>
                         </div>
                         <component :is="activeComponents.ToastBox" ref="toastBoxRef" />
                    </div>
                 </div>
            </div>
        </section>

        <!-- 10. OVERLAYS & DIALOGS -->
        <section id="overlays" class="scroll-mt-32 space-y-12">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">08. Overlays, Modals & Drawers</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 text-slate-900 border-none">
                 <!-- Modal Sizes -->
                 <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                    <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Modal Size Controller</h4>
                    <div class="flex flex-wrap gap-4">
                        <component :is="activeComponents.HcButton" v-for="s in ['sm','md','lg','xl','full']" :key="s" 
                            variant="secondary" @click="openModal(s)">Size: {{ s }}</component>
                    </div>
                    <p class="text-[11px] text-slate-500">Atomic modals adopt full system aesthetics including backdrop blurring and entrance transitions.</p>
                 </div>

                 <!-- Drawer Interaction -->
                 <div class="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                    <h4 class="text-[10px] font-black uppercase text-indigo-600 tracking-widest">System Drawers (Side Panels)</h4>
                    <div class="flex flex-wrap gap-4">
                        <component :is="activeComponents.HcButton" variant="dark" @click="openDrawer('left')">Left Drawer</component>
                        <component :is="activeComponents.HcButton" variant="primary" @click="openDrawer('right')">Right Drawer (Default)</component>
                    </div>
                 </div>
            </div>

            <!-- Contextual Utilities -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div class="bg-indigo-600 p-10 rounded-[2.5rem] text-white flex flex-col items-center gap-6">
                    <i class="fa fa-info-circle text-2xl opacity-40"></i>
                    <component :is="activeComponents.HcTooltip" text="Atomic Multi-line Tooltip for complex hints" position="top">
                        <span class="text-[10px] px-6 py-2 border border-white/20 rounded-full font-black uppercase tracking-widest cursor-help bg-white/10">Hover Tooltip</span>
                    </component>
                 </div>
                 <div class="bg-slate-800 p-10 rounded-[2.5rem] text-white flex flex-col items-center gap-6">
                    <i class="fa fa-window-maximize text-2xl opacity-40"></i>
                    <component :is="activeComponents.HcPopover" title="Analytics Summary" position="bottom">
                        <span class="text-[10px] px-6 py-2 border border-white/20 rounded-full font-black uppercase tracking-widest cursor-pointer bg-white/10">Click Popover</span>
                        <template #content>
                            <div class="space-y-3">
                                <p class="text-[10px] font-bold text-slate-400">Total reach for 2024</p>
                                <h5 class="text-xl font-black text-slate-800">12.5M</h5>
                            </div>
                        </template>
                    </component>
                 </div>
                 <div class="bg-emerald-600 p-10 rounded-[2.5rem] text-white flex flex-col items-center gap-6 text-center">
                    <i class="fa fa-file-upload text-2xl opacity-40"></i>
                    <p class="text-[10px] font-black uppercase tracking-widest">Asset Management</p>
                    <component :is="activeComponents.HcFileUpload" />
                 </div>
            </div>

            <!-- Developer Code for Overlays -->
            <div class="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm mt-8">
                <details>
                    <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                    <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                         <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;HcModal v-model="show" size="md" title="Modal Tool"&gt;...&lt;/HcModal&gt;
&lt;HcDrawer v-model="show" position="right"&gt;...&lt;/HcDrawer&gt;
&lt;HcTooltip text="Hint" position="top"&gt;...&lt;/HcTooltip&gt;
&lt;HcPopover title="Details"&gt;...&lt;/HcPopover&gt;
&lt;HcFileUpload /&gt;</code></pre>
                    </div>
                </details>
            </div>

            <!-- Interactive Overlays (Triggers) -->
            <component :is="activeComponents.HcModal" v-model="modalState.show" :size="modalState.size" 
                :title="modalState.size.toUpperCase() + ' Dialog'" @close="modalState.show = false">
                <div class="p-4 space-y-6">
                    <component :is="activeComponents.HcAlert" variant="info" message="This is an atomic modal window showcasing the selected size." />
                    <p class="text-xs text-slate-600 leading-loose">HashtagCms modals are theme-abstracted, meaning they adapt their typography and spacing based on the active Modern theme configuration.</p>
                    <div class="flex justify-end gap-3">
                         <component :is="activeComponents.HcButton" variant="ghost" @click="modalState.show = false">Dismiss</component>
                         <component :is="activeComponents.HcButton" variant="primary">Process Action</component>
                    </div>
                </div>
            </component>

            <component :is="activeComponents.HcDrawer" v-model="drawerState.show" :position="drawerState.position" 
                :title="drawerState.position.toUpperCase() + ' Panel'" @close="drawerState.show = false">
                <div class="space-y-12">
                     <p class="text-xs text-slate-500 leading-loose uppercase font-bold tracking-tight">Atomic drawer with full overlay management.</p>
                     <div class="space-y-6">
                        <component :is="activeComponents.HcInput" label="Quick Search" icon="fa fa-search" />
                        <component :is="activeComponents.HcSelect" label="Context" :options="[{label:'Global', value:'g'}]" />
                     </div>
                     <hr/>
                     <div class="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                        <p class="text-[10px] font-black text-slate-400 uppercase text-center">Component Context Area</p>
                     </div>
                </div>
            </component>
        </section>

        <!-- 11. ADVANCED TOOLS & UTILITIES -->
        <section id="tools" class="scroll-mt-32 space-y-12 pb-24 border-none">
             <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-slate-200"></span>
                <h3 class="text-xs font-black uppercase tracking-[0.3em] text-slate-400">09. Ops Tools & Library Utilities</h3>
                <span class="flex-1 h-px bg-slate-200"></span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  <div class="col-span-1 md:col-span-2 xl:col-span-3 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm mb-8">
                    <details>
                        <summary class="text-[9px] font-black uppercase text-slate-400 cursor-pointer">Developer Code</summary>
                        <div class="mt-4 p-6 bg-slate-900 rounded-3xl overflow-x-auto">
                             <pre class="text-[11px] font-mono text-indigo-200"><code>&lt;SiteCloner /&gt;
&lt;SiteWiseCopier /&gt;
&lt;LanguageCopier /&gt;
&lt;ModuleCreator /&gt;
&lt;MenuSorter /&gt;
&lt;CopyPaste content="..." /&gt;</code></pre>
                        </div>
                    </details>
                  </div>
                 <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                     <h4 class="text-[10px] font-black uppercase text-indigo-600">Replication Ops</h4>
                     <div class="flex flex-wrap gap-4">
                        <component :is="activeComponents.HcButton" variant="primary" @click="activeOp = 'cloner'">Site Cloner</component>
                        <component :is="activeComponents.HcButton" variant="secondary" @click="activeOp = 'wise_copier'">SiteWise Copier</component>
                        <component :is="activeComponents.HcButton" variant="warning" @click="activeOp = 'lang_copier'">Lang Copier</component>
                     </div>
                 </div>
                 <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                     <h4 class="text-[10px] font-black uppercase text-indigo-600">Structure & Sorters</h4>
                     <div class="flex flex-wrap gap-4">
                        <component :is="activeComponents.HcButton" variant="success" @click="activeOp = 'creator'">Module Creator</component>
                        <component :is="activeComponents.HcButton" variant="dark" @click="activeOp = 'menu_sorter'">Menu Sorter</component>
                        <component :is="activeComponents.HcButton" variant="info" @click="activeOp = 'generic_sorter'">Generic Sorter</component>
                     </div>
                 </div>
                 <div class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                     <h4 class="text-[10px] font-black uppercase text-indigo-600">Helpers & Assets</h4>
                     <div class="flex flex-wrap gap-8 items-center">
                         <component :is="activeComponents.CopyPaste" content="npm install @hashtagcms/ui" />
                         <component :is="activeComponents.InfoPopup" />
                         <component :is="activeComponents.ImageGallery" />
                     </div>
                 </div>
            </div>

            <component :is="activeComponents.ModalBox" v-if="activeOp" @close="activeOp = null" :title="activeOp.toUpperCase()">
                 <div class="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-center">
                      <p class="text-[10px] font-black text-slate-400">Component {{ activeOp }} Active</p>
                      <div class="mt-8">
                         <component :is="getOpComponent(activeOp)" v-bind="getOpProps(activeOp)" />
                      </div>
                 </div>
            </component>
        </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, shallowRef, reactive } from 'vue';
import { useRoute } from 'vue-router';

// Static Navigation items
const playgroundNav = [
    { id: 'identity', label: 'Identity' },
    { id: 'layout', label: 'Layout' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'badges', label: 'Badges' },
    { id: 'forms', label: 'Forms' },
    { id: 'stats', label: 'Stats' },
    { id: 'status', label: 'Status' },
    { id: 'overlays', label: 'Overlays' },
    { id: 'tools', label: 'Ops Tools' }
];

const uiKitConfig = {
    variants: ['primary','secondary','success','danger','warning','info','ghost','soft','dark'],
    sizes: ['xs','sm','md','lg','xl']
};

// Data Imports
// Data Imports
import countryData from '../../../tests/shared/fake-data/country-index.json';
import layoutData from '../../../tests/shared/fake-data/layout-index.json';
import siteSettingsData from '../../../tests/shared/fake-data/site-settings-platforms.json';
import topNavData from '../../../tests/shared/fake-data/top-nav.json';

const route = useRoute();
const activeComponents = shallowRef({});

// Interactive States
const formState = reactive({ switchState: true, radio: 'a', check1: true, check2: false });
const modalState = reactive({ show: false, size: 'md' });
const drawerState = reactive({ show: false, position: 'right' });
const activeOp = ref(null);
const toastBoxRef = ref(null);
const showToast = (msg, variant = 'success') => { 
    if (toastBoxRef.value) {
        toastBoxRef.value.show(msg, 5000, { variant });
    }
};

const openModal = (size) => { modalState.size = size; modalState.show = true; };
const openDrawer = (pos) => { drawerState.position = pos; drawerState.show = true; };

const loadAssets = async () => {
    const modern = await import('../components/index.js');
    const uikit = await import('../ui-kit/index.js');
    activeComponents.value = { ...(modern.default || modern), ...(uikit.default || uikit) };
};

const getOpComponent = (op) => {
    const map = {
        cloner: activeComponents.value.SiteCloner,
        wise_copier: activeComponents.value.SiteWiseCopier,
        lang_copier: activeComponents.value.LanguageCopier,
        creator: activeComponents.value.ModuleCreator,
        menu_sorter: activeComponents.value.MenuSorter,
        generic_sorter: activeComponents.value.Sorter
    };
    return map[op];
};

const getOpProps = (op) => ({}); // Placeholder for dynamic props if needed

onMounted(async () => {
    await loadAssets();
    // Handle initial hash scroll after components load
    if (route.hash) {
        setTimeout(() => {
            const el = document.querySelector(route.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
});

// Props Parsing
const stringifyProps = (props) => {
    const newProps = {};
    for (const key in props) { newProps[key] = typeof props[key] === 'object' ? JSON.stringify(props[key]) : String(props[key]); }
    return newProps;
};

const topNavProps = computed(() => stringifyProps({
    dataUsername: topNavData.username,
    dataSiteName: topNavData.siteName,
    dataCurrentSite: String(topNavData.currentSite),
    dataSupportedSites: JSON.stringify(topNavData.supportedSites),
    dataIsAdmin: String(topNavData.isAdmin === 1),
    dataSiteCombo: String(topNavData.siteCombo),
    dataLogoHeight: String(topNavData.logoHeight),
    dataUser: JSON.stringify({ name: topNavData.username, email: 'admin@example.com' }),
    dataLogo: topNavData.logo,
    dataSiteList: JSON.stringify(topNavData.supportedSites),
    dataCmsModules: JSON.stringify(layoutData.allModules),
    dataPlatforms: JSON.stringify(siteSettingsData.siteInfo.platform),
    dataLanguages: JSON.stringify(siteSettingsData.siteInfo.language)
}));

const leftNavProps = computed(() => stringifyProps({ 
    dataList: JSON.stringify(layoutData.allModules || []),
    dataHashtagcmsVersion: '1.0.0'
}));

const titleBarProps = computed(() => stringifyProps({
    dataTitle: "Countries",
    dataBackUrl: "/admin/dashboard"
}));

const actionBarProps = computed(() => stringifyProps({
    dataControllerTitle: "Countries",
    dataControllerName: "Country",
    dataFields: JSON.stringify(countryData.dataFields),
    dataActionFields: JSON.stringify(countryData.actionFields),
    dataLanguages: JSON.stringify(countryData.supportedLangs),
    dataSelectedLanguage: 1,
    dataShowSearch: true,
    dataShowAdd: true,
    dataLayoutType: 'table',
    dataCmsModules: JSON.stringify(layoutData.allModules[3])
}));

const tabularViewProps = computed(() => stringifyProps({
    dataHeaders: JSON.stringify([...countryData.dataFields, 'action']),
    dataList: JSON.stringify(countryData.paginator.data),
    dataActionFields: JSON.stringify(countryData.actionFields),
    dataControllerName: "Country"
}));

const sitewiseDataProps = computed(() => stringifyProps({
    dataAllData: JSON.stringify(siteSettingsData.allData),
    dataSiteData: JSON.stringify(siteSettingsData.selectedData),
    dataCurrentKey: 'platform',
    dataSiteId: String(siteSettingsData.siteInfo.id)
}));

const tabViewRealProps = computed(() => stringifyProps({
    dataTabs: JSON.stringify([
        { label: 'General', href: '#' },
        { label: 'Advanced', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Notifications', href: '#' }
    ]),
    dataActiveTab: 'General'
}));

const paginationProps = computed(() => stringifyProps({
    dataPaginator: countryData.paginator,
    dataTotal: countryData.paginator.total,
    dataPerPage: countryData.paginator.per_page,
    dataCurrentPage: countryData.paginator.current_page,
    dataLastPage: countryData.paginator.last_page,
    dataFrom: countryData.paginator.from,
    dataTo: countryData.paginator.to,
    dataFirstItem: 1,
    dataLastItem: 20
}));

const infoBoxesProps = computed(() => stringifyProps({
    dataIsAdmin: true,
    dataInfoBoxes: JSON.stringify([
        { title: 'Total Countries', value: 244, icon: 'fa fa-globe', variant: 'primary' },
        { title: 'Active Sites', value: 5, icon: 'fa fa-server', variant: 'success' }
    ])
}));

const globalSiteProps = computed(() => stringifyProps({
    dataCurrentSite: String(topNavData.currentSite),
    dataIsAdmin: String(topNavData.isAdmin === 1)
}));

const siteButtonProps = computed(() => stringifyProps({
    dataSites: JSON.stringify(topNavData.supportedSites),
    dataSelected: String(topNavData.currentSite)
}));

const languageButtonProps = computed(() => stringifyProps({
    dataLanguages: JSON.stringify(siteSettingsData.siteInfo.language),
    dataSelectedLanguage: String(siteSettingsData.siteInfo.lang_id)
}));

const platformButtonProps = computed(() => stringifyProps({
    dataPlatforms: JSON.stringify(siteSettingsData.siteInfo.platform),
    dataSelected: String(siteSettingsData.siteInfo.platform_id)
}));

const cmsModuleProps = computed(() => stringifyProps({
    dataModules: JSON.stringify(layoutData.allModules[3]), // Localization
    dataCurrentModule: 'country'
}));

</script>

<style scoped>
.playground-modern { min-height: 100vh; background-color: #f8fafc; }
.scroll-mt-32 { scroll-margin-top: 8rem; }
.custom-scrollbar::-webkit-scrollbar { height: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
