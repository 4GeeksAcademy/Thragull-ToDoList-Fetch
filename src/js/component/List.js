import React, {useState, useEffect} from 'react'

const List = () => {

    // Logic
    const [list, updateList] = useState([{done: false, label:"Example Task"}]);
    const [toDo, setToDo] = useState("")

    let loaded = false;

    const addTask = (toDo)=>{
      if (toDo !== "") {
      let newItemToAdd = {
        done: false,
        label: toDo
      }
      setToDo("");
      let auxList = list
      auxList.push(newItemToAdd)
      return auxList;
    }}

    // API

    // Variables

    const urlApiToDo = "https://playground.4geeks.com/apis/fake/todos/user/Thragull"

    // POST

    useEffect(() => {
      fetch(urlApiToDo, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response)=>{
      return response.json()
      })
      .then((data)=>{loaded=true})
      .catch((err)=>{return err})
    }, [])

    // GET

    useEffect(() => {
      if (loaded){
      fetch(urlApiToDo)
	    .then((response)=>{
		  return response.json()
	    })
	    .then((data)=>{updateList(data)})
	    .catch((err)=>{return err})}
    }, [list.length, loaded])


    const update = (taskList) => {
      fetch(urlApiToDo, {
        method: "PUT",
        body: JSON.stringify(taskList),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response)=>{return response.json()})
      .then((data)=>{updateList(taskList)})
      .catch((err)=>{err})
    }

    const deleteByIndex = (indexToDelete) => {
      return list.filter((element, index) => index !== indexToDelete);
    }

    const listToShow = () => {
      return list.filter((element, index) => index !== 0);
    }

    const deleteAll = () => {
      update([{done: false, label:"Example Task"}]);
    }
    
  return (
    <div className='container justify-content-center mt-5 w-50'>
      <div className='input-group mb-5'>
          <span className='input-group-text '>What do you have to do.</span>
          <input className='form-control' id="toDo" placeholder='What needs to be done?' value={toDo}
                  onChange={(element) => {
                      setToDo(element.target.value);
                    }
                  }
                  onKeyDown={(event) =>{
                      if (event.key === "Enter"){
                        update(addTask(toDo));
                      }
                    }
                  }
          /> 
      </div>
      <ul className='list-group rounded-4'>
        {listToShow().map((element, index)=><li key={index+1} className='list-group-item d-flex p-0 ps-2 bg-secondary'>
                                                <div className='text my-auto py-2'>{element.label}</div>
                                                <i className="fa fa-trash trash bg-danger px-3 py-3 ms-auto text-white"
                                                onClick={(event) => update(deleteByIndex(index+1))}></i>
                                      </li> )}
      </ul>
      <p className='text-start ms-2 text-secondary'>{list.length-1} items remaining.</p>
      <button className='btn btn-danger' onClick={deleteAll}>Delete All Items</button>
    </div>
  )
}

export default List