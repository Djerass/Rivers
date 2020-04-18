class Rivers {
    constructor(rivers) {
        this.rivers = rivers
        this.counter = 99
        this.filter = ''
    }

    setFilter(value) {
        this.filter = value
    }

    getRivers() {
        return this.rivers.filter(({
            name
        }) => name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0)
    }

    remove(id) {
        const index = this.rivers.findIndex(river => river.id === id)
        if (index >= 0) this.rivers.splice(index, 1)
    }

    add(name, continent, length, area, flowInto, ltd, lnd) {
        this.rivers.push({
            id: `${this.counter}`,
            name,
            continent,
            area,
            ltd,
            lnd,
            flowInto,
            length
        })
        this.counter++
    }
}




const riversTemplate = [{
        id: "1",
        name: "Pechora",
        continent: "EUROPE",
        length: 1809,
        area: 322000,
        ltd: "63.737396",
        lnd: "56.712618",
        flowInto: "Arctic Sea"
    }, {
        id: "2",
        name: "Pregolya",
        continent: "EUROPE",
        length: 123,
        area: 15500,
        ltd: "54.641174",
        lnd: "21.088670",
        flowInto: "Baltic Sea"
    },
    {
        id: "3",
        name: "Desna",
        continent: "EUROPE",
        length: 1130,
        area: 88900,
        ltd: "52.365817",
        lnd: "33.437731",
        flowInto: "Dnepr river"
    },
    {
        id: "4",
        name: "Kongakut",
        continent: "North America",
        flowInto: "Beaufort Sea",
        length: 1122,
        area: 77452,
        ltd: "69.519244",
        lnd: "-141.754997"
    }
]






// Init Rivers
const rivers = new Rivers(riversTemplate)




// River template
const createElement = ({
    id,
    name,
    continent,
    length,
    area,
    ltd,
    lnd,
    flowInto
}) => {
    return `<tr id=${id}>
        <td>${name}</td>
        <td>${continent}</td>
        <td>${length}</td>
        <td>${area}</td>
        <td>${ltd}</td>
        <td>${lnd}</td>
        <td>${flowInto}</td>
        <td><button>Remove</button></td>
    </tr>`
}



const drawRivers = riversList =>
    riversList.map(river => createElement(river)).join('')



const removeRiver = e => {
    const table = e.target.parentNode.parentNode.parentNode
    const raw = e.target.parentNode.parentNode
    const id = raw.id
    rivers.remove(id)
    table.removeChild(raw)
}

export {
    drawRivers,
    removeRiver,
    rivers
}