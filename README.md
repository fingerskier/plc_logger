# plc_logger
Logs PLC data


This tool requires [Node.js](www.nodejs.org) to run: It is free and used widely in a variety of industries.
This tool relies heavily on the [honcho] Node.js library: It is free and (by their admission) not proven robust enough for production usage (yet).

Edit the _run.cmd_ file (or copy it) with the following format:

`node index.js <project_name> <IP_address> <output_file>`

Look in _run.cmd_ for an example.


There must be two files created for a project:
	_project_name_.pts	|	This file contains a list of addresses of points that will be captured
	_project_name_.json	|	This file contains a list of mappings of points that will be captured


Examples of valid point addresses:

`TEST1=M32.2		// Bit at M32.2`
`TEST3=M20.0		// Bit at M20.0`
`TEST4=DB1,REAL0.20		// Array of 20 values in DB1`
`TEST5=DB1,REAL4		// Single real value`
`TEST6=DB1,REAL8		// Another single real value`
`TEST7=DB1,INT12.2`

Every point address must have a corresponding entry in the mappings files.

Examples of valid point mappings:

`{`
`	"TEST1": { "tagsets":["status"] },`
`	"TEST3": { "tagsets":["status"] },`
`	"TEST4": { "tagsets":["status"] },`
`	"TEST5": { "tagsets":["status"] },`
`	"TEST6": { "tagsets":["status"] },`
`	"TEST7": { "tagsets":["status"] }`
`}`
