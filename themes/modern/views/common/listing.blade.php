@extends(htcms_admin_config('theme').'.index')
@section('content')
<action-bar
        data-controller-title="{{request()->module_info->name}}"
        data-controller-name="{{request()->module_info->controller_name}}"
        data-selected-params="{{json_encode(isset($searchParams) ? $searchParams : [])}}"
        data-fields="{{json_encode($fieldsName)}}"
        data-action-fields="{{json_encode($actionFields)}}"
        data-languages="{{json_encode($supportedLangs->toArray())}}"
        data-selected-language="{{session('lang_id') ?? 1}}"
        data-more-actions="{{json_encode(isset($moreActionBarItems) ? $moreActionBarItems : [])}}"
        data-has-lang-method="{{$hasLangMethod}}"
        data-cms-modules="{{json_encode(request()->module_info)}}"
        data-layout-type="{{ Session::get('layout') }}"
        data-show-search="true"

>

</action-bar>

@if($paginator)

<table-view
data-list="{{json_encode($paginator->items())}}"
data-headers="{{json_encode($fieldsName)}}"
data-action-fields="{{json_encode($actionFields)}}"
data-controller-name="{{request()->module_info->controller_name}}"
data-action-as-ajax="{{json_encode(htcms_admin_config('action_as_ajax'))}}"
data-action-css="{{json_encode(htcms_admin_config('action_icon_css'))}}"
data-more-action-fields="{{json_encode($moreActionFields)}}"
data-user-rights="{{json_encode($user_rights)}}"
data-make-field-as-link="{{json_encode(htcms_admin_config('make_field_as_link'))}}"
data-show-delete-popup="{{((bool)htcms_admin_config('show_delete_popup')) ? 'true' : 'false'}}"
data-min-results-needed="{{(isset($minResults) ? $minResults : -1)}}"
data-layout-type="{{ Session::get('layout') }}"
data-no-results-found-text="<div class='bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-xl font-medium' role='alert'>No results found!</div>"
></table-view>
@include(htcms_admin_get_view_path('common.pagination'))

@else
    <div class="bg-white rounded-2xl shadow-xl shadow-red-500/5 border border-red-100 overflow-hidden" role="alert">
        <div class="px-6 py-4 bg-red-50 border-b border-red-100">
            <h3 class="text-sm font-black uppercase tracking-widest text-red-800">Error!</h3>
        </div>
        <div class="p-8">
            <p class="text-red-600 font-medium">Data source may be missing. Please verify your configuration.</p>
        </div>
    </div>
@endif

@endsection
