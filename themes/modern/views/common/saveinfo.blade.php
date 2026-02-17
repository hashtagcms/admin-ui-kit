@extends(htcms_admin_config('theme').'.index')

@section('content')
<title-bar data-title="{!! htcms_get_module_name(request()->module_info) !!}"
               data-back-url="{{$backURL}}"
               data-show-copy="false"
               data-show-paste="false"
    ></title-bar>

<div class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
    @if(is_array($isSaved) && isset($isSaved['status']) && $isSaved['status']>200)

       <div class="px-8 py-5 border-b border-red-50 bg-red-50/50">
          <h3 class="text-xs font-black uppercase tracking-[0.2em] text-red-800">Error!</h3>
        </div>
        <div class="p-10 text-center">
            <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fa fa-times text-2xl"></i>
            </div>
          <p class="text-red-600 font-bold text-lg mb-2"> {{$isSaved['message']}} </p>
          <p class="text-slate-400 text-sm">Please check your input and try again.</p>
        </div>

    @else
        <div class="px-8 py-5 border-b border-emerald-50 bg-emerald-50/50">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-emerald-800">Success!</h3>
        </div>
        <div class="p-10 text-center">
            <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fa fa-check text-2xl"></i>
            </div>
            <p class="text-emerald-700 font-bold text-lg mb-2"> Great! Data has been saved successfully. </p>
            <p class="text-slate-400 text-sm mb-6">
                <timer-button data-timeout="3" data-back-url="{{$backURL}}">Going Back in... </timer-button>
            </p>
         </div>
    @endif

    <div class="px-8 py-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-center gap-4">
        <a class="btn btn-primary" href="{{htcms_admin_path(request()->module_info->controller_name.'/create')}}">Add New</a> 
        <a class="btn btn-outline-secondary" href="{{$backURL}}">Back to Listing</a>
    </div>

</div>

@endsection
