import {
    mymap,
    mymarker
} from './leaflet'

import {
    drawRivers,
    removeRiver,
    rivers
} from './rivers'



import {
    UI
} from "./UI"






// Add rivers to html
UI.riverTable.innerHTML = drawRivers(rivers.getRivers())


// Click on raw event
UI.riverTable.addEventListener('click', e => {
    if (e.target.nodeName === "BUTTON") {
        removeRiver(e)
        return
    }

    const id = e.target.parentNode.id
    console.log(rivers.getRivers().find(riv => riv.id === id))
    const {
        lnd,
        ltd
    } = rivers.getRivers().find(riv => riv.id === id)

    mymarker.setLatLng([ltd, lnd])
    mymap.setView([ltd, lnd], 9)
})



// Modal
const hideUnhide = elements => elements.forEach(el => el.classList.toggle('hidden'))
UI.addBtn.addEventListener('click', () => hideUnhide([UI.modal, UI.map]))
UI.closeBtn.addEventListener('click', () => hideUnhide([UI.modal, UI.map]))




const setError = (node, message) => {
    const parent = node.parentNode
    parent.classList.add('error')
    node.nextElementSibling.innerText = message
}


const setSuccess = node => {
    const parent = node.parentNode
    parent.classList.remove('error')
}

// Search Event 

const searchUpdate = text => {
    rivers.setFilter(text);
    UI.riverTable.innerHTML = drawRivers(rivers.getRivers());
}

UI.search.addEventListener('input', e => searchUpdate(e.target.value))


// Add event 
UI.addForm.main.addEventListener('submit', e => {
    e.preventDefault()
    const name = UI.addForm.name
    const continent = UI.addForm.continent
    const length = UI.addForm.length
    const area = UI.addForm.area
    const flowInto = UI.addForm.flowInto
    const ltd = UI.addForm.ltd
    const lnd = UI.addForm.lnd;

    const errors = []
    const success = []


    if (name.value.length < 3) {
        if (!name.value) {
            errors.push({
                node: name,
                message: "Enter name"
            })
        } else {
            errors.push({
                node: name,
                message: "Name must be longer than 3 letters"
            })
        }
    } else {
        success.push(name)
    }



    if (continent.value.length < 4) {
        if (!continent.value) {
            errors.push({
                node: continent,
                message: "Enter continent"
            })
        } else {
            errors.push({
                node: continent,
                message: "Continent must be longer than 4 letters"
            })
        }
    } else {
        success.push(continent)
    }



    if (flowInto.value.length < 4) {
        if (!flowInto.value) {
            errors.push({
                node: flowInto,
                message: "Enter flow Into"
            })
        } {
            errors.push({
                node: flowInto,
                message: "Flow into must be longer than 4 letters"
            })
        }
    } else {
        success.push(flowInto)
    }




    if (!length.value) {
        errors.push({
            node: length,
            message: "Enter length"
        })
    } else {
        success.push(length)
    }

    if (!area.value) {
        errors.push({
            node: area,
            message: "Enter area"
        })
    } else {
        success.push(area)
    }

    if (!lnd.value) {
        errors.push({
            node: lnd,
            message: "Enter lnd"
        })
    } else {
        success.push(lnd)
    }

    if (!ltd.value) {
        errors.push({
            node: ltd,
            message: "Enter ltd"
        })
    } else {
        success.push(ltd)
    }

    success.forEach(succ => setSuccess(succ))
    if (errors.length !== 0) {
        errors.forEach(err => setError(err.node, err.message))
    } else {
        rivers.add(name.value, continent.value, +length.value, +area.value, flowInto.value, +ltd.value, +lnd.value);
        UI.riverTable.innerHTML = drawRivers(rivers.getRivers());
        [name, continent, length, area, flowInto, lnd, ltd].forEach(el => el.value = "")
        hideUnhide([UI.modal, UI.map])
    }
})