var fs = require('fs');

 var data = '';
 var array2=[];

 var readStream = fs.createReadStream('head_file.csv', 'utf8');
 

readStream.on('data', function(chunk) {  
     data += chunk;
 }).on('end', function() {
   //  console.log(data.length);
     
     
      var lines1=data.split("\r\n");
      var heading=lines1[0].split(",");

      
      for(i=1;i<lines1.length;i++)
      {
      	var obj={};
      	var value=lines1[i].split(",");

      	for(j=0;j<heading.length;j++)
      	{
      		 if(heading[j]=="Area Name" || heading[j]=="Total/ Rural/ Urban" || heading[j]=="Age-group" || heading[j]=="Educational level - Graduate & above - Males" || heading[j]=="Educational level - Graduate & above - Females")
      		 {
      			obj[heading[j]]=value[j];
      		 }

      	}
      	array2.push(obj);
          //  console.log(array2);
      	
     
      }
      // //filteration
       var s1=array2.filter(function(el)
       {
             return el["Total/ Rural/ Urban"] === "Total" &&
              el["Age-group"] ==="All ages";
       });
       //console.log(s1);

      var get=s1.map(function(item)
       {
        return {
          Area_Name : item["Area Name"],
          Literate_Males : item["Educational level - Graduate & above - Males"],
          Literate_Females : item["Educational level - Graduate & above - Females"]
          
        };
       });

   //  console.log(get);
      


//group by

   function groupBy(array,areaName,literatemale,literatefemale)
      {
       var resultArray=[],newObj={};
       
       array.forEach(function(argsPass)
       {
            if(!newObj[argsPass[areaName]])
            {

        newObj[argsPass[areaName]]={};
         newObj[argsPass[areaName]][areaName]=argsPass[areaName];
         newObj[argsPass[areaName]][literatemale]=0;
         newObj[argsPass[areaName]][literatefemale]=0;
         resultArray.push(newObj[argsPass[areaName]]);
 

            }
            newObj[argsPass[areaName]][literatemale] += +argsPass[literatemale];
            newObj[argsPass[areaName]][literatefemale] += +argsPass[literatefemale];
       });
       return resultArray;


      }
      var finallyy=groupBy(get,'Area_Name','Literate_Males','Literate_Females');

     console.log(finallyy);

    



// group by end     

      	
      
         myData=JSON.stringify(finallyy);
     var create1=fs.createWriteStream("secondjson.json");
     create1.write(myData);
     create1.end();

     
             
 });


