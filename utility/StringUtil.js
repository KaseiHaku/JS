function StringUtil(){

    
    /** todo 根据指定的分隔符，切换单行和多行
     * @param str 原始字符串
     * @param delimiter 分隔符
     * @param toSingle true 转化成单行， false 转化成多行
     * */
    function toggleSingleMultiLine(str, delimiter, toSingle){
        if(str === void(0) || str === null || str === ''){
            return str;
        }
        
        if (toSingle) {
            var regexpSingle = new RegExp('\\s*' + delimiter+ '\\s*', "g");
            return str.replace(regexpSingle, delimiter);
        }
        var regexpMulti = new RegExp(delimiter, "g");
        return str.replace(regexpMulti, delimiter + '\r\n');  // 防止在 Mac OS 和 Linux 下不换行
    }
    
    
    /** todo 删除带有分隔符的字符串中的一个元素
     * @param original 原来的字符串
     * @param item 要删除的元素
     * @param delimiter 分隔符
     * @trap item 最好不要带有分隔符
     * */
    function removeItemFromDelimiterStr(original, item, delimiter){
        let res = null;
        if(original === void(0) || original === null || original === ''){
            return res;
        }

        let middle = new RegExp( '[\\s'+delimiter+']*'+delimiter+'[\\s'+delimiter+']*', 'g');
        let tail = new RegExp( '[\\s'+delimiter+']*'+delimiter+'[\\s'+delimiter+']*$', 'g');
        let head = new RegExp( '^[\\s'+delimiter+']*'+delimiter+'[\\s'+delimiter+']*', 'g');
        res = original.replace(item, '');
        res = res.replace(middle, delimiter);
        res = res.replace(tail, '');
        res = res.replace(head, '');

        return res;
    }

    /** todo 生成一个 UUID */
    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    }
    
}
