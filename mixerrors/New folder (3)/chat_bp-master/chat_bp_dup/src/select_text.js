var t = '';
   function gText(e) {
       t = (document.all) ? document.selection.createRange().text : document.getSelection();
   
       document.getElementById('input').value = t;
   }
   
   document.onmouseup = gText;
   if (!document.all) document.captureEvents(Event.MOUSEUP);