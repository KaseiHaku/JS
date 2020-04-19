// todo 设置光标位置，并显示，没做兼容性处理
function setCursorPosition(domObj, position){
    domObj.focus();
    domObj.selectionStart = position;
    domObj.selectionEnd = position;
}
    
    
