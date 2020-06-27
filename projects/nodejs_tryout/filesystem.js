//readfile loads the whole file into the memory you pointed out, the fs. createReadStream, on the other hand, reads the entire file in chunks of sizes that you specified. 
//The client will also receive the data faster with fs. createReadStream since it is sent in chunks while it's being read.
const fs = require("fs");
const path = require("path");

// Create a readable stream
let readStream = fs.createReadStream(path.join(__dirname, "./read_file.txt"));

// Create a writable stream
let writeStream = fs.createWriteStream(path.join(__dirname, "./write_file.txt"));

//Reading files using streamsreceiver
readStream.on('data', chunk => {
    console.log("New chunk of data received");

    //Write the data chunk into write_file.txt
    writeStream.write(chunk)
})

// Create a readable stream
let readStream = fs.createReadStream(path.join(__dirname, "./read_file.txt"));

// Create a writable stream
let writeStream = fs.createWriteStream(path.join(__dirname, "./write_file.txt"));

// Read from read_file.txt and write to write_file.txt
readStream.pipe(writeStream)