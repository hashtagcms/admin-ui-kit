<template>
  <div :class="themeClass" class="min-h-screen">
    <!-- Theme Selector Header -->
    <div style="background-color: #111827 !important; color: white !important; padding: 0.75rem 1.5rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1050; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 2rem; height: 2rem; background-color: #2563eb; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-weight: 900; color: white;">H</div>
            <h1 style="font-size: 1.125rem; font-weight: 900; letter-spacing: -0.025em; text-transform: uppercase; margin: 0; color: white !important;">
                HASHTAGCMS <span style="color: #60a5fa;">PLAYGROUND</span>
            </h1>
        </div>
        
        <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: white; background-color: #d10000; padding: 0.25rem 0.5rem; margin-right: 0.5rem; border-radius: 0.25rem;">ACTIVE THEME:</span>
                <select v-model="currentTheme" @change="switchTheme" style="background-color: #1f2937; border: 1px solid #374151; color: white; font-size: 0.75rem; font-weight: 700; border-radius: 0.5rem; padding: 0.375rem 0.75rem; outline: none; cursor: pointer;">
                    <option value="modern">Modern (Tailwind v4)</option>
                    <option value="neo">Neo (Bootstrap 5)</option>
                </select>
            </div>
            
            <div style="height: 1rem; width: 1px; background-color: #374151;"></div>
            
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">QUICK JUMP:</span>
                <nav style="display: flex; gap: 1rem;">
                    <a v-for="view in availableViews" :key="view.id" :href="'#' + view.id" 
                       :style="{
                         fontSize: '10px',
                         fontWeight: '900',
                         textTransform: 'uppercase',
                         letterSpacing: '0.1em',
                         color: currentView === view.id ? '#3b82f6' : '#9ca3af',
                         textDecoration: 'none',
                         transition: 'color 0.2s'
                       }"
                       @mouseover="$event.target.style.color = '#60a5fa'"
                       @mouseout="$event.target.style.color = currentView === view.id ? '#3b82f6' : '#9ca3af'">
                        {{ view.shortLabel }}
                    </a>
                </nav>
            </div>
        </div>
    </div>

    <!-- Content Area -->
    <div :class="[currentTheme === 'neo' ? 'container py-5' : 'p-8 max-w-[1600px] mx-auto shadow-sm']">

        <!-- Theme Info Card -->
        <div v-if="currentView === ''" :class="currentTheme === 'neo' ? 'row mb-5' : 'mb-12 grid grid-cols-1 md:grid-cols-2 gap-8'">
            <div :class="currentTheme === 'neo' ? 'col-md-6' : ''">
                <div :class="currentTheme === 'neo' ? 'card shadow-sm h-100' : 'p-8 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-blue-500/5 relative overflow-hidden group'">
                    <div v-if="currentTheme === 'modern'" class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <i class="fa fa-paint-brush text-8xl"></i>
                    </div>
                    <div :class="currentTheme === 'neo' ? 'card-body' : ''">
                        <h2 :class="currentTheme === 'neo' ? 'h3 fw-bold mb-3' : 'text-3xl font-black text-gray-900 mb-4 tracking-tight'">Component Suite</h2>
                        <p :class="currentTheme === 'neo' ? 'text-muted mb-4' : 'text-gray-500 font-medium leading-relaxed mb-6'">Explore our library of premium Vue 3 components. Switch between the <b>Modern</b> (Tailwind v4) and <b>Neo</b> (Bootstrap 5) themes to see the visual transformation.</p>
                        <div :class="currentTheme === 'neo' ? 'd-flex flex-wrap gap-2' : 'flex flex-wrap gap-2'">
                            <span v-for="view in availableViews" :key="view.id" :class="currentTheme === 'neo' ? 'badge bg-light text-muted border' : 'px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100 italic'">#{{ view.id }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div :class="currentTheme === 'neo' ? 'col-md-6' : ''">
                <div :class="currentTheme === 'neo' ? 'card bg-primary text-white shadow-sm h-100' : 'p-8 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-center'">
                    <div :class="currentTheme === 'neo' ? 'card-body d-flex flex-column justify-content-center' : ''">
                        <h3 :class="currentTheme === 'neo' ? 'h4 fw-bold mb-2 text-uppercase' : 'text-xl font-black mb-2 uppercase tracking-wide'">Environment: Playground</h3>
                        <p :class="currentTheme === 'neo' ? 'mb-4 opacity-75' : 'text-blue-100 font-medium text-sm'">Testing components with real-world hydrated data patterns. All components use the latest @hashtagcms/admin-sdk logic.</p>
                        <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mt-3' : 'mt-6 flex items-center gap-4'">
                            <div :class="currentTheme === 'neo' ? 'd-flex' : 'flex -space-x-2'">
                                <div :class="currentTheme === 'neo' ? 'rounded-circle border border-2 border-white bg-white bg-opacity-25 d-flex align-items-center justify-content-center me-2' : 'w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-400 flex items-center justify-center text-[10px] font-bold'" style="width: 32px; height: 32px;">
                                    <span :class="currentTheme === 'neo' ? 'fw-bold small' : ''">V</span>
                                </div>
                                <div :class="currentTheme === 'neo' ? 'rounded-circle border border-2 border-white bg-white bg-opacity-25 d-flex align-items-center justify-content-center me-2' : 'w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-500 flex items-center justify-center text-[10px] font-bold'" style="width: 32px; height: 32px;">
                                    <span :class="currentTheme === 'neo' ? 'fw-bold small' : ''">T</span>
                                </div>
                                <div :class="currentTheme === 'neo' ? 'rounded-circle border border-2 border-white bg-white bg-opacity-25 d-flex align-items-center justify-content-center' : 'w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-700 flex items-center justify-center text-[10px] font-bold'" style="width: 32px; height: 32px;">
                                    <span :class="currentTheme === 'neo' ? 'fw-bold small' : ''">B</span>
                                </div>
                            </div>
                            <span :class="currentTheme === 'neo' ? 'small fw-bold text-uppercase opacity-75' : 'text-xs font-bold text-blue-200 uppercase tracking-widest'">Vue 3 + Tailwind + Bootstrap</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rendered Components -->
        <div :class="currentTheme === 'neo' ? 'row g-5' : 'space-y-24'">
            <div v-if="isVisible('title-bar')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
                <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mb-3' : 'flex items-center gap-3 mb-6'">
                    <span :class="currentTheme === 'neo' ? 'display-6 fw-black text-muted' : 'text-3xl font-black text-gray-200'">01.</span>
                    <h3 :class="currentTheme === 'neo' ? 'h5 text-uppercase fw-bold text-secondary mb-0' : 'text-lg font-black uppercase tracking-widest text-gray-400'">Title Bar</h3>
                    <span v-if="currentTheme === 'modern'" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;TitleBar /&gt;</span>
                </div>
                <component :is="activeComponents.TitleBar" v-bind="titleBarProps" />
            </div>

            <div v-if="isVisible('action-bar')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
                <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mb-3' : 'flex items-center gap-3 mb-6'">
                    <span :class="currentTheme === 'neo' ? 'display-6 fw-black text-muted' : 'text-3xl font-black text-gray-200'">02.</span>
                    <h3 :class="currentTheme === 'neo' ? 'h5 text-uppercase fw-bold text-secondary mb-0' : 'text-lg font-black uppercase tracking-widest text-gray-400'">Action Bar</h3>
                    <span v-if="currentTheme === 'modern'" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;ActionBar /&gt;</span>
                </div>
                <component :is="activeComponents.ActionBar" v-bind="actionBarProps" />
            </div>

            <div v-if="isVisible('info-boxes')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
                <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mb-3' : 'flex items-center gap-3 mb-6'">
                    <span :class="currentTheme === 'neo' ? 'display-6 fw-black text-muted' : 'text-3xl font-black text-gray-200'">03.</span>
                    <h3 :class="currentTheme === 'neo' ? 'h5 text-uppercase fw-bold text-secondary mb-0' : 'text-lg font-black uppercase tracking-widest text-gray-400'">Info Boxes</h3>
                    <span v-if="currentTheme === 'modern'" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;InfoBoxes /&gt;</span>
                </div>
                <div :class="currentTheme === 'neo' ? 'row' : ''">
                    <component :is="activeComponents.InfoBoxes" v-bind="infoBoxesProps" />
                </div>
            </div>

            <div v-if="isVisible('tabular-view')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
                <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mb-3' : 'flex items-center gap-3 mb-6'">
                    <span :class="currentTheme === 'neo' ? 'display-6 fw-black text-muted' : 'text-3xl font-black text-gray-200'">04.</span>
                    <h3 :class="currentTheme === 'neo' ? 'h5 text-uppercase fw-bold text-secondary mb-0' : 'text-lg font-black uppercase tracking-widest text-gray-400'">Data Grid & Pagination</h3>
                    <span v-if="currentTheme === 'modern'" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;TabularView /&gt; &lt;Pagination /&gt;</span>
                </div>
                <div :class="currentTheme === 'modern' ? 'bg-white p-1 rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50' : 'card shadow-sm'">
                    <component :is="activeComponents.TabularView" v-bind="tabularViewProps" />
                    <div :class="currentTheme === 'modern' ? 'p-6 border-t border-gray-50 flex justify-center' : 'card-footer d-flex justify-content-center'">
                        <component :is="activeComponents.Pagination" v-bind="paginationProps" />
                    </div>
                </div>
            </div>

            <div v-if="isVisible('tab-view')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
                <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mb-3' : 'flex items-center gap-3 mb-6'">
                    <span :class="currentTheme === 'neo' ? 'display-6 fw-black text-muted' : 'text-3xl font-black text-gray-200'">05.</span>
                    <h3 :class="currentTheme === 'neo' ? 'h5 text-uppercase fw-bold text-secondary mb-0' : 'text-lg font-black uppercase tracking-widest text-gray-400'">Tab Navigation</h3>
                    <span v-if="currentTheme === 'modern'" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;TabView /&gt;</span>
                </div>
                
                <!-- Real Site Settings Tabs (from tab-view.txt) -->
                <div :class="currentTheme === 'modern' ? 'bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50 mb-6' : 'card shadow-sm mb-4'">
                    <div :class="currentTheme === 'modern' ? 'mb-4' : 'card-body'">
                        <div class="flex justify-between items-center mb-4">
                            <h5 :class="currentTheme === 'modern' ? 'text-sm font-black uppercase tracking-widest text-gray-400' : 'card-title h6 text-uppercase fw-bold text-muted mb-0'">Loaded from tab-view.txt</h5>
                            <span class="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full uppercase tracking-tighter">Recommended</span>
                        </div>
                        <component :is="activeComponents.TabView" v-bind="tabViewRealProps" />
                    </div>
                </div>

                <!-- Simple String Tabs -->
                <div :class="currentTheme === 'modern' ? 'bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50 mb-6' : 'card shadow-sm mb-4'">
                    <div :class="currentTheme === 'modern' ? 'mb-4' : 'card-body'">
                        <h5 :class="currentTheme === 'modern' ? 'text-sm font-black uppercase tracking-widest text-gray-400 mb-4' : 'card-title h6 text-uppercase fw-bold text-muted'">Simple String Tabs</h5>
                        <component :is="activeComponents.TabView" v-bind="tabViewSimpleProps" />
                    </div>
                </div>

                <!-- Object-Based Tabs -->
                <div :class="currentTheme === 'modern' ? 'bg-white p-6 rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50' : 'card shadow-sm'">
                    <div :class="currentTheme === 'modern' ? 'mb-4' : 'card-body'">
                        <h5 :class="currentTheme === 'modern' ? 'text-sm font-black uppercase tracking-widest text-gray-400 mb-4' : 'card-title h6 text-uppercase fw-bold text-muted'">Object-Based Tabs with Href</h5>
                        <component :is="activeComponents.TabView" v-bind="tabViewObjectProps" />
                    </div>
                </div>
            </div>

            <div v-if="isVisible('left-nav')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
                <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mb-3' : 'flex items-center gap-3 mb-6'">
                    <span :class="currentTheme === 'neo' ? 'display-6 fw-black text-muted' : 'text-3xl font-black text-gray-200'">06.</span>
                    <h3 :class="currentTheme === 'neo' ? 'h5 text-uppercase fw-bold text-secondary mb-0' : 'text-lg font-black uppercase tracking-widest text-gray-400'">Sidebar Navigation</h3>
                    <span v-if="currentTheme === 'modern'" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;LeftNav /&gt;</span>
                </div>
                <div :class="currentTheme === 'modern' ? 'grid grid-cols-1 lg:grid-cols-4 gap-8' : 'row'">
                     <div :class="currentTheme === 'modern' ? 'lg:col-span-1 h-[600px] border border-gray-100 rounded-2xl overflow-hidden shadow-2xl' : 'col-md-3'">
                         <div :class="currentTheme === 'neo' ? 'border rounded overflow-hidden shadow-sm' : ''">
                            <component :is="activeComponents.LeftNav" v-bind="leftNavProps" />
                         </div>
                     </div>
                     <div v-if="currentTheme === 'modern'" class="lg:col-span-3 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center p-12">
                         <div class="text-center">
                             <i class="fa fa-columns text-4xl text-gray-300 mb-4"></i>
                             <p class="text-gray-400 font-bold uppercase text-xs tracking-widest">Main Layout Preview Area</p>
                         </div>
                     </div>
                     <div v-else class="col-md-9">
                         <div class="card shadow-sm">
                             <div class="card-body text-center py-5">
                                 <i class="fa fa-columns fa-3x text-muted mb-3"></i>
                                 <p class="text-muted fw-bold text-uppercase small">Main Layout Preview Area</p>
                             </div>
                         </div>
                     </div>
                </div>
            </div>

            <div v-if="isVisible('sitewise-data')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
              <div :class="currentTheme === 'neo' ? 'd-flex align-items-center gap-3 mb-3' : 'flex items-center gap-3 mb-6'">
                  <span :class="currentTheme === 'neo' ? 'display-6 fw-black text-muted' : 'text-3xl font-black text-gray-200'">06.</span>
                  <h3 :class="currentTheme === 'neo' ? 'h5 text-uppercase fw-bold text-secondary mb-0' : 'text-lg font-black uppercase tracking-widest text-gray-400'">Contextual Data (SiteWise)</h3>
                  <span v-if="currentTheme === 'modern'" class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;SitewiseData /&gt;</span>
              </div>
              <div :class="currentTheme === 'neo' ? 'row' : ''">
                  <component :is="activeComponents.SiteWiseData" v-bind="sitewiseDataProps" />
              </div>
            </div>

            <!-- UI KIT SHOWCASE -->
            <div v-if="isVisible('uikit')" :class="currentTheme === 'neo' ? 'col-12 mb-4' : 'scroll-mt-24'">
              <template v-if="currentTheme === 'modern'">
                <div class="flex items-center gap-3 mb-10">
                    <span class="text-3xl font-black text-gray-200">07.</span>
                    <h3 class="text-lg font-black uppercase tracking-widest text-gray-400">HashtagCms UI Kit (HcKit)</h3>
                </div>

                <div class="space-y-16">
                  <!-- Metrics & Navigation -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Metrics & Breadcrumbs</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcStatCard /&gt; &lt;HcBreadcrumbs /&gt;</span>
                        <button @click="toggleCode('metrics')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'metrics' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'metrics'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.metrics)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.metrics }}</code></pre>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                      <component :is="activeComponents.HcStatCard" 
                        title="Total Revenue" 
                        value="$128,430" 
                        icon="fa fa-dollar-sign" 
                        trend="14.2" 
                        variant="primary" 
                      />
                      <component :is="activeComponents.HcStatCard" 
                        title="Active Users" 
                        value="12,840" 
                        icon="fa fa-users" 
                        trend="5.8" 
                        variant="success" 
                      />
                      <component :is="activeComponents.HcStatCard" 
                        title="Server Load" 
                        value="42.5%" 
                        icon="fa fa-server" 
                        trend="2.4" 
                        trendDirection="down"
                        variant="warning" 
                      />
                      <component :is="activeComponents.HcStatCard" 
                        title="Open Issues" 
                        value="3" 
                        icon="fa fa-exclamation-circle" 
                        trend="1" 
                        trendDirection="neutral"
                        variant="danger" 
                      />
                    </div>

                    <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <component :is="activeComponents.HcBreadcrumbs" 
                        :items="[
                          { label: 'Admin', icon: 'fa fa-home' },
                          { label: 'Configuration', href: '#' },
                          { label: 'Site Settings', href: '#' }
                        ]" 
                      />

                      <div class="flex items-center gap-6">
                        <component :is="activeComponents.HcDropdown" 
                          :items="[
                            { label: 'Edit Profile', icon: 'fa fa-user-edit' },
                            { label: 'System Logs', icon: 'fa fa-terminal' },
                            { divider: true },
                            { label: 'Logout', icon: 'fa fa-sign-out-alt', variant: 'danger' }
                          ]" 
                        />

                        <!-- Custom Trigger Example -->
                        <component :is="activeComponents.HcDropdown" 
                          position="bottom-end"
                          :items="[
                            { label: 'My Projects', icon: 'fa fa-folder' },
                            { label: 'Cloud Storage', icon: 'fa fa-cloud' }
                          ]"
                        >
                          <template #trigger>
                            <component :is="activeComponents.HcAvatar" 
                              src="https://i.pravatar.cc/150?u=ms" 
                              size="sm" 
                              status="online" 
                              class="cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all" 
                            />
                          </template>
                        </component>
                        
                        <div class="flex -space-x-3">
                          <component :is="activeComponents.HcAvatar" name="Marghoob Suleman" size="sm" status="online" />
                          <component :is="activeComponents.HcAvatar" name="John Doe" size="sm" status="away" variant="success" />
                          <component :is="activeComponents.HcAvatar" name="AI Assistant" size="sm" variant="dark" />
                        </div>
                      </div>
                    </div>
                  </section>
                  <!-- Avatars Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Avatars</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcAvatar /&gt;</span>
                        <button @click="toggleCode('avatars')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'avatars' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'avatars'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.avatars)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.avatars }}</code></pre>
                    </div>
                    <div class="space-y-8">
                      <div class="flex flex-wrap items-center gap-6">
                        <p class="w-full text-[10px] font-black uppercase text-gray-400 tracking-widest">Sizes & Variants</p>
                        <component :is="activeComponents.HcAvatar" name="XS" size="xs" variant="primary" />
                        <component :is="activeComponents.HcAvatar" name="Small" size="sm" variant="success" />
                        <component :is="activeComponents.HcAvatar" name="Medium" size="md" variant="info" />
                        <component :is="activeComponents.HcAvatar" name="Large" size="lg" variant="warning" />
                        <component :is="activeComponents.HcAvatar" name="Extra Large" size="xl" variant="danger" />
                        <component :is="activeComponents.HcAvatar" name="2XL" size="2xl" variant="dark" />
                      </div>

                      <div class="flex flex-wrap items-center gap-10">
                        <div class="space-y-4">
                          <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Status Indicators</p>
                          <div class="flex gap-4">
                            <component :is="activeComponents.HcAvatar" name="Online User" status="online" />
                            <component :is="activeComponents.HcAvatar" name="Away User" status="away" />
                            <component :is="activeComponents.HcAvatar" name="Busy User" status="busy" />
                            <component :is="activeComponents.HcAvatar" name="Offline User" status="offline" />
                          </div>
                        </div>

                        <div class="space-y-4">
                          <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Image vs Initials</p>
                          <div class="flex gap-4">
                            <component :is="activeComponents.HcAvatar" src="https://i.pravatar.cc/150?u=ms" name="Marghoob Suleman" status="online" />
                            <component :is="activeComponents.HcAvatar" name="Marghoob Suleman" variant="primary" />
                          </div>
                        </div>

                        <div class="space-y-4">
                          <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Stacked (Designers)</p>
                          <div class="flex -space-x-4">
                            <component :is="activeComponents.HcAvatar" name="User 1" class="border-2 border-white" />
                            <component :is="activeComponents.HcAvatar" name="User 2" variant="success" class="border-2 border-white" />
                            <component :is="activeComponents.HcAvatar" name="User 3" variant="info" class="border-2 border-white" />
                            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 border-2 border-white">
                              +5
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- Buttons Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Buttons</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcButton /&gt; &lt;HcButtonGroup /&gt;</span>
                        <button @click="toggleCode('buttons')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'buttons' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'buttons'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.buttons)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.buttons }}</code></pre>
                    </div>
                    <div class="flex flex-wrap gap-4 items-center">
                      <component :is="activeComponents.HcButton" variant="primary">Primary Button</component>
                      <component :is="activeComponents.HcButton" variant="secondary">Secondary</component>
                      <component :is="activeComponents.HcButton" variant="success">Success</component>
                      <component :is="activeComponents.HcButton" variant="danger">Danger</component>
                      <component :is="activeComponents.HcButton" variant="warning">Warning</component>
                      <component :is="activeComponents.HcButton" variant="info">Info</component>
                      <component :is="activeComponents.HcButton" variant="ghost">Ghost</component>
                      <component :is="activeComponents.HcButton" outline>Outline</component>
                      <component :is="activeComponents.HcButton" variant="soft">Soft (Tertiary)</component>
                    </div>
                    <div class="flex flex-wrap gap-4 items-center mt-6">
                      <component :is="activeComponents.HcButton" size="xs">Extra Small</component>
                      <component :is="activeComponents.HcButton" size="sm">Small</component>
                      <component :is="activeComponents.HcButton" size="md">Medium</component>
                      <component :is="activeComponents.HcButton" size="lg">Large</component>
                      <component :is="activeComponents.HcButton" size="xl">Extra Large</component>
                    </div>
                    <div class="flex flex-wrap gap-4 items-center mt-6">
                      <component :is="activeComponents.HcButton" loading>Loading State</component>
                      <component :is="activeComponents.HcButton" disabled>Disabled State</component>
                      <component :is="activeComponents.HcButton" active>Selected State</component>
                    </div>
                    <div class="flex flex-wrap gap-4 items-center mt-8">
                      <p class="w-full text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Buttons with Icons</p>
                      <component :is="activeComponents.HcButton" variant="primary">
                        <template #icon-left><i class="fa fa-plus-circle mr-2"></i></template>
                        Create Project
                      </component>
                      <component :is="activeComponents.HcButton" variant="secondary">
                        Settings
                        <template #icon-right><i class="fa fa-cog ml-2"></i></template>
                      </component>
                      <component :is="activeComponents.HcButton" variant="dark" rounded="xl">
                        <template #icon-left><i class="fa fa-arrow-left mr-2"></i></template>
                        Back to Workspace
                      </component>
                    </div>

                    <div class="flex flex-wrap gap-4 items-center mt-8">
                      <p class="w-full text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Square Icon Buttons (isSquare)</p>
                      <component :is="activeComponents.HcButton" variant="soft" isSquare size="sm">
                        <template #icon-left><i class="fa fa-copy"></i></template>
                      </component>
                      <component :is="activeComponents.HcButton" variant="primary" isSquare size="sm">
                        <template #icon-left><i class="fa fa-paste"></i></template>
                      </component>
                      <component :is="activeComponents.HcButton" variant="danger" isSquare size="xs">
                        <template #icon-left><i class="fa fa-trash"></i></template>
                      </component>
                    </div>
                  </section>

                  <!-- Badges Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Badges</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcBadge /&gt;</span>
                        <button @click="toggleCode('badges')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'badges' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'badges'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.badges)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.badges }}</code></pre>
                    </div>
                    <div class="flex flex-wrap gap-3 items-center">
                      <component :is="activeComponents.HcBadge" variant="primary">Primary</component>
                      <component :is="activeComponents.HcBadge" variant="secondary">Secondary</component>
                      <component :is="activeComponents.HcBadge" variant="success">Success</component>
                      <component :is="activeComponents.HcBadge" variant="danger">Danger</component>
                      <component :is="activeComponents.HcBadge" variant="warning">Warning</component>
                      <component :is="activeComponents.HcBadge" variant="info">Info</component>
                      <component :is="activeComponents.HcBadge" variant="neutral">Neutral</component>
                    </div>
                    <div class="flex flex-wrap gap-3 items-center mt-4">
                      <component :is="activeComponents.HcBadge" is-pill>Pill Badge</component>
                      <component :is="activeComponents.HcBadge" is-outline>Outline Badge</component>
                      <component :is="activeComponents.HcBadge" size="sm">Small</component>
                      <component :is="activeComponents.HcBadge" size="md">Medium</component>
                      <component :is="activeComponents.HcBadge" size="lg">Large</component>
                    </div>
                  </section>

                  <!-- Alerts Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Alerts</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcAlert /&gt;</span>
                        <button @click="toggleCode('alerts')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'alerts' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'alerts'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.alerts)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.alerts }}</code></pre>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <component :is="activeComponents.HcAlert" variant="info" title="Information">
                        This is a standard information alert with a custom title.
                      </component>
                      <component :is="activeComponents.HcAlert" variant="success" dismissible>
                        <b>Great job!</b> You have successfully updated the system settings.
                      </component>
                      <component :is="activeComponents.HcAlert" variant="warning">
                        Your subscription is about to expire. Please renew soon.
                      </component>
                      <component :is="activeComponents.HcAlert" variant="danger">
                        An error occurred while processing your request.
                      </component>
                    </div>
                  </section>

                  <!-- Tables Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Simple Tables</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcTable /&gt;</span>
                        <button @click="toggleCode('tables')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'tables' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'tables'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.tables)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.tables }}</code></pre>
                    </div>
                    <component :is="activeComponents.HcTable" :headers="['User', 'Role', 'Status', 'Last Login']">
                      <tr>
                        <td class="px-6 py-4">Marghoob Suleman</td>
                        <td class="px-6 py-4">Super Admin</td>
                        <td class="px-6 py-4"><component :is="activeComponents.HcBadge" variant="success" is-pill>Active</component></td>
                        <td class="px-6 py-4 text-gray-400 font-medium">2 mins ago</td>
                      </tr>
                      <tr>
                        <td class="px-6 py-4">John Doe</td>
                        <td class="px-6 py-4">Editor</td>
                        <td class="px-6 py-4"><component :is="activeComponents.HcBadge" variant="warning" is-pill>Pending</component></td>
                        <td class="px-6 py-4 text-gray-400 font-medium">1 hour ago</td>
                      </tr>
                    </component>
                  </section>

                  <!-- Modals Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Overlays</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcModal /&gt; &lt;HcDrawer /&gt;</span>
                        <button @click="toggleCode('overlays')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'overlays' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'overlays'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.overlays)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.overlays }}</code></pre>
                    </div>
                      <div class="flex gap-4">
                        <component :is="activeComponents.HcButton" @click="showModal = true">Standard Modal</component>
                        <component :is="activeComponents.HcButton" variant="secondary" @click="showDrawer = true">Right Drawer</component>
                      </div>
                      
                      <component :is="activeComponents.HcDrawer" 
                        v-model="showDrawer" 
                        title="Module Configuration" 
                        subtitle="Manage platform and site specific settings"
                      >
                        <div class="space-y-8">
                           <component :is="activeComponents.HcAlert" variant="info">
                             Modifying these settings will trigger a re-build of the cache layers.
                           </component>

                           <div class="space-y-4">
                             <h5 class="text-[10px] font-black uppercase tracking-widest text-gray-400">Environment Variables</h5>
                             <component :is="activeComponents.HcInput" label="APP_KEY" size="sm" variant="info" />
                             <component :is="activeComponents.HcInput" label="DATABASE_URL" size="sm" variant="info" />
                           </div>

                           <component :is="activeComponents.HcSwitch" :modelValue="true" label="Debug Mode" size="sm" />
                           <component :is="activeComponents.HcSwitch" :modelValue="false" label="Force SSL" size="sm" />
                        </div>
                        <template #footer>
                           <div class="flex gap-3">
                             <component :is="activeComponents.HcButton" class="flex-1" @click="showDrawer = false">Save Changes</component>
                             <component :is="activeComponents.HcButton" class="flex-1" variant="ghost" @click="showDrawer = false">Cancel</component>
                           </div>
                        </template>
                      </component>

                    
                    <component :is="activeComponents.HcModal" v-model="showModal" title="System Confirmation">
                        <div class="space-y-4">
                            <p class="text-gray-500 font-medium">Are you sure you want to perform this critical action? This will update the global architecture settings for the current site.</p>
                            <component :is="activeComponents.HcAlert" variant="warning">This action cannot be undone.</component>
                        </div>
                        <template #footer>
                            <component :is="activeComponents.HcButton" variant="ghost" @click="showModal = false">Cancel</component>
                            <component :is="activeComponents.HcButton" variant="primary" @click="showModal = false">Confirm Action</component>
                        </template>
                    </component>
                  </section>

                  <!-- Spinners Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Loaders</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcSpinner /&gt;</span>
                        <button @click="toggleCode('loaders')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'loaders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'loaders'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.loaders)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.loaders }}</code></pre>
                    </div>
                    <div class="flex flex-wrap gap-8 items-center">
                      <component :is="activeComponents.HcSpinner" size="xs" />
                      <component :is="activeComponents.HcSpinner" size="sm" />
                      <component :is="activeComponents.HcSpinner" size="md" />
                      <component :is="activeComponents.HcSpinner" size="lg" />
                      <component :is="activeComponents.HcSpinner" size="xl" />
                    </div>
                    <div class="flex flex-wrap gap-8 items-center mt-6">
                      <component :is="activeComponents.HcSpinner" color="primary" />
                      <component :is="activeComponents.HcSpinner" color="success" />
                      <component :is="activeComponents.HcSpinner" color="danger" />
                      <component :is="activeComponents.HcSpinner" color="warning" />
                      <component :is="activeComponents.HcSpinner" color="info" />
                    </div>
                  </section>

                  <!-- Progress Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Progress</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcProgress /&gt;</span>
                        <button @click="toggleCode('progress')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'progress' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'progress'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.progress)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.progress }}</code></pre>
                    </div>
                    <div class="space-y-6 max-w-md">
                      <component :is="activeComponents.HcProgress" :percentage="progressValue" show-label show-percentage label="System Health" />
                      <component :is="activeComponents.HcProgress" :percentage="75" variant="success" size="sm" is-animated />
                      <component :is="activeComponents.HcProgress" :percentage="90" variant="danger" size="lg" />
                      <div class="flex gap-4">
                        <component :is="activeComponents.HcButton" size="xs" @click="progressValue = Math.max(0, progressValue - 10)">Decrease</component>
                        <component :is="activeComponents.HcButton" size="xs" @click="progressValue = Math.min(100, progressValue + 10)">Increase</component>
                      </div>
                    </div>
                  </section>

                  <!-- Tooltips & Popovers -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Floating UI</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcTooltip /&gt; &lt;HcPopover /&gt; &lt;HcDropdown /&gt;</span>
                        <button @click="toggleCode('floating')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'floating' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'floating'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.floating)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.floating }}</code></pre>
                    </div>
                    <div class="flex flex-wrap gap-12 items-center">
                      <component :is="activeComponents.HcTooltip" text="This is a top tooltip" position="top">
                        <component :is="activeComponents.HcButton" outline size="sm">Hover for Tooltip</component>
                      </component>
                      
                      <component :is="activeComponents.HcPopover" title="Rich Information" position="bottom">
                        <component :is="activeComponents.HcButton" outline size="sm">Click for Bottom</component>
                        <template #content>
                          <div class="space-y-2">
                             <p>Popovers support <b>rich HTML content</b> and multiple layout options.</p>
                             <component :is="activeComponents.HcBadge" variant="primary">New Feature</component>
                          </div>
                        </template>
                      </component>

                      <component :is="activeComponents.HcPopover" title="Right Start Alignment" position="right-start">
                        <component :is="activeComponents.HcButton" outline size="sm">Click for Right-Start</component>
                        <template #content>
                          <p>This popover is aligned to the <b>top edge</b> of the trigger element and opens to the right.</p>
                        </template>
                      </component>

                      <component :is="activeComponents.HcPopover" title="Top End Alignment" position="top-end">
                        <component :is="activeComponents.HcButton" outline size="sm">Click for Top-End</component>
                        <template #content>
                          <p>This popover is aligned to the <b>right edge</b> and opens above.</p>
                        </template>
                      </component>

                      <component :is="activeComponents.HcPopover" title="Left Side Positioning" position="left">
                        <component :is="activeComponents.HcButton" outline size="sm">Click for Left</component>
                        <template #content>
                          <p>This popover opens to the <b>left side</b> of the button.</p>
                        </template>
                      </component>
                    </div>
                  </section>

                  <!-- Cards Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Cards & State</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcCard /&gt; &lt;HcPlaceholder /&gt;</span>
                        <button @click="toggleCode('cards')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'cards' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'cards'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.cards)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.cards }}</code></pre>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <component :is="activeComponents.HcCard" title="User Statistics" subtitle="Updated every 5 minutes">
                        <div class="py-4">
                           <h2 class="text-4xl font-black text-blue-600">12,482</h2>
                           <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Active Sessions Today</p>
                        </div>
                        <template #footer>
                          <component :is="activeComponents.HcButton" variant="ghost" size="xs" class="w-full">View Detailed Report</component>
                        </template>
                      </component>

                      <component :is="activeComponents.HcCard" rounded="xl" shadow="lg" no-border>
                        <template #media>
                          <div class="h-32 bg-slate-900 flex items-center justify-center">
                            <i class="fa fa-cube text-4xl text-blue-500 opacity-20"></i>
                          </div>
                        </template>
                        <h4 class="text-xs font-black uppercase tracking-widest text-gray-900 mb-2">Architectural Design</h4>
                        <p class="text-[11px] font-bold text-gray-400 uppercase leading-relaxed">Using the new UI Kit components to build a consistent admin interface.</p>
                      </component>

                      <component :is="activeComponents.HcCard" title="Placeholders (Shimmer)">
                        <div class="space-y-4 py-2">
                          <component :is="activeComponents.HcPlaceholder" width="w-2/3" height="h-3" />
                          <component :is="activeComponents.HcPlaceholder" width="w-full" height="h-2" />
                          <component :is="activeComponents.HcPlaceholder" width="w-full" height="h-2" />
                          <div class="flex gap-4 items-center">
                            <component :is="activeComponents.HcPlaceholder" width="w-10" height="h-10" rounded="full" />
                            <div class="flex-1 space-y-2">
                               <component :is="activeComponents.HcPlaceholder" width="w-1/2" height="h-2" />
                               <component :is="activeComponents.HcPlaceholder" width="w-1/3" height="h-1" />
                            </div>
                          </div>
                        </div>
                      </component>
                    </div>
                  </section>

                  <!-- Forms Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Forms & Inputs</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcInput /&gt; &lt;HcSelect /&gt; &lt;HcSwitch /&gt; &lt;HcCheckbox /&gt; &lt;HcRadioGroup /&gt;</span>
                        <button @click="toggleCode('forms')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'forms' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'forms'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.forms)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.forms }}</code></pre>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                      <!-- New Atomic Inputs -->
                      <div class="space-y-6">
                        <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Text & Select (Variants)</p>
                        <div class="grid grid-cols-1 gap-4">
                          <component :is="activeComponents.HcInput" 
                            v-model="inputValue" 
                            label="Project Title" 
                            placeholder="Enter title..." 
                            hint="Keep it descriptive and unique"
                          >
                            <template #icon-left><i class="fa fa-tag"></i></template>
                          </component>

                          <div class="grid grid-cols-2 gap-4">
                            <component :is="activeComponents.HcInput" label="Success" variant="success" modelValue="Valid" size="sm">
                              <template #icon-left><i class="fa fa-check-circle"></i></template>
                            </component>
                            <component :is="activeComponents.HcInput" label="Danger" variant="danger" modelValue="Error" size="sm">
                              <template #icon-left><i class="fa fa-exclamation-triangle"></i></template>
                            </component>
                          </div>
                        </div>

                        <component :is="activeComponents.HcSelect" 
                          v-model="selectValue" 
                          variant="info"
                          label="Deployment Region (Info Variant)" 
                          :options="[
                            { label: 'US East (N. Virginia)', value: 'opt1' },
                            { label: 'EU West (Ireland)', value: 'opt2' }
                          ]"
                        />

                        <div class="flex flex-wrap gap-6 items-center pt-2 border-t border-gray-50 mt-2">
                           <component :is="activeComponents.HcSwitch" v-model="switchState" label="Maintenance" variant="danger" size="sm" />
                           <component :is="activeComponents.HcSwitch" v-model="backupState" label="Auto Backup" variant="success" icon="fa fa-check" size="sm" />
                        </div>
                      </div>

                      <!-- Selection Elements -->
                      <div class="space-y-6">
                        <div class="space-y-4">
                          <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Checkboxes</p>
                          <component :is="activeComponents.HcCheckbox" v-model="checkboxState" label="Enable Notifications" />
                          <component :is="activeComponents.HcCheckbox" :model-value="true" label="Disabled State" disabled />
                        </div>

                        <div class="space-y-4">
                          <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Radio Groups</p>
                          <component :is="activeComponents.HcRadioGroup" 
                            v-model="radioValue" 
                            name="demo-radio"
                            :options="[
                              { label: 'Standard Delivery', value: 'opt1' },
                              { label: 'Express Shipping', value: 'opt2' },
                              { label: 'Store Pickup', value: 'opt3', disabled: true }
                            ]" 
                            is-stacked
                          />
                        </div>
                      </div>

                      <!-- File Upload -->
                      <div class="space-y-6">
                        <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">File Management</p>
                        <component :is="activeComponents.HcFileUpload" />
                      </div>
                    <div class="space-y-6">
                        <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Autocomplete (HcAutoSuggest)</p>
                        <div class="grid grid-cols-1 gap-4 bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                           <component :is="activeComponents.HcAutoSuggest" 
                             v-model="suggestValue" 
                             label="Search Remote Users" 
                             placeholder="Type 'Le' or 'Er'..." 
                             endpoint="https://jsonplaceholder.typicode.com/users"
                             display-field="name"
                             hint="Fetching from JSONPlaceholder API"
                             @select="onUserSelect"
                           >
                              <template #icon-left><i class="fa fa-search"></i></template>
                           </component>
                           <div v-if="selectedUser" class="mt-4 p-4 bg-white rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-1">
                              <p class="text-[10px] font-black uppercase text-blue-400 mb-1">Selected User Info</p>
                              <p class="text-xs font-bold text-slate-700">{{ selectedUser.name }} ({{ selectedUser.email }})</p>
                              <p class="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">Company: {{ selectedUser.company.name }}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- Navigation Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Navigation</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcTabs /&gt; &lt;HcPagination /&gt;</span>
                        <button @click="toggleCode('navigation')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'navigation' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'navigation'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.navigation)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.navigation }}</code></pre>
                    </div>
                    <div class="space-y-12">
                      <div class="max-w-2xl">
                         <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Content Tabs (HcTabs)</p>
                         <component :is="activeComponents.HcTabs" :tabs="tabsDemo">
                           <template #profile>
                             <div class="p-6 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide">
                                This content is rendered via the <b>#profile</b> slot.
                             </div>
                           </template>
                         </component>
                      </div>

                      <div class="flex flex-wrap gap-12 items-end">
                        <div class="space-y-4">
                          <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Pagination</p>
                          <component :is="activeComponents.HcPagination" v-model="currentPage" :total-pages="12" />
                        </div>

                        <div class="space-y-4">
                          <p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Button Groups</p>
                          <component :is="activeComponents.HcButtonGroup">
                            <component :is="activeComponents.HcButton" variant="outline" size="sm">Left</component>
                            <component :is="activeComponents.HcButton" variant="outline" size="sm">Middle</component>
                            <component :is="activeComponents.HcButton" variant="outline" size="sm">Right</component>
                          </component>
                        </div>
                      </div>
                    </div>
                  </section>

                  <!-- Toasts Section -->
                  <section>
                    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-gray-900">Feedback</h4>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold">&lt;HcToast /&gt; &lt;HcBadgeContainer /&gt;</span>
                        <button @click="toggleCode('feedback')" class="ml-auto text-[10px] uppercase font-black px-2 py-1 rounded transition-colors" :class="activeCode === 'feedback' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-blue-500 bg-gray-50'">Code</button>
                    </div>

                    <div v-if="activeCode === 'feedback'" class="mb-8 p-6 bg-slate-900 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border-l-4 border-blue-500">
                      <div class="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                        <span class="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Usage Template</span>
                        <button @click="copyCode(codes.feedback)" class="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-colors">Copy</button>
                      </div>
                      <pre class="text-gray-300"><code>{{ codes.feedback }}</code></pre>
                    </div>
                    <div class="flex flex-wrap gap-4 items-center">
                      <component :is="activeComponents.HcButton" @click="addToast('success')">Success</component>
                      <component :is="activeComponents.HcButton" variant="info" @click="addToast('info')">Info</component>
                      <component :is="activeComponents.HcButton" variant="warning" @click="addToast('warning', 3000)">Warning (3s)</component>
                      <component :is="activeComponents.HcButton" variant="danger" @click="addToast('error', 0)">Error (Sticky)</component>

                      <component 
                        v-for="(toast, index) in toasts"
                        :key="toast.id"
                        :is="activeComponents.HcToast" 
                        :variant="toast.variant"
                        :title="toast.title" 
                        :message="toast.message"
                        :duration="toast.duration"
                        :offset="toast.offset"
                        @close="removeToast(toast.id)"
                      />

                      <div class="flex gap-8 items-center">
                        <component :is="activeComponents.HcBadgeContainer" count="5">
                          <div class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
                            <i class="fa fa-bell text-xl"></i>
                          </div>
                        </component>

                        <component :is="activeComponents.HcBadgeContainer" count="120" :max-count="99">
                          <component :is="activeComponents.HcButton" variant="secondary" size="sm">Messages</component>
                        </component>
                      </div>
                    </div>
                  </section>

                  <!-- Existing sections... -->
                  <section>
                    <h4 class="text-sm font-black uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-100 pb-2">Previous Core Components</h4>
                    <!-- ... buttons, badges, etc are already above but I'll keep them organized ... -->
                  </section>
                </div>
              </template>
              <template v-else>
                <div class="alert alert-warning">
                  UI Kit components are currently being developed optimized for the <b>Modern</b> theme.
                </div>
              </template>
            </div>
          </div>
    </div>

    <!-- Mocks for Global Elements -->
    <div id="htcms_toaster"></div>
    <div id="htcms_loader"></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, shallowRef } from 'vue';
