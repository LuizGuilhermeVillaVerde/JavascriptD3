const dataMaleTeam = [
  {"ano": 2011, "saldo": 15},
  {"ano": 2012, "saldo": 60},
  {"ano": 2013, "saldo": 21},
  {"ano": 2014, "saldo": 33},
  {"ano": 2015, "saldo": 42},
  {"ano": 2016, "saldo": 21},
  {"ano": 2017, "saldo": 55},
  {"ano": 2018, "saldo": 52},
  {"ano": 2019, "saldo": 70},
  {"ano": 2020, "saldo": 37}
]

const dataFemaleTeam = [
  {"ano": 1997, "saldo": 16},
  {"ano": 1998, "saldo": 0},
  {"ano": 1999, "saldo": 18},
  {"ano": 2000, "saldo": 57},
  {"ano": 2001, "saldo": 72},
  {"ano": 2002, "saldo": 25},
  {"ano": 2017, "saldo": 75},
  {"ano": 2018, "saldo": 70},
  {"ano": 2019, "saldo": 77},
  {"ano": 2020, "saldo": 37}
]

// Definindo as dimenções e a margem do gráfico
const margin = {top: 30, right: 30, bottom: 70, left: 60},
   width = 460,
   height = 400

// Anexando o obj svg na pag
const svg = d3.select("#grafico")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);

// Texto
svg.append("text")
 .attr("class", "y axis-label")
 .attr("x", - (height / 2))
 .attr("y", -33)
 .attr("font-size", "20px")
 .attr("text-anchor", "middle")
 .attr("transform", "rotate(-90)")
 .text("Saldo de gols")

// Inicializando eixo x
const x = d3.scaleBand()
 .range([ 0, width ])
 .padding(0.2)
const xAxis = svg.append("g")
 .attr("transform", `translate(0,${height})`)

// Inicializando eixo y
const y = d3.scaleLinear()
 .range([ height, 0]);
const yAxis = svg.append("g")
 .attr("class", "myYaxis")


//Configuração tooltips
 const tip = d3.tip()
 .attr('class', 'd3-tip')
 .offset([-10, 0])
 .html((event, { saldo }) => `<strong>Saldo:</strong> <span style='color:blue'>${saldo}</span>`);

    
//Cria a função e atualiza 
function update(data) {

  svg.call(tip)  

 
 // Atualiza o eixo x
 x.domain(data.map(d => d.ano))
 xAxis.call(d3.axisBottom(x))

 // Atualiza o eixo y
 y.domain([0, d3.max(data, d => d.saldo) ]);
 yAxis.transition().duration(1000).call(d3.axisLeft(y));

 // Criação da variável 
 var u = svg.selectAll("rect")
   
 .on("mouseover", tip.show)
 .on("mouseout", tip.hide)
 .data(data)

 u
   .join("rect") // Adiciona os elementos no grafico 
   .transition() 
   .duration(1000)
     .attr("x", d => x(d.ano))
     .attr("y", d => y(d.saldo))
     .attr("width", x.bandwidth())
     .attr("height", d => height - y(d.saldo))
     .attr("fill", "#0B96D1")
    

     
    }


// Inicializa com o gráfico masculino
update(dataMaleTeam)


