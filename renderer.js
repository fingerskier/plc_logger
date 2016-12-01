// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.jQuery = require('./js/jquery')
require('./js/bootstrap')

const {dialog} = require('electron').remote

var config_file = ''
var d3 = require('./js/d3')
var fs = require('fs')

var versions = [{
	tech: 'NodeJS',
	ver: process.versions.node
},{
	tech: 'Chromium',
	ver: process.versions.chrome
},{
	tech: 'Electron',
	ver: process.versions.electron
}]

$('a').click(function(){
	var me = $(this)

	var callback = me.attr('callback')
	var href = me.attr('href')
	var target = me.attr('target')

	target = $('#'+target)

	target.load(href, function(){
		controller[callback]()
	})	

	return false
})


controller = {
	"about": function() {
		console.log('about loaded') 
		d3.selectAll('p#versions span')
		.data(versions)
		.enter()
		.append('span')
		.text((d)=>{
			return `${d.tech} v.${d.ver}`
		})
	}
	,
	"edit": function() { console.log('edit loaded') }
	,
	"open": function() {
		$('#open_file').click(()=>{
			dialog.showOpenDialog(function(fileNames){
				if (fileNames === undefined) {
					console.log("No file selected")
				} else {
					fs.readFile(fileNames[0], function(err, txt){
						if (err) console.error(err)

						$('#config_text').text(txt)
					})
				}
			})
		})
	}
}
