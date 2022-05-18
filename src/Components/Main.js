import React, { useState, useEffect } from 'react'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { MdCorporateFare } from 'react-icons/md'
import { BiRegistered, BiTimeFive } from 'react-icons/bi'
import { BsCalendarDate } from 'react-icons/bs'
import { AiOutlineFileText } from 'react-icons/ai'
import { fetchCustomers } from './Data/CustomerFetch'
import { fetchproject } from './Data/ProjectFetch'
export const timeregisterApi = 'https://localhost:7018/api/TimeRegister'

export const Main = () => {
    const [date, setDate] = useState('')
    const [amountminutes, setAmountMinutes] = useState(0)
    const [description, setDescription] = useState('')
    const [project, setProject] = useState([])
    const [allProject, setAllProject] = useState([])
    const [customer, SetCustomer] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedCustomer, setSelectedCustomer] = useState(null)


    useEffect(() => {
        fetchCustomers().then(result => {
            console.log('I am here')
            SetCustomer(result)
            onSetSelectedCustomers(result[0].id)
        })
        fetchproject().then(result => {
            setAllProject(result)
            onSetSelectedProjects(result[0].id)
        })
    },
        []);

    let registers = [];
    const onSave = () => {
        const payload = {
            date: date,
            description: description,
            amountMinutes: amountminutes,
            projectId: selectedProject.id,
            customerId: selectedCustomer.id
        }
        console.table(payload)
        fetch(timeregisterApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(register => {
                registers.push(register);
                console.log(register)
                console.log(description)
                window.location.reload();
            })
    }
    const onSetSelectedCustomers = (id) => {
        var cust = customer.find(c => c.id === parseInt(id))
        setSelectedCustomer(cust)
        setProject(allProject.filter(e => e.customer.id === parseInt(id)))
    }
    const onSetSelectedProjects = (id) => {
        var proj = allProject.find(p => p.id === parseInt(id))
        setSelectedProject(proj)
    }
    return (
        <div className='container'>
            <h1 className='header_title'>Time register </h1>
            <div className='form-center'>
                <form>
                    <label>Date <BsCalendarDate /></label>
                    <input className='input' type="date" value={date} onChange={e => setDate(e.target.value)}></input>
                    <label>Amount of minutes <BiTimeFive /></label>
                    <input className='input' type="number" value={amountminutes} onChange={e => setAmountMinutes(e.target.value)}></input>
                    <label>Customer <MdCorporateFare /></label>
                    <select className='input2' onChange={e => onSetSelectedCustomers(e.target.value)}>
                        <option>Please select customer</option>
                        {customer.map(customer =>
                            <option value={customer.id}>{customer.name}</option>
                        )}
                    </select>
                    <label>Project<AiOutlineFundProjectionScreen /></label>
                    <select className='input2' onChange={e => onSetSelectedProjects(e.target.value)}>
                        {project.map(proj =>
                            <option value={proj.id}>{proj.name} </option>
                        )}
                    </select>
                    <label>Description<AiOutlineFileText /></label>
                    <textarea className='input_textarea' value={description} onChange={e => setDescription(e.target.value)} rows="4" cols="30"></textarea>
                    <button className='button-30' type="button" onClick={onSave}>Save</button>
                </form>
            </div>
        </div>
    )
}
