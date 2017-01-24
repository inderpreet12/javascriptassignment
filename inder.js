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
      		 if(heading[j]=="Age-group" || heading[j]=="Literate - Persons" || heading[j]=="Total/ Rural/ Urban")
      		 {
      			obj[heading[j]]=value[j];
      		 }

      	}
      	array2.push(obj);
      	
     
      }
      //fiteration
       var s1=array2.filter(function(el)
       {
        return el["Total/ Rural/ Urban"]==="Total";
       });
        // console.log(s1);
       var get=s1.map(function(item)
       {
        return {
          Age_group : item["Age-group"],
          Literate_Persons : item["Literate - Persons"]
          
        };
       });
     // console.log(get);

      //filteration ends
      function groupBy(array,ageGrpCol,value)
      {
        //creating an array and object
       var resultArray=[],newObj={};

       array.forEach(function(argsPass)
       {
       	if(!newObj[argsPass[ageGrpCol]])
       	{

        newObj[argsPass[ageGrpCol]]={};
         newObj[argsPass[ageGrpCol]][ageGrpCol]=argsPass[ageGrpCol];
         newObj[argsPass[ageGrpCol]][value]=0;
         resultArray.push(newObj[argsPass[ageGrpCol]]);
 

       	}
       	newObj[argsPass[ageGrpCol]][value] += +argsPass[value];
       });
       return resultArray;


      }
      var finallyy=groupBy(get,'Age_group','Literate_Persons');

     console.log(finallyy);
      // var hoja=JSON.sthringify(array2);
      // 	var hoja1=hoja.split(",");
      // 	if()
      // 	{
      // 		 console.log(hoja1[5]);
      // 	}
      

     // fs.writeFileSync('writeme.txt',array2);
       
     //   var json=JSON.stringify(array2);
     //   fs.writeFileSync('writeme1.txt',json);










     // 	for(j=1;j<lines1 ;j++)
     // 	{
     // 		var data1=lines[1].split(",");

     //     console.log( lines2[i]+data1[j]);
     // 	}

     // }
                    
      //		console.log(lines2[0]);
      	

      	
      
       

     // var heading=lines[0].split(",");

     // for(i=0;i<heading.length;i++)
     // {
     //   for(j=1;j<lines[j].length;j++)
     //   {
     //   	console.log(heading[i]+lines[j]);
     //   }

     // }

     myData=JSON.stringify(finallyy);
     var create1=fs.createWriteStream("firstjson.json");
     create1.write(myData);
     create1.end();
             
 });




