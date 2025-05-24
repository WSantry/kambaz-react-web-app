// File: src/Labs/Lab3/index.tsx

import { Routes, Route } from "react-router-dom";

// Import everything we created:
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import TodoList from "./todos/TodoList";
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";

// A small component that shows all the labs in one go
function Lab3Main() {
  console.log("Hello World!"); // For the console debugging example

  return (
    <div id="wd-lab3-content">
      <h3>Lab 3 - JavaScript & React</h3>

      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <TodoList />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />

      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>

      <hr />
      <h4>Path Parameters Example:</h4>
      <p>Click the links below or see the dedicated route.</p>
      <PathParameters />
    </div>
  );
}

export default function Lab3() {
  return (
    <div id="wd-lab3">
      {/* 
        Use nested routes so that /Labs/Lab3 goes to <Lab3Main/> 
        and /Labs/Lab3/add/:a/:b is handled by the PathParameters 
        internally as well. 
      */}
      <Routes>
        <Route path="/" element={<Lab3Main />} />
        {/* If you want PathParameters to be a separate route, do so: 
            But the code above in PathParameters also sets its own nested route 
            so either approach is valid. 
        */}
        {/* <Route path="add/*" element={<PathParameters />} /> */}

        {/* Any other sub-path => show main as fallback */}
        <Route path="*" element={<Lab3Main />} />
      </Routes>
    </div>
  );
}
