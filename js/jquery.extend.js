/*该针对文本域的扩展实现的功能及使用方法：
1、获取光标位置：$(elem).iGetFieldPos()；
2、设置光标位置：$(elem).iSelectField(start)；
3、选中指定位置内的字符：$(elem).iSelectField(start,end)；
4、选中指定的字符：$(elem).iSelectStr(str)；
5、在光标之后插入字符串：$(elem).iAdd(str)；
6、删除光标前面（-n）或者后面（n）的n个字符：$(elem).iDel(n)；*/

(function($){
    /*
     * 文本域光标操作（选、添、删、取）的jQuery扩展
     */
    $.fn.extend({
        /*
         * 获取光标所在位置
         */
        iGetFieldPos:function(){
            var field=this.get(0);
            if(document.selection){
                //IE
                $(this).focus();
                var sel=document.selection;
                var range=sel.createRange();
                var dupRange=range.duplicate();
                dupRange.moveToElementText(field);
                dupRange.setEndPoint('EndToEnd',range);
                field.selectionStart=dupRange.text.length-range.text.length;
                field.selectionEnd=field.selectionStart+ range.text.length;
            }
            return field.selectionStart;
        },
        /*
         * 选中指定位置内字符 || 设置光标位置
         * --- 从start起选中(含第start个)，到第end结束（不含第end个）
         * --- 若不输入end值，即为设置光标的位置（第start字符后）
         */
        iSelectField:function(start,end){
            var field=this.get(0);
            //end未定义，则为设置光标位置
            if(arguments[1]==undefined){
                end=start;
            }
            if(document.selection){
                //IE
                var range = field.createTextRange();
                range.moveEnd('character',-$(this).val().length);
                range.moveEnd('character',end);
                range.moveStart('character',start);
                range.select();
            }else{
                //非IE
                //field.setSelectionRange(start,end);
                $(this).focus();
            }
        },
        /*
         * 选中指定字符串
         */
        iSelectStr:function(str){
            var field=this.get(0);
            var i=$(this).val().indexOf(str);
            i != -1 ? $(this).iSelectField(i,i+str.length) : false;
        },
        /*
         * 在光标之后插入字符串
         */
        iAddField:function(str){
            var field=this.get(0);
            var v=$(this).html();
            var len=$(this).html().length;
            if(document.selection){
                //IE
                $(this).focus()
                document.selection.createRange().text=str;
            }else{
                //非IE
                var selPos= $(this).iGetFieldPos();
                alert(selPos);
                $(this).html($(this).html().slice(0,field.selectionStart)+str+$(this).html().slice(field.selectionStart,len));
                this.iSelectField(selPos+str.length);
            };
        },
        /*
         * 删除光标前面(-)或者后面(+)的n个字符
         */
        iDelField:function(n){
            var field=this.get(0);
            var pos=$(this).iGetFieldPos();
            var v=$(this).val();
            //大于0则删除后面，小于0则删除前面
            $(this).val(n>0 ? v.slice(0,pos-n)+v.slice(pos) : v.slice(0,pos)+v.slice(pos-n));
            $(this).iSelectField(pos-(n<0 ? 0 : n));
        }
    });
})(jQuery);