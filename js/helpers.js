$('a').click(function(){
	var href = $(this).attr('href')
	var target = $(this).attr('target')

	target = $('#'+target)

	content.attr('src', href)

	return false
})

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
