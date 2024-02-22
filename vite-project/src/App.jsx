import { useState } from "react";
import Column from "./components/Column/Column";
import Input from "./components/Input/Input";
import "./App.css";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix Styling" },
    { id: 3, title: "Make Mobile friendly" },
  ]);

  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