import { parseAttributes } from './utils';

// State
import leftNavData from '../tests/shared/fake-data/admin-modules.txt?raw';
import tabularViewData from '../tests/shared/fake-data/table-view.txt?raw';
import topNavData from '../tests/shared/fake-data/top-nav.txt?raw';
import actionBarData from '../tests/shared/fake-data/action-bar.txt?raw';
import infoBoxesData from '../tests/shared/fake-data/info-boxes.txt?raw';
import paginationData from '../tests/shared/fake-data/pagination-view.txt?raw';
import tabViewData from '../tests/shared/fake-data/tab-view.txt?raw';
import titleBarData from '../tests/shared/fake-data/title-bar.txt?raw';
import sitewiseDataRaw from '../tests/shared/fake-data/site-wise.txt?raw';

const currentTheme = ref(new URLSearchParams(window.location.search).get('theme') || 'modern');
const currentView = ref('');
const activeComponents = shallowRef({});
const showModal = ref(false);
const showDrawer = ref(false);
const checkboxState = ref(true);
const switchState = ref(true);
const backupState = ref(true);
const radioValue = ref('opt1');
const inputValue = ref('Premium Admin Kit');
const selectValue = ref('opt2');
const suggestValue = ref('');
const selectedUser = ref(null);
const currentPage = ref(3);
const toasts = ref([]);

