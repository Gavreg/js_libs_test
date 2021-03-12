let openString = "%(";
let closeString = "%)";

let cats = new Map();
let id_numbers = new Map();


document.addEventListener('DOMContentLoaded', function()
{
    let doc = document.getElementsByTagName("body")[0].innerHTML;
    
    let open_index = 0;
    let close_index = 0;

    while (true)
    {
        open_index = doc.indexOf(openString,open_index);
        if (open_index == -1) break;

        close_index = doc.indexOf(closeString,open_index + openString.length)
        if (closeString == -1) break;
        
        let sub_str = doc.substring(open_index + openString.length, close_index);
        
        let parts = sub_str.split(':');
        if (parts.length != 3)
            throw "error 1";
        if ((parts[0]=="n" || parts[0]=="l") == false)
            throw "error 2";
        if (parts[0]=="n")
        {
            let type = parts[0];
            let cat = parts[1];
            let id = parts[2];
    
            if (!cats.has(cat))
            {
                cats.set(cat, 0);
            }
                
            let new_number = cats.get(cat) + 1;
            cats.set(cat, new_number);
            id_numbers.set(openString+"l"+":"+cat+":"+id+closeString,new_number);
            id_numbers.set(openString+"n"+":"+cat+":"+id+closeString,new_number);
        }

        open_index = close_index + closeString.length;
    }

    id_numbers.forEach(function(value, key) {
        doc = doc.replace(key,value);
      });
    document.getElementsByTagName("body")[0].innerHTML = doc;

    //alert (doc);

});

