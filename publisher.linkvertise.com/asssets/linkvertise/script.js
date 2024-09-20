function reloadDataTables(){setTimeout(function(){$("*[data-datatable], .dataTable").each(function(){$(this).DataTable().ajax.reload();});},1);}
$.fn.dataTable.ext.errMode='none';$(document).on("click",".download-link .btn",function(){$(this).parents(".download-link").toggleClass("active");});$(document).on("click","*[data-confirm]",function(e)
{var parent=$(this);e.stopImmediatePropagation();e.preventDefault();$('.modal').each(function(){$(this).modal('hide');});swal({title:window.swal_confirm,text:parent.data("confirm"),type:"warning",showCancelButton:true,confirmButtonClass:"btn-danger",cancelButtonClass:"btn-secondary",confirmButtonText:window.swal_yes,cancelButtonText:window.swal_no,},function(){postRequest(parent,e);});});function str_slug(text)
{return text.toString().toLowerCase().replace(/\s+/g,'-').replace(/[^\w\-]+/g,'').replace(/\-\-+/g,'-').replace(/^-+/,'').replace(/-+$/,'');}
$(document).on("click","*[data-confirm]",function(e)
{var parent=$(this);e.stopImmediatePropagation();e.preventDefault();$('.modal').each(function(){$(this).modal('hide');});swal({title:window.swal_confirm,text:parent.data("confirm"),type:"warning",showCancelButton:true,confirmButtonClass:"btn-danger",cancelButtonClass:"btn-secondary",confirmButtonText:window.swal_yes,cancelButtonText:window.swal_no,},function(){postRequest(parent,e);});});function postRequest(parent,e)
{e.stopImmediatePropagation();e.preventDefault();var url=parent.data("post");$.ajax({url:url,method:"POST",processData:false,contentType:false,success:function(data)
{if(data.callback!==undefined){if(data.callback instanceof Object){$.each(data.callback,function(k,v){window[k](v);});}
else
window[data.callback]();}
if(data.swal!==undefined){setTimeout(function(){swal({title:data.swal.title?data.swal.title:window.swal_title,text:data.swal.text,type:data.swal.type?data.swal.type:"success",confirmButtonClass:"btn btn-primary",confirmButtonText:"Okay"});$('.modal').each(function(){$(this).modal('hide');});},50);}
if(data.reload_datatables!==undefined&&data.reload_datatables)
{reloadDataTables();}
if(data.redirect!==undefined)
{var hash=window.location.hash;if(hash==""||hash==null||hash==undefined)
{window.location.replace(data.redirect);}
else
{window.location.href=data.redirect;location.reload();}
return;}}});}
function stripHtml(html)
{var tmp=document.createElement("DIV");tmp.innerHTML=html;return tmp.textContent||tmp.innerText||"";}
$(document).on("click","*[data-post]",function(e)
{var parent=$(this);postRequest(parent,e);});$('*[data-ajax]').submit(function(e)
{e.stopImmediatePropagation();e.preventDefault();var formData=new FormData($(this)[0]);var imageIndex=0;$(this).find(".dropzone").each(function(index,dropzone){var files=dropzone.dropzone.getAcceptedFiles();$.each(files,function(i,file){formData.append('images['+imageIndex+']',file);imageIndex++;});});var url=$(this).data('ajax');var wrapper=$(this).find(".alert-wrapper");var form=$(this).find(".form-wrapper");wrapper.animate({height:"toggle",opacity:"toggle"},500);$(".loading-overlay:not(.loading-overlay-static)").addClass("show");$.ajax({url:url,data:formData,method:"POST",processData:false,contentType:false,complete:function()
{try
{grecaptcha.reset();}catch(e){}
setTimeout(function()
{$(".loading-overlay:not(.loading-overlay-static)").removeClass("show");wrapper.animate({height:"toggle",opacity:"toggle"});},5e2);},success:function(data)
{if(data.callback!==undefined){if(data.callback instanceof Object){$.each(data.callback,function(k,v){window[k](v);});}
else
window[data.callback]();}
if(data.swal!==undefined){$(".modal").modal("hide");setTimeout(function(){swal({title:data.swal.title?data.swal.title:window.swal_title,text:data.swal.text,type:data.swal.type?data.swal.type:"success",confirmButtonClass:"btn btn-primary",confirmButtonText:"Okay"});},50);}
if(data.current_user_amount!==undefined&&data.current_user_amount)
{$("#current_user_amount").text(data.current_user_amount);}
if(data.reload_datatables!==undefined&&data.reload_datatables)
{reloadDataTables();}
if(data.redirect!==undefined)
{var hash=window.location.hash;if(hash==""||hash==null||hash==undefined)
{window.location.replace(data.redirect);}
else
{window.location.href=data.redirect;location.reload();}
return;}
wrapper.html("");if(data.messages!==undefined)
{var error_list="";if(data.messages instanceof Object)
{$.each(data.messages,function(k,v)
{error_list+="<li>"+v+"</li>"});}
else
{error_list="<li>"+data.messages+"</li>";}
wrapper.append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><ul class="list-unstyled">'
+error_list
+'</ul></div>');}},error:function(data)
{wrapper.html("");wrapper.append
('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><ul class="list-unstyled"><li>Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere unseren Support.</li></ul></div>');}});});function nl2br(str,is_xhtml){var breakTag=(is_xhtml||typeof is_xhtml==='undefined')?'<br />':'<br>';return(str+'').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,'$1'+breakTag+'$2');}
function linkCreated(params)
{$(".modal").modal("hide");var $modal=$("#modal_link_created");$modal.find("#url").val(params.url);$modal.modal("show");v_create.current_step=1;v_create.url="";v_create.target="";v_create.btn_text="";v_create.require_addon=true;v_create.require_countdown=true;v_create.require_web=true;v_create.require_video=true;v_create.title='';v_create.description='';v_create.youtube_url='';v_create.suggest=true;try{Dropzone.getElement("#link_create_dropzone").dropzone.removeAllFiles();}catch(e){}}
function removeRefreshDataSpin(params){$("#refresh_data i").removeClass("fa-spin");}
$(window).scroll(function(){if($(window).scrollTop()+$(window).height()>$(document).height()-100)
$(".youtube-wrapper").fadeOut();else
$(".youtube-wrapper").fadeIn();});$('body').tooltip({selector:'[data-toggle="tooltip"]'});setInterval(function(){$("*[data-countdown]").each(function(){var to=moment($(this).data("countdown"));var from=moment();var diffTime=to-from;var duration=moment.duration(diffTime,'milliseconds');if(diffTime<0)
$(this).text("");else if(diffTime<48*60*60*1000)
$(this).html("<span class='countdown-digit'>"+(duration.days()*24+duration.hours())+"</span>:<span class='countdown-digit'>"+duration.minutes()+"</span>:<span class='countdown-digit'>"+duration.seconds()+"</span>");else
$(this).html((duration.days()+" "+window.days+" <span class='countdown-digit'>"+duration.hours())+"</span>:<span class='countdown-digit'>"+duration.minutes()+"</span>:<span class='countdown-digit'>"+duration.seconds()+"</span>");});},1000);$("#nav-username").click(function(){$(".sidebar a[href='#dashboard']").click();});$("#link-create-nav").click(function(){$(".sidebar a[href='#link-create']").click();});$("#link-create-table").click(function(){$(".sidebar a[href='#link-create']").click();});$(document).on("click","*[data-toggle-automatic]",function(e)
{var parent=$(this);e.stopImmediatePropagation();e.preventDefault();var wrapper=$(".automatic-alert-wrapper")
var url=parent.data("toggle-automatic");$.ajax({url:url,method:"POST",processData:false,contentType:false,success:function(data)
{if(data.redirect!==undefined)
{var hash=window.location.hash;if(hash==""||hash==null||hash==undefined)
{window.location.replace(data.redirect);}
else
{window.location.href=data.redirect;location.reload();}
return;}
wrapper.html("");if(data.messages!==undefined)
{var error_list="";if(data.messages instanceof Object)
{$.each(data.messages,function(k,v)
{error_list+="<li>"+v+"</li>"});}
else
{error_list="<li>"+data.messages+"</li>";}
wrapper.append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><ul class="list-unstyled">'
+error_list
+'</ul></div>');}}});});