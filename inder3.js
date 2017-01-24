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
      		 if(heading[j]=="Area Name" || heading[j]=="Total/ Rural/ Urban" || heading[j]=="Age-group" || heading[j]=="Educational level - Literate without educational level - Persons" || heading[j]=="Educational level - Below Primary - Persons" || heading[j]=="Educational level - Primary - Persons" || heading[j]=="Educational level - Middle - Persons" || heading[j]=="Educational level - Matric/Secondary - Persons" || heading[j]=="Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons" || heading[j]=="Educational level - Non-technical diploma or certificate not equal to degree - Persons" || heading[j]=="Educational level - Technical diploma or certificate not equal to degree - Persons" || heading[j]=="Educational level - Graduate & above - Persons" || heading[j]=="Educational level - Unclassified - Persons")
      		 {
      			obj[heading[j]]=value[j];
      		 }

      	}
      	array2.push(obj);
      	
     
      }
       
       var s1=array2.filter(function(el)
       {
            return el["Total/ Rural/ Urban"] === "Total" &&
                   el["Age-group"] === "All ages";
       });

       //console.log(s1);
       var get=s1.map(function(item)
       {
            return {
                Age_Group : item["Age-group"],
                Literate_without_educational_level_Persons :  item["Educational level - Literate without educational level - Persons"],
                 Below_Primary_Persons : item["Educational level - Below Primary - Persons"],
                Primary_Persons : item["Educational level - Primary - Persons"],
               Middle_Persons  : item["Educational level - Middle - Persons"],
                  Matric_Secondary_Persons: item["Educational level - Matric/Secondary - Persons"],
                 Higher_secondary_Intermediate_Pre_University_Senior_secondary_Persons       : item["Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons"],
                   Non_technical_diploma_or_certificate_not_equal_to_degree_Persons      : item["Educational level - Non-technical diploma or certificate not equal to degree - Persons"],
                   Technical_diploma_or_certificate_not_equal_to_degree_Persons      : item["Educational level - Technical diploma or certificate not equal to degree - Persons"],
                  Graduate_above_Persons     : item["Educational level - Graduate & above - Persons"],
                  Unclassified_Persons   : item["Educational level - Unclassified - Persons"],
                            

            };

       })
     //  console.log(get);

       //group by

   function groupBy(array,agegroup,a,b,c,d,e,f,g,h,i,j)
      {
       var resultArray=[],newObj={};       
       array.forEach(function(argsPass)
       {
            if(!newObj[argsPass[agegroup]])
            {
        newObj[argsPass[agegroup]]={};
       //  newObj[argsPass[agegroup]][agegroup]=argsPass[agegroup];
         newObj[argsPass[agegroup]][a]=0;
         newObj[argsPass[agegroup]][b]=0;
         newObj[argsPass[agegroup]][c]=0;
         newObj[argsPass[agegroup]][d]=0;
         newObj[argsPass[agegroup]][e]=0;
         newObj[argsPass[agegroup]][f]=0;
         newObj[argsPass[agegroup]][g]=0;
         newObj[argsPass[agegroup]][h]=0;
         newObj[argsPass[agegroup]][i]=0;
         newObj[argsPass[agegroup]][j]=0;
         resultArray.push(newObj[argsPass[agegroup]]);
            }
            newObj[argsPass[agegroup]][a] += +argsPass[a];
            newObj[argsPass[agegroup]][b] += +argsPass[b];
            newObj[argsPass[agegroup]][c] += +argsPass[c];
            newObj[argsPass[agegroup]][d] += +argsPass[d];
            newObj[argsPass[agegroup]][e] += +argsPass[e];
            newObj[argsPass[agegroup]][f] += +argsPass[f];
            newObj[argsPass[agegroup]][g] += +argsPass[g];
            newObj[argsPass[agegroup]][h] += +argsPass[h];
            newObj[argsPass[agegroup]][i] += +argsPass[i];
            newObj[argsPass[agegroup]][j] += +argsPass[j];
       });
       return resultArray;
      }
      var finallyy=groupBy(get,'Age_Group','Literate_without_educational_level_Persons','Below_Primary_Persons','Primary_Persons' ,'Middle_Persons','Matric_Secondary_Persons','Higher_secondary_Intermediate_Pre_University_Senior_secondary_Persons','Non_technical_diploma_or_certificate_not_equal_to_degree_Persons','Technical_diploma_or_certificate_not_equal_to_degree_Persons','Graduate_above_Persons','Unclassified_Persons');

     let finalArr = Object.keys(finallyy[0]).map((value, index) => {
     let finalObj = {
      educationLevel: value,
      totalCount: finallyy[0][value]
     }
     return finalObj;
    });

    var myData=JSON.stringify(finalArr);
     var create1=fs.createWriteStream("thirdjson.json");
     create1.write(myData);
     create1.end();



// group by end     

            







     

      	
      
       

     
             
 });