const onUserSelect = (user) => {
    selectedUser.value = user;
    addToast('success');
};

// Code View Logic
const activeCode = ref(null);
const toggleCode = (section) => {
    activeCode.value = activeCode.value === section ? null : section;
};
const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    addToast('success'); // Re-using existing toast for feedback
};

const codes = {
    metrics: `<HcStatCard 
  title="Revenue" value="$128k" icon="fa fa-dollar-sign" 
  trend="14.2" variant="primary" 
/>

<HcBreadcrumbs :items="[
  { label: 'Admin', icon: 'fa fa-home' },
  { label: 'Settings', href: '#' }
]" />`,
    avatars: `<HcAvatar name="John" size="md" status="online" />
<HcAvatar src="path/to/img.jpg" name="Jane" />
<div class="flex -space-x-4">
  <HcAvatar name="U1" class="border-2 border-white" />
  <HcAvatar name="U2" class="border-2 border-white" />
</div>`,
    forms: `<HcInput v-model="val" label="Title" hint="Required" />
<HcSelect v-model="opt" :options="opts" />
<HcCheckbox v-model="check" label="Subscribe" />
<HcSwitch v-model="toggle" label="Active" />
<HcRadioGroup v-model="radio" :options="opts" is-stacked />`,
    autosuggest: `<HcAutoSuggest 
  v-model="val" 
  label="User Search" 
  endpoint="https://api.example.com/users" 
  display-field="name" 
>
  <template #icon-left><i class="fa fa-user"></i></template>
</HcAutoSuggest>`,
    buttons: `<HcButton variant="primary">Primary</HcButton>
<HcButton variant="secondary" outline>Outline</HcButton>
<HcButtonGroup>
  <HcButton size="sm">Left</HcButton>
  <HcButton size="sm">Right</HcButton>
</HcButtonGroup>`,
    badges: `<HcBadge variant="success">Active</HcBadge>
<HcBadge variant="danger" pill>Rejected</HcBadge>`,
    alerts: `<HcAlert variant="info" title="Update">System update pending</HcAlert>
<HcAlert variant="success" dismissible>Action successful</HcAlert>`,
    tables: `<HcTable :headers="['Name', 'Role']">
  <tr>
    <td class="px-6 py-4">User A</td>
    <td class="px-6 py-4">Admin</td>
  </tr>
</HcTable>`,
    overlays: `<HcModal v-model="show" title="Target">Content</HcModal>
<HcDrawer v-model="show" title="Settings">Content</HcDrawer>`,
    loaders: `<HcSpinner size="md" color="primary" />
<HcSpinner size="sm" color="success" />`,
    progress: `<HcProgress :percentage="75" show-label />
<HcProgress :percentage="90" variant="danger" animated />`,
    floating: `<HcTooltip text="Tooltip Top" position="top">
  <HcButton>Hover Me</HcButton>
</HcTooltip>

<HcPopover title="Rich Content" position="bottom">
  <HcButton>Click Me</HcButton>
  <template #content>...</template>
</HcPopover>

<HcDropdown :items="items" />`,
    cards: `<HcCard title="Site Stats">...</HcCard>
<HcPlaceholder width="w-full" height="h-4" />`,
    navigation: `<HcTabs :tabs="[{id:'1',label:'Home'}]" />
<HcPagination v-model="page" :total-pages="10" />`,
    feedback: `<HcToast variant="success" message="Saved" />
<HcBadgeContainer count="5">
  <i class="fa fa-bell"></i>
</HcBadgeContainer>`
};
const addToast = (variant = 'info', duration = 5000) => {
  const id = Date.now();
  const messages = {
    'success': 'Changes applied successfully.',
    'info': 'System update in progress.',
    'warning': 'Memory usage is high.',
    'error': 'Failed to save configuration.'
  };
  
  // Only set title for non-info to test mixed behavior
  const title = (variant === 'info') ? null : variant.toUpperCase();

  toasts.value.push({
    id,
    variant,
    duration,
    title,
    message: messages[variant] || 'New notification received.',
    offset: 32 + (toasts.value.length * 90)
  });
};
const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id);
};
const progressValue = ref(45);
const tabsDemo = [
  { id: 'profile', label: 'User Profile', content: 'Detailed user profile information and settings are displayed here.' },
  { id: 'security', label: 'Security', content: 'Manage your passwords, two-factor authentication, and active sessions.' },
  { id: 'billing', label: 'Billing & Plans', content: 'View your current subscription, payment methods, and invoice history.' }
];

