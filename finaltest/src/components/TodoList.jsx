import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function TodoList() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const STORAGE_KEY = "todo-list";
  useEffect(() => {
    //Load todo from localStorage
    const storedTodo = localStorage.getItem(STORAGE_KEY);
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
  }, []);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Task description cannot be empty");
    } else {
      setTodo([...todo, { text: inputValue, completed: false }]);
      setInputValue("");
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...todo, { text: inputValue, completed: false }]));
    }
  };

  const handleDelete = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodo));
  };

  const handleComplete = (index) => {
    const updatedTodo = [...todo];
    const completedTask = updatedTodo.splice(index, 1)[0];
    completedTask.completed = !completedTask.completed;
    setTodo([...updatedTodo, completedTask]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodo));
  };

  const handleDeleteAll = () => {
    setTodo([]);
     localStorage.removeItem(STORAGE_KEY);
  };

  

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            centered
            textColor="inherit"
            aria-label="lab API tabs example"
            className="px-4 pt-2"
          >
            <Tab label="All" value="1" />
            <Tab label="Active" value="2" />
            <Tab label="Completed" value="3" />
          </TabList>
        </Box>

        {/* All tab */}
        <TabPanel value="1">
          <div>
            <form className="flex justify-center gap-2 mb-5">
              <input
                className="p-2 w-80 rounded-md border border-gray-500"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="add details"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-500 w-24 rounded-md"
              >
                Add
              </button>
            </form>
            <ul className="space-y-2">
              {todo.map((todo, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleComplete(index)}
                    className="mr-2"
                  />
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => handleDelete(index)} className="ml-2">
                    <DeleteOutlinedIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>

        {/* Active tab */}
        <TabPanel value="2">
          <div>
            <form className="flex justify-center gap-2 mb-5">
              <input
                className="p-2 w-80 rounded-md border border-gray-500"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="add details"
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-500 w-24 rounded-md"
              >
                Add
              </button>
            </form>

            <ul className="space-y-2">
              {todo
                .filter((j) => !j.completed)
                .map((todo, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleComplete(index)}
                      className="mr-2"
                    />

                    {todo.text}

                    <button
                      onClick={() => handleDelete(index)}
                      className="ml-2"
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </TabPanel>

        {/* Complete tab */}
        <TabPanel value="3">
          <div>
            <ul className="space-y-2">
              {todo
                .filter((j) => j.completed)
                .map((todo, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleComplete(index)}
                      className="mr-2"
                    />
                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => handleDelete(index)}
                      className="ml-2"
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </li>
                ))}
            </ul>
            <div className="flex justify-end w-full">
              <button
                onClick={() => handleDeleteAll()}
                className="w-24 bg-red-500 rounded flex text-white h-6"
              >
                <DeleteOutlinedIcon />
                Delete all
              </button>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
