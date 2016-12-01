console.log('about page loaded')

d3.selectAll('p#versions span')
.data(versions)
.enter()
.append('span')
.text((d)=>{
	return `${d.tech} v.${d.ver}`
})