// View Definitions
const availableViews = [
    { id: 'title-bar', label: 'Title Bar', shortLabel: 'TitleBar' },
    { id: 'action-bar', label: 'Action Bar', shortLabel: 'ActionBar' },
    { id: 'info-boxes', label: 'Info Boxes', shortLabel: 'InfoBoxes' },
    { id: 'tabular-view', label: 'Data Grid', shortLabel: 'Grid' },
    { id: 'left-nav', label: 'Left Navigation', shortLabel: 'Nav' },
    { id: 'sitewise-data', label: 'Contextual Data', shortLabel: 'SiteWise' },
    { id: 'uikit', label: 'UI Kit Components', shortLabel: 'HcKit' }
];

// Classes
const themeClass = computed(() => `theme-${currentTheme.value}`);

// Methods
const switchTheme = () => {
    const url = new URL(window.location);
    url.searchParams.set('theme', currentTheme.value);
    window.location.href = url.toString();
};

const isVisible = (viewId) => {
    return currentView.value === '' || currentView.value === viewId;
};

// Theme styles and Component Resolution
const loadThemeAssets = async () => {
    // Dynamically load CSS to avoid conflicts
    if (currentTheme.value === 'modern') {
        await import('@hashtagcms/theme/modern/styles/app.scss');
        const modern = await import('@hashtagcms/theme/modern/components/index.js');
        activeComponents.value = modern.default || modern;
    } else {
        await import('@hashtagcms/theme/neo/styles/app.scss');
        const neo = await import('@hashtagcms/theme/neo/components/index.js');
        activeComponents.value = neo.default || neo;
    }

    // Load UI Kit Components if available (Currently only for Modern)
    if (currentTheme.value === 'modern') {
        const uikit = await import('@hashtagcms/theme/modern/ui-kit/index.js');
        const kitComponents = uikit.default || uikit;
        activeComponents.value = { ...activeComponents.value, ...kitComponents };
    }
};

