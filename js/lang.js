/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'zh-TW', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */ 
var execI18n = function(){
    /*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        zs.d("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    };
    var sourceName = optionEle.attr('content');
    sourceName = sourceName.split('-');  
        /* 需要引入 i18n 文件*/
        if ($.i18n == undefined) {
            zs.d("请引入i18n js 文件")
            return false;
        };

        /*
        这里需要进行i18n的翻译
         */
        jQuery.i18n.properties({
            name : sourceName, //资源文件名称
            path : 'i18n/' + i18nLanguage +'/', //资源文件路径
            mode : 'map', //用Map的方式使用资源文件中的值
            language : i18nLanguage,
            callback : function() {//加载成功后设置显示内容
                var insertEle = $(".i18n");
                zs.d(".i18n 写入中...");
                insertEle.each(function() {
                    // 根据i18n元素的 name 获取内容写入
                    $(this).html($.i18n.prop($(this).attr('name')));
                });
                zs.d("写入完毕");

                zs.d(".i18n-input 写入中...");
                var insertInputEle = $(".i18n-input");
                insertInputEle.each(function() {
                    var selectAttr = $(this).attr('selectattr');
                    if (!selectAttr) {
                        selectAttr = "value";
                    };
                    $(this).attr(selectAttr, $.i18n.prop($(this).attr('selectname')));
                });
                zs.d("写入完毕");
            }
        });
}

/*页面执行加载执行*/
$(function(){

    /*执行I18n翻译*/
    execI18n();

    /*将语言选择默认选中缓存中的值*/
    //$("#language option[value="+i18nLanguage+"]").attr("selected",true);

    /* 选择语言 */
   // $("#language").on('change', function() {
    //    var language = $(this).children('option:selected').val()
    //    zs.d(language);
     //   getCookie("userLanguage",language,{
    //        expires: 30,
     //       path:'/'
     //   });
     //   location.reload();
    //});
});