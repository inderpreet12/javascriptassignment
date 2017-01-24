var fs=require('fs');


function ReadAppend(file,appendFile){
	fs.readFile(appendFile,function(err,data)
	{
	if(err) throw err;
	console.log('file was read');
	fs.appendFile(file,data,function(err)
	{
	if(err) throw err;
	console.log('the data to append');
	});
	});
}

file='head_file.csv';
appendFile='India2011 (5).csv';
ReadAppend(file,appendFile);

appendFile='IndiaSC2011 (4).csv';
ReadAppend(file,appendFile);

appendFile='IndiaST2011 (3).csv';
ReadAppend(file,appendFile);