onMounted(async () => {
    await loadThemeAssets();
    
    // Hash routing
    const updateView = () => {
        const hash = window.location.hash.replace('#', '');
        currentView.value = hash;
    };
    window.addEventListener('hashchange', updateView);
    updateView();
});

// Props Computation (Hydrated from raw txt files)
const leftNavProps = computed(() => stringifyProps(parseAttributes(leftNavData)));
const topNavProps = computed(() => stringifyProps(parseAttributes(topNavData)));
const actionBarProps = computed(() => stringifyProps(parseAttributes(actionBarData)));
const infoBoxesProps = computed(() => stringifyProps(parseAttributes(infoBoxesData)));
const paginationProps = computed(() => stringifyProps(parseAttributes(paginationData)));
const tabularViewProps = computed(() => stringifyProps(parseAttributes(tabularViewData)));
const tabViewSimpleProps = computed(() => ({
    dataTabs: JSON.stringify(['General', 'Advanced', 'Security', 'Notifications']),
    dataActiveTab: 'General'
}));
const tabViewObjectProps = computed(() => ({
    dataTabs: JSON.stringify([
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'User Settings', href: '/admin/settings' },
        { label: 'Analytics & Reports', href: '/admin/analytics' },
        { label: 'System Logs', href: '/admin/logs' }
    ]),
    dataActiveTab: 'User Settings'
}));
const tabViewRealProps = computed(() => stringifyProps(parseAttributes(tabViewData)));
const titleBarProps = computed(() => stringifyProps(parseAttributes(titleBarData)));
const sitewiseDataProps = computed(() => stringifyProps(parseAttributes(sitewiseDataRaw)));

function stringifyProps(props) {
    const newProps = {};
    for (const key in props) {
        if (typeof props[key] === 'object' && props[key] !== null) {
            newProps[key] = JSON.stringify(props[key]);
        } else {
            newProps[key] = String(props[key]);
        }
    }
    return newProps;
}
</script>

<style>
/* Playground Layout Extras */
body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
}

.scroll-mt-24 {
    scroll-margin-top: 6rem;
}

/* Custom Scrollbar for Playground */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.scroll-mt-24 {
    animation: fadeIn 0.5s ease-out forwards;
}
</style>
