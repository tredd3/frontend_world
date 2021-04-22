//debugging an existing node process, which is not running in a debug mode
const pid = 9910 //pid of the process that is already running
process._debugProcess(pid)

//u can run multiple node processes in a machine but u can only debug one node process at a time
//hence u need to run this script in normal mode and not in debug mode
//if u run this script in debug mode u can't debug the actual running process u actually wanted to debug
//open dedicated devtools for nodejs from chrome devtools