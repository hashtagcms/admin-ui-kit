<template>
  <div class="p-6 bg-white border border-gray-100 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 group">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 group-hover:text-blue-500 transition-colors">
          {{ title }}
        </p>
        <h3 class="text-2xl font-black text-gray-900 tracking-tight">
          {{ value }}
        </h3>
      </div>
      <div v-if="icon" :class="['w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6', iconBgClass]">
        <i :class="[icon, iconColorClass, 'text-lg']"></i>
      </div>
    </div>
    
    <div v-if="trend || trendText" class="mt-4 flex items-center gap-2">
      <div v-if="trend" :class="['flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter', trendClasses]">
        <i :class="trendIcon"></i>
        {{ trend }}%
      </div>
      <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
        {{ trendText || 'vs last month' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HcStatCard',
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    icon: { type: String, default: '' },
    trend: { type: [String, Number], default: '' }, // e.g. "12.5"
    trendDirection: { 
      type: String, 
      default: 'up',
      validator: (v) => ['up', 'down', 'neutral'].includes(v)
    },
    trendText: { type: String, default: '' },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'success', 'danger', 'warning', 'info'].includes(v)
    }
  },
  computed: {
    iconBgClass() {
      const bgs = {
        'primary': 'bg-blue-50',
        'success': 'bg-emerald-50',
        'danger': 'bg-rose-50',
        'warning': 'bg-amber-50',
        'info': 'bg-sky-50'
      };
      return bgs[this.variant];
    },
    iconColorClass() {
      const colors = {
        'primary': 'text-blue-600',
        'success': 'text-emerald-600',
        'danger': 'text-rose-600',
        'warning': 'text-amber-600',
        'info': 'text-sky-600'
      };
      return colors[this.variant];
    },
    trendClasses() {
      if (this.trendDirection === 'up') return 'bg-emerald-50 text-emerald-600';
      if (this.trendDirection === 'down') return 'bg-rose-50 text-rose-600';
      return 'bg-gray-50 text-gray-600';
    },
    trendIcon() {
      if (this.trendDirection === 'up') return 'fa fa-arrow-up';
      if (this.trendDirection === 'down') return 'fa fa-arrow-down';
      return 'fa fa-minus';
    }
  }
};
</script>
