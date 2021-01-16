url= "/api/v1.0/data"
console.log(url)
d3.json(url).then((data) => {alert('Hooray')
    console.log(data)});